import { notFound } from "next/navigation";
import { mockProducts } from "@/components/lib/constant";
import ProductDetails from "@/components/components/products/product-details";
import { categories } from "@/components/lib/categories";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ No need to await

  const product = mockProducts.find((p) => p.id === id);
  const category = categories.find((c) => c.name === product?.category);

  if (!product) {
    console.log("Product not found for ID:", id);
    notFound();
  }

  if (!category) {
    console.log("Category not found for product:", {
      productId: product.id,
      productCategory: product.category,
      availableCategories: categories.map((c) => c.id),
    });
    notFound();
  }

  return (
    <div className="py-8">
      <ProductDetails product={product} />
    </div>
  );
}

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export const dynamicParams = true;