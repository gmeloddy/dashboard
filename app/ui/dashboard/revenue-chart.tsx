import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { lusitana } from '@/app/ui/fonts';
import { CustomerInteractions } from '@/app/lib/definitions';

export default function BrandInteractionsChart({
  customerInteractions,
}: {
  customerInteractions: CustomerInteractions[];
}) {
  // Calculate chart width based on screen size using a ref and effect (if needed)
  const chartWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? window.innerWidth - 32 : 500;

  return (
    <div className="w-full flex flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Customer Interactions
      </h2>
      <div className="w-full max-w-full overflow-x-auto">
        <BarChart
          xAxis={[
            {
              id: 'brandNames',
              data: customerInteractions.map((item) => item.brand),
              scaleType: 'band',
              label: 'Brand',
            },
          ]}
          series={[
            {
              data: customerInteractions.map((item) => item.interactions),
              label: 'Interactions',
              color: 'orange',
            },
          ]}
          width={chartWidth} // Dynamically set width based on viewport
          height={400} // Set height, adjust as needed
        />
      </div>
    </div>
  );
}
