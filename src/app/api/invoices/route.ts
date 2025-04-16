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
    const invoices = await db.getInvoices()
    return NextResponse.json(invoices)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch invoices' }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const data = await req.json()
    const invoice = await db.createInvoice(data)
    return NextResponse.json(invoice)
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to create invoice' }), { status: 500 })
  }
}