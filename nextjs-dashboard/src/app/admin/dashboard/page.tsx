import AllOrdersCards from '@/app/admin/ui/dashboard/orders';
import '@/app/admin/ui/dashboard/styleCards.css';

export default async function Page() {

    return (
        <div>
            <h1>Orders list</h1>
            <AllOrdersCards />
        </div>
    );
}