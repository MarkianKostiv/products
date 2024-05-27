import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../interfaces/Product";

export const ProductComponent = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${productId}`
        );

        if (!response.data) {
          throw new Error("Product not found");
        }

        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <p className='text-center mt-4'>Loading...</p>;
  }

  if (!product) {
    return <p className='text-center mt-4'>Product not found</p>;
  }

  return (
    <div className='max-w-xl mx-auto mt-4 p-4 bg-gray-100 rounded-md'>
      <Link
        to='/'
        className='block text-blue-500 mb-4'
      >
        Go back
      </Link>
      <div>
        <h2 className='text-2xl font-semibold'>{product.name}</h2>
        <img
          src={product.imageUrl}
          alt='Product'
          className='w-full mt-4 mb-2 rounded-md'
        />
        <p className='mb-2'>Count: {product.count}</p>
        <p className='mb-2'>Height: {product.size.height}</p>
        <p className='mb-2'>Width: {product.size.width}</p>
        <h3 className='mt-2 mb-2'> Comments: </h3>
        <ul>
          {product.comments.map((comment: any) => (
            <li
              key={comment.id}
              className='mb-2'
            >
              <p className='font-semibold'>{comment.date}</p>
              <p>{comment.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
