import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import customFetch from '../fetch-wrapper';
import Topbar from "./topbar";
import Navbar from "./navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Invoicelist() {
  const [online, setOnline] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");
  const [loading,setLoading] = useState(false);


  useEffect(() => {
    const today = new Date();
    const aWeekAgo = new Date();
    aWeekAgo.setDate(today.getDate() - 7);
    setDateFrom(aWeekAgo.toISOString().slice(0,10));
    setDateTo(today.toISOString().slice(0,10));
    customFetch(`${process.env.REACT_APP_URL}orders?status=eq:delivered`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          setOnline(res.payload.order)
        }
      })
      .catch((err) => console.log(err));
  }, []);


  function searchInvoice(){
    setLoading(true)
    let url = `${process.env.REACT_APP_URL}orders?status=eq:delivered`
    if(dateFrom !== "" && dateTo !== ""){
       url += `&createdAt=between:${dateFrom},${dateTo}`
    }

    if(search !== ""){
       url += `&id=${search}`
    }

    customFetch(url, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          setOnline(res.payload.order)
        }
      })
      .catch((err) => console.log(err));
}

 

 
  function formatDate(date) {
    var date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      " " +
      strTime
    );
  }

  return (
    <>
      <Navbar />
      <div class="container-fluid panel-Background panel-BackgroundH py-4 px-5">
        <Topbar />
        <ToastContainer />


        {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
        </div>}

        <div class="productList px-5 mb-4">
          <div class="bg-light rounded py-3">
            <h4 class="text-secondary mb-3 px-5">Invoice List</h4>

            <div class="row px-5">
              <div class="col-auto">
                <label for="staticEmail2" class="visually-hidden">
                  Categories
                </label>
                
              </div>
              <div class="col-auto">
                <label for="inputPassword2" class="visually-hidden">
                  Search
                </label>
                <label>Invoice Number</label>
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  class="form-control"
                  id="inputPassword2"
                  placeholder="Invoice number"
                />
              </div>
              <div class="col-auto">
                <label for="inputPassword2">
                  Date From
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  class="form-control"
                  id="inputPassword2"
                  placeholder="Select date"
                />
              </div>
              <div class="col-auto">
                <label for="inputPassword2">
                  Date To
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  class="form-control"
                  id="inputPassword2"
                  placeholder="Select date"
                />
              </div>
              <div className="col-auto">
                <label>Search</label>
                <br/>
                <button className="btn btn-info" onClick={()=> searchInvoice()}>Search</button>
              </div>
            </div>
            <br />

            <table class="table text-center fw-normal">
                <thead>
                  <tr class="border-top border-bottom border-secondary">
                    <th class="fw-normal text-secondary" scope="col">
                      Invoice Number
                    </th>
                    <th class="fw-normal text-secondary" scope="col">
                      Customer name
                    </th>
                    <th class="fw-normal text-secondary" scope="col">
                      Customer phone
                    </th>
                    <th class="fw-normal text-secondary" scope="col">
                      Delivery address
                    </th>
                    <th class="fw-normal text-secondary" scope="col">
                      Total Price
                    </th>
                    <th class="fw-normal text-secondary" scope="col">
                      Date
                    </th>
                    <th class="fw-normal text-secondary" scope="col">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {online
                    
                    .map((item) => (
                      <tr class="border-bottom border-secondary">
                        <td class="text-secondary"># {item.id}</td>  
                        <td class="text-secondary">{item.user.username}</td>
                        <td class="text-secondary">{item.deliveryPhoneNumber}</td>
                        <td class="text-secondary">
                          {item.deliveryAddress}
                        </td>
                        <td class="text-secondary">
                          {item.totalPrice}
                        </td>
                        <td class="text-secondary">{formatDate(item.createdAt)}</td>
                        <td class="text-secondary">
                          <Link to={"/invoice/" + item.id}>
                            <i class="fa fa-download" />
                          </Link>
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

export default Invoicelist;
