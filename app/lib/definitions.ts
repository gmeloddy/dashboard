// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Brand = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Sentiment = {
  id: string;
  brand_id: string;
  name: number;
  positive: number;
  negative: number;
  date: string;
};

export type CustomerInteractions = {
  brand: string;
  interactions: number;
};

export type LatestSentiment = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  positive: number;
  negative: number;
  date: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestSentimentRaw = Omit<LatestSentiment, 'amount'> & {
  amount: number;
};

export type SentimentTable = {
  id: string;
  brand_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  positive: number;
  negative: number;
};

export type BrandsTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_sentiments: number;
  total_positive: number;
  total_negative: number;
};

export type FormattedBrandsTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_sentiments: number;
  total_positive: number;
  total_negative: number;
};

export type BrandField = {
  id: string;
  name: string;
};

export type SentimentForm = {
  id: string;
  brand_id: string;
  positive: number;
  negative: number;
  date: string;
};
