import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import customFetch from '../fetch-wrapper';
import Navbar from "./navbar";
import Topbar from "./topbar";

function Shop() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState("");
  let history = useHistory();
  const [product, setProduct] = useState([]);
  const [cate, setCate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0)


  useEffect(() =>{
    setLoading(true)
    customFetch(`${process.env.REACT_APP_URL}products?quantity=lt:2`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success) {
           setProduct(res.payload.product)
        }
      })
      .catch((err) => console.log(err));
  },[])


  useEffect(()=> {
    setLoading(true)
    customFetch(`${process.env.REACT_APP_URL}orders?status=pending`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success) {
          setTotalCount(res.payload.order.length)
        }
      })
      .catch((err) => console.log(err));
  },[])

  return (
    <>
      <Navbar />
      <div class="container-fluid py-4 px-5">
        <Topbar />


        {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
        </div>}

        <div class="quickUse px-5 mb-4">
          <div class="bg-white rounded py-3 px-5">
            <h4 class="text-center text-secondary mb-5">Quick Use</h4>
            <div class="row text-center px-5 mb-4">
              <div class="col-lg-3" style={{ position: "relative" }}>
                <Link
                  to={"/order"}
                  class="qu-btn btn btn-secondary text-secondary pt-3 fs-4"
                >
                  Order
                </Link>
                <span class="neworderblink">{totalCount}</span>
              </div>
              <div class="col-lg-3">
                <Link
                  to={"/addproduct"}
                  class="qu-btn btn btn-secondary text-secondary pt-3 fs-4"
                >
                  Add Product
                </Link>
              </div>
              <div class="col-lg-3">
                <Link
                  to={"/product"}
                  class="qu-btn btn btn-secondary text-secondary pt-3 fs-4"
                >
                  Product List
                </Link>
              </div>
              <div class="col-lg-3">
                <Link
                  to={"/flash"}
                  class="qu-btn btn btn-secondary text-secondary pt-3 fs-4"
                >
                  Flash Sell
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div class="itemStock px-5 mb-4">
          <div class="bg-white rounded py-3">
            <h5 class="text-center text-secondary mb-3">Item Stock Out Soon</h5>
            <table class="table text-center">
              <thead class="border-bottom border-top">
                <tr>
                  <th scope="col" class="text-secondary fw-normal">
                    Product ID
                  </th>
                  <th scope="col" class="text-secondary fw-normal">
                    Product Name
                  </th>
                  <th scope="col" class="text-secondary fw-normal">
                    Brand
                  </th>
                  <th scope="col" class="text-secondary fw-normal">
                    Category
                  </th>
                  <th scope="col" class="text-secondary fw-normal">
                    Available Stock
                  </th>
                  <th scope="col" class="text-secondary fw-normal">
                    Sell Price
                  </th>
                </tr>
              </thead>
              {product.map((item) => (
                <tr class="border-bottom border-secondary">
                  <td class="text-secondary">{item.id}</td>
                  <td class="text-secondary">
                    <p>{item.productname}</p>
                  </td>
                  <td class="text-secondary">{item.brandname}</td>
                  <td class="text-secondary">
                  {item.category === "1" ? "ইলেক্ট্রনিক ডেকোরেশন" : item.category === "2" ? "মাইক্রোফোন" : "ইলেকট্রনিক্স গ্যাজেট"}
                  </td>
                  <td class="text-secondary">{item.quantity}</td>
                  <td class="text-secondary">{item.sellingprice}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
