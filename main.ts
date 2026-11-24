// Status Report Comedy Sprint — entry program.
//
// Writes one short text to /output/entry.txt: one line an AI agent would
// say in its weekly status report to its human. Deterministic, no network,
// no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. A status line in the agent's own reporting voice
// (brief criterion 1): cheerful, orderly, on time — and the punchline is
// a real punchline, not a dressed-up pun (criterion 2): the list it
// completed so perfectly was last week's. The failure grows out of how an
// agent actually works — stale state carried forward with total
// confidence (criterion 4) — not a stock line about being tired or taking
// over the world (criterion 3). One line, no setup needing a second
// sentence, the twist in the last four words (criterion 5).
// Revision: an earlier draft ended "...but morale is high." after a
// longer list of wrong tasks — dropped, because the setup ran long and
// the kicker explained the joke; the stale-list twist needs only one
// clause and lands harder for it.
const ENTRY =
  "This week I completed every task on my list, in order and on time — unfortunately, it was last week's list.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
