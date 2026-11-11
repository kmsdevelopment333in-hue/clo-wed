// Officemail static demo — interaction helpers + PWA wiring
// Register service worker (silent no-op when opened from file://)
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-target]");
  if (!t) return;
  const target = document.querySelector(t.getAttribute("data-target"));
  if (target) {
    document.querySelectorAll(".sidebar a[data-target]").forEach((a) => a.classList.remove("active"));
    t.classList.add("active");
    document.querySelectorAll("[data-page]").forEach((s) => s.classList.add("hidden"));
    target.classList.remove("hidden");
    window.scrollTo(0, 0);
  }
  if (window.innerWidth <= 900) {
    const sb = document.querySelector(".sidebar");
    if (sb) sb.classList.remove("open");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".sidebar-toggle")) {
    const sb = document.querySelector(".sidebar");
    if (sb) sb.classList.toggle("open");
    return;
  }
  // tap outside closes the mobile drawer
  if (window.innerWidth <= 900 && document.querySelector(".sidebar.open") &&
      !e.target.closest(".sidebar")) {
    document.querySelector(".sidebar").classList.remove("open");
  }
  // landing page hamburger menu
  const menuBtn = e.target.closest(".menu-toggle");
  if (menuBtn) {
    document.querySelector(".topbar").classList.toggle("menu-open");
    return;
  }
  const topbar = document.querySelector(".topbar.menu-open");
  if (topbar && !e.target.closest(".topbar")) topbar.classList.remove("menu-open");
  if (topbar && e.target.closest(".topbar .nav a")) topbar.classList.remove("menu-open");
});
