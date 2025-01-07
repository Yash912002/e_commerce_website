import { productsProps } from "@/app/components/Products";
import { NextResponse } from "next/server";
import Stripe from "stripe";

type TransformedItemProps = {
	price_data: {
		currency: string;
		product_data: {
			name: string;
		};
		unit_amount: number;
	};
	quantity?: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(req: Request) {
	try {
		const { items }: { items: productsProps[] } = await req.json();

		const transformedItems: TransformedItemProps[] = items.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.title,
				},
				unit_amount: item.price * 100, // Convert to cents
			},
			quantity: item?.quantity,
		}));

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: transformedItems,
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
		});

		return NextResponse.json({ sessionId: session.id });
	} catch (err: unknown) {
		if (err instanceof Error) {
			return NextResponse.json({ error: err.message }, { status: 500 });
		}
		return NextResponse.json(
			{ error: "An unknown error occurred" },
			{ status: 500 }
		);
	}
}
