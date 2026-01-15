'use client';

import { CountdownGrid } from './countdown-grid';

interface CountdownDisplayProps {
    targetDate: Date;
    dateLabel: string;
}

export function CountdownDisplay({ targetDate, dateLabel }: CountdownDisplayProps) {
    // Check if the date has already passed
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    const isPast = difference <= 0;

    // If the date has already passed, show a different message
    if (isPast) {
        return (
            <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-7xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-600 italic text-center">
                    The date
                </h1>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 text-center">
                    {dateLabel}
                </h2>
                <span className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-600 italic">
                    has already passed!
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-7xl mx-auto px-4">
            {/* "There are" heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-600 italic text-center">
                There are
            </h1>

            {/* Countdown grid */}
            <CountdownGrid targetDate={targetDate} />

            {/* "to" */}
            <span className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-600 italic">to</span>

            {/* Date label */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 text-center">
                {dateLabel}!
            </h2>
        </div>
    );
}
