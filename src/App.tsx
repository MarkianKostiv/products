import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import { getProduct } from "./functions/getProduct";
import { Link, Outlet } from "react-router-dom";

function App() {
  const dispatch: AppDispatch = useDispatch();

  const {
    products: originalProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [products, setProducts] = useState(originalProducts);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const sortedProducts = [...originalProducts].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "count") {
        return b.count - a.count;
      }
      return 0;
    });
    setProducts(sortedProducts);
  }, [originalProducts, sortBy]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='flex justify-between w-full mb-4'>
        <Link to='/add_product'>
          <button className='bg-green-500 text-white px-4 py-2 rounded-md'>
            Add new Product
          </button>
        </Link>
        <div>
          <label className='mr-2'>Sort By:</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className='bg-gray-200 px-2 py-1 rounded-md'
          >
            <option value='name'>Name</option>
            <option value='count'>Count</option>
          </select>
        </div>
      </div>
      <div className='bg-gray-300 p-4 rounded-md w-4/5'>
        <Outlet />
      </div>
      <ul className='flex flex-wrap gap-5 justify-center'>
        {products.map((product) => (
          <li
            key={product.id}
            className='flex flex-col items-center justify-center w-56'
          >
            <h3 className='text-xl font-semibold mb-2'>{product.name}</h3>
            <img
              src={product.imageUrl}
              alt='product-img'
              className='w-full h-auto mb-2'
            />
            <p className='mb-2'>Count: {product.count}</p>
            <Link to={`product/${product.id}`}>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2'>
                Details
              </button>
            </Link>
            <Link to={`update_product/${product.id}`}>
              <button className='bg-yellow-500 text-white px-4 py-2 rounded-md mb-2'>
                Update Product
              </button>
            </Link>
            <Link to={`delete_product/${product.id}`}>
              <button className='bg-red-500 text-white px-4 py-2 rounded-md'>
                Delete Product
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
