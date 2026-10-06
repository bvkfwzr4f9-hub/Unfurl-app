import type { ComponentType } from 'react';
import { ArticleStatCard } from '@/components/charts/ArticleStatCard';
import { CrossCulturalComparisonChart } from '@/components/charts/CrossCulturalComparisonChart';
import { PerimenopauseTimelineChart } from '@/components/charts/PerimenopauseTimelineChart';
import { HRTTrendChart } from '@/components/charts/HRTTrendChart';
import { SleepDonutChart } from '@/components/charts/SleepDonutChart';
import { MoodWindowChart } from '@/components/charts/MoodWindowChart';
import { HRTWindowChart } from '@/components/charts/HRTWindowChart';
import { EquolSplitChart } from '@/components/charts/EquolSplitChart';
import { SymptomIconGrid } from '@/components/charts/SymptomIconGrid';
import { TriggerIconGrid } from '@/components/charts/TriggerIconGrid';
import { RedFlagChecklist } from '@/components/charts/RedFlagChecklist';
import { CrisisResourceCard } from '@/components/charts/CrisisResourceCard';
import { VocabularyCards } from '@/components/charts/VocabularyCards';
import { ScriptBubble } from '@/components/charts/ScriptBubble';
import { BioidenticalCompare } from '@/components/charts/BioidenticalCompare';
import { OnsetComparisonChart } from '@/components/charts/OnsetComparisonChart';
import { stepCompletionId } from './contentLibrary';

interface ArticleVisual {
  /** The visual renders after this paragraph index in the step's body. */
  afterParagraph: number;
  Chart: ComponentType;
}

interface ArticleChartConfig {
  visuals: ArticleVisual[];
  /** Paragraph indices to skip rendering as prose because a visual above already represents them (the audio player still reads the full, untouched body text). */
  hideParagraphs?: number[];
}

/**
 * Optional data visuals for specific content-library steps, keyed the same
 * way as step completion ids. Most steps have none — these exist only where
 * a passage leans on numbers, a list, or a sequence that's genuinely easier
 * to take in visually than as prose (see the "Unfurl — Chart & Visual
 * Design Brief" this was designed against).
 */
const ARTICLE_CHARTS: Record<string, ArticleChartConfig> = {
  [stepCompletionId('recognition-validation', '1-3')]: {
    visuals: [{ afterParagraph: 0, Chart: SymptomIconGrid }],
    hideParagraphs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
  [stepCompletionId('recognition-validation', '1-5')]: {
    visuals: [{ afterParagraph: 2, Chart: CrossCulturalComparisonChart }],
  },
  [stepCompletionId('recognition-validation', '1-6')]: {
    visuals: [{ afterParagraph: 0, Chart: VocabularyCards }],
    hideParagraphs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  [stepCompletionId('mishandled-symptom-cluster', '1-2')]: {
    visuals: [
      {
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
    ],
  },
  [stepCompletionId('mishandled-symptom-cluster', '2-1')]: {
    visuals: [
      {
        afterParagraph: 0,
        Chart: () => (
          <ArticleStatCard items={[{ value: '2 in 3', label: 'women report brain fog during this transition' }]} />
        ),
      },
    ],
  },
  [stepCompletionId('mishandled-symptom-cluster', '2-2')]: {
    visuals: [
      {
        afterParagraph: 1,
        Chart: () => (
          <ArticleStatCard
            items={[{ value: '7 in 10', label: 'women experience musculoskeletal pain in perimenopause' }]}
          />
        ),
      },
    ],
  },
  [stepCompletionId('mishandled-symptom-cluster', '2-5')]: {
    visuals: [
      {
        afterParagraph: 1,
        Chart: () => (
          <ArticleStatCard items={[{ value: '~1 in 2', label: 'women experience palpitations during this transition' }]} />
        ),
      },
      { afterParagraph: 2, Chart: RedFlagChecklist },
    ],
  },
  [stepCompletionId('body-literacy', '3-3')]: {
    visuals: [{ afterParagraph: 0, Chart: PerimenopauseTimelineChart }],
  },
  [stepCompletionId('body-literacy', '3-6')]: {
    visuals: [{ afterParagraph: 1, Chart: OnsetComparisonChart }],
  },
  [stepCompletionId('mishandled-symptom-cluster', '2-4')]: {
    visuals: [{ afterParagraph: 1, Chart: SleepDonutChart }],
  },
  [stepCompletionId('nutrition', '5-2')]: {
    visuals: [{ afterParagraph: 2, Chart: EquolSplitChart }],
  },
  [stepCompletionId('nutrition', '5-4')]: {
    visuals: [
      {
        afterParagraph: 1,
        Chart: () => (
          <ArticleStatCard
            items={[{ value: '~42% lower', label: 'insulin sensitivity in perimenopause vs. premenopause' }]}
          />
        ),
      },
    ],
  },
  [stepCompletionId('nutrition', '5-5')]: {
    visuals: [{ afterParagraph: 1, Chart: TriggerIconGrid }],
  },
  [stepCompletionId('sexual-health', '7-3')]: {
    visuals: [{ afterParagraph: 2, Chart: ScriptBubble }],
  },
  [stepCompletionId('mental-emotional-health', '8-1')]: {
    visuals: [
      { afterParagraph: 1, Chart: MoodWindowChart },
      { afterParagraph: 5, Chart: CrisisResourceCard },
    ],
  },
  [stepCompletionId('mental-emotional-health', '8-2')]: {
    visuals: [{ afterParagraph: 6, Chart: CrisisResourceCard }],
  },
  [stepCompletionId('mental-emotional-health', '8-3')]: {
    visuals: [{ afterParagraph: 4, Chart: CrisisResourceCard }],
  },
  [stepCompletionId('hrt-education', '10-1')]: {
    visuals: [{ afterParagraph: 3, Chart: HRTTrendChart }],
  },
  [stepCompletionId('hrt-education', '10-2')]: {
    visuals: [{ afterParagraph: 1, Chart: HRTWindowChart }],
  },
  [stepCompletionId('hrt-education', '10-3')]: {
    visuals: [{ afterParagraph: 0, Chart: BioidenticalCompare }],
  },
};

export function getArticleChart(sectionSlug: string, stepId: string): ArticleChartConfig | undefined {
  return ARTICLE_CHARTS[stepCompletionId(sectionSlug, stepId)];
}

/**
 * The crisis resource card must be visible even when the section is
 * paywall-locked — never gate 988 behind membership. ContentStepScreen
 * checks this before deciding whether to show the full PremiumLock.
 */
export function getAlwaysVisibleChart(sectionSlug: string, stepId: string): ComponentType | undefined {
  if (sectionSlug === 'mental-emotional-health' && (stepId === '8-1' || stepId === '8-2' || stepId === '8-3')) {
    return CrisisResourceCard;
  }
  return undefined;
}
