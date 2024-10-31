"use client";

import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const CheckoutPage = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [canMakePayment, setCanMakePayment] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        const fetchClientSecret = async () => {
            const response = await fetch(`https://aroramedical.ebizonstaging.com/wp-json/wp/v1/create-payment-intent?amount=${50}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setClientSecret(data.client_secret);
        };

        fetchClientSecret();
    }, [amount]);

    useEffect(() => {
        if (!stripe) return;

        const pr = stripe.paymentRequest({
            country: 'US', // Change to your country
            currency: 'eur', // Change to your currency
            total: {
                label: 'Total',
                amount: amount, // Amount in cents
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });
        
        

        pr.canMakePayment().then((result) => {
            setCanMakePayment(result);
            console.log(result,"request");
            setPaymentRequest(pr);
        }).catch(error => {
            console.error('Error checking payment request availability:', error);
        });
    }, [stripe, amount]);

    const handlePaymentRequest = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:9124/api/payment-success?amount=${1}`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-2 rounded-md">
            {canMakePayment && paymentRequest && (
                <PaymentRequestButtonElement
                    // onClick={handlePaymentRequest}
                    options={{ paymentRequest }}
                />
            )}

            {errorMessage && <div>{errorMessage}</div>}

            {/* <button
                disabled={!stripe || loading}
                onClick={handlePaymentRequest}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay £${amount}` : "Processing..."}
            </button> */}
        </div>
    );
};
export default CheckoutPage;


