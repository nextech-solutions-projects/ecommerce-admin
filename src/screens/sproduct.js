import Barcode from "react-barcode";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Topbar from "./topbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploading from "../image/loading.gif";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Sproduct(props) {
  var i = props.match.params.id;

  let history = useHistory();

  const [product, setProduct] = useState([]);
  const [cate, setCate] = useState([]);
  const [variant, setVariant] = useState([]);
  const [edit, setEdit] = useState(true);

  const [pname, setPname] = useState("");
  const [quan, setQuan] = useState("");
  const [price, setPrice] = useState("");
  const [pimage, setPimage] = useState("");
  const [pimage2, setPimage2] = useState("");
  const [pimage3, setPimage3] = useState("");


  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [unit, setUnit] = useState("");
  const [pprice, setPprice] = useState("");
  const [salert, setSalert] = useState("");
  const [des, setDes] = useState("");
  const [cid, setCid] = useState("");
  const [edate, setEdate] = useState("");
  const [lid, setLid] = useState("");
  const [load, setLoad] = useState(false);
  const [active,setActive] = useState("")


  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [update, setUpdate] = useState(0);
  
  

  useEffect(() => {
    const data = new FormData();
    data.append("pid",i);
    fetch("https://sowdaapp.com/sandweep/fetchvariant", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setVariant(res.message);
      })
      .catch((err) => console.log(err));
  }, [update]);

  const getFilereal = (e) => {
    setLoad(true);

    const data = new FormData();
    data.append("id", i);
    data.append("foo", e.target.files[0]);

    fetch("https://sowdaapp.com/sandweep/imagereal", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoad(false);
        setPimage(res.message);
        toast.success("Image Updated!", {
          theme: "dark",
          position: toast.POSITION.TOP_CENTER,
          toastId: "success4",
          autoClose: 2000,
        });
      })
      .catch((err) => console.log(err));
  };


  const getFilereal2 = (e) => {
    setLoad(true);

    const data = new FormData();
    data.append("id", i);
    data.append("foo", e.target.files[0]);

    fetch("https://sowdaapp.com/sandweep/imagerealsecond", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoad(false);
        setPimage2(res.message);
        toast.success("Image Updated!", {
          theme: "dark",
          position: toast.POSITION.TOP_CENTER,
          toastId: "success4",
          autoClose: 2000,
        });
      })
      .catch((err) => console.log(err));
  };



  const getFilereal3 = (e) => {
    setLoad(true);

    const data = new FormData();
    data.append("id", i);
    data.append("foo", e.target.files[0]);

    fetch("https://sowdaapp.com/sandweep/imagerealthird", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoad(false);
        setPimage3(res.message);
        toast.success("Image Updated!", {
          theme: "dark",
          position: toast.POSITION.TOP_CENTER,
          toastId: "success4",
          autoClose: 2000,
        });
      })
      .catch((err) => console.log(err));
  };


  function delVariation(){
    
    const data = new FormData()
    data.append("id",i)
    fetch("https://sowdaapp.com/sandweep/delVariation", {
      method: "POST",
      body:data
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update+1)
      })
      .catch((err) => console.log(err));
  }

  // useEffect(()=>{
  //   const data = new FormData();
  //   data.append("id",i)
  //   fetch("https://sowdaapp.com/sandweep/barcode",{
  //   method: 'POST',
  //   body : data
  //   })
  //   .then(res=> res.json())
  //   .then(res=> {
  //   })
  // .catch(err=>console.log(err))
  // },[])

  useEffect(() => {
    var data = new FormData();
    data.append("id", i);

    fetch("https://sowdaapp.com/sandweep/fetchsproduct", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setPname(res.message[0].pname);
        setBrand(res.message[0].brand);
        setCid(res.message[0].category);
        setEdate(res.message[0].edate);

        setPimage(res.message[0].pimage);
        setPimage2(res.message[0].pimage2);
        setPimage3(res.message[0].pimage3);


        setQuan(res.message[0].quan);
        setPrice(res.message[0].price);
        setPprice(res.message[0].pprice);
        setSalert(res.message[0].salert);
        setDes(res.message[0].des) 


        setActive(res.message[0].status)
        

      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("https://sowdaapp.com/sandweep/fetchcate", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setCate(res.message);
      })
      .catch((err) => console.log(err));
  }, [cate]);


  function upactive(){

    
    var ac;
    if(active == 1){
      setActive(0)
      ac = 0;
    }

    if(active == 0){
      setActive(1)
      ac = 1;
    }

    const data = new FormData()
    data.append("status",ac)
    data.append("id",i)
    fetch("https://sowdaapp.com/sandweep/upactive", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  }

  function submitHandle() {
    if (!edit) {
      const data = new FormData();
      data.append("pname", pname);
      data.append("quan", quan);
      data.append("price", price);
      data.append("pprice", pprice);
      data.append("unit", unit);
      data.append("cid", cid);
      data.append("brand", brand);
      data.append("salert", salert);
      data.append("des", des);
      data.append("edate", edate);
      data.append("id", i);

      fetch("https://sowdaapp.com/sandweep/productupdate", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          toast.success("Product updated successfully !", {
            icon: "🛒",
          });
        })
        .catch((err) => console.log(err));
    }
  }

  const postVariant = () => {
    if (stock != "") {
      const data = new FormData();
      data.append("color", color);
      data.append("size", size);
      data.append("stock", stock);
      data.append("pid", i);

      fetch("https://sowdaapp.com/sandweep/postvariant", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setUpdate(update + 1);
          setColor("");
          setStock("");
          setSize("");
        })
        .catch((err) => console.log(err));
    }

    else{
      alert('Stock is empty')
    }
  };

  function makepdf() {
    var x = i + ".pdf";
    window.location = "https://sowdaapp.com/sandweep/" + x;
  }

  return (
    <>
      <div
        class="modal fade deletemodal"
        id="deleteModal"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p class=" fw-bold my-2">Do you want to delete this product?</p>
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-cls" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid panel-Background py-4 px-5">
        <Topbar />
        <ToastContainer />
        <div class="productDetails px-5 mb-4">
          <div class="bg-white rounded py-3 px-5">
            <div class="row">
              {load ? (
                <div class="bg-light upgifback">
                  <center>
                    <img src={uploading} class="upgif" alt=".." />
                  </center>
                </div>
              ) : null}

              <div>
                <i
                  onClick={() => history.goBack()}
                  className="fa fa-arrow-left py-4"
                ></i>
              </div>

              <div class="col-lg-7">
                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Product ID</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <p class="text-secondary fw-bold">{i}</p>
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Product Name</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <input
                      class="form-control"
                      value={pname}
                      onChange={(e) => setPname(e.target.value)}
                      readOnly={edit}
                    ></input>
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Brand ID</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <input
                      class="form-control"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      readOnly={edit}
                    ></input>
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Category</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <select
                      class="form-select rounded-0 text-secondary"
                      value={cid}
                      onChange={(e) => setCid(e.target.value)}
                      readOnly={edit}
                    >
                      {cate.map((item) => (
                        <option value={item.id}>{item.cname}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Expiry Date</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <input
                      class="form-control"
                      type="date"
                      value={edate}
                      onChange={(e) => setEdate(e.target.value)}
                      readOnly={edit}
                    ></input>
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Available Stock</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <input
                      class="form-control"
                      value={quan}
                      onChange={(e) => setQuan(e.target.value)}
                      readOnly={edit}
                    ></input>
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Purchase Price</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <input
                      class="form-control"
                      value={pprice}
                      onChange={(e) => setPprice(e.target.value)}
                      readOnly={edit}
                    ></input>
                  </div>
                </div>
                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Sell Price</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <input
                      class="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      readOnly={edit}
                    ></input>
                  </div>
                </div>


                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Minimum Stock Alert</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                    <input
                      class="form-control"
                      value={salert}
                      onChange={(e) => setSalert(e.target.value)}
                      readOnly={edit}
                    ></input>
                  </div>
                </div>


                <div class="row py-1">
                    <div class="col-lg-4 mb-3">
                      <label for="productID" class="form-label text-secondary">
                        Variations
                      </label>
                      <p
                        className="btn btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Add Variations
                      </p>
                    </div>
                </div>




                <div class="row py-1">
                  <div class="col-lg-4">
                    <p class="text-secondary fw-bold">Description</p>
                  </div>
                  <div class="col-lg-1">
                    <p class="text-secondary fw-bold">:</p>
                  </div>
                  <div class="col-lg-7">
                  <CKEditor
                        editor={ClassicEditor}
                        data={des}
                        disabled={edit}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDes(data);
                        }}
                        onBlur={(event, editor) => {
                          console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                          console.log("Focus.", editor);
                        }}
                      />

                  </div>
                </div>



                <div class="row py-3">
                  <div class="col-lg-5">
                    <p class="text-secondary fw-bold">Barcode</p>
                    <button class="btn btn-print" onClick={makepdf}>
                      Print Barcode
                    </button>
                  </div>

                  <div class="col-lg-6">
                    <div class="bg-light barcodeArea py-2 text-center">
                      <Barcode value={i} width={3} />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-5">
                <div class="row mb-4">


                   



                  <div class="col-lg-12 text-center" style={{position:'relative'}}>


                    


                    <div class="bg-white mt-5">


                    

                    <div className="d-flex" style={{position:'absolute',right:'5px',top:'0px'}}>
                      <p className="m-2">Inactvie</p>
                        <label class="d-flex switch">    
                          <input type="checkbox" 
                          onChange={()=> {
                            upactive()
                          }}
                          checked={active == 1 ? true : false} />
                          <span class="slider"></span>  
                        </label>
                      <p className="m-2">Actvie</p>
                    </div>



                      <label for="uppic" style={{ position: "relative" }}>
                        <img
                          src={
                            "https://sowdaapp.com/sandweep/image/" +
                            pimage
                          }
                          style={{ height: 350, objectFit: "cover" }}
                        />
                        <div class="upbttnU">Click to update!</div>
                      </label>
                      <input
                        type="file"
                        id="uppic"
                        style={{ visibility: "hidden" }}
                        onChange={getFilereal}
                      />
                      


                      <div className="row py-3">
                        <div class="col-sm-6">
                          <label for="uppic2" style={{ position: "relative" }}>
                              <img
                                src={
                                  "https://sowdaapp.com/sandweep/image/" +
                                  pimage2
                                }
                                style={{ width:'100%', objectFit: "cover" }}
                              />
                              <div class="upbttnU">Click to update!</div>
                            </label>
                            <input
                              type="file"
                              id="uppic2"
                              style={{ visibility: "hidden" }}
                              onChange={getFilereal2}
                            />
                        </div>

                        <div class="col-sm-6">
                          <label for="uppic3" style={{ position: "relative" }}>
                              <img
                                src={
                                  "https://sowdaapp.com/sandweep/image/" +
                                  pimage3
                                }
                                style={{ width:'100%', objectFit: "cover" }}
                              />
                              <div class="upbttnU">Click to update!</div>
                            </label>
                            <input
                              type="file"
                              id="uppic3"
                              style={{ visibility: "hidden" }}
                              onChange={getFilereal3}
                            />
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="d-flex justify-content-between">
                <button
                  onClick={() => {
                    submitHandle();
                    setEdit(!edit);
                  }}
                  class="btn rounded-0 editProd-btn"
                >
                  {edit ? "Edit Product" : "Update"}
                </button>
                <button
                  class="btn rounded-0 editProd-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i class="fa-solid fa-trash-can mx-2"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog variationmodal">
            <div class="modal-content variationmodal-b">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Variations
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="container">
                  <div class="row g-3 align-items-center">
                    <div class="col-sm-4">
                      <input
                        type="color"
                        value={color}
                        class="form-control"
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                    <div class="col-sm-4">
                      <input
                        type="text"
                        value={size}
                        class="form-control"
                        placeholder="Size"
                        onChange={(e) => setSize(e.target.value)}
                      />
                    </div>
                    <div class="col-sm-4">
                      <input
                        type="text"
                        value={stock}
                        class="form-control"
                        placeholder="Stock"
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>

                  {variant.map((item) => (
                    <div className="row bg-light my-1 align-items-center">
                      <div className="col-lg-4">
                        <div
                          style={{
                            "background-color": item.color,
                            width: 20,
                            height: 20,
                          }}
                        ></div>
                      </div>
                      <div className="col-lg-4">{item.size}</div>
                      <div className="col-lg-2">{item.stock}</div>
                      <div className="col-lg-2">
                        <i 
                        onClick={()=>{
                          delVariation(item.id)
                        }}
                        className="fa fa-trash" style={{cursor:'pointer'}}></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  onClick={postVariant}
                  class="btn btn-secondary"
                >
                  Add More
                </button>
                <button
                  type="button"
                  onClick={postVariant}
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default withRouter(Sproduct);
