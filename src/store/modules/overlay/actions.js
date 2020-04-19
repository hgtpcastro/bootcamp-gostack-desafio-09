export function openOverlay(content) {
  return {
    type: '@overlay/OPEN',
    payload: content,
  };
}

export function closeOverlay() {
  return {
    type: '@overlay/CLOSE',
    payload: null,
  };
}
