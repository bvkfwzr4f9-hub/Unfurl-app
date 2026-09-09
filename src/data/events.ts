/**
 * Upcoming virtual events. `zoomUrl` is a placeholder until real recurring
 * meetings are scheduled — swap in real Zoom links (or move this list to
 * Firestore) when they exist.
 */

export interface VirtualEvent {
  id: string;
  title: string;
  dateLabel: string;
  description: string;
  zoomUrl: string;
}

export const upcomingEvents: VirtualEvent[] = [
  {
    id: 'welcome-circle',
    title: 'Welcome Circle',
    dateLabel: 'First Tuesday of every month, 6pm ET',
    description:
      'A casual live intro to Unfurl and a chance to meet others just starting this transition.',
    zoomUrl: 'REPLACE_ME',
  },
  {
    id: 'ask-me-anything',
    title: 'Ask Me Anything: Sleep & Hot Flashes',
    dateLabel: 'Third Thursday of every month, 7pm ET',
    description: 'Live Q&A on the two most-asked-about topics in the community.',
    zoomUrl: 'REPLACE_ME',
  },
];
