import { sql } from '@vercel/postgres';
import {
  BrandField,
  BrandsTableType,
  SentimentForm,
  SentimentTable,
  LatestSentimentRaw,
  CustomerInteractions,
} from './definitions';

// Fetch customer interaction data for the "revenue" section
export async function fetchBrandInteractions({brandName}: {brandName: string}) {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<CustomerInteractions>`SELECT * FROM customerInteractions
                                                    WHERE brand = ${brandName}
                                                  `;

    console.log('Data fetch completed after 3 seconds.');
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// Fetch the latest sentiment data, which is similar to the invoices
export async function fetchLatestSentiments() {
  try {
    const data = await sql<LatestSentimentRaw>`
      SELECT sentiment.positive, sentiment.negative, brands.name, brands.image_url, brands.email, sentiment.date
      FROM sentiment
      JOIN brands ON sentiment.brand_id = brands.id
      ORDER BY sentiment.date DESC
      LIMIT 5`;

    const latestSentiments = data.rows.map((sentiment) => ({
      ...sentiment,
      positive: sentiment.amount,
      negative: sentiment.amount,
    }));
    return latestSentiments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest sentiments.');
  }
}

// Fetch aggregated card data for sentiments
export async function fetchSentimentCardData({brandName}: {brandName: string}) {
  try {
    const sentimentCountForBrand = await sql`
      SELECT name, positive, negative
      FROM sentiment
      WHERE name = ${brandName}
    `;

    const data = await  sentimentCountForBrand.rows[0];

    // const numberOfSentiments = Number(data[0].rows[0].count ?? '0');
    // const numberOfBrands = Number(data[1].rows[0].count ?? '0');
    // const totalPositiveSentiment = Number(data[2].rows[0].positiveSentiment ?? '0');
    // const totalNegativeSentiment = Number(data[2].rows[0].negativeSentiment ?? '0');

    console.log("Values", data );

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredSentiments(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sentiments = await sql<SentimentTable>`
      SELECT
        sentiment.date,
        sentiment.positive,
        sentiment.negative,
        brands.name,
        brands.email,
        brands.image_url
      FROM sentiment
      JOIN brands ON sentiment.brand_id = brands.id
      WHERE
        brands.name ILIKE ${`%${query}%`} OR
        brands.email ILIKE ${`%${query}%`} OR
        sentiment.positive::text ILIKE ${`%${query}%`} OR
        sentiment.negative::text ILIKE ${`%${query}%`} OR
        sentiment.date::text ILIKE ${`%${query}%`}
      ORDER BY sentiment.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return sentiments.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered sentiments.');
  }
}

export async function fetchSentimentPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM sentiment
    JOIN brands ON sentiment.brand_id = brands.id
    WHERE
      brands.name ILIKE ${`%${query}%`} OR
      brands.email ILIKE ${`%${query}%`} OR
      sentiment.positive::text ILIKE ${`%${query}%`} OR
      sentiment.negative::text ILIKE ${`%${query}%`} OR
      sentiment.date::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of sentiments.');
  }
}

export async function fetchSentimentById(id: string) {
  try {
    const data = await sql<SentimentForm>`
      SELECT
        sentiment.positive,
        sentiment.negative,
        sentiment.date
      FROM sentiment
      WHERE sentiment.id = ${id};
    `;

    const sentiment = data.rows.map((sentiment) => ({
      ...sentiment,
      positive: sentiment.positive,
      negative: sentiment.negative,
    }));

    return sentiment[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sentiment.');
  }
}

// Fetch brand data for customer table
export async function fetchBrands() {
  try {
    const data = await sql<BrandField>`
      SELECT
        id,
        name
      FROM brands
      ORDER BY name ASC
    `;

    const brands = data.rows;
    return brands;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all brands.');
  }
}

export async function fetchFilteredBrands(query: string) {
  try {
    const data = await sql<BrandsTableType>`
		SELECT
		  brands.id,
		  brands.name,
		  brands.email,
		  brands.image_url,
		  COUNT(sentiment.id) AS total_sentiments,
		  SUM(CASE WHEN sentiment.positive < 50 THEN sentiment.positive ELSE 0 END) AS total_negative,
		  SUM(CASE WHEN sentiment.positive >= 50 THEN sentiment.positive ELSE 0 END) AS total_positive
		FROM brands
		LEFT JOIN sentiment ON brands.id = sentiment.brand_id
		WHERE
		  brands.name ILIKE ${`%${query}%`} OR
        brands.email ILIKE ${`%${query}%`}
		GROUP BY brands.id, brands.name, brands.email, brands.image_url
		ORDER BY brands.name ASC
	  `;

    const brands = data.rows.map((brand) => ({
      ...brand,
      total_negative: brand.total_negative,
      total_positive: brand.total_positive,
    }));

    return brands;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch filtered brands.');
  }
}
