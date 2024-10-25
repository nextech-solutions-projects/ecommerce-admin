import { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../image/icons/logo.jpeg";
import customFetch from '../fetch-wrapper';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  function submitHandle() {
    if (email == "") {
      toast.dark("Email is empty", {
        icon: "📧",
      });

      return false;
    }

    if (password == "") {
      toast.dark("Password is empty", {
        icon: "🔑",
      });

      return false;
    }
    const data = {
      'email' : email,
      'password' : password
    }
    
    setLoading(true);
    fetch(`${process.env.REACT_APP_URL}admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Correctly set the Content-Type
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if (!res.success) {
          toast.dark("Email or password is incorrect", {
            icon: "⚠️",
          });
          return false;
        } else {
          localStorage.setItem("userInfo", JSON.stringify(res.payload.user))
          localStorage.setItem("atoken", res.payload.token);

          history.push("/shop");
        }
      })
      .catch((err) => {
        toast.dark("Network error", {
          icon: "⚠️",
        });
      });
  }

  return (
    <>
      <ToastContainer />

      {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
      </div>}


      <div class="container-fluid">
        <div class="text-center mt-5">
          {/* <img src={require("../images/flogo.png")} alt="" class="banner-logo mb-5" /> */}
        </div>
        <div class="row">
          <div class="col-lg-3 mx-auto text-center">
            <img src={logo} alt="" className="banner-logo mb-5" />
            <div class="bg-white py-3 px-4">
              <p class="fw-bold mt-3">Sign up or login to continue</p>
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control border border-secondary"
                  placeholder="Your E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control border border-secondary"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="text-center mb-4">
                <button class="btn login-btn w-100" onClick={submitHandle}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);
