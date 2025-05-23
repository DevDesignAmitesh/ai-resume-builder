import Dashboard from '@/pages/Dashboard'
import React from 'react'
import { getAllResumes } from '../api/actions/getAllResumes'
import { getServerSession } from 'next-auth'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession(auth)

  if (!session || !session.user?.email) {
    redirect("/")
  }

  const resumes = await getAllResumes()
  return (
    <Dashboard content={resumes.resume?.map((c) => c.content)} />
  )
}

export default page