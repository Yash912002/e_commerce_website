import SingleProduct from "@/app/components/SingleProduct";

export default async function page(
  { params }: { params: Promise<{ id: string }> }
) {
  // Fetch the product id from params
  const { id } = await params;

  return (
    <div>
      <SingleProduct id={id} />
    </div>
  )
}
