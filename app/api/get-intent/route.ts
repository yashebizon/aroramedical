import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")("sk_test_51PuTVURvYYvNAU75uXcECzGkVgOIj4UP2dWuH37V55rMQmTiv5964FdbTNbUiZlP841Xu7SEhnIDKiA1R9JPf5D300iIqi6OuZ");

export async function POST(request: any) {
    try {
        const { amount } = await request.json();

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "eur",
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}

export async function GET(request: any) {
    try {
        return NextResponse.json({ "message": "get Route called" });
    } catch (error: any) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}