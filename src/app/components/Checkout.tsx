"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Load the publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton({ items }: { items: any[] }) {
	const [loading, setLoading] = useState(false);

	const handleCheckout = async () => {
		setLoading(true);
		try {
			// Send the post request to /api/checkout route
			// and send items array as payload
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ items }),
			});

			const { sessionId } = await response.json();

			if (sessionId) {
				const stripe = await stripePromise;

				if (!stripe) {
					throw new Error("Stripe.js failed to load.");
				}

				// Redirect to the Stripe Checkout page
				await stripe.redirectToCheckout({ sessionId });
			} else {
				alert("Unable to create checkout session");
			}
		} catch (err) {
			console.error(err);
			alert("An error occurred during checkout.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			onClick={handleCheckout}
			disabled={loading}
			className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
		>
			{loading ? "Processing..." : "Checkout"}
		</button>
	);
}
