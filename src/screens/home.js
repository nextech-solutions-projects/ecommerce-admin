import { useSelector, useDispatch } from "react-redux";
import increment from "../actions";
import { useHistory, withRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import logo from "../image/icons/logo.png";

function Home() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [opass, setOpass] = useState("");

  useEffect(() => {
    if (localStorage.getItem("atoken") == null) {
      history.push("/login");
    } else {
      const data = new FormData();
      data.append("token", localStorage.getItem("atoken"));

      fetch("https://sowdaapp.com/sandweep/admininfo", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setName(res.message[0].name);
          setEmail(res.message[0].email);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function passupdate() {
    if (pass != repass) {
      toast.warn("Password do not match", {
        theme: "dark",
        position: toast.POSITION.TOP_CENTER,
        toastId: "success4",
        autoClose: 2000,
      });

      return false;
    }

    const data = new FormData();

    data.append("opass", opass);
    data.append("pass", pass);
    data.append("token", localStorage.getItem("atoken"));
    fetch("https://sowdaapp.com/sandweep/uppass2", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == null) {
          toast.success("Password changed !", {
            theme: "dark",
            position: toast.POSITION.TOP_CENTER,
            toastId: "success4",
            autoClose: 2000,
          });
        } else {
          toast.success(res.message, {
            theme: "dark",
            position: toast.POSITION.TOP_CENTER,
            toastId: "success4",
            autoClose: 2000,
          });
        }
      })

      .catch((err) => console.log(err));
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="text-center">
          <img src={logo} alt="" className="banner-logo mb-5" />
        </div>
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="text-end">
              <Link to={"/shop"} className="btn superShop-btn fladmin-btn fs-4">
                <i className="fa-solid fa-bag-shopping"></i>&nbsp; Super Shop
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-start">
              <Link
                to={"/kitchen"}
                className="btn liveKitchen-btn fladmin-btn fs-4"
              >
                <i className="fa-solid fa-kitchen-set"></i>&nbsp; Live Kitchen
              </Link>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto">
            <div className="user-info bg-white border border-secondary rounded px-5 py-4">
              <h4 className="text-secondary">
                {name}
                {/* <button className="btn elipsis-btn ms-4">
                  <i className="fa-solid fa-ellipsis fs-6"></i>
                </button> */}
              </h4>
              <p className="text-secondary m-0">Details Location, America.</p>
              <p className="text-secondary m-0">{email}</p>
              <a
                className="link-warning fs-6"
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <p>Change Password</p>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 mx-auto">
            <Link
              to={"/urole"}
              className="btn userRole text-secondary border border-secondary rounded fs-5 py-2"
            >
              User Role
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("atoken");
                history.push("/login");
              }}
              className="btn userRole text-secondary border border-secondary rounded fs-5 py-2"
            >
              Logout <i className="fa fa-sign-out"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        class="modal fade pcmodal"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        data-backdrop="static"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content pcmodalCont">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="col my-2">
                <label for="exampleInputEmail1">Old Password</label>
                <input
                  type="password"
                  class="form-control"
                  onChange={(e) => setOpass(e.target.value)}
                />
              </div>
              <div class="col my-2">
                <label for="exampleInputEmail1">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>

              <div class="col my-2">
                <label for="exampleInputEmail1">Re-type Password</label>
                <input
                  type="password"
                  class="form-control"
                  onChange={(e) => setRepass(e.target.value)}
                />
              </div>

              <div class="col my-3">
                <button
                  class="btn btn-primary w-100"
                  onClick={passupdate}
                  data-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
