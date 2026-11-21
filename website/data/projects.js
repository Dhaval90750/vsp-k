/*
  VSp!k projects: add one object per project. The "Work" section builds itself from this list.
  While the list is empty, the site shows an honest "case studies in progress" note instead.

  Rules (docs/00-quality-framework.md §7):
  - Real client work only with the client's permission.
  - Demo or practice builds must use kind: "Concept".
  - Screenshots must come from the real, working build. With no screenshot,
    the card shows a plain browser frame with the domain name instead.

  Fields: title, client, kind ("Client project" | "Concept"), field, year,
  status (optional, e.g. "Launching soon"), summary, result (optional, real only),
  tags, image (optional, path under website/assets/work/), domain (shown in the frame),
  link (optional live URL).
*/
window.VSPIK_PROJECTS = [
  {
    title: "The Mobile Factory",
    client: "Refurbished smartphone seller",
    kind: "Client project",
    field: "E-commerce",
    year: 2026,
    status: "Live",
    summary: "Online store and full back office for refurbished smartphones across 10 brands. Every listing shows its minimum battery health, with a 6-month warranty, 7-day returns and free delivery across India. Staff track each device by IMEI from purchase to after-sales.",
    tags: ["WordPress", "WooCommerce", "PhonePe Gateway", "Shiprocket", "IMEI Tracking", "GST invoices"],
    image: "assets/work/mobilesfactory.png",
    domain: "mobilesfactory.in",
    link: "https://mobilesfactory.in"
  },
  {
    title: "Hotel Balaji Holiday Home",
    client: "Hotel in Poladpur, Raigad",
    kind: "Client project",
    field: "Hospitality",
    year: 2026,
    status: "Live",
    summary: "Website for a hotel on NH66 in Poladpur: room search by dates and guests, rooms and suites, offers, events and a guest login, with direct contact for enquiries.",
    tags: ["Hotel website", "Room search", "Events", "Guest login"],
    image: "assets/work/balaji-holiday-home.png",
    domain: "balajihoildayhome.com",
    link: "https://balajihoildayhome.com/"
  }
];
