import { User, Product, Order, fetchAllUsers } from '@/app/lib/data';
import React from 'react';

export default async function UsersList() {
    const users = await fetchAllUsers();
    return (
        <>
            {users.map(user => (
                <Card key={user.id} title={user.name} user={user} />
            ))}
        </>
    );
}

function Card({ title, user }: { title: string; user: User }) {

    return (
        <div className="rounded-xl bg-blue-50 p-2 shadow-sm">
            <div className="flex p-4">
                <h3 className="ml-2 text-sm font-medium">Usuario: {title}</h3>
            </div>
            <div className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
                <UserCard user={user as User} />
            </div>
        </div>
    );
}

function UserCard({ user }: { user: User }) {
    return (
        <div>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}