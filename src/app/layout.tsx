import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { CartProvider } from "./context/CartProvider";
import { ProductProvider } from "./context/ProductContext";

export const metadata: Metadata = {
	title: "Amazon",
	description: "E commerce platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="light">
			<body>
				<ProductProvider>
					<CartProvider>
						<Providers>
							{children}
						</Providers>
					</CartProvider>
				</ProductProvider>
			</body>
		</html>
	);
}
