import type { ComponentType } from 'react';
import { ArticleStatCard } from '@/components/charts/ArticleStatCard';
import { CrossCulturalComparisonChart } from '@/components/charts/CrossCulturalComparisonChart';
import { PerimenopauseTimelineChart } from '@/components/charts/PerimenopauseTimelineChart';
import { HRTTrendChart } from '@/components/charts/HRTTrendChart';
import { stepCompletionId } from './contentLibrary';

interface ArticleChart {
  /** The chart renders after this paragraph index in the step's body. */
  afterParagraph: number;
  Chart: ComponentType;
}

/**
 * Optional data visuals for specific content-library steps, keyed the same
 * way as step completion ids. Most steps have none — these exist only where
 * a passage leans on numbers or a sequence that's genuinely easier to take
 * in as a chart than as prose (see the "Unfurl — Chart & Visual Design
 * Brief" this was designed against).
 */
const ARTICLE_CHARTS: Record<string, ArticleChart> = {
  [stepCompletionId('recognition-validation', '1-5')]: {
    afterParagraph: 2,
    Chart: CrossCulturalComparisonChart,
  },
  [stepCompletionId('mishandled-symptom-cluster', '1-2')]: {
    afterParagraph: 4,
    Chart: () => (
      <ArticleStatCard
        items={[
          { value: '~40%', label: 'feel dismissed or misdiagnosed' },
          { value: '<1 in 5', label: 'PCPs have menopause training' },
          { value: '$26B', label: 'lost annually to untreated symptoms' },
        ]}
      />
    ),
  },
  [stepCompletionId('mishandled-symptom-cluster', '2-1')]: {
    afterParagraph: 1,
    Chart: () => (
      <ArticleStatCard items={[{ value: '2 in 3', label: 'women report brain fog during this transition' }]} />
    ),
  },
  [stepCompletionId('mishandled-symptom-cluster', '2-2')]: {
    afterParagraph: 1,
    Chart: () => (
      <ArticleStatCard items={[{ value: '7 in 10', label: 'women experience musculoskeletal pain in perimenopause' }]} />
    ),
  },
  [stepCompletionId('mishandled-symptom-cluster', '2-5')]: {
    afterParagraph: 1,
    Chart: () => (
      <ArticleStatCard items={[{ value: '~1 in 2', label: 'women experience palpitations during this transition' }]} />
    ),
  },
  [stepCompletionId('body-literacy', '3-3')]: {
    afterParagraph: 0,
    Chart: PerimenopauseTimelineChart,
  },
  [stepCompletionId('nutrition', '5-4')]: {
    afterParagraph: 0,
    Chart: () => (
      <ArticleStatCard
        items={[{ value: '~42% lower', label: 'insulin sensitivity in perimenopause vs. premenopause' }]}
      />
    ),
  },
  [stepCompletionId('hrt-education', '10-1')]: {
    afterParagraph: 3,
    Chart: HRTTrendChart,
  },
};

export function getArticleChart(sectionSlug: string, stepId: string): ArticleChart | undefined {
  return ARTICLE_CHARTS[stepCompletionId(sectionSlug, stepId)];
}
