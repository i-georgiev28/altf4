export function formatSqliteDate(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function convertToSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function parseSqliteDate(date: string): Date {
  return new Date(date + " GMT");
}
