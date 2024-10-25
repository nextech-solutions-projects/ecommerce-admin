import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Topbar from "./topbar";
import Navbar from "./navbar";
import catgif from "../image/productcat.gif";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import customFetch from '../fetch-wrapper';

function Addproduct() {


  let history = useHistory();
  const [cname, setCname] = useState("");
  const [image, setImage] = useState("");
  const [pname, setPname] = useState("");
  const [quan, setQuan] = useState("");
  const [price, setPrice] = useState("");
  const [pimage, setPimage] = useState("");
  const [pimage2, setPimage2] = useState("");
  const [pimage3, setPimage3] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [pprice, setPprice] = useState("");
  const [rprice, setRprice] = useState("");
  const [des, setDes] = useState("");

  const [supplier,setSupplier] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);


  const subFile = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const subFile2 = async (e) => {
    const file = e.target.files[0];
    setPimage(file);
  };

  const subFile3 = async (e) => {
    const file = e.target.files[0];
    setPimage2(file);
  };

  const subFile4 = async (e) => {
    const file = e.target.files[0];
    setPimage3(file);
  };

  function submitHandle() {
    const data = new FormData();
    data.append("name", cname);
    data.append("icon", image);
    customFetch(`${process.env.REACT_APP_URL}category`, {
      method: "POST",
      body: data,
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          toast.success("Category added successfully !", {
            icon: "🛒",
          });
          document.getElementById("cfrm").reset();
          setUpdate(update+1)
        } else {
          toast.error(res.message)
        }
      })
      .catch((err) => console.log(err));
  }

  function submitHandle2() {
    setLoading(true)
    const data = new FormData();
    data.append("productname", pname);
    data.append("buyingprice", pprice);
    data.append("sellingprice", price);
    data.append("regularprice", rprice);
    data.append("quantity", quan);
    data.append("pimage", pimage);
    data.append("pimage2", pimage2);
    data.append("pimage3", pimage3);
    data.append("productcategory", category);
    data.append("brandname", brand);
    data.append("productdescription", des);
    data.append("supplier",supplier)

    customFetch(`${process.env.REACT_APP_URL}products`, {
      method: "POST",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          document.getElementById("pfrm").reset();
          toast.success("Product added successfully !", {
            icon: "🛒",
          });
          history.push("/product");
        } else {
          toast.error(res.message, {
            icon: "🛒",
          });
        }
        
      })
      .catch((err) => {
        setLoading(false)
        toast.error('Something went wrong.', {
          icon: "🛒",
        });
      });
  }


  function delCategory(id){
    window.Swal.fire({
      title: 'Are you sure?',
      text: 'You can not revert this option.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then(result=> {
      if(result.isConfirmed){
        customFetch(`${process.env.REACT_APP_URL}category/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
          }
        })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false)
          if(res.success){
            toast.success("Category deleted successfully !", {
              icon: "🛒",
            });
            setUpdate(update+1)
          } else {
            toast.error(res.message, {
              icon: "🛒",
            });
          }
          
        })
        .catch((err) => {
          setLoading(false)
          toast.error('Something went wrong.', {
            icon: "🛒",
          });
        });
      }
    })
  }


  useEffect(()=> {
    customFetch(`${process.env.REACT_APP_URL}category`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
           setCategoryList(res.payload.Category)
        } 
      })
      .catch((err) => {
        setLoading(false)
        toast.error('Something went wrong.', {
          icon: "🛒",
        });
      });
  },[update])

  return (
    <>
      <Navbar />
      <div class="container-fluid panel-Background py-4 px-5">
        <ToastContainer />


        {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
        </div>}

        <div
          class="modal fade"
          id="cateModal"
          tabindex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog prcategory">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Product Category
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-lg-6">
                    <p class="fw-bold">New Category</p>
                    <form id="cfrm">
                      <input
                        class="form-control"
                        placeholder="Category name"
                        onChange={(e) => setCname(e.target.value)}
                      />
                      <br />
                      <input
                        type="file"
                        class="form-control"
                        onChange={subFile}
                      />
                      <br />
                    </form>

                    <button
                      class="btn addProd-btn w-100"
                      onClick={submitHandle}
                    >
                      Add Category
                    </button>
                    <div class="text-center mt-2">
                      <img src={catgif} class="catgif" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <p class="fw-bold">Category List</p>
                    <div class="catlistm">
                      {categoryList.map((item) => (
                        <li class="d-flex py-2 border-bottom d-flex justify-content-between">
                          <img
                            src={`${process.env.REACT_APP_URL}${item.icon}`}
                            style={{ width: 20, objectFit: "contain" }}
                            class="cate-logo mx-2"
                            alt=""
                            srcset=""
                          />
                          <p class="b-text m-0">{item.name}</p>
                          <i className="fa fa-trash" style={{cursor:'pointer'}} onClick={()=> delCategory(item.id)}></i>
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <Topbar />
        <div class="addProduct px-5 mb-4">
          <div class="bg-white rounded py-3 px-5">
            <div class="row pt-2 align-items-center">
              <div class="col-lg-8">
                <h4 class="text-secondary m-0">Add Product</h4>
              </div>
              <div class="col-lg-4 row">
                <div className="col-lg-6">
                  <Link
                    to={"/product"}
                    class="btn addProd-btn w-100 rounded-0"
                  >
                    Product List
                  </Link>
                </div>
                
                <div className="col-lg-6">
                  <button type="button" class="btn addProd-btn w-100 rounded-0" data-bs-toggle="modal" data-bs-target="#cateModal">
                    Category
                  </button>
                </div>
                

              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-8">
                <form id="pfrm">

                  <div class="row">
                    <div class="col-lg-12 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Product Name
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="productID"
                        placeholder=""
                        onChange={(e) => setPname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Product Category
                      </label>
                      <select
                        class="form-select rounded-0 text-secondary"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option readonly>Select</option>
                        {categoryList.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                    <div class="col-lg-6 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="productID"
                        placeholder=""
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row">
                    
                    <div class="col-lg-3 mb-3">
                      <label for="productID" class="form-label text-secondary">
                        Purchase Price ($)
                      </label>
                      <input
                        type="number"
                        class="form-control rounded-0"
                        id="productID"
                        placeholder=""
                        onChange={(e) => setPprice(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-3 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Regular Price
                      </label>
                      <input
                        type="number"
                        class="form-control rounded-0"
                        id="productID"
                        placeholder=""
                        onChange={(e) => setRprice(e.target.value)} 
                      />
                    </div>

                    <div class="col-lg-3 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Sell Price
                      </label>
                      <input
                        type="number"
                        class="form-control rounded-0"
                        id="productID"
                        placeholder=""
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-3 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Quantity
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="quantity"
                        placeholder=""
                        onChange={(e) => setQuan(e.target.value)} 
                      />
                    </div>


                  </div>
                  <div class="row">
                    
                    <div class="col-lg-6 mb-3">
                      <label for="formFile" class="form-label addProduct-text">
                        Product Image
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        onChange={subFile2}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div class="col-lg-6 mb-3">
                      <label for="formFile" class="form-label addProduct-text">
                        Product Image 2
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        onChange={subFile3}
                      />
                    </div>

                    <div class="col-lg-6 mb-3">
                      <label for="formFile" class="form-label addProduct-text">
                        Product Image 3
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        onChange={subFile4}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-12 mb-3">
                      <CKEditor
                        editor={ClassicEditor}
                        data=""
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

                      {/* <textarea
                        class="form-control"
                        id="productDesc"
                        rows="3"
                        onChange={(e) => setDes(e.target.value)}
                      ></textarea> */}
                    </div>
                  </div>

                  
                </form>
                <div class="row">
                  <div class="col-lg-4 mb-3">
                    <button
                      onClick={submitHandle2}
                      class="btn addprbtn rounded-0 mt-0"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addproduct;
