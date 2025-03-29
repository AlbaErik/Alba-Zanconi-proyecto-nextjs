import { Order, fetchAllOrders } from '@/app/lib/data';
import React from 'react';
import '@/app/admin/ui/style.css';

export default async function AllOrdersCards() {
  const orders = await fetchAllOrders();

  return (
    <>
      {orders.map(order => (
        <Card key={order.id} title={order.user_name} order={order} />
      ))}
    </>
  );
}

function Card({ title, order }: { title: string; order: Order }) {

  return (
    <div className="rounded-xl bg-red-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">Usuario: {title}</h3>
      </div>
      <div className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        <OrderCard order={order as Order} />
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div>
      <p>Total Amount: ${order.total_amount}</p>
      <p>Status: {order.status}</p>
      <ul>
        {order.items.map(item => (
          <li key={item.productId}>
            {item.productName} - Price: ${item.price} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
