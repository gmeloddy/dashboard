import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { sentiment, brands, customerInteractions, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedBrands() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS brands (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedBrands = await Promise.all(
    brands.map(
      (brand) => client.sql`
        INSERT INTO brands (id, name, email, image_url)
        VALUES (${brand.id}, ${brand.name}, ${brand.email}, ${brand.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedBrands;
}

async function seedSentiment() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS sentiment (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      brand_id UUID REFERENCES brands(id),
      name VARCHAR(255) NOT NULL,
      positive INTEGER NOT NULL,
      negative INTEGER NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedSentiment = await Promise.all(
    sentiment.map(
      (sentiment) => client.sql`
        INSERT INTO sentiment (brand_id, name, positive, negative, date)
        VALUES (${sentiment.brand_id}, ${sentiment.name}, ${sentiment.positive},  ${sentiment.negative}, ${sentiment.date})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
  return insertedSentiment;
}

async function seedCustomerInteractions() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS customerInteractions (
      brand VARCHAR(255) NOT NULL UNIQUE,
      interactions INT NOT NULL
    );
  `;

  const insertedCustomerInteractions = await Promise.all(
    customerInteractions.map(
      (rev) => client.sql`
        INSERT INTO customerInteractions (brand, interactions)
        VALUES (${rev.brand}, ${rev.interactions})
        ON CONFLICT (brand) DO NOTHING;
      `
    )
  );

  return insertedCustomerInteractions;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedBrands(); // Seed brands before sentiment
    await seedSentiment();
    await seedCustomerInteractions();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error('Seeding error:', error); // Log error for debugging
    return Response.json({ error }, { status: 500 });
  }
}
