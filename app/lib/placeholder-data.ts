// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const brands = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'MoniePoint',
    email: 'Surulere',
    image_url: '/moniepoint.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Palmpay',
    email: 'Surulere',
    image_url: '/palmpay.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Opay',
    email: 'Surulere',
    image_url: '/opay.png',
  },
];

const sentiment = [
  {
    brand_id: brands[0].id,
    name: brands[0].name,
    positive: 40,
    negative: 60,
    date: '2022-12-06',
  },
  {
    brand_id: brands[1].id,
    name: brands[1].name,
    positive: 80,
    negative: 20,
    date: '2022-12-06',
  },
  {
    brand_id: brands[2].id,
    name: brands[2].name,
    positive: 70,
    negative: 30,
    date: '2022-10-29',
  },
];

const customerInteractions = [
  { brand: 'MoniePoint', interactions: 500 },
  { brand: 'Opay', interactions: 1800 },
  { brand: 'Palmpay', interactions: 2200 },
];

export { users, brands, sentiment, customerInteractions };

// revenue === "customerInteractions"
// invoices === sentiment
// customers === brands