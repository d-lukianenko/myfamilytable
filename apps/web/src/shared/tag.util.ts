export type Tag =
    | 'breakfast'
    | 'lunch'
    | 'dinner'
    | 'snack'
    | 'side'
    | 'quick'
    | 'easy'
    | 'make-ahead'
    | 'extra-time';

export type TagCategory = 'meal' | 'time-effort';

export const TAG_CATEGORY: Record<Tag, TagCategory> = {
    breakfast: 'meal',
    lunch: 'meal',
    dinner: 'meal',
    snack: 'meal',
    side: 'meal',
    easy: 'time-effort',
    quick: 'time-effort',
    'make-ahead': 'time-effort',
    'extra-time': 'time-effort',
};

const CLASS_MEAL = 'bg-emerald-50 text-emerald-700';
const CLASS_TIME_EFFORT = 'bg-rose-50 text-rose-800';
const CLASS_FALLBACK = 'bg-gray-100 text-gray-600';

export function normalizeTag(raw: string): Tag | null {
    const t = raw.trim().toLowerCase();
    const allowed = new Set<Tag>([
        'breakfast', 'lunch', 'dinner', 'snack', 'side',
        'easy', 'quick', 'make-ahead', 'extra-time',
    ]);
    return allowed.has(t as Tag) ? (t as Tag) : null;
}

export function getTagClasses(tag: string): string {
    const normalized = normalizeTag(tag);
    if (!normalized) return CLASS_FALLBACK;

    switch (TAG_CATEGORY[normalized]) {
        case 'meal': return CLASS_MEAL;
        case 'time-effort': return CLASS_TIME_EFFORT;
        default: return CLASS_FALLBACK;
    }
}

