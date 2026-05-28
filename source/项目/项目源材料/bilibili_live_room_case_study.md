Live streaming System design

# Rebuilding Bilibili's live room framework

How I restructured the interaction zone, top information bar, and guidance system across the live room — driving simultaneous gains in engagement, watch time, and monetization

Revenue (interaction zone)

+2.58%

Revenue (top bar)

+3.18%

Game card CTR

+1pp

Watch time

positive

Context

Bilibili's live room had grown through years of fast-paced feature addition, with different teams shipping independently and without shared standards. By 2023, the accumulated complexity had created three compounding problems: degraded user experience, high cost of integrating new features, and insufficient efficiency of commercial resource placements.

This project was a full structural intervention — not a visual refresh. The goal was to redesign the product architecture, establish functional governance standards, and remediate historical technical debt, with the explicit targets of reducing user cost, improving resource efficiency, and improving cross-team execution speed.

Problem framing

Three structural failure modes drove the project scope:

Interaction zone: competing signals, no hierarchy

Gift effects, bullet comments, and engagement prompts occupied the same visual space with no clear priority order. Users couldn't establish stable reading or interaction patterns — each frame was unpredictable. The root cause wasn't the number of elements, but the absence of a Z-axis rule that defined which layer was authoritative at any moment.

Top bar: information density without structure

The top area of the live room had expanded organically over time. It held streamer info, room metadata, and engagement entry points — but without a structured expansion model, adding a third row was either impossible or required ad-hoc workarounds per feature team.

Guidance components: fragmented and redundant

Calls-to-action for following, sharing, liking, and commercial content had no unified placement logic. Multiple components competed for the same bottom-right zone, creating choice paralysis and undermining each other's conversion rate.

Three workstreams

01 · Interaction zone

XYZ-axis reconstruction

Established explicit layering rules for the interaction zone across X (horizontal), Y (vertical), and Z (depth/overlay) axes. Gift effects — the highest-value content — were anchored at the primary layer with a visual separator. Bullet comments occupied the secondary layer with governed scroll velocity. Engagement prompts were demoted to the tertiary layer and made trigger-based rather than persistent. The result was a predictable visual environment where users could read and react without cognitive disruption.

+1.55%

Avg. bullet comments per user

+2.58%

Organic paid revenue

02 · Top information bar

Structural expansion model

Designed a scalable three-row model for the top area of the live room — separating streamer identity, room context, and viewer engagement into distinct structural zones. This enabled a third row to be introduced cleanly without disrupting existing rows, and gave downstream teams a clear integration surface. The new row carried viewer-engagement entry points that had previously been buried or absent.

+1.14%

Avg. bullet comments per user

+3.77%

Avg. likes per user

+0.16%

Avg. watch time per user

+3.18%

Organic paid revenue

03 · Guidance components

Zone governance and conversion design

Defined a governance model for the bottom interaction zone: one primary commercial unit, one primary engagement prompt, with explicit rules for priority and mutual exclusion. Eliminated the competing-component problem by establishing which content type owned the zone at any given moment. Applied to gaming content specifically, where the mismatch between content and commercial offer had been most severe.

+1pp

Game card click-through rate

positive

All other monitored metrics

Other work in this period

Lottery widget redesign (天选福袋)

Redesigned the lottery overlay to reduce screen obstruction, strengthen brand identity, and lower participation friction — one-tap entry, auto-expand on launch, auto-complete task flow.

Active participation rate >40% · +5pp vs. prior version

S15 bullet comment anti-occlusion

Ported the main-site bullet comment occlusion-prevention model to the esports live room for the S15 League of Legends World Championship — protecting streamer face from comment overlap under extreme concurrency.

Mobile penetration 22.6% · PC penetration 33%

Bullet comment length expansion

Extended the character limit to 40 characters to explore the role of longer comments in live interaction. Hypothesis: deeper comments strengthen relational ties and have a monetization signal.

Followers +0.26% · Paid revenue +3.13%

Mobile streaming tool (pre-live UX)

Optimized the pre-live configuration page for mobile: surfaced essential controls, restructured priority by usage patterns, added task/support/activity entry points, and reduced permission friction for new streamers.

New streamer start success rate +1.79pp · Widget UV CTR +2pp

What this project taught me

The central insight was that the live room's problems were **structural, not cosmetic**. Every feature had been added correctly in isolation — the failure was the absence of a shared architecture that told teams where things belonged. Establishing the XYZ-axis model and the zone governance rules didn't just fix existing problems; it gave every subsequent feature team a stable integration surface to work from.

The revenue results — +2.58% and +3.18% organic paid revenue from two separate experiments — were not caused by any change to monetization mechanics. They emerged entirely from reducing the cognitive friction that stood between a viewer's emotional response and the action of tipping. This reinforces a principle I've seen across every live streaming project: **social experience and monetization are not separate systems**. One is the precondition of the other.