import { DateInput } from '@/components/date-input';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
          How many days until...?
        </h1>
        <DateInput />
      </main>
    </div>
  );
}
