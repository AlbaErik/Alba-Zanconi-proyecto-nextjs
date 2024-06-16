import UsersList from '@/app/admin/ui/dashboard/clients';
import '@/app/admin/ui/dashboard/styleCards.css';

export default async function Page() {

    return (
        <div>
            <h1>Users list</h1>
            <UsersList />
        </div>
    );
}