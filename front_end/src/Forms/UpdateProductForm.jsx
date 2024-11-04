import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const UpdateProductForm = () => {
  const [previewImage, setPreviewImage] = useState(null); // instance to show the image from link 
  const { productId } = useParams();
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    price: "",
    details: "",
    category: "",
    subcategory: [],
    Publisher: "",
    image_link: "",
  });

  const handleChange = (e) => { // handling change on input change
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  const handlePriceChange = (price) => { // handling negative price 
    if (price >= 0) {
      setformData({ ...formData, price: price });
    } else {
      alert("Price cannot be negative");
    }
  };
  const handleImageChange = (url) => { // setting image on link change 
    setformData({ ...formData, image_link: url });
    if (url) {
      setPreviewImage(url);
    } else {
      setPreviewImage(null);
    }
  };

  useEffect(() => { // get request to get the particular product details 
    axios
      .get(`http://127.0.0.1:8000/api/product/getById/${productId}`)
      .then((response) => {
        setformData(response.data);
        console.log(response.data);
        setPreviewImage(response.data["image_link"]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSubmit = (event) => { // chnaging user profile detials on putting the request
    event.preventDefault();
    axios
      .put(
        `http://127.0.0.1:8000/api/product/UpdateProduct/${productId}`,
        formData
      )
      .then((response) => {
        console.log("Product updated successfully!", response);

        setSuccessMessage(true);
        navigate("/site/home/");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-white mt-3">Update Product</h2>
      <div className="main-content mt-5">
        <form onSubmit={handleSubmit} className=" add-product-form mt-0">
          <div className="form-group">
            <label className=" text-white add-product-label ">Name</label>
            <input
              className="form-control "
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Price</label>
            <input
              className="form-control"
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => handlePriceChange(e.target.value)}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Details</label>
            <textarea
              className="form-control"
              name="details"
              value={formData.details}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Category</label>
            <select
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Fighting">Fighting</option>
              <option value="Horror">Horror</option>
              <option value="Racing">Racing</option>
              <option value="Consoles">Consoles</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Subcategory</label>
            <input
              className="form-control"
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Publisher</label>
            <input
              className="form-control"
              type="text"
              name="Publisher"
              value={formData.Publisher}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label ">Image Link</label>
            <input
              className="form-control"
              type="url"
              name="image_link"
              value={formData.image_link}
              onChange={(e) => handleImageChange(e.target.value)}
              required="required"
            />
          </div>

          <button className="btn btn-primary mt-4">Update</button>
        </form>
        {successMessage && alert("Product updated successfully!")}

        <img
          src={
            previewImage ||
            "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
          }
          alt="No image"
          className="img-preview rounded"
        />
      </div>
    </div>
  );
};
