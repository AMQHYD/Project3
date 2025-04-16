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
    const estimates = await db.getEstimates()
    return NextResponse.json(estimates)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch estimates' }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const data = await req.json()
    const estimate = await db.createEstimate(data)
    return NextResponse.json(estimate)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to create estimate' }), { status: 500 })
  }
}