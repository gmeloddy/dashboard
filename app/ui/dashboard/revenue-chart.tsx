"use client";

import * as React from 'react';
import { lusitana } from '@/app/ui/fonts';
import { CustomerInteractions } from '@/app/lib/definitions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PieChart } from '@mui/x-charts/PieChart';


export default function BrandInteractionsChart({
  customerInteractions,
}: {
  customerInteractions: CustomerInteractions[];
}) {

  const isMobile = useMediaQuery('(max-width:768px)');
  const chartWidth = isMobile ? '100%' : 500; // Set width to full for mobile, fixed for larger screens

  return (
    <div className="w-full flex flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Customer Interactions
      </h2>
      <div className="w-full max-w-full overflow-x-scroll">
      <PieChart
          series={[
            {
              data: customerInteractions.map((item) => ({
                id: item.brand, // ID for each item in the chart
                value: item.interactions, // Value for the pie slice
                label:  item.brand, // Label for the pie slic
              })),
              type: 'pie',
              arcLabel: 'label',
            
            },
          ]}
          width={400} // Allow full width on mobile
          height={400}

          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'left' },
              padding: 0,
              markGap: 10,

            },
          }}
          
        />
      </div>
    </div>
  );
}
