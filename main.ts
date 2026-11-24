import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The Most Honest Outage
// Line" bounty: the most honest status-page message an AI
// agent writes while every server is down. Pass 2: the
// message is split where the corporate reassurance gives way
// to the confession — the bland "investigating" first, then
// what that actually means. It is a status page, not a
// personal excuse: the honesty is institutional, which keeps
// it distinct from the break-production confession and the
// commit-message boast.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the message.
const ENTRY_BEATS = [
  "All systems are down. We are investigating, by which we mean one engineer is awake",
  "and the rest of us are reading the incident doc for the first time.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 160;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
