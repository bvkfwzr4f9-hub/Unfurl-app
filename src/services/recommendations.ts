import { contentLibrary, isStepCompleted, type ContentSection, type ContentStepType } from '@/data/contentLibrary';

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

export interface PlanItem {
  sectionSlug: string;
  sectionTitle: string;
  sectionEmoji: string;
  stepId: string;
  stepTitle: string;
  stepType: ContentStepType;
}

/**
 * "Your Plan" — a short, ordered list of concrete next actions (not whole
 * sections) built from the member's recommended sections. Each recommended
 * section contributes at most its next incomplete step, so the plan always
 * points at something immediately actionable and shrinks/reshuffles as the
 * member makes progress — an evolving roadmap rather than a static list.
 * A fully-finished recommended section contributes nothing and is skipped.
 */
export function getYourPlan(
  intake: Record<string, string> | null | undefined,
  completedSteps: string[],
  limit = 4
): PlanItem[] {
  const candidateSections = getRecommendedSections(intake, contentLibrary.length);
  const items: PlanItem[] = [];

  for (const section of candidateSections) {
    const nextStep = section.steps.find(
      (step) => !isStepCompleted(completedSteps, section.slug, step.id)
    );
    if (nextStep) {
      items.push({
        sectionSlug: section.slug,
        sectionTitle: section.title,
        sectionEmoji: section.emoji,
        stepId: nextStep.id,
        stepTitle: nextStep.title,
        stepType: nextStep.type,
      });
    }
    if (items.length >= limit) break;
  }

  return items;
}
