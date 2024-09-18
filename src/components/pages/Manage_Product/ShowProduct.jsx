import { useState, useEffect } from "react";
import { deleteProduct, getAllProducts } from "../../../api/internal";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function ShowProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getAllProductsApiCall() {
      try {
        const response = await getAllProducts();

        if (response.status === 200) {
          if (Array.isArray(response.data.products)) {
            setProducts(response.data.products);
          } else {
            console.error("API response 'products' property does not contain an array:", response.data);
          }
        } else {
          console.error("Error fetching products:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  const hanldleDelete = async (id) => {
    let res = await deleteProduct(id);
    window.location.reload();
  }

  const handleNewProduct = () => {
    navigate('/dashboard/manage_product/add_product');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNewProduct}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Product
        </button>
      </div>
      {products.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Expiry Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="text-center" key={product._id}>
                <td className="py-2 px-4 border-b">{product.product_name}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b">{moment(product.expiry_date).format("MMM Do YY")}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={"/dashboard/manage_product/Edit/" + product._id} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                    Edit
                  </Link>
                  <button onClick={() => hanldleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
    </div>
  );
}

export default ShowProduct;
