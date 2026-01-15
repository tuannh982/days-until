'use client';

import { useState, useEffect } from 'react';

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

interface CountdownDisplayProps {
    targetDate: Date;
    dateLabel: string;
}

export function CountdownDisplay({ targetDate, dateLabel }: CountdownDisplayProps) {
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
        calculateTimeRemaining(targetDate)
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { value: timeRemaining.days, label: 'Days' },
        { value: timeRemaining.hours, label: 'Hours' },
        { value: timeRemaining.minutes, label: 'Minutes' },
        { value: timeRemaining.seconds, label: 'Seconds' },
    ];

    return (
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-7xl mx-auto px-4">
            {/* "There are" heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-600 italic text-center">
                There are
            </h1>

            {/* Countdown grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full place-items-center">
                {timeUnits.map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center w-full max-w-[200px] md:max-w-none">
                        <div className="@container w-full aspect-square flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Number card */}
                            <div className="h-2/3 w-full flex justify-center items-center bg-white">
                                <span className="text-[44cqw] font-bold text-gray-900 leading-none">
                                    {String(unit.value).padStart(2, '0')}
                                </span>
                            </div>
                            {/* Label */}
                            <div className="h-1/3 w-full flex justify-center items-center bg-gray-800">
                                <span className="text-[22cqw] font-medium text-white leading-none">
                                    {unit.label}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* "to [Date]!" */}
            <div className="text-center mt-4 md:mt-8">
                <span className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-600 italic block mb-2">to</span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800">
                    {dateLabel}!
                </h2>
            </div>
        </div>
    );
}
