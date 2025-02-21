"use client";

import React from 'react'
import { createOrder } from '../api/actions/createOrder';
import Script from 'next/script';
import { config } from 'dotenv';
import PremiumPage from '@/pages/PremiumPage';
config();

declare global {
  interface Window {
    Razorpay: any;
  }
}

const page = () => {
  return (
    <PremiumPage />
  )
}

export default page