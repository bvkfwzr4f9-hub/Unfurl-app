# Unfurl — Content Writing Guidelines

Guidance for writing or editing content in `src/data/contentLibrary.ts` and
similar member-facing copy.

## Don't carry over research-methodology phrasing into narrative copy

When citing a stat from a research study, describe what the finding *means*,
not the literal survey instrument used to collect it. Phrases like "in the
past two weeks" or "in the prior month" are recall-window language from a
study's survey question — accurate to how the data was gathered, but
confusing when quoted directly in reader-facing copy, since it reads as if
the timeframe is relative to when the member is reading the app right now,
rather than to whenever the original study was actually conducted (often
years earlier).

- Bad: "only about 1 in 10 Japanese women reported a hot flash in the prior
  two weeks"
- Good: "only about 1 in 10 Japanese women said they had recently
  experienced a hot flash"

Same rule for any UI label summarizing a stat (e.g. a chart eyebrow) — avoid
literal recall-window text like "PAST 2 WEEKS"; describe the finding
instead (e.g. "RECENT HOT FLASHES REPORTED").

This isn't about hiding the timeframe — it's about not making a research
methodology detail sound like a claim about "right now."
