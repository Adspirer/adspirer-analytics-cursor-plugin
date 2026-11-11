---
name: adspirer-analytics-conversion-tracking
description: "Audit and grade conversion tracking across Google, Meta, LinkedIn and other channels plus GA4, Tag Manager and the Meta Pixel. Use when the user asks whether tracking is set up correctly, why conversions show zero, or whether a pixel or tag is firing. Read-only; it changes no tags."
---

# Conversion-tracking audit

Load adspirer-analytics-tools. Use audit_conversion_tracking to inspect how conversions are being
tracked across the user's connected channels and grade the setup; it renders an interactive card.
Everything here is read-only — it reads configuration, it does not create, fix or change a tag,
pixel or conversion action.

Where it helps, corroborate with reads: google_tag_manager to see which pixels and tags are
actually installed and configured, google_analytics for GA4 key events and conversions, and the
per-platform routers for each platform's conversion actions and reported conversions. A tag that
exists in GTM is not proof it fires correctly; a platform that reports zero conversions may be a
tracking gap rather than zero demand — distinguish the two.

Report what is tracked, what looks misconfigured or missing, and the concrete gap for each channel,
with the evidence you read. When you recommend a fix, make clear the user applies it in their own
tools (GTM, the ad platform, their site) — this connector cannot apply it. Do not claim a tracking
issue is resolved; it can only be verified by a later read after the user changes something.
