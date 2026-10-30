import {z} from 'zod';
import raw from '../../content/lessons.json' with {type:'json'};
import {lessonSchema} from '../content/schema';
import type {Save} from './arrival';
export type Lesson=z.infer<typeof lessonSchema>;
export interface LessonSource {get(id:string):Lesson|undefined;forPlace(placeId:string):Lesson[];}
export class BundleLessonSource implements LessonSource {private lessons=z.array(lessonSchema).parse(raw);get(id:string){return this.lessons.find(l=>l.id===id);}forPlace(id:string){return this.lessons.filter(l=>l.placeId===id);}}
export const lessonSource:LessonSource=new BundleLessonSource();
export const lessonProgressSchema=z.record(z.object({block:z.number().int().nonnegative(),completed:z.boolean(),asked:z.array(z.string())}));
export function lessonAnswer(source:LessonSource,id:string,promptId:string){return source.get(id)?.prompts.find(p=>p.id===promptId)?.instructorResponse;}
export function responseBelongs(source:LessonSource,id:string,text:string){return source.get(id)?.prompts.some(p=>p.instructorResponse===text)??false;}
export function saveNote(s:Save,text:string,lessonId?:string):Save{if(!s.abilities.includes('notebook'))throw Error('Notebook unavailable');if(!text.trim()||text.length>4000)throw Error('Write a note of 1–4000 characters');return {...s,notes:[...s.notes,{id:crypto.randomUUID(),text:text.trim(),placeId:s.placeId,...(lessonId?{lessonId}:{})}]};}
export function advanceLesson(s:Save,id:string,block:number,completed=false):Save{const l=lessonSource.get(id);if(!l||l.placeId!==s.placeId||!s.abilities.includes('ask-a-question'))throw Error('Lesson unavailable');if(block<0||block>=l.blocks.length)throw Error('Missing lesson block');return {...s,lessonProgress:{...s.lessonProgress,[id]:{block,completed:completed||s.lessonProgress?.[id]?.completed||false,asked:s.lessonProgress?.[id]?.asked??[]}}};}
export function askLesson(s:Save,id:string,promptId:string):Save{if(!s.abilities.includes('ask-a-question')||!lessonAnswer(lessonSource,id,promptId))throw Error('Question is not in this lesson');const l=lessonSource.get(id)!;const next=advanceLesson(s,id,s.lessonProgress?.[id]?.block??0);return {...next,lessonProgress:{...next.lessonProgress,[id]:{...next.lessonProgress![id],asked:[...new Set([...next.lessonProgress![id].asked,promptId])]}}};}
