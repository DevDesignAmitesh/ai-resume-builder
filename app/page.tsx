import { auth } from '@/lib/auth'
import Home from '@/pages/Home'
import { getServerSession } from 'next-auth'
import React from 'react'
import { getFeedback } from './api/actions/getFeedback'

const page = async () => {
  const session = await getServerSession(auth)
  const feedback = await getFeedback()
  return (
    <Home session={session?.user?.email ?? ""} feedbacks={feedback.feedback} />
  )
}

export default page