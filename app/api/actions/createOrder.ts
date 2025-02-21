"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZRPAY_KEY!,
  key_secret: process.env.RAZRPAY_SECRET!
})

export async function createOrder() {
  try {
    const session = await getServerSession(auth)

    if (!session || !session.user?.email) {
      return { message: "unauthorized" }
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!user) {
      return { message: "user not found" }
    }

    const order = await razorpay.orders.create({
      amount: 500 * 100,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7)
    })

    const userOrder = await prisma.order.create({
      data: {
        userId: user.id,
        purchaseId: order.id
      }
    })

    if (!userOrder) {
      return { message: "soemthing went wrong" }
    }

    return { message: "order is successfull", orderId: userOrder.purchaseId }
  } catch (error) {
    return { message: "something went wrong", error }
  }
}