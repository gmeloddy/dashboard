import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
 
  if (req.method === 'POST') {
    const { name, email, password } = await req.json();
      const saltRounds = 10;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert the new user into the database with the hashed password
      const emailInDb = await sql`
      SELECT email 
      FROM users 
      WHERE email = ${email}
      `;
      if (emailInDb.rows[0]) {
        console.log('Email already exists', emailInDb.rows[0]);
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }

      try {
          await sql`
              INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})
          `;
          console.log('User created successfully');
          return NextResponse.json({ message: 'User created successfully' }, { status: 200 });
      } catch (error) {
          return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
      }
  } else {
      return NextResponse.json({ error: 'Method not allowed' });
  }
}
