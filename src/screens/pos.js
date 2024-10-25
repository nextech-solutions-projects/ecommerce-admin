import { useEffect, useState } from "react";
import Navbar from "./navbar2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Pos() {
  const [product, setProduct] = useState([]);
  const [cate, setCate] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [coun, setCoun] = useState(0);
  const [total, setTotal] = useState(0);
  const [dis, setDis] = useState(0);
  const [vat, setVat] = useState(0);
  const [card, setCard] = useState(false);
  const [type, setType] = useState("");
  const [cname, setCname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [pos, setPos] = useState("");

  useEffect(() => {
    if (localStorage.getItem("items") != null) {
      setItems(JSON.parse(localStorage.getItem("items")));
      var i = 0;
      JSON.parse(localStorage.getItem("items")).map((item) => {
        i = i + item.quantity * item.price;
      });
      setTotal(i.toFixed(2));
    } else {
      setItems([]);
      setTotal(0);
      setDis(0);
      setVat(0);
    }
  }, [JSON.parse(localStorage.getItem("items")), coun]);

  useEffect(() => {
    fetch("https://sowdaapp.com/sandweep/fetchproduct2", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  }, []);

  function addcart(x, y, p, z, m) {
    var item = {
      name: x,
      quantity: y,
      price: p,
      id: z,
      total: m,
    };
    var items = [];

    if (localStorage.getItem("items") == null) {
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      var all = JSON.parse(localStorage.getItem("items"));
      all.push(item);
      localStorage.setItem("items", JSON.stringify(all));
    }
    setCoun(coun + 1);
    document.getElementById("fname").value = "";
  }

  function clearcart() {
    localStorage.removeItem("items");
    setCoun(coun + 1);
  }

  document.body.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.getElementById("fname").focus();
      var i = document.getElementById("fname").value;

      product.map((item) => {
        if (item.id == i) {
          addcart(item.pname, 10, 10, 10, 10);
        }
      });
    }
  });

  function sellentry() {
    const data = new FormData();
    data.append("total", total);
    data.append("type", type);
    data.append("dis", dis);
    data.append("vat", vat);
    data.append("cname", cname);
    data.append("phone", phone);
    data.append("address", address);
    data.append("card",card)
    data.append("items", localStorage.getItem("items"));

    fetch("https://sowdaapp.com/sandweep/sellentry", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => console.log(res.message))
      .catch((err) => console.log(err));

    toast.success("Product sold !", {
      icon: "🛒",
    });

    clearcart();
  }

  function upquan(index, i) {
    i++;
    var items = JSON.parse(localStorage.getItem("items"));
    items[index].quantity = i;

    if (i > items[index].total) {
      toast.success("Not enough stock", {
        icon: "🛒",
      });
    } else {
      localStorage.setItem("items", JSON.stringify(items));
    }
    setCoun(coun + 1);
  }

  function upquan2(index, i) {
    i--;
    if (i < 1) {
      i = 1;
    }
    var items = JSON.parse(localStorage.getItem("items"));
    items[index].quantity = i;
    localStorage.setItem("items", JSON.stringify(items));
    setCoun(coun + 1);
  }

  function delit(x) {
    var all = JSON.parse(localStorage.getItem("items"));
    all.splice(x, 1);
    localStorage.setItem("items", JSON.stringify(all));
  }

  return (
    <>
      <Navbar />
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
                Add Customer
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label fw-bold">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCname(e.target.value)}
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label fw-bold">
                    Phone
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label fw-bold">
                    Address
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-blue"
                data-bs-dismiss="modal"
              >
                Add Info
              </button>
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
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {product.map((item) => (
                <div style={{ display: "flex" }}>
                  <input type="checkbox" className="m-2" />
                  <p>{item.pname}</p>
                </div>
              ))}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8" style={{ position: "relative" }}>
            <div style={{ display: "flex" }} className="p-3">
              <i
                class="fa fa-search fs-5 px-2 mt-2"
                style={{ position: "absolute" }}
              ></i>
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShow(true);
                }}
                placeholder="Search Product"
                class="form-control px-5"
              />
            </div>

            {show ? (
              <div
                style={{
                  position: "absolute",
                  background: "white",
                  width: 500,
                  left: 50,
                  padding: 10,
                }}
                class="shadow-lg p-3 mb-5 bg-body rounded"
              >
                {product
                  .filter((item) => {
                    if (
                      item.pname.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return item;
                    }
                  })
                  .map((item) => (
                    <div
                      onClick={() => {
                        addcart(item.pname, 1, item.price, item.id, item.quan);
                        setShow(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <p>{item.pname}</p>
                    </div>
                  ))}
              </div>
            ) : null}
            <div class="px-3">
              <div class="border bg-light border-dark" style={{ height: 400 }}>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  autofocus
                  style={{ display: "none" }}
                />

                <table class="table">
                  <thead>
                    <tr class="text-center">
                      <th scope="col" width="50%">
                        Product Name {pos}
                      </th>
                      <th scope="col" width="10%">
                        Price
                      </th>
                      <th scope="col" width="20%">
                        Quantity
                      </th>
                      <th scope="col" width="10%">
                        Amount
                      </th>
                      <th scope="col" width="10%">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((x, index) => (
                      <tr>
                        <td scope="col" width="50%">
                          {x.name}
                        </td>
                        <td scope="col" class="text-center" width="10%">
                          {x.price}
                        </td>
                        <td scope="col" class="text-center" width="20%">
                          <input
                            type="button"
                            value="+"
                            class="button-plus"
                            data-field="quantity"
                            onClick={() => upquan(index, x.quantity)}
                          />
                          <input
                            type="number"
                            value={x.quantity}
                            placeholder="1000 gm"
                            name="quantity"
                            class="quantity-field border-0 text-center w-25"
                            disabled
                          />
                          <input
                            type="button"
                            value="-"
                            class="button-minus"
                            data-field="quantity"
                            onClick={() => upquan2(index, x.quantity)}
                          />
                        </td>
                        <td scope="col" class="text-center" width="10%">
                          {x.price * x.quantity}
                        </td>
                        <td scope="col" class="text-center" width="10%">
                          <button className="" onClick={() => delit(index)}>
                            <i class="fa-solid fa-trash text-secondary"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ position: "absolute", right: 25, marginTop: 10 }}>
                <table>
                  <tr>
                    <td style={{ paddingRight: 40, fontWeight: 600 }}>
                      Subtotal
                    </td>
                    <td class="fs-5">{total}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Discount (%)</td>
                    <td>
                      <input
                        type="number"
                        value={dis}
                        onChange={(e) => setDis(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Vat (%)</td>
                    <td>
                      <input
                        type="number"
                        value={vat}
                        onChange={(e) => setVat(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        style={{ fontWeight: 600, fontSize: 20, marginTop: 10 }}
                      >
                        Total
                      </p>
                    </td>
                    <td>
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: 30,
                          color: "red",
                          marginTop: 10,
                        }}
                      >
                        ${total - total * (dis / 100) + total * (vat / 100)}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div
              style={{ background: "#ddd", padding: 0, margin: 0, height: 660 }}
            >
              <div style={{ padding: 15 }}>
                <button
                  className="btn btn-blue w-100 p-3"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Add Customer Info
                </button>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  className="btn btn-light w-25 p-2 m-1"
                  onClick={() => setType("cash")}
                >
                  Cash
                </button>
                <button
                  className="btn btn-light w-25 p-2 m-1"
                  onClick={() => {
                    setCard(!card);
                    setType("debit");
                  }}
                >
                  Debit Card
                </button>
                <button
                  className="btn btn-light w-25 p-2 m-1"
                  onClick={() => setType("credit")}
                >
                  Credit Card
                </button>
                <button className="btn btn-light w-20 p-2 m-1" onClick={()=> {
                  setType('other')
                }}>Other</button>





                      {type == "debit" || type == "credit" ? 
                      <div>
                        <label>Enter card number</label>
                        <input type="text" onChange={(e)=> setCard(e.target.value)} className="form-control"/>
                      </div>
                      : null}


              </div>

              

              <div style={{ padding: 15 }}>
                <p style={{ fontSize: 30 }}>
                  Total{" "}
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 30,
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    ${total - total * (dis / 100) + total * (vat / 100)}
                  </span>
                </p>
                <div class="row">
                  <div class="col-lg-4">
                    <button
                      style={{ marginRight: 10 }}
                      className="btn btn-delete p-3 w-100"
                      onClick={clearcart}
                    >
                      Clear Item
                    </button>
                  </div>

                  <div class="col-lg-8">
                    <button
                      className="btn btn-green p-3 w-100"
                      onClick={sellentry}
                    >
                      Cart Done
                    </button>
                  </div>
                </div>

                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pos;
