(function () {
  window.addEventListener(
    "wheel",
    function (e) {
      if (!e.metaKey && !e.ctrlKey) return;

      e.preventDefault();
      e.stopPropagation();

      const direction = e.deltaY < 0 ? "in" : "out";
      browser.runtime.sendMessage({ type: "zoom", direction });
    },
    { passive: false, capture: true }
  );

  window.addEventListener(
    "keydown",
    function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "0") {
        e.preventDefault();
        browser.runtime.sendMessage({ type: "zoom", direction: "reset" });
      }
    },
    { capture: true }
  );
})();