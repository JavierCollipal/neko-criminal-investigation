import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function GET(request: NextRequest) {
  try {
    const client = await connectToDatabase();
    const db = client.db('neko-defense-system');
    const collection = db.collection('threat-actors');

    // Get all threat actors
    const profiles = await collection.find({}).toArray();

    return NextResponse.json({
      success: true,
      data: profiles
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch profiles'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const client = await connectToDatabase();
    const db = client.db('neko-defense-system');
    const collection = db.collection('threat-actors');

    const result = await collection.insertOne({
      ...body,
      created_at: new Date(),
      created_by: 'web-interface'
    });

    return NextResponse.json({
      success: true,
      data: { id: result.insertedId }
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create profile'
      },
      { status: 500 }
    );
  }
}
