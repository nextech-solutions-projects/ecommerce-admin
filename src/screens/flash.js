import Topbar from "./topbar";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customFetch from '../fetch-wrapper';

function Flash() {
  const [product, setProduct] = useState([]);
  const [cate, setCate] = useState([]);
  const [search, setSearch] = useState("");
  const [cprice, setCprice] = useState("");
  const [oprice, setOprice] = useState("");
  const [pid, setPid] = useState("");
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    customFetch(`${process.env.REACT_APP_URL}products`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          setProduct(res.payload.product);
        }
      })
      .catch((err) => console.log(err));
  }, [update]);


  const flashDealToggle = (x,id) => {
    const data = {
      isflash: x
    }

    customFetch(`${process.env.REACT_APP_URL}products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
           setUpdate(update+1)
        }
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div class="container-fluid panel-Background panel-BackgroundH py-4 px-5">
        <Topbar />
        <div class="productList px-5 mb-4">
          <div class="bg-light rounded py-3">
            <h4 class="text-secondary mb-3 px-5">Product List</h4>

            <form class="row px-5">
              <div class="col-auto">
                <label for="staticEmail2" class="visually-hidden">
                  Categories
                </label>
              </div>
              <div class="col-auto">
                <label for="inputPassword2" class="visually-hidden">
                  Search
                </label>
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  class="form-control"
                  id="inputPassword2"
                  placeholder="Product Name"
                />
              </div>
            </form>
            <br />

            <table class="table text-center fw-normal">
              <thead>
                <tr class="border-top border-bottom border-secondary">
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Product ID
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Product Name
                  </th>

                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Stock
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Sell Price
                  </th>

                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Flash Sell
                  </th>
                </tr>
              </thead>
              <tbody>
                {product
                  .filter((item) => {
                    if (
                      item.productname
                        ?.toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return item;
                    }

                    if (item.createdAt?.includes(search)) {
                      return item;
                    }
                  })
                  .map((item) => (
                    <tr class="border-bottom border-secondary">
                      <td class="text-secondary">{item.id}</td>
                      <td class="text-secondary">
                      <img src={`${process.env.REACT_APP_URL}${item.pimage}`} alt="" style={{'height':'40px'}}/>
                        <br />
                        <p>{item.productname}</p>
                      </td>

                      <td class="text-secondary">{item.quantity}</td>
                      <td class="text-secondary">{item.sellingprice}</td>

                      <td class="text-secondary">
                          <button
                            onClick={() => {
                              flashDealToggle(item.isflash === 0 ? 1 : 0, item.id);
                            }}
                            className="btn btn-warning w-100"
                          >
                            Turn {item.isflash === 0 ? 'on' : 'off'}
                          </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default Flash;
