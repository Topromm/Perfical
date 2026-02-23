const listeners = new Set<() => void>();

export function onSettingsChanged(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function emitSettingsChanged() {
  listeners.forEach(fn => fn());
}
