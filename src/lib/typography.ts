// Curly quotes and apostrophes for frontmatter text, matching what Markdown
// does for body text: I'm -> I’m, "The Firm" -> “The Firm”.
export function smartQuotes(text: string): string {
  return text
    .replace(/(^|[\s([{—–-])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s([{“—–-])'/g, '$1‘')
    .replace(/'/g, '’');
}
