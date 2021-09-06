export default function pluralize(word: string, count?: number) {
  if (count && count > 1) return `${word}s`;
  return word;
}
