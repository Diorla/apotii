export function selectWithOdds<T>(items: T[], odds: number[]): T {
  const total = odds.reduce((prev, curr) => prev + curr, 0);
  const randValue = Math.random() * total;
  let cumulative = 0;
  for (const i in items) {
    cumulative += odds[i];
    if (randValue <= cumulative) return items[i];
  }
  return items[items.length - 1];
}

export default function select<T>(items: T[], odds?: number[]): T {
  if (odds) return selectWithOdds(items, odds);
  const randIdx = Math.floor(Math.random() * items.length);
  return items[randIdx];
}
