import { MyNavbar } from "../Navbar/MyNavbar";
import { MyFooter } from "../Footer/MyFooter";
import { Product } from "../Products/product";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ActionCategory.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const HorrorCategory = () => {
  const [loading, setLoading] = useState(true);
  const [actionProducts, setActionProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [string, setstring]= useState('');
  const [filterform, setfilterform]=useState({  // creating formdata instance to post 
    min_price: "0",
    max_price: "10000",
    publisher: "All",
    sort_by: "PriceLowToHigh",
    
  })

  const handlePublisherChange = (category) => {
    setfilterform({
      ...filterform,
      publisher:category,
    })
    
  };

  const handleMinPriceChange = (min) => {
    setfilterform({
      ...filterform,
      min_price:min,
    })
    
  };

  const handleMaxPriceChange = (max) => {
    setfilterform({
      ...filterform,
      max_price:max,
    })
    
  };

  const handleSortingChange = (sorting) => {
    setfilterform({
      ...filterform,
      sort_by:sorting,
    })
 
  };

  const applyFilters = () => {
    const body = JSON.stringify(filterform)
    console.log('filter form body is :', body)
    let updatedProducts = actionProducts;
    axios.get(`http://127.0.0.1:8000/api/product/horror/filter-products/${filterform.min_price}/${filterform.max_price}/${filterform.publisher}/${filterform.sort_by}`)
    .then((response)=>{
      setFilteredProducts(response.data['data'])
      console.log('response data is ', response.data)
      console.log('filtered products are:', filteredProducts)
    })
    // setting the filterproducts with this functions local updatedProducts
  };


  const handleSearch=(inputstring)=>{
    console.log('string before before get is ', string)
    setstring(inputstring)
    if(inputstring===''){
      axios.get(`http://127.0.0.1:8000/api/product/search/horror/`)
      .then((response)=>{
        setstring('')
        setFilteredProducts(response.data['data'])
      })
      .catch((error)=>{
        console.log('error with empty string',error)
      })
    }
    else{
    console.log('string after setstring is ', string)
    axios.get(`http://127.0.0.1:8000/api/product/search/horror/${string}`)
          .then((response)=>{
            console.log('in the get api of string', response.data)
             setFilteredProducts(response.data['data'])
             
          })
          .catch((error)=>{
            console.log('error occured in string get api ', error)
          })
        }
  }

  useEffect(() => {
    // calling the action category products when the component is called
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/product/search/horror/${string}`)
      .then((response) => {
        setActionProducts(response.data["data"]);
        setFilteredProducts(response.data["data"]);
        console.log('filtered products from string get is ', filteredProducts)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [string]);

  return (
    <div>
      <MyNavbar />
      <div className="action-content ">
        <div className="action-content-main mt-4">
          <div className="search-bar">
            <div className="searching-logo">
          <i className="fa-brands fa-searchengin fa-xl" style={{color: "#ff0000"}}></i>
          </div>
          <input
                    type="text"
                    className="rounded form-control-action-search"
                    value={string}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  
          </div>
          <div className="p-4 action-filters rounded">
            <div className="">
              <form onSubmit={applyFilters}>
              <div className=" text-white filter-div">
                <div className="form-group">
                  <label className="fw-lighter">Publisher</label>
                  <select
                    className=" rounded form-control-action"
                    name="publisher"
                    value={filterform.publisher}
                    onChange={(e) => handlePublisherChange(e.target.value)}
                  >
                    <option value="All" placeholder="Publisher" className="black-option-action ">
                      All
                    </option>
                    <option value="Ubisoft" className="black-option-action">Ubisoft</option>
                    <option value="Focus Entertainment" className="black-option-action">
                      Focus Entertainment
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="fw-lighter">Minimum Price</label>
                  <input
                    type="number"
                    className="rounded form-control-action"
                    name="min_price"
                    value={filterform.min_price}
                    onChange={(e) => handleMinPriceChange(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="fw-lighter">Maximum Price</label>
                  <input
                    type="number"
                    className="rounded form-control-action"
                    name="max_price"
                    value={filterform.max_price}
                    onChange={(e) => handleMaxPriceChange(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="fw-lighter">Sort By</label>
                  <select
                    className="rounded form-control-action"
                    name="sort_by"
                    value={filterform.sort_by}
                    onChange={(e) => handleSortingChange(e.target.value)}
                  >
                    
                    <option value="PriceLowToHigh" className="black-option-action ">Price: Low to High</option>
                    <option value="PriceHighToLow" className="black-option-action ">Price: High to Low</option>
                  </select>
                </div>
                <button
                  className="btn btn-danger fw-lighter button-div"
                  onClick={applyFilters}
                  type="button"
                >
                  Filter
                </button>
              </div>
              </form>
            </div>
          </div>
          <div>
            <div className="product-grid mt-4 mb-4">
              {loading ? (
                // Display a loading indicator or message while data is being fetched
                <p>Loading...</p>
              ) : (
                // Map over filteredProducts only when it's not empty
                filteredProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
