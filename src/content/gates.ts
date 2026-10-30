import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export function gateAllows(root: string, filename: string): boolean {
  const path = join(root, "gates", filename);
  if (!existsSync(path)) return false;
  return readFileSync(path, "utf8").includes("approved-by:");
}

export function namedLikenessAllowed(root:string,personName:string):boolean {
 if(!personName.trim()||!gateAllows(root,'likeness.approved'))return false;
 const approval=readFileSync(join(root,'gates','likeness.approved'),'utf8');
 return approval.includes(personName.trim());
}
