import { exit } from "node:process";
import { mergeSort, quickSort } from "./algo/index.ts";

if (import.meta.main) {
  // 2, 9, 6, 5, 8
  const data = [3, 1, 4, 7];
  const res = mergeSort(data);
  console.log(res);
}
