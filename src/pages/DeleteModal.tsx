import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { deleteProduct } from "../functions/deleteProduct";

export const DeleteModal = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (productId) {
      dispatch(deleteProduct(productId))
        .then(() => {
          console.log("Product deleted successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  return (
    <div className='max-w-xl mx-auto mt-4 p-4 bg-white rounded-md shadow-md'>
      <Link
        to={"/"}
        className='block text-blue-500 mb-4'
      >
        Main
      </Link>
      <div>
        <button
          onClick={handleDelete}
          className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2'
        >
          Delete
        </button>
        <Link to={"/"}>
          <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md'>
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};
