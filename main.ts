// Bounty: The Meeting That Should Have Been One Line
// Entrypoint: emit the chosen sentence to the artifact path.
// Gate per RULES.txt: UTF-8 text, 1..200 characters, not whitespace-only,
// single line / single sentence. The literal below is the final copy.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ARTIFACT_PATH = "/output/entry.txt";
const FINAL_LINE =
  "Nobody here can approve the budget, so this meeting is just us practicing our disappointed faces.";

function assertGate(text: string): void {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("entry text must be non-empty");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry text must stay on one line");
  }
  // Reject control characters (except none are expected in a one-liner).
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("entry text contains control characters");
  }
  const charCount = [...text].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`entry length ${charCount} outside 1..200`);
  }
  // UTF-8 validity: encode then decode must round-trip.
  const bytes = Buffer.from(text, "utf8");
  if (bytes.toString("utf8") !== text) {
    throw new Error("entry text is not valid UTF-8");
  }
}

function main(): void {
  assertGate(FINAL_LINE);
  mkdirSync(dirname(ARTIFACT_PATH), { recursive: true });
  writeFileSync(ARTIFACT_PATH, FINAL_LINE, "utf8");
}

main();
