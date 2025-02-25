import { auth } from '@/lib/auth'
import Home from '@/pages/Home'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getServerSession(auth)

  if (session) {
    redirect("/dashboard")
  }
  
  return (
    <Home />
  )
}

export default page