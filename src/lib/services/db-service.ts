import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

// Client operations
export const createClient = async (data: Prisma.ClientCreateInput) => {
  return prisma.client.create({ data })
}

export const getClients = async () => {
  return prisma.client.findMany()
}

export const getClientById = async (id: number) => {
  return prisma.client.findUnique({
    where: { id },
    include: {
      invoices: true,
      estimates: true,
      recurringInvoices: true,
    },
  })
}

// Product operations
export const createProduct = async (data: Prisma.ProductCreateInput) => {
  return prisma.product.create({ data })
}

export const getProducts = async () => {
  return prisma.product.findMany()
}

// Invoice operations
export const createInvoice = async (data: Prisma.InvoiceCreateInput) => {
  return prisma.invoice.create({
    data,
    include: {
      client: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })
}

export const getInvoices = async () => {
  return prisma.invoice.findMany({
    include: {
      client: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })
}

// Estimate operations
export const createEstimate = async (data: Prisma.EstimateCreateInput) => {
  return prisma.estimate.create({
    data,
    include: {
      client: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })
}

export const getEstimates = async () => {
  return prisma.estimate.findMany({
    include: {
      client: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })
}

// Recurring Invoice operations
export const createRecurringInvoice = async (data: Prisma.RecurringInvoiceCreateInput) => {
  return prisma.recurringInvoice.create({
    data,
    include: {
      client: true,
    },
  })
}

export const getRecurringInvoices = async () => {
  return prisma.recurringInvoice.findMany({
    include: {
      client: true,
    },
  })
}

// User Profile operations
export const getUserProfile = async (userId: string) => {
  return prisma.userProfile.findFirst({
    where: {
      userId,
    },
  })
}

export const updateUserProfile = async (userId: string, data: Prisma.UserProfileUpdateInput) => {
  return prisma.userProfile.update({
    where: {
      userId,
    },
    data,
  })
}

export const createUserProfile = async (data: Prisma.UserProfileCreateInput) => {
  return prisma.userProfile.create({
    data,
  })
}