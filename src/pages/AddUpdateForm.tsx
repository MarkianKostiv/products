import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Product } from "../interfaces/Product";
import * as Yup from "yup";
import { AppDispatch } from "../state/store";
import { addProduct, updateProduct } from "../functions/productThunks";

export const AddUpdateForm = ({ AddOrUpdate }: { AddOrUpdate: string }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [initialValues, setInitialValues] = useState<Product>({
    id: crypto.randomUUID(),
    imageUrl: "",
    name: "",
    count: 0,
    size: { width: 0, height: 0 },
    weight: "",
    comments: [],
  });

  useEffect(() => {
    if (AddOrUpdate === "Update" && productId) {
      axios
        .get(`http://localhost:5000/products/${productId}`)
        .then((response) => {
          setInitialValues(response.data);
        });
    }
  }, [AddOrUpdate, productId]);

  const onSubmit = (data: Product) => {
    if (AddOrUpdate === "Add") {
      dispatch(addProduct(data)).then(() => navigate("/"));
    } else if (AddOrUpdate === "Update" && productId) {
      dispatch(updateProduct(data)).then(() => navigate("/"));
    }
  };

  const validationSchema = Yup.object().shape({
    imageUrl: Yup.string()
      .min(1, "ImageUrl must be at least 1 character")
      .required("ImageUrl is required"),
    name: Yup.string()
      .min(1, "Name must be at least 1 character")
      .required("Name is required"),
    count: Yup.number()
      .min(0, "Count must be a positive number or zero")
      .required("Count is required"),
    size: Yup.object().shape({
      width: Yup.number()
        .min(0, "Width must be a positive number or zero")
        .required("Width is required"),
      height: Yup.number()
        .min(0, "Height must be a positive number or zero")
        .required("Height is required"),
    }),
    weight: Yup.string()
      .min(1, "Weight must be at least 1 character")
      .required("Weight is required"),
  });

  return (
    <div className='w-full p-6'>
      <Link to={"/"}>
        <button>X</button>
      </Link>
      <div className='flex items-center justify-center flex-col w-full'>
        <h1>{AddOrUpdate === "Add" ? "Add Product" : "Update Product"}</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className='flex flex-col w-full gap-2'>
            <label className='flex flex-col text-xl font-normal'>
              Image URL:
              <Field
                name='imageUrl'
                placeholder='Product image URL'
                className='p-2 rounded-md'
              />
              <ErrorMessage
                className='text-red-500 text-sm mt-1'
                name='imageUrl'
                component='span'
              />
            </label>
            <label className='flex flex-col text-xl font-normal'>
              Name:
              <Field
                name='name'
                placeholder='Product name'
                className='p-2 rounded-md'
              />
              <ErrorMessage
                className='text-red-500 text-sm mt-1'
                name='name'
                component='span'
              />
            </label>
            <label className='flex flex-col text-xl font-normal'>
              Count:
              <Field
                name='count'
                type='number'
                placeholder='Product count'
                className='p-2 rounded-md'
              />
              <ErrorMessage
                className='text-red-500 text-sm mt-1'
                name='count'
                component='span'
              />
            </label>
            <label className='flex flex-col text-xl font-normal'>
              Size - Width:
              <Field
                name='size.width'
                type='number'
                placeholder='Product width'
                className='p-2 rounded-md'
              />
              <ErrorMessage
                className='text-red-500 text-sm mt-1'
                name='size.width'
                component='span'
              />
            </label>
            <label className='flex flex-col text-xl font-normal'>
              Size - Height:
              <Field
                name='size.height'
                type='number'
                placeholder='Product height'
                className='p-2 rounded-md'
              />
              <ErrorMessage
                className='text-red-500 text-sm mt-1'
                name='size.height'
                component='span'
              />
            </label>
            <label className='flex flex-col text-xl font-normal'>
              Weight:
              <Field
                name='weight'
                placeholder='Product weight'
                className='p-2 rounded-md'
              />
              <ErrorMessage
                className='text-red-500 text-sm mt-1'
                name='weight'
                component='span'
              />
            </label>
            <button
              type='submit'
              className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6 
            bg-[#009C2F] hover:bg-[#339039] 
            duration-300 rounded-xl transform active:scale-95 
            active:bg-[#007B2C] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
