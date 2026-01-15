'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { CountdownDisplay } from '@/components/countdown-display';
import { parseDateFromUrl, formatDateForDisplay } from '@/lib/parse';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function CountdownContent() {
    const searchParams = useSearchParams();
    const dateParam = searchParams.get('date');

    if (!dateParam) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">No date specified</h1>
            </div>
        );
    }

    const targetDate = parseDateFromUrl(dateParam);

    if (!targetDate) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid date format</h1>
            </div>
        );
    }

    const dateLabel = formatDateForDisplay(targetDate);

    return <CountdownDisplay targetDate={targetDate} dateLabel={dateLabel} />;
}

export default function CountdownPage() {
    return (
        <div className="countdown-page min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Diagonal stripes background */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="w-full h-full"
                    style={{
                        background: `repeating-linear-gradient(
              135deg,
              #e8f4fc,
              #e8f4fc 20px,
              #f5fafd 20px,
              #f5fafd 40px
            )`,
                    }}
                />
            </div>

            <Link href="/" className="absolute top-4 left-4 z-50">
                <Button variant="ghost" size="icon" className="h-10 w-10 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full">
                    <ArrowLeft className="h-6 w-6 text-gray-700" />
                </Button>
            </Link>

            {/* Confetti decorations */}
            <div className="confetti-container absolute inset-0 -z-5 pointer-events-none overflow-hidden">
                {/* Ribbons - positioned around the edges */}
                <div className="ribbon ribbon-1" />
                <div className="ribbon ribbon-2" />
                <div className="ribbon ribbon-3" />
                <div className="ribbon ribbon-4" />
                <div className="ribbon ribbon-5" />
                <div className="ribbon ribbon-6" />

                {/* Small confetti pieces */}
                <div className="confetti confetti-1" />
                <div className="confetti confetti-2" />
                <div className="confetti confetti-3" />
                <div className="confetti confetti-4" />
                <div className="confetti confetti-5" />
                <div className="confetti confetti-6" />
                <div className="confetti confetti-7" />
                <div className="confetti confetti-8" />
            </div>

            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <CountdownContent />
            </Suspense>
        </div>
    );
}
