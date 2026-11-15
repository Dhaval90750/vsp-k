/*
  VSp!k projects: add one object per project. The "Work" section builds itself from this list.
  While the list is empty, the site shows an honest "case studies in progress" note instead.

  Rules (docs/00-quality-framework.md §7):
  - Real client work only with the client's permission.
  - Demo or practice builds must use kind: "Concept".
  - Screenshots must come from the real, working build.

  Example:
  {
    title: "Online bakery store",
    client: "Client name (or 'A Nashik bakery' if they prefer to stay anonymous)",
    kind: "Client project",              // or "Concept"
    field: "E-commerce",
    year: 2026,
    summary: "One or two plain sentences: the problem and what we built.",
    result: "Optional: one real, checkable result.",
    tags: ["Next.js", "Razorpay", "Admin panel"],
    image: "assets/work/bakery-store.webp", // put screenshots in website/assets/work/
    link: "https://example.com"            // optional live link
  }
*/
window.VSPIK_PROJECTS = [
];
