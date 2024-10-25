import Topbar from "./topbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bill() {
  const [product, setProduct] = useState([]);
  const [cate, setCate] = useState([]);
  const [search, setSearch] = useState("");

  const [bill, setBill] = useState([]);

  const [date, setDate] = useState("");
  const [sname, setSname] = useState("");
  const [ptype, setPtype] = useState("");
  const [brand, setBrand] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch("https://sowdaapp.com/sandweep/fetchbill", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setBill(res.message);
      })
      .catch((err) => console.log(err));
  }, [bill]);

  useEffect(() => {
    fetch("https://sowdaapp.com/sandweep/fetchcate", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setCate(res.message);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit() {
    const data = new FormData();
    data.append("date", date);
    data.append("sname", sname);
    data.append("ptype", ptype);
    data.append("brand", brand);
    data.append("amount", amount);

    fetch("https://sowdaapp.com/sandweep/addbill", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        document.getElementById("spfrm").reset();

        toast.success("Bill added !");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <ToastContainer />
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
                New Bill
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
                    Payment date
                  </label>
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setSname(e.target.value)}
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Product type
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setPtype(e.target.value)}
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Brand
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setBrand(e.target.value)}
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Amount
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setAmount(e.target.value)}
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
                  Add Bill
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
            <h4 class="text-secondary mb-3 px-5">Bill</h4>

            <div class="row px-5">
              <div class="col-auto">
                <label for="inputPassword2" class="visually-hidden">
                  Search
                </label>
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  class="form-control"
                  id="inputPassword2"
                  placeholder="Bill id"
                />
              </div>
              <div class="col-auto">
                <label for="inputPassword2" class="visually-hidden">
                  Date
                </label>
                <input
                  type="date"
                  onChange={(e) => setSearch(e.target.value)}
                  class="form-control"
                  id="inputPassword2"
                  placeholder="Select date"
                />
              </div>

              <div class="col-auto">
                <button
                  className="btn btn-blue"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Add bill
                </button>
              </div>

              <br />
            </div>

            <br />

            <table class="table text-center fw-normal">
              <thead>
                <tr class="border-top border-bottom border-secondary">
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Date
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Bill ID
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Supplier Name
                  </th>

                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Brand
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Product Type
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Paid Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {bill
                  .filter((item) => {
                    if (
                      item.id
                        ?.toString()
                        .toLocaleLowerCase()
                        .includes(search?.toLocaleLowerCase())
                    ) {
                      return item;
                    }
                  })
                  .map((item) => (
                    <tr class="border-bottom border-secondary">
                      <td class="text-secondary">{item.date}</td>
                      <td class="text-secondary">{item.id}</td>
                      <td class="text-secondary">{item.sname}</td>
                      <td class="text-secondary">{item.brand}</td>
                      <td class="text-secondary">{item.ptype}</td>
                      <td class="text-secondary">{item.amount}</td>
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

export default Bill;
