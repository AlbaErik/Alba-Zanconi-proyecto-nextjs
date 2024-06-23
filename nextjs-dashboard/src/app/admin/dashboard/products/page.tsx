import ProductList from '@/app/admin/ui/dashboard/products';
import '@/app/admin/ui/dashboard/styleCards.css';
import Link from 'next/link';

export default async function Page() {

    return (
        <div>
            <h1>Products list</h1>
            <div >
                <Link href="products/create">
                    <button className = "redirect-button">Create New Product</button>
                </Link>
            </div>
            <ProductList />
        </div>
    );
}