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
 * Format date for display (e.g., "4 February")
 */
export function formatDateForDisplay(date: Date): string {
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
    });
}
