import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_TEXT =
  "This meeting exists because nobody wanted to be the one to say no in writing.";

const OUTPUT_PATH = "/output/entry.txt";

const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 200;

function validateEntryText(text: string): void {
  const codePoints = [...text];
  if (codePoints.length < MIN_CODE_POINTS) {
    throw new Error("entry text is empty");
  }
  if (codePoints.length > MAX_CODE_POINTS) {
    throw new Error(
      `entry text has ${codePoints.length} code points, over the ${MAX_CODE_POINTS} limit`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry text is only white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry text must be a single line");
  }
}

function writeEntry(text: string, outputPath: string): void {
  validateEntryText(text);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
}

writeEntry(ENTRY_TEXT, OUTPUT_PATH);
