/*
  VSp!k feed: the reels and posts shown in the "From our feed" section.
  Newest first. Files live in website/assets/feed/.

  Sources are in marketing/ (reels/, instagram/batch-0X/, captions.md).
  Post images here are 720 px wide JPEG copies of the 1080 × 1350 PNGs so the page stays light.
  Captions are the Instagram captions from marketing/captions.md. Use \n for a line break.

  Reel fields:  title, video, poster, length, sound (true if it has its own audio), caption, tags
  Post fields:  title, series ("Funny" | "Subjects" | "Partners"), images (one = single post,
                several = carousel), caption, tags
*/
window.VSPIK_FEED = {
  reels: [
    {
      title: "POV: you asked for a website",
      video: "assets/feed/reel-02.mp4",
      poster: "assets/feed/reel-02-cover.jpg",
      length: "0:21",
      sound: true,
      caption: "POV: you asked an agency for a website 😴\nDay 1: kal pakka. Day 7: kal pakka. Day 30: kal pakka 🙃\n\nThen: Day 1 brief ✓ Day 3 working link ✓ Day 5 LIVE ✓\n\nWebsites · Online stores · Apps · AI · Data · Your codebase\nPune-based. Partners earn up to 15%.\n\nTag someone still waiting for “kal” 👇",
      tags: ["kalpakka", "pune", "punebusiness", "webdevelopment", "relatable"]
    },
    {
      title: "Built fast. Built properly.",
      video: "assets/feed/reel-01.mp4",
      poster: "assets/feed/reel-01-cover.jpg",
      length: "0:15",
      sound: false,
      caption: "Website kab tak? 🤔\nUsual answer: “kal pakka”.\nOur answer: Friday. In writing. ✅\n\nWebsites · E-commerce · Apps · AI · Data analytics · Automation · Software contribution\nPune-based, working across India. Partners earn up to 15%.",
      tags: ["punestartups", "webdevelopmentpune", "websitedesign", "smallbusinessindia"]
    }
  ],

  posts: [
    {
      title: "Newton's laws of client projects",
      series: "Funny",
      images: ["assets/feed/p1-1.jpg", "assets/feed/p1-2.jpg", "assets/feed/p1-3.jpg", "assets/feed/p1-4.jpg"],
      caption: "Newton never ran an agency. If he had, these would be his laws. 🍎\n\n1. A project at rest stays at rest until someone says “urgent”.\n2. F = m × “bas ek chhota sa change”.\n3. Every “can we just…” has an equal and opposite delay.\n\nWe break all three: one-page brief, fixed price, fixed date. Changes get quoted before we start.\n\nWhich law have you lived through? Comment 1, 2 or 3 👇",
      tags: ["webdesign", "smallbusinessindia", "startupindia", "physicsjokes"]
    },
    {
      title: "Bas ek chhota sa change",
      series: "Funny",
      images: ["assets/feed/p2-1.jpg", "assets/feed/p2-2.jpg", "assets/feed/p2-3.jpg", "assets/feed/p2-4.jpg", "assets/feed/p2-5.jpg"],
      caption: "Day 1: “bas ek chhota sa change.”\nDay 9: “saath mein ek app bhi bana do.”\n\nSwipe to watch a small change grow up. 😅\n\nChanges are welcome here. Each one gets a price and a date first, so your launch date doesn't quietly move.\n\nTag the friend who says “bas ek chhota sa” the most.",
      tags: ["clientstories", "webdeveloper", "indianbusiness", "relatable"]
    },
    {
      title: "Mitochondria",
      series: "Subjects",
      images: ["assets/feed/s1-biology.jpg"],
      caption: "The one fact everyone remembers from biology class. 🧬\n\nYour website is a cell too:\n🔴 Nucleus: your brand\n⚡ Mitochondria: fast hosting\n🛡️ Membrane: security\n💬 Ribosomes: the WhatsApp button that makes enquiries\n\nEvery part with a job. Nothing just for decoration.",
      tags: ["biologyjokes", "mitochondria", "webdesign", "sciencememes"]
    },
    {
      title: "Four versions of the truth",
      series: "Subjects",
      images: ["assets/feed/s5-statistics.jpg"],
      caption: "sales_final.xlsx\nsales_final_v2.xlsx\nsales_FINAL_final(1).xlsx\nuse_this_one.xlsx 😵\n\nFour versions of the truth. We clean your data and turn it into one dashboard your whole team trusts.\n\nData analytics · Power BI · Excel · AI insights",
      tags: ["dataanalytics", "powerbi", "excel", "dashboard"]
    },
    {
      title: "Mere bhatije ne banaya hai",
      series: "Funny",
      images: ["assets/feed/p3.jpg"],
      caption: "Every family has one. 👨‍💻\nThe nephew who made the website in 2019. It's still “under construction”.\n\nLove your nephew. Hire us for the website.",
      tags: ["desihumor", "smallbusiness", "websitedesign", "relatable"]
    },
    {
      title: "Kal pakka",
      series: "Funny",
      images: ["assets/feed/p4.jpg"],
      caption: "“Kal pakka ho jayega.” Every day for a week. 📅\n\nWe give you a date, and then we hit the date. Revolutionary, we know.",
      tags: ["kalpakka", "deadlines", "webdesign", "freelancerindia"]
    },
    {
      title: "Activation energy",
      series: "Subjects",
      images: ["assets/feed/s2-chemistry.jpg"],
      caption: "Chemistry class, but make it business. ⚗️\n\nActivation energy = the effort it takes to finally start that website you've been planning “next month” for two years.\n\nWe're the catalyst. Same result, a lot less energy.",
      tags: ["chemistryjokes", "catalyst", "procrastination", "entrepreneurindia"]
    },
    {
      title: "Limits",
      series: "Subjects",
      images: ["assets/feed/s3-maths.jpg"],
      caption: "lim (days → ∞) “kal pakka” = still kal 📐\n\nSome limits never converge. Our dates do.\n\nTag your maths friend. 😄",
      tags: ["mathsjokes", "mathmemes", "kalpakka", "engineeringlife"]
    },
    {
      title: "Opportunity cost",
      series: "Subjects",
      images: ["assets/feed/s4-economics.jpg"],
      caption: "MBA lesson in one picture. 📊\n\nA website costs you once.\nNo website costs you every day: customers who searched for you and found the shop next door.\n\nOpportunity cost never shows up on a bill. That's why it's the expensive one.",
      tags: ["mba", "economics", "opportunitycost", "smallbusinessindia"]
    },
    {
      title: "Partner programme",
      series: "Partners",
      images: ["assets/feed/p5.jpg"],
      caption: "Know someone who needs a website, an app or a dashboard? 🤝\n\nRefer them and earn 10% of the first project, or 15% plus 5% on renewals once you're a partner. Paid within 7 days of the client paying us.\n\nWhatsApp “Partner” to +91 90750 18192.",
      tags: ["referandearn", "freelancers", "partnerprogram", "sidehustle"]
    }
  ]
};
