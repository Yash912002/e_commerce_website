import Link from "next/link";

export default function SuccessPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-green-100">
			<h1 className="text-3xl font-bold text-green-700">Payment Successful!</h1>
			<p className="text-gray-700 mt-4">
				Thank you for your purchase. Your order has been confirmed, and you will
				receive an email receipt shortly.
			</p>
			<Link
				href="/"
				className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
			>
				Go Back to Home
			</Link>
		</div>
	);
}
