import React from "react";
import { useState, useEffect } from "react";
import { Product } from "../Products/product";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AllProducts.css";

export const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1); // getting and seetting an current page instance 
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalpages, settotalpages] = useState(1);

  useEffect(() => { // getting the different page products on the basis of currentpage
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/product/${currentPage}`)
      .then((response) => {
        console.log(response.data);
        setFilteredProducts(response.data["data"]);
        console.log("response data is :", response.data["data"]);
        setLoading(false);
        setCurrentPage(response.data["current_page"]);
        settotalpages(response.data["total_pages"]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [currentPage]);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1);
    console.log("current page is :", data.selected + 1);
  };

  return (
    <div className=" p-3">
      <div className="all-products-grid">
        {loading ? (
          <p>Loading...</p>
        ) : (
          // Map over filteredProducts only when it's not empty
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        )}
      </div>

      <div className="mt-3">
        <ReactPaginate
        className=""
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={totalpages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-end "}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};
