import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  botanicalName: string;
  price: number;
  unit: string;
  seller: string;
  location: string;
  grade: string;
  certifications: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 pb-20">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
