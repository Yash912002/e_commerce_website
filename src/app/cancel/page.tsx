import Link from "next/link";

export default function CancelPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-red-100">
			<h1 className="text-3xl font-bold text-red-700">Payment Cancelled</h1>
			<p className="text-gray-700 mt-4">
				It seems you canceled the payment process. If this was a mistake, feel
				free to try again.
			</p>
			<Link
				href="/"
				className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
			>
				Go Back to Home
			</Link>
		</div>
	);
}
