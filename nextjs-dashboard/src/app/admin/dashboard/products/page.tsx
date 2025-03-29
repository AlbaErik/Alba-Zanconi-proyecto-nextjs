import ProductList from '@/app/admin/ui/dashboard/products';
import '@/app/admin/ui/dashboard/styleCards.css';
import Link from 'next/link';
import Search from '../../ui/searchBar';
import { fetchProductsPages } from '@/app/lib/data';
import Pagination from '../../ui/dashboard/pagination';

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
    const totalPages = await fetchProductsPages(query);

    return (
        <div>
            <h1>Lista de Productos</h1>
            <div>
                <Search placeholder="Ingrese un producto..." />
                <Link href="products/create">
                    <button className="redirect-button">Crear Nuevo Producto</button>
                </Link>
            </div>

            <ProductList query={query} currentPage={currentPage} />

            <div className="flex justify-center mt-4">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}