import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import * as db from '@/lib/services/db-service'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const products = await db.getProducts()
    return NextResponse.json(products)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const data = await req.json()
    const product = await db.createProduct(data)
    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to create product' }), { status: 500 })
  }
}