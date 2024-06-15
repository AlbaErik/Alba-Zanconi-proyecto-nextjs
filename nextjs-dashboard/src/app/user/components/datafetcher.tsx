import { ProductWithCategory, fetchAllProducts } from "../../lib/data";

export default async function fetchProducts() {
    var productos = await fetchAllProducts() 
    return productos;
  }