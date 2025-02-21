import { getResume } from '@/app/api/actions/getResume';
import { auth } from '@/lib/auth';
import Resume from '@/pages/Resume';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) => {
  const session = await getServerSession(auth)

  if (!session || !session.user?.email) {
    redirect("/")
  }
  
  const { resumeId } = await params;
  const res = await getResume(resumeId)
  
  return (
    <Resume resume={res.resume} resumeId={resumeId} isEditing={true} />
  )
}

export default page;