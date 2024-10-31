// // src/components/CheckoutForm.js
// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const CheckoutForm = ({ amount, cardResponse }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements) {
//             return; // Stripe.js has not loaded yet
//         }

//         setLoading(true);
//         setError(null);
//         console.log("amount", amount)
//         const fetchClientSecret = async () => {
//             const response = await fetch(`https://aroramedical.ebizonstaging.com/wp-json/wp/v1/create-payment-intent?amount=${amount}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             const data = await response.json()
//             return (data);
//             // setClientSecret(data.client_secret);
//         };

//         const data = await fetchClientSecret();
//         console.log("client_secret", data);
//         const { error, paymentIntent } = await stripe.confirmCardPayment(data.client_secret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//             },
//         });

//         setLoading(false);

//         if (error) {
//             console.log(error)
//             setError(error.message);
//         } else if (paymentIntent.status === 'succeeded') {
//             cardResponse(paymentIntent);
//             console.log('Payment succeeded:', paymentIntent);
//             // Handle successful payment here
//         }
//     };

//     const cardElementOptions = {
//         style: {
//             base: {
//                 color: '#32325d',
//                 border: '1px solid black',
//                 fontSize: '16px',
//                 fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//                 '::placeholder': {
//                     color: '#aab7c4',
//                 },
//             },
//             invalid: {
//                 color: '#fa755a',
//                 iconColor: '#fa755a',
//             },
//         },
//         hidePostalCode: false
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement options={cardElementOptions} />
//             <button className="bg-[#079561] mt-[16px] p-[11px] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity duration-300 w-full block" type="submit" disabled={!stripe || loading}>
//                 {loading ? 'Processing...' : 'Pay'}
//             </button>
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </form>
//     );
// };

// export default CheckoutForm;


import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = forwardRef(({ amount, cardResponse , setPaymentLoad ,setParentError}, ref) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
console.log("stripe",stripe);

    // Expose the handleSubmit function to the parent component using the ref
    useImperativeHandle(ref, () => ({
        handleSubmit
    }));
   

    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return; // Stripe.js has not loaded yet
        }
        setParentError(null);
        setError(null);
    
        const fetchClientSecret = async () => {
            const response = await fetch(`https://aroramedical.ebizonstaging.com/wp-json/wp/v1/create-payment-intent?amount=${amount}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data;
        };
    
        const data = await fetchClientSecret();
    
        const { error, paymentIntent } = await stripe.confirmCardPayment(data.client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
    
        if (error) {
            console.log("errorr",error)
            setError(error.message);
            setParentError(error.message); 
            setPaymentLoad(false); // stop spinner if there is an error
            return error?.message
        } else if (paymentIntent.status === 'succeeded') {
            cardResponse(paymentIntent);
            setPaymentLoad(false); // stop spinner after successful payment
        }
    };
    
    const cardElementOptions = {
        style: {
            base: {
                color: '#32325d',
                border: '1px solid black',
                fontSize: '16px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
        hidePostalCode: false,
    };

    return (
        <div className='payment-form'>
            <div className="card-input-container border rounded-lg p-6 bg-gray-50 shadow-sm" >
                <CardElement options={cardElementOptions} />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
});

// Set the display name for better debugging
CheckoutForm.displayName = 'CheckoutForm';

export default CheckoutForm;

