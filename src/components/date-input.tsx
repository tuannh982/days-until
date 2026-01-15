'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseDate, formatDateForUrl } from '@/lib/parse';

export function DateInput() {
    const [dateInput, setDateInput] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        const parsedDate = parseDate(dateInput);
        if (!parsedDate) {
            setError('Could not understand that date. Try something like "Feb 4" or "2026-02-15"');
            return;
        }

        const formattedDate = formatDateForUrl(parsedDate);
        router.push(`/countdown?date=${formattedDate}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md">
            <Input
                type="text"
                placeholder="Enter a date (e.g., Feb 4, next friday, 2026-02-15)"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="text-lg py-6 px-4 text-center"
            />
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button type="submit" size="lg" className="px-8">
                Count Down
            </Button>
        </form>
    );
}
