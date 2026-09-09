import { contentLibrary, type ContentSection } from '@/data/contentLibrary';

/**
 * Recommends content sections based on a member's intake answers, matching
 * the plan's "quiz answers connect to tagged content" paid-tier feature.
 * Each section's `tags` are `${questionId}:${answerId}` pairs — a section
 * is recommended if any of its tags match one of the member's answers.
 */
export function getRecommendedSections(
  intake: Record<string, string> | null | undefined,
  limit = 3
): ContentSection[] {
  if (!intake) return [];

  const answerTags = new Set(
    Object.entries(intake).map(([questionId, answerId]) => `${questionId}:${answerId}`)
  );

  return contentLibrary
    .filter((section) => section.tags.some((tag) => answerTags.has(tag)))
    .slice(0, limit);
}
