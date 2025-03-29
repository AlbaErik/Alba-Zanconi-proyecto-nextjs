import { ProductWithCategory, fetchFullCategory, fetchProductById } from "@/app/lib/data";
import Form from "../update-product";

export default async function Page({ params }: { params: { id: string } }) {

    const categories = await fetchFullCategory();
    const product = await fetchProductById(params.id);

    return (
        <main>
            <h1>Update Product</h1>
            <Form
                id={params.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image_url={product.image_url}
                category_name={product.category_name}
                categories={categories}
            />

        </main>
    );
}
