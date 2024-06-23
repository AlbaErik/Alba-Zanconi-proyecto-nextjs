import { fetchFullCategory } from "@/app/lib/data";
import Form from "./create-new-product";

export default async function Page() {
  const categories = await fetchFullCategory();

  return (
      <main>         
          <Form categories={categories} />
      </main>
  );
}