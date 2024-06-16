import ProductList from '@/app/admin/ui/dashboard/products';
import '@/app/admin/ui/dashboard/styleCards.css';

export default async function Page() {

    return (
        <div>
            <h1>Products list</h1>
            <ProductList />
        </div>
    );
}