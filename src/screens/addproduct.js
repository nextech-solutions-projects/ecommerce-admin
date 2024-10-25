import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Topbar from "./topbar";
import Navbar from "./navbar";
import catgif from "../image/productcat.gif";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import customFetch from '../fetch-wrapper';

function Addproduct() {


  let history = useHistory();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
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
  const [lid, setLid] = useState("");

  const [supplier,setSupplier] = useState("");

  const [cate, setCate] = useState([]);
  const [variant, setVariant] = useState([]);

  const [desImage, setDesImage] = useState([]);
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
    data.append("cname", cname);
    data.append("image", image);

    console.log(cname);

    customFetch(`${process.env.REACT_APP_URL}products`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
 
    document.getElementById("cfrm").reset();
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
                      {cate.map((item) => (
                        <li class="d-flex py-2 border-bottom">
                          <img
                            src={
                              "https://sowdaapp.com/sandweep/image/" +
                              item.image
                            }
                            style={{ width: 20, objectFit: "contain" }}
                            class="cate-logo mx-2"
                            alt=""
                            srcset=""
                          />
                          <p class="b-text m-0">{item.cname}</p>
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
                <div class="col-lg-12">
                  <Link
                    to={"/product"}
                    class="btn  addProd-btn w-100 rounded-0"
                  >
                    Product List
                  </Link>
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
                        <option value="1">ইলেক্ট্রনিক ডেকোরেশন</option>
                        <option value="2">মাইক্রোফোন</option>
                        <option value="3">ইলেকট্রনিক্স গ্যাজেট</option>
                        {/* {cate.map((item) => (
                          <option value={item.id}>{item.cname}</option>
                        ))} */}
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

                  <div className="row">
                    {desImage.map((item) => (
                      <div className="col-sm-3">
                        <img
                          src={
                            "https://sowdaapp.com/sandweep/image/" +
                            item.desImage
                          }
                          width={150}
                        />
                      </div>
                    ))}
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
