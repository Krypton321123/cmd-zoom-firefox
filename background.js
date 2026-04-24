const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 3.0;

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type !== "zoom") return;

  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  if (message.direction === "reset") {
    await browser.tabs.setZoom(tab.id, 1.0);
    return;
  }

  const current = await browser.tabs.getZoom(tab.id);
  let next = message.direction === "in"
    ? current + ZOOM_STEP
    : current - ZOOM_STEP;

  next = Math.round(next * 100) / 100;
  next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));

  await browser.tabs.setZoom(tab.id, next);
});