import { brandColors } from './brand'

/** Design tokens — DS Dental Aesthetics */
export const tokens = {
  touchTargetMin: 44,
  focusRing: `0 0 0 3px ${brandColors.white}, 0 0 0 5px ${brandColors.gold}`,
  focusRingInset: `inset 0 0 0 2px ${brandColors.gold}`,
  transitionFast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  transitionBase: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  transitionSlow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  contentMaxWidth: '75rem',
  headerHeight: { mobile: 64, desktop: 72 },
  elevation: {
    card: '0 4px 24px rgba(74, 85, 104, 0.08)',
    header: '0 1px 0 rgba(74, 85, 104, 0.08)',
    dialog: '0 24px 48px rgba(55, 65, 81, 0.18)',
  },
} as const
