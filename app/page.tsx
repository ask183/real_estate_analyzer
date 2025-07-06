// app/page.tsx (Next.js App Router)
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define response type
interface AnalysisResult {
  cashFlow: number;
  capRate: number;
  roi: number;
  totalExpenses: number;
}

export default function Home() {
  const [price, setPrice] = useState('');
  const [rent, setRent] = useState('');
  const [expenses, setExpenses] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = async () => {
    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price: Number(price),
        rent: Number(rent),
        expenses: Number(expenses),
      }),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🏠 Real Estate Deal Analyzer</h1>

      <Input
        placeholder="Purchase Price ($)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-2"
      />
      <Input
        placeholder="Monthly Rent ($)"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
        className="mb-2"
      />
      <Input
        placeholder="Monthly Expenses ($)"
        value={expenses}
        onChange={(e) => setExpenses(e.target.value)}
        className="mb-4"
      />

      <Button onClick={analyze}>Analyze Deal</Button>

      {result && (
        <div className="mt-6 space-y-2">
          <p>💵 Cash Flow: ${result.cashFlow.toLocaleString()}</p>
          <p>📈 Cap Rate: {result.capRate}%</p>
          <p>📊 Annual ROI: {result.roi}%</p>
          <p>💸 Total Expenses: ${result.totalExpenses.toLocaleString()}</p>
        </div>
      )}
    </main>
  );
}
