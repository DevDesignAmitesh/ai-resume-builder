import { auth } from '@/lib/auth'
import Index from '@/pages/Index'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getServerSession(auth)

  if (!session || !session.user?.email) {
    redirect("/")
  }
  return (
    <Index />
  )
}

export default page