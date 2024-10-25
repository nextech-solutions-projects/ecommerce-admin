import { useState, useEffect } from "react";
import Topbar from "./topbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Social() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [social, setSocial] = useState([]);
  const [activeId, setActiveId] = useState("");

  const [jdate, setJdate] = useState("");
  const [vdate, setVdate] = useState("");

  const [placeOne, setPlaceOne] = useState("");
  const [placeTwo, setPlaceTwo] = useState("");

  const [update, setUpdate] = useState(0);

  function postSocial() {
    const data = new FormData();
    data.append("caption", caption);
    data.append("image", file);

    fetch("https://sowdaapp.com/sandweep/postSocial", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        document.getElementById("spfrm").reset();
        toast.success("Posted");
      })
      .catch((err) => console.log(err));
  }

  function updateJoar() {
    const data = new FormData();
    data.append("jdate", jdate);
    data.append("vdate", vdate);

    fetch("https://sowdaapp.com/sandweep/updateJoar", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("joarV").reset();
        toast.success("Updated");
      })
      .catch((err) => console.log(err));
  }

  function updateBoat() {
    const data = new FormData();
    data.append("placeOne", placeOne);
    data.append("placeTwo", placeTwo);

    fetch("https://sowdaapp.com/sandweep/updateBoat", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("boatV").reset();
        toast.success("Updated");
      })
      .catch((err) => console.log(err));
  }

  function delSocial() {
    const data = new FormData();
    data.append("id", activeId);
    fetch("https://sowdaapp.com/sandweep/delSocial", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("Deleted");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch("https://sowdaapp.com/sandweep/fetchSocial", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setSocial(res.message);
      })
      .catch((err) => console.log(err));
  }, [social]);

  return (
    <div class="container-fluid panel-Background panel-BackgroundH py-4 px-5">
      <Topbar />
      <ToastContainer />

      <div
        class="modal fade"
        id="delModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="container">
                <h5>Are you sure ?</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => {
                  delSocial();
                }}
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="productList px-5 mb-4">
        <div class="bg-light rounded py-3">
          <div className="row">
            <div className="col-sm-6">
              <div class="m-2 p-2">
                <small>Joar Vata Time</small>
                <form class="d-flex" id="joarV">
                  <input
                    type="time"
                    onChange={(e) => {
                      setJdate(e.target.value);
                    }}
                    class="form-control"
                    placeholder="Joar Vata"
                  />
                  <input
                    type="time"
                    onChange={(e) => {
                      setVdate(e.target.value);
                    }}
                    class="form-control"
                    placeholder="Vata Time"
                  />
                </form>
                <button
                  onClick={() => {
                    updateJoar();
                  }}
                  style={{ marginTop: 20 }}
                  className="btn btn-primary w-100"
                >
                  Update
                </button>
              </div>
              <hr />

              <div class="m-2 p-2">
                <small>Boat Time</small>
                <form class="d-flex" id="boatV">
                  <input
                    type="time"
                    onChange={(e) => {
                      setPlaceOne(e.target.value);
                    }}
                    class="form-control"
                    placeholder="Joar Vata"
                  />
                  <input
                    type="time"
                    onChange={(e) => {
                      setPlaceTwo(e.target.value);
                    }}
                    class="form-control"
                    placeholder="Vata Time"
                  />
                </form>
                <button
                  onClick={() => {
                    updateBoat();
                  }}
                  style={{ marginTop: 20 }}
                  className="btn btn-primary w-100"
                >
                  Update
                </button>
              </div>

              <hr />

              <form id="spfrm">
                <div class="form-group m-2 p-2">
                  <textarea
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                    class="form-control"
                    placeholder="Caption"
                  />
                </div>
                <div class="form-group m-2 p-2">
                  <input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    type="file"
                    class="form-control"
                  />
                </div>
              </form>
              <div class="form-group m-2 p-2">
                <button
                  onClick={() => {
                    postSocial();
                  }}
                  type="submit"
                  class="btn btn-primary w-100"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="col-sm-6">
              <div>
                {social.map((item) => (
                  <div className="card m-2 p-2 position-relative shadow-sm">
                    <div class="dropdown position-absolute top-5 end-0">
                      <a
                        className="text-secondary"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i
                          class="fa fa-ellipsis-h"
                          style={{ marginRight: 20 }}
                        ></i>
                      </a>

                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <li>
                          <a
                            onClick={() => {
                              setActiveId(item.id);
                            }}
                            class="dropdown-item"
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delModal"
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h3>{item.caption}</h3>
                    <img
                      src={"https://sowdaapp.com/sandweep/image/" + item.file}
                      style={{ objectFit: "cover", width: "100%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Social;
