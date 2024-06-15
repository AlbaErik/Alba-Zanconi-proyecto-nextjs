import { User, Product, Order, fetchAllUsers, fetchAllProducts, fetchAllOrders } from '@/app/lib/data';
import React from 'react';
import '@/app/admin/ui/style.css';

export default async function AllOrdersCards() {
  const orders = await fetchAllOrders();

  return (
    <>
      {orders.map(order => (
        <Card key={order.id} title={order.id} value={order.total_amount} type="orders" data={order} />
      ))}
    </>
  );
}

function Card({ title, value, type, data }: { title: string; value: number | string; type: 'users' | 'products' | 'orders'; data: User | Product | Order; }) {

  return (
    <div className="rounded-xl bg-red-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <div className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {type === 'orders' && <OrderCard order={data as Order} />}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div>
      <p>Total Amount: ${order.total_amount}</p>
      <p>Status: {order.status}</p>
      <p>Items: {JSON.stringify(order.items)}</p>
    </div>
  );
}
