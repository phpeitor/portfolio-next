export function getCurrentQuarter(date = new Date()): string {
  return `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`
}
