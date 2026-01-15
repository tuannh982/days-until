'use client';

import { useState, useEffect } from 'react';

interface TimeUnit {
    value: number;
    label: string;
}

interface TimeRemaining {
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
        return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const remainingDays = totalDays % 365;

    return {
        years,
        days: remainingDays,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

function TimeCard({ unit }: { unit: TimeUnit }) {
    return (
        <div className="flex flex-col items-center w-full max-w-[200px] md:max-w-none">
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
    );
}

interface CountdownGridProps {
    targetDate: Date;
}

export function CountdownGrid({ targetDate }: CountdownGridProps) {
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
        calculateTimeRemaining(targetDate)
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    // Calculate total days to determine if we should show years
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const showYears = totalDays >= 365;

    const timeUnitsWithYears: TimeUnit[] = [
        { value: timeRemaining.years, label: 'Years' },
        { value: timeRemaining.days, label: 'Days' },
        { value: timeRemaining.hours, label: 'Hours' },
        { value: timeRemaining.minutes, label: 'Minutes' },
        { value: timeRemaining.seconds, label: 'Seconds' },
    ];

    const timeUnitsWithoutYears: TimeUnit[] = [
        { value: totalDays, label: 'Days' },
        { value: timeRemaining.hours, label: 'Hours' },
        { value: timeRemaining.minutes, label: 'Minutes' },
        { value: timeRemaining.seconds, label: 'Seconds' },
    ];

    const timeUnits = showYears ? timeUnitsWithYears : timeUnitsWithoutYears;

    if (showYears) {
        /* 5 units layout */
        return (
            <>
                {/* Big screen: 1 row with 5 columns */}
                <div className="hidden md:grid grid-cols-5 gap-6 w-full place-items-center">
                    {timeUnits.map((unit) => (
                        <TimeCard key={unit.label} unit={unit} />
                    ))}
                </div>
                {/* Small screen: 2 rows - 1st row 2 cols, 2nd row 3 cols */}
                <div className="flex flex-col gap-4 w-full items-center md:hidden">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs place-items-center">
                        {timeUnits.slice(0, 2).map((unit) => (
                            <TimeCard key={unit.label} unit={unit} />
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full max-w-md place-items-center">
                        {timeUnits.slice(2, 5).map((unit) => (
                            <TimeCard key={unit.label} unit={unit} />
                        ))}
                    </div>
                </div>
            </>
        );
    }

    /* 4 units layout */
    return (
        <>
            {/* Big screen: 1 row with 4 columns */}
            <div className="hidden md:grid grid-cols-4 gap-6 w-full max-w-4xl place-items-center">
                {timeUnits.map((unit) => (
                    <TimeCard key={unit.label} unit={unit} />
                ))}
            </div>
            {/* Small screen: 2 rows - each row 2 cols */}
            <div className="flex flex-col gap-4 w-full items-center md:hidden">
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs place-items-center">
                    {timeUnits.slice(0, 2).map((unit) => (
                        <TimeCard key={unit.label} unit={unit} />
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs place-items-center">
                    {timeUnits.slice(2, 4).map((unit) => (
                        <TimeCard key={unit.label} unit={unit} />
                    ))}
                </div>
            </div>
        </>
    );
}
