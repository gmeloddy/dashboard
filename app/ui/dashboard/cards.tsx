import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  positive: BanknotesIcon,
  negative: UserGroupIcon,
  sentiments: ClockIcon,
  brands: InboxIcon,
};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
  title,
  sentiments,
  type,
}: {
  title: string;
  sentiments: any;
  type: 'positive' | 'negative' | 'sentiments' | 'brands';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <div className="flex justify-between p-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-700">Positive</p>
          <p className="text-lg font-bold text-gray-900">
            {sentiments.positive}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-700">Negative</p>
          <p className="text-lg font-bold text-gray-900">
            {sentiments.negative}
          </p>
        </div>
      </div>
    </div>
  );
}
