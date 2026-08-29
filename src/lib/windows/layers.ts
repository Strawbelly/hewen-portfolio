export function bringToFront(activeIds: string[], id: string) {
  return [...activeIds.filter((activeId) => activeId !== id), id];
}
