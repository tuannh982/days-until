import * as chrono from 'chrono-node';

/**
 * Parse a natural language date string using chrono-node
 * @param input - Natural language date string (e.g., "next friday", "feb 4", "2026-02-15")
 * @returns Parsed Date object or null if parsing fails
 */
export function parseDate(input: string): Date | null {
    const results = chrono.parse(input);
    if (results.length === 0) return null;
    return results[0].start.date();
}

/**
 * Format a date to YYYY-MM-DD string for URL parameter
 */
export function formatDateForUrl(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Parse a YYYY-MM-DD string to Date object
 */
export function parseDateFromUrl(dateString: string): Date | null {
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const [, year, month, day] = match;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

/**
 * Get ordinal suffix for a day number (st, nd, rd, th)
 */
function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

/**
 * Format date for display (e.g., "February 4th" or "February 4th, 2027" if year differs from current)
 */
export function formatDateForDisplay(date: Date): string {
    const currentYear = new Date().getFullYear();
    const targetYear = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const ordinalDay = `${day}${getOrdinalSuffix(day)}`;

    if (targetYear !== currentYear) {
        return `${month} ${ordinalDay}, ${targetYear}`;
    }

    return `${month} ${ordinalDay}`;
}
