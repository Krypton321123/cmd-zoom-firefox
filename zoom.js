(function () {
  // Current zoom level (1.0 = 100%)
  let zoomLevel = 1.0;
  const ZOOM_STEP = 0.1;
  const ZOOM_MIN = 0.3;
  const ZOOM_MAX = 5.0;

  window.addEventListener(
    "wheel",
    function (e) {
      // metaKey = Cmd on Mac, ctrlKey = Ctrl on Windows/Linux
      if (!e.metaKey && !e.ctrlKey) return;

      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY < 0) {
        // Scroll up → zoom in
        zoomLevel = Math.min(ZOOM_MAX, zoomLevel + ZOOM_STEP);
      } else {
        // Scroll down → zoom out
        zoomLevel = Math.max(ZOOM_MIN, zoomLevel - ZOOM_STEP);
      }

      // Round to avoid floating point drift
      zoomLevel = Math.round(zoomLevel * 100) / 100;

      document.documentElement.style.zoom = zoomLevel;
    },
    { passive: false, capture: true }
  );

  // Cmd+0 resets zoom back to 100%
  window.addEventListener(
    "keydown",
    function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "0") {
        zoomLevel = 1.0;
        document.documentElement.style.zoom = 1.0;
      }
    },
    { capture: true }
  );
})();