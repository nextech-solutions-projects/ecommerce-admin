import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Topbar from "./topbar";
import customFetch from '../fetch-wrapper';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const [orderprod, setOrderprod] = useState([]);
  const [user, setUser] = useState([]);
  const [update,setUpdate] = useState(0)
  

  function print() {
    window.print();
  }

  useEffect(() => {
    customFetch(`${process.env.REACT_APP_URL}orders`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => 
        {

          if(res.success){
            setOrders(res.payload.order)
          }
        })
      .catch((err) => console.log(err));
  }, [update]);


  function updates(x, z) {
    window.Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
  }).then(result => {
    if (result.isConfirmed) {
      const updateData = {
        "status":z
      }
      customFetch(`${process.env.REACT_APP_URL}orders/${x}`, {
        method: "PUT",
        body: JSON.stringify(updateData),
        headers: {
          "Content-Type": "application/json", 
          "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if(res.success){
            setUpdate(update+1)
          } else {
            toast.dark(res.message, {
              icon: "⚠️",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  })



    
  }

  return (
    <>
      <Navbar />
      <div class="container-fluid panel-Background panel-BackgroundH py-4 px-5">
        <Topbar />
        <ToastContainer />
        <div class="row">
          <div class="col-lg-12 mb-3">
            <h3 class="text-secondary px-5">Order From Online</h3>
            <div class="container-lg mx-auto justify-content-center bg-light mx-1">
              <center>
                <ul class="row nav nav-pills mb-3 text-center w-100">
                  <li class="nav-item col-lg-3">
                    <a
                      data-bs-toggle="tab"
                      href="#newOrder"
                      class="nav-link p-3 text-dark active"
                    >
                      <b>New Order</b>
                    </a>
                  </li>
                  <li class="nav-item col-lg-3">
                    <a
                      data-bs-toggle="tab"
                      href="#runOrder"
                      class="nav-link p-3 text-dark"
                    >
                      <b>Running Order</b>
                    </a>
                  </li>
                  <li class="nav-item col-lg-3">
                    <a
                      data-bs-toggle="tab"
                      href="#orderDeliver"
                      class="nav-link p-3 text-dark"
                    >
                      <b>Order Delivered</b>
                    </a>
                  </li>

                  

                  <li class="nav-item col-lg-3">
                    <a
                      data-bs-toggle="tab"
                      href="#cancelDeliver"
                      class="nav-link p-3 text-dark"
                    >
                      <b>Order Cancelled</b>
                    </a>
                  </li>
                </ul>
              </center>
            </div>
            <div class="tab-content container-lg bg-white pb-3">
              <div id="newOrder" class="tab-pane fade show active">
                {orders
                  .filter((item) => {
                    if (item.status == "pending") {
                      return item;
                    }
                  })
                  .map((item) => (
                    <div class="row orderproduct py-3">
                      <div class="col-lg-4 panel-Background border-end border-secondary">
                        <h6 class="text-secondary">
                          <b>Order Id: </b> {item.id}
                        </h6>
                        <h6 class="text-secondary">
                          <b>Customer Name: {item.user.username} </b>
                        </h6>
                        <h6 class="text-secondary">
                          <b>Mobile No: {item.deliveryPhoneNumber}</b>                         
                        </h6>
                        <h6 class="text-secondary">
                          <b>Delivery Location: </b> {item.deliveryAddress}
                        </h6>
                      </div>

                      <div class="col-lg-5 panel-Background border-end border-secondary">
                        <div class="pr-head">
                          <div class="row border-bottom fw-bold bg-light">
                            <div class="col-lg-8">
                              <p class="fs-6 text-center text-secondary m-0">
                                Product
                              </p>
                            </div>
                            <div class="col-lg-2">
                              <div class="fs-6 text-center text-secondary m-0">
                                Qty
                              </div>
                            </div>
                            <div class="col-lg-2">
                              <div class="fs-6 text-center text-secondary m-0">
                                Price
                              </div>
                            </div>
                          </div>
                        </div>


                        {item.orderItems.map((x)=> (
                            <div class="row border-bottom py-1">
                            <div class="col-lg-8">
                              <p class="fs-6 text-center text-secondary m-0">
                                {x.productName}
                              </p> 
                            </div>
                            <div class="col-lg-2">
                              <div class="fs-6 text-center text-secondary m-0">
                                {x.quantity}
                              </div>
                            </div>
                            <div class="col-lg-2">
                              <div class="fs-6 text-center text-secondary m-0">
                                {x.price}
                              </div>
                            </div>
                          </div>
                        ))}

                        
                      </div>
                      <div class="col-lg-3 panel-Background">
                        <div class="pr-head">
                          <p class="fs-6 text-secondary">
                            Delivery Charge:{" "}
                            <span class="addProduct-text"></span>
                          </p>
                          <p class="fs-6 fw-bold text-secondary">
                            Total Amount:{" "}
                            <span class="addProduct-text"> {item.totalPrice}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => updates(item.id, "accepted")}
                          class="btn barcode-btn mt-0 rounded-0 w-100 mb-2"
                        >
                          Order Confirm
                        </button>
                        <button
                          onClick={() => updates(item.id, "Cancelled")}
                          class="btn btn-light rounded-0 w-100 text-secondary"
                        >
                          Order Cancel
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div id="runOrder" class="tab-pane fade">
                {orders
                  .filter((item) => {
                    if (item.status == "accepted") {
                      return item;
                    }
                  })
                  .map((item) => (
                    <div class="row orderproduct py-3">




                      <div class="col-lg-4  panel-Background  border-end border-secondary">
                        <h6 class="text-secondary">
                          <b>Order Id: </b> {item.id}
                        </h6>

                        <h6 class="text-secondary">
                          <b>Order Id: </b> {item.id}
                        </h6>
                        <h6 class="text-secondary">
                          <b>Customer Name: {item.user.username} </b>
                        </h6>
                        <h6 class="text-secondary">
                          <b>Mobile No: {item.deliveryPhoneNumber}</b>                         
                        </h6>
                        <h6 class="text-secondary">
                          <b>Delivery Location: </b> {item.deliveryAddress}
                        </h6>
                      </div>







                      

                      <div class="col-lg-5 panel-Background border-end border-secondary">
                        <div class="pr-head">
                          <div class="row border-bottom fw-bold bg-light">
                            <div class="col-lg-8">
                              <p class="fs-6 text-center text-secondary m-0">
                                Product
                              </p>
                            </div>
                            <div class="col-lg-2">
                              <div class="fs-6 text-center text-secondary m-0">
                                Qty
                              </div>
                            </div>
                            <div class="col-lg-2">
                              <div class="fs-6 text-center text-secondary m-0">
                                Price
                              </div>
                            </div>
                          </div>
                        </div>

                        {item.orderItems.map((x)=> (
                            <div class="row border-bottom py-1">
                            <div class="col-lg-8">
                              <p class="fs-6 text-center text-secondary m-0">
                                {x.productName}
                              </p> 
                            </div>
                            <div class="col-lg-2">
                              <div class="fs-6 text-center text-secondary m-0">
                                {x.quantity}
                              </div>
                            </div>
                            <div class="col-lg-2">
                              <div class="fs-6 text-center text-secondary m-0">
                                {x.price}
                              </div>
                            </div>
                          </div>
                        ))}


                      </div>

                      <div class="col-lg-3 panel-Background">
                        <div class="pr-head  ">
                          <p class="fs-6 text-secondary">
                            Delivery Charge:{" "}
                            <span class="addProduct-text"></span>
                          </p>
                          <p class="fs-6 fw-bold text-secondary">
                            Total Amount:{" "}
                            <span class="addProduct-text"> {item.totalPrice}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => updates(item.id, "delivered")}
                          class="btn barcode-btn mt-0 rounded-0 w-100 mb-2"
                        >
                          Deliver Now
                        </button>
                        <Link to={"/invoice/" + item.id} class="btn barcode-btn rounded-0 w-100 mt-0">
                          Generate Invoice
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
              <div id="orderDeliver" class="tab-pane fade">
                {orders
                  .filter((item) => {
                    if (item.status == "delivered") {
                      return item;
                    }
                  })
                  .map((item) => (
                    <div class="row">
                      <h5 class="text-secondary mt-2">
                        Delivered Product List
                      </h5>
                      <div class="col-lg-6 mt-4 panel-Background p-4">
                        <h6 class="text-secondary">
                          <b>Order Id: </b> {item.id}
                        </h6>
                        <h6 class="text-secondary">
                          <b>Customer Name: {item.user.username} </b>
                        </h6>
                        <h6 class="text-secondary">
                          <b>Mobile No: {item.deliveryPhoneNumber}</b>                         
                        </h6>
                        <h6 class="text-secondary">
                          <b>Delivery Location: </b> {item.deliveryAddress}
                        </h6>
                      </div>
                      <div class="col-lg-3 mt-4 panel-Background">
                        <div class="pr-head mt-2">
                          <p class="text-secondary text-center mt-5 fs-3">
                            Total Amount:{" "}
                            <span class="addProduct-text">  {item.totalPrice}</span>
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-3 mt-4 panel-Background">
                        <Link
                          to={"/invoice/" + item.id}
                          class="btn barcode-btn mt-0 rounded-0 w-100 mb-2 mt-5"
                        >
                          Show Invoice
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>

              <div id="cancelDeliver" class="tab-pane fade">
                {orders
                  .filter((item) => {
                    if (item.status == "cancelled") {
                      return item;
                    }
                  })
                  .map((item) => (
                    <div class="row">
                      <h5 class="text-secondary mt-2">
                        Delivered Product List
                      </h5>
                      <div class="col-lg-6 mt-4 panel-Background p-4">
                        <h6 class="text-secondary">Order Id: {item.id}</h6>
                        <h6 class="text-secondary">
                          <b>Customer Name: {item.user.username} </b>
                        </h6>
                        <h6 class="text-secondary">
                          <b>Mobile No: {item.deliveryPhoneNumber}</b>                         
                        </h6>
                        <h6 class="text-secondary">
                          <b>Delivery Location: </b> {item.deliveryAddress}
                        </h6>
                      </div>
                      <div class="col-lg-3 mt-4 panel-Background">
                        <div class="pr-head mt-2">
                          <p class="text-secondary text-center mt-5 fs-3">
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-3 mt-4 panel-Background">
                        <Link
                          to={"/invoice/" + item.id}
                          class="btn barcode-btn mt-0 rounded-0 w-100 mb-2 mt-5"
                        >
                          Show Invoice
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
