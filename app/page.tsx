import { auth } from '@/lib/auth'
import Home from '@/pages/Home'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
  const session = await getServerSession(auth)

  return (
    <Home session={session?.user?.email ?? ""} />
  )
}

export default page