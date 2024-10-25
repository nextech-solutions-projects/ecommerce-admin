import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../image/icons/logo.png";
import neworder from "../image/neworder.gif";
import customFetch from "../fetch-wrapper"

function Navbar() {
  const [show, setShow] = useState(false);

  const [count, setCount] = useState("");


  useEffect(() => {
    customFetch(`${process.env.REACT_APP_URL}admin/token`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(!res.success) {
           //
        }
      })
      .catch((err) => console.log(err));
  },[])


  let history = useHistory();
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand text-secondary ms-5 pe-4" to={"/shop"}>
          <img src={logo} class="navlogo" />
        </Link>
        {/* 
        {show ? (
          <Link className="nav-link" to={"/order"}>
            <p class="orders">
              New Order <span class="neworderblink">{count}</span>
            </p>
          </Link>
        ) : null} */}

        <div class="navbar-nav me-5 fs-5">
          {show ? (
            <Link
              class="nav-link border-end border-secondary fw-bold pe-5"
              to={"/"}
            >
              <small>Super Admin</small>
            </Link>
          ) : null}
          <a
            class="nav-link ps-5"
            href="#"
            onClick={() => {
              localStorage.removeItem("atoken");
              history.push("/login");
            }}
          >
            <small>Logout</small>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
