import Topbar from "./topbar";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customFetch from '../fetch-wrapper';

function DeliveryBoy() {
  const [loading,setLoading] = useState(false)
  const [bill, setBill] = useState([]);
  const [delId,setDelId] = useState('');
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [update,setUpdate] = useState(0)
  

  useEffect(() => {
    customFetch(`${process.env.REACT_APP_URL}delivery`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          setBill(res.payload.DeliveryBoy);
        }
      })
      .catch((err) => console.log(err));
  }, [update]);

  function handleSubmit() {
    setLoading(true)
    const data = {
      "name": name,
      "address": address,
      "phone": phone
    }
    customFetch(`${process.env.REACT_APP_URL}delivery`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          document.getElementById("spfrm").reset();
          setUpdate(update+1)
          toast.success("DeliveryBoy added !");
        } else {
          toast.error(res.message)
        }
        
      })
      .catch((err) => {
        setLoading(false)
      });
  }


  function delDelivery(x){
    const data = new FormData();
    data.append("id", x);

    fetch(`${process.env.REACT_APP_URL}delivery/${x}`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then(res=> {
        if(res.success){
          setUpdate(update+1)
        }
      })
      .catch((err) => console.log(err));

  }

  return (
    <>
      <Navbar/>
      <ToastContainer />
      
      {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
        </div>}

      <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure ?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={()=> delDelivery(delId)} type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Add New DeliveryBoy
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="spfrm">
                

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                
              </form>
              <div class="text-start">
                <button
                  type="submit"
                  class="btn btn-blue w-100"
                  onClick={handleSubmit}
                >
                  Add DeliveryBoy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid panel-Background panel-BackgroundH py-4 px-5">
        <Topbar />
        <div class="productList px-5 mb-4">
          <div class="bg-light rounded py-3">
            <h4 class="text-secondary mb-3 px-5">DeliveryBoy</h4>

            <div class="row px-5">
              
              

              <div class="col-auto">
                <button
                  className="btn btn-blue"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Add Delivery Boy
                </button>
              </div>

              <br />
            </div>

            <br />

            <table class="table text-center fw-normal">
              <thead>
                <tr class="border-top border-bottom border-secondary">
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Name
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Address
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Phone Number
                  </th>
                  
                  
                </tr>
              </thead>
              <tbody>
                {bill
                  .map((item) => (
                    <tr class="border-bottom border-secondary">
                      <td class="text-secondary">{item.name}</td>
                      <td class="text-secondary">{item.phone}</td>
                      <td class="text-secondary">{item.address}</td>
                      <td class="text-secondary">
                        <i 
                        style={{cursor:'pointer'}}
                        onClick={()=>{
                          setDelId(item.id);
                        }}
                        class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#delModal"></i>
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

export default DeliveryBoy;
