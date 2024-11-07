import { Card } from '@/app/ui/dashboard/cards';
import LatestSentiments from '../../ui/dashboard/latest-sentiments';
import { fetchLatestSentiments } from '@/app/lib/data';
import { fetchBrandInteractions, fetchSentimentCardData } from '@/app/lib/data';
import BrandInteractionsChart from '../../ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const MoniePointInteractions = await fetchBrandInteractions({brandName: 'MoniePoint'});
  const palmpayInteractions = await fetchBrandInteractions({brandName: 'Palmpay'});
  const OpayInteractions = await fetchBrandInteractions({brandName: 'Opay'});
  
  const brandInteractions = [
    ...MoniePointInteractions,
    ...palmpayInteractions,
    ...OpayInteractions
  ];

  console.log("Interactions", brandInteractions);

  const latestSentiments = await fetchLatestSentiments();

  const MoniePoint = await fetchSentimentCardData({brandName: 'MoniePoint'});
  const Palmpay = await fetchSentimentCardData({brandName: 'Palmpay'});
  const Opay = await fetchSentimentCardData({brandName: 'Opay'});

  const sentimentMoniepoint = MoniePoint;
  const sentimentPalmpay = Palmpay;
  const sentimentOpay = Opay;

  const sentiments = [sentimentMoniepoint, sentimentPalmpay, sentimentOpay];
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Regional Positive Sentiment Analysis</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {
          sentiments.map((sentiment, index) => {
            return (
              <Card 
                key={index}
                title={`${sentiment.name} Sentiments`}
                sentiments={sentiment}
                type="sentiments"
              />
            )
          })
        }
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <BrandInteractionsChart customerInteractions={brandInteractions} />
        <LatestSentiments latestSentiment={latestSentiments} />
      </div>
    </main>
  );
}
