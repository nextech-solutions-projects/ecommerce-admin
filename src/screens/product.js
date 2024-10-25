import Topbar from "./topbar";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customFetch from '../fetch-wrapper';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Product() {
  const [product, setProduct] = useState([]);
  const [productAll,setProductAll] = useState([])

  const [cate, setCate] = useState("");
  const [search, setSearch] = useState("");
  const [count,setCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [pname, setPname] = useState("");
  const [quan, setQuan] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [pprice, setPprice] = useState("");
  const [rprice, setRprice] = useState("");
  const [supplier,setSupplier] = useState("");
  const [activeId, setActiveId] = useState("");
  const [des,setDes] = useState([])
  const [categoryList, setCategoryList] = useState([])
  

  useEffect(() => {
    setLoading(true)
    customFetch(`${process.env.REACT_APP_URL}products`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          setProduct(res.payload.product)
          setProductAll(res.payload.product)
          // setTotalPages(res.payload.product.length/1)
          // handlePageChange(1)
        }
      })
      .catch((err) => console.log(err));
  }, [count]);



  
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
  },[])

  function delProduct(id){
    window.Swal.fire({
      title: 'Are you sure?',
      text: 'All the orders of this product will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
  }).then(result=> {
    if(result.isConfirmed){
      setLoading(true)
      customFetch(`${process.env.REACT_APP_URL}products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false)
          if(res.success){
            setCount(count+1)
          } else {
            toast.dark(res.message, {
              icon: "⚠️",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  })      
    
  }

  

  function updateProduct(){
    window.Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
  }).then(result=> {
    if(result.isConfirmed){
      setLoading(true)
      const updateData = {
        "productname": pname,
        "buyingprice": pprice,
        "sellingprice": price,
        "regularprice":rprice,
        "quantity": quan,
        "productcategory": category,
        "brandname": brand,
        "productdescription":des,
         "supplier":supplier
      }
      customFetch(`${process.env.REACT_APP_URL}products/${activeId}`, {
        method: "PUT",
        body : JSON.stringify(updateData),
        headers: {
          "Content-Type": "application/json",
          "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false)
          if(res.success){
            setCount(count+1)
            toast.dark(res.message, {
              icon: "🔥",
            });
          } else {
            toast.dark(res.message, {
              icon: "⚠️",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  })      
    
  }


  const handlePageChange = (page) => {
    const startIndex = (page - 1) * 1;
    const endIndex = startIndex + 1;
    setProduct(product.slice(startIndex, endIndex));
  };


  function searchProduct(){
    setLoading(true)
    setProduct([])

    console.log(cate)

    let url = `${process.env.REACT_APP_URL}products`;
    if(search !== ''){
      url += `?productname=like:${search}`;
    }
    if(cate !== ''){
      if(search === ''){
        url += `?productcategory=${cate}`;
      } else {
        url += `&productcategory=${cate}`;
      }
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
          setProduct(res.payload.product)
          setProductAll(res.payload.product)
        }
      })
      .catch((err) => console.log(err));
  }

  function openEditModal(data) {
    setPname(data.productname)
    setPprice(data.sellingprice)
    setRprice(data.regularprice)
    setPrice(data.buyingprice)
    setQuan(data.quantity)
    setCategory(data.productcategory)
    setBrand(data.brandname)
    setSupplier(data.supplier)
    setDes(data.productdescription)
    setActiveId(data.id)
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
            <h4 class="text-secondary mb-3 px-5">Product List</h4>

            <div class="row px-5">
              <div class="col-auto">
                <label for="staticEmail2" class="visually-hidden">
                  Categories
                </label>
                <select
                  type="text"
                  class="form-control"
                  onChange={(e) => setCate(e.target.value)}
                >
                  <option value="">All</option>
                  {categoryList.map((item) => (
                      <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div class="col-auto">
                <label for="inputPassword2" class="visually-hidden">
                  Search
                </label>
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  class="form-control"
                  id="inputPassword2"
                  placeholder="Product Name"
                />
              </div>

              <div className="col-auto">
                <button className="btn btn-info" onClick={()=> searchProduct()}>Search</button>
              </div>
              {/* <div class="col-auto">
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
              </div> */}
            </div>
            <br />

            <table class="table text-center fw-normal">
              <thead>
                <tr class="border-top border-bottom border-secondary">
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Product ID
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Image
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Product Name
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Brand
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Category
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Quantity
                  </th>
                  
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Buying Price
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Regular Price
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Sell Price
                  </th>
                  <th class="fw-normal text-secondary fw-bold" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product
                  .filter((item) => {
                    if (
                      item.productname
                        ?.toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return item;
                    }
                    // if (item.createdAt?.includes(search)) {
                    //   return item;
                    // }

                    if (item.productcategory?.includes(cate)) {
                      return item;
                    }
                  })
                  .map((item) => (
                    <tr class="border-bottom border-secondary">
                      <td class="text-secondary">{item.id}</td>
                      <td class="text-secondary">
                        <img src={`${process.env.REACT_APP_URL}${item.pimage}`} alt="" style={{'height':'40px'}}/>
                      </td>
                      <td class="text-secondary">
                        <p>{item.productname}</p>
                      </td>
                      <td class="text-secondary">{item.brandname}</td>
                      <td class="text-secondary">
                        {item.productcategory === "1" ? "ইলেক্ট্রনিক ডেকোরেশন" : item.productcategory === "2" ? "মাইক্রোফোন" : "ইলেকট্রনিক্স গ্যাজেট"}
                      </td>
                      <td class="text-secondary">
                         {item.quantity}
                      </td>
                      <td class="text-secondary">{item.buyingprice}</td>
                      <td class="text-secondary">{item.regularprice}</td>
                      <td class="text-secondary">{item.sellingprice}</td>
                      <td>
                        <button className="btn btn=info" type="button" onClick={()=> delProduct(item.id)}>Delete</button>
                        <button className="btn btn=info" type="button" onClick={()=> openEditModal(item)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>



            {/* <div class="d-flex justify-content-center">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                {[...Array(totalPages)].map((_, index) =>(
                    <li class="page-item"><a class="page-link" onClick={()=> handlePageChange(index+1)}>{index+1}</a></li>
                ))}
                </ul>
              </nav>
            </div> */}

            



          </div>
        </div>
      </div>



      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Update Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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
                        value={pname}
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
                        value={category}
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
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row">
                    
                    <div class="col-lg-6 mb-3">
                      <label for="productID" class="form-label text-secondary">
                        Purchase Price ($)
                      </label>
                      <input
                        type="number"
                        class="form-control rounded-0"
                        id="productID"
                        placeholder=""
                        value={pprice}
                        onChange={(e) => setPprice(e.target.value)}
                      />
                    </div>
                    <div class="col-lg-6 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Sell Price
                      </label>
                      <input
                        type="number"
                        class="form-control rounded-0"
                        id="productID"
                        placeholder=""
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>


                  <div className="row">
                  <div class="col-lg-6 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Regular Price
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="productID"
                        placeholder=""
                        value={rprice}
                        onChange={(e) => setRprice(e.target.value)} 
                      />
                    </div>


                    <div class="col-lg-6 mb-3">
                      <label for="productID" class="form-label addProduct-text">
                        Quantity
                      </label>
                      <input
                        type="text"
                        class="form-control rounded-0"
                        id="quantity"
                        placeholder=""
                        value={quan}
                        onChange={(e) => setQuan(e.target.value)} 
                      />
                    </div>

                  </div>



                  <div className="row">
                    <div class="col-lg-12 mb-3">
                      <CKEditor
                        editor={ClassicEditor}
                        data={des}
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
                  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=> updateProduct()}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
