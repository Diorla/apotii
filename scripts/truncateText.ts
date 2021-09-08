export default function truncateText(text: string, length = 160) {
  return text.length <= length ? text : text.slice(0, length);
}
