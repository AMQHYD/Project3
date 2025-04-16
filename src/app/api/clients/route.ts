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
    const clients = await db.getClients()
    return NextResponse.json(clients)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch clients' }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const data = await req.json()
    const client = await db.createClient(data)
    return NextResponse.json(client)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to create client' }), { status: 500 })
  }
}