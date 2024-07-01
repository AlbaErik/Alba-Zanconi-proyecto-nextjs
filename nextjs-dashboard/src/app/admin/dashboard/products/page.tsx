import ProductList from '@/app/admin/ui/dashboard/products';
import '@/app/admin/ui/dashboard/styleCards.css';
import Link from 'next/link';
import Search from '../../ui/searchBar';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div>
            <h1>Lista de Productos</h1>
            <div >
                <Search placeholder="Ingrese un producto..." />
                <Link href="products/create">
                    <button className="redirect-button">Crear Nuevo Producto</button>
                </Link>
            </div>

            <ProductList query={query} currentPage={currentPage} />
        </div>
    );
}