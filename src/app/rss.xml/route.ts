import { NextResponse } from "next/server";

export async function GET() {
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Pakistan Strategic Forum (PSF)</title>
  <link>https://forumstrategic.com</link>
  <description>Authoritative strategic intelligence, defence analysis, and academic research papers on South Asian security.</description>
  <language>en-gb</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="https://forumstrategic.com/rss.xml" rel="self" type="application/rss+xml" />

  <item>
    <title>Modernising the Shield: Evaluating Pakistan's Integrated Air Defence Architecture</title>
    <link>https://forumstrategic.com/articles/pakistan-integrated-air-defence-modernisation-multi-tier-shield</link>
    <description>An exhaustive technical assessment of multi-tier airspace denial along the eastern border.</description>
    <category>Defence</category>
    <pubDate>Wed, 16 Oct 2026 05:00:00 GMT</pubDate>
    <guid>https://forumstrategic.com/articles/pakistan-integrated-air-defence-modernisation-multi-tier-shield</guid>
  </item>

  <item>
    <title>The South Asian Military Balance: Conventional Disparity and Asymmetric Countermeasures (2026-2030)</title>
    <link>https://forumstrategic.com/reports/south-asian-military-balance-conventional-disparity-2026-2030</link>
    <description>Monograph PSF-R-2026-004 evaluating conventional military balance, missile inventories, and force posture adjustments.</description>
    <category>Special Report</category>
    <pubDate>Tue, 15 Oct 2026 11:00:00 GMT</pubDate>
    <guid>https://forumstrategic.com/reports/south-asian-military-balance-conventional-disparity-2026-2030</guid>
  </item>

  <item>
    <title>Second-Strike Endurance: Sea-Based Deterrence and Pakistan's Evolving Nuclear Triad</title>
    <link>https://forumstrategic.com/articles/second-strike-endurance-naval-triad</link>
    <description>Evaluating Hangor-class submarine AIP endurance and deterrence stabilization in the Indian Ocean.</description>
    <category>Defence</category>
    <pubDate>Mon, 28 Sep 2026 08:30:00 GMT</pubDate>
    <guid>https://forumstrategic.com/articles/second-strike-endurance-naval-triad</guid>
  </item>
</channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
