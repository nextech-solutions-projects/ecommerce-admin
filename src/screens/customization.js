import { useEffect } from "react";
import { useState } from "react";
import Topbar from "./topbar";
import Navbar from "./navbar";
import customFetch from '../fetch-wrapper';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Customization() {
  const [image, setImage] = useState("");
  const [covers, setCovers] = useState([]);
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
   
  const [adminInfo , setAdminInfo] = useState({})
  const [update,setUpdate] = useState(0)
  const [loading, setLoading] = useState(false);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")



  const [deliveryInfo, setDeliveryInfo] = useState({})

  const subFile = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };


  useEffect(() => {
    setLoading(true)
    customFetch(`${process.env.REACT_APP_URL}covers`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          setCovers(res.payload.cover)
        }
      })
      .catch((err) => console.log(err));
  }, [update]);



  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    customFetch(`${process.env.REACT_APP_URL}admin/${ userInfo.id}`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          console.log(res.payload)
          setEmail(res.payload.user.email)
        }
      })
      .catch((err) => console.log(err));
  }, [update]);



  useEffect(() => {
    customFetch(`${process.env.REACT_APP_URL}delivery-charge`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          setDeliveryInfo(res.payload.DeliveryCharge[0])
        }
      })
      .catch((err) => console.log(err));
  }, [update]);



  function delcover(x){
    setLoading(true)
    const data = new FormData();
    data.append("id", x);

    customFetch(`${process.env.REACT_APP_URL}covers/${x}`, {
      method: "DELETE",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then(res=> {
        setLoading(false)
        if(res.success){
          setUpdate(update+1)
        }
      })
      .catch((err) => console.log(err));

  }

  function submitHandle() {
    setLoading(true)
    const data = new FormData();
    data.append("covertitle",title)
    data.append("covercategory",category)
    data.append("coverimage", image);
    customFetch(`${process.env.REACT_APP_URL}covers`, {
      method: "POST",
      body: data,
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
          document.getElementById("cfrm").reset();
           setUpdate(update+1)
        }
      })
      .catch((err) => console.log(err));
  }


  function updateAdminInfo(){
    setLoading(true)
    const updateData = {}
    if(email !== ""){
      updateData["email"] = email
    }
    if(password !== ""){
      updateData["password"] = password
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    customFetch(`${process.env.REACT_APP_URL}admin/${userInfo.id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
        "Authorization":localStorage.getItem("atoken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
           setUpdate(update+1)
           toast.dark(res.message, {
            icon: "🔥",
          });
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  }




  function updateDeliveryInfo(){
    setLoading(true)
    const updateData = {
      "city": deliveryInfo.city,
      "chargeInside": deliveryInfo.chargeInside,
      "chargeOutside": deliveryInfo.chargeOutside
    }

    customFetch(`${process.env.REACT_APP_URL}delivery-charge/${deliveryInfo.id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
        "Authorization":localStorage.getItem("atoken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        if(res.success){
           setUpdate(update+1)
           toast.dark(res.message, {
            icon: "🔥",
          });
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  }

  return (
    <>
    <Navbar/>
    <div class="container-fluid panel-Background py-4 px-5">
      <Topbar />
      <ToastContainer />

      {loading && <div id="loader" class="loader-backdrop">
        <div class="loader-spinner"></div>
        </div>}

      <div class="addProduct px-5 mb-4">
        <div class="bg-white rounded py-3 px-5">



        <div className="card p-5 m-2 shadow">
        <div class="row pt-2 align-items-center">
            <div class="col-lg-12">
              <h4 class="text-secondary m-0">Website Cover Photo</h4>
            </div>
            <div class="col-lg-6 py-2 mt-3">



              <form className="d-flex" id="cfrm">



              <input
                class="form-control w-100"
                type="file"
                onChange={subFile}
              />

              <div style={{width:'30px'}}></div>
              


              <input
               onChange={(e)=> setTitle(e.target.value)}
               type="text" class="form-control" placeholder="Campaign Title"/>

              <div style={{width:'30px'}}></div>


              {/* <select 
              onChange={(e)=> setCategory(e.target.value)}
              className="form-control">
                <option value="">Select Category</option>
                <>
                {cate.map((item) => (
                  <option value={item.id}>{item.cname}</option>
                ))}
                </>
              </select> */}



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


              </form>
              


              
              <button
                class="btn btn-blue my-3 w-25"
                onClick={() => submitHandle()}
              >
                Update
              </button>
            </div>

            <div style={{ display: "flex" }}>
              {covers.map((item) => (
                <div style={{ margin: 5 }}>
                  <img
                    src={
                      process.env.REACT_APP_URL +
                      item.coverimage
                    }
                    style={{ width: 150 }}
                  />
                  <div><i 
                  onClick={()=>{
                    delcover(item.id)
                  }}
                  className="fa fa-trash" style={{cursor:'pointer'}}></i></div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
          


          <div className="card p-5 m-2 shadow">
            <div class="row pt-2 align-items-center">
            <h4 class="text-secondary m-0">Admin Login Information</h4>
            <div style={{height:40}}></div>
              <div className="col-sm-4">
                <input type="email" placeholder="Email" role="presentation" autocomplete="new-password" autofill="off" class="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
              </div>
              <div className="col-sm-4">
                <input type="password" placeholder="Enter Password" role="presentation" autocomplete="new-password" autofill="off" class="form-control" onChange={(e)=> setPassword(e.target.value)}/>
              </div>
              <div className="col-sm-4">
                <button onClick={()=> updateAdminInfo()} className="btn btn-info">Update</button>
              </div>   
            </div>
          </div>
          





          <div className="card p-5 m-2 shadow">
            <div class="row pt-2 align-items-center">
            <h4 class="text-secondary m-0">Delivery Charge</h4>
            <div style={{height:40}}></div>
              <div className="col-sm-3">
                <label>City</label>
                <input type="text" role="presentation" autocomplete="new-password" autofill="off" class="form-control" value={deliveryInfo.city} onChange={(e)=> {
                  setDeliveryInfo(prevState => ({
                    ...prevState,
                    city: e.target.value
                  }));
                }}/>
              </div>
              <div className="col-sm-3">
                <label>Charge inside</label>
                <input type="number" role="presentation" autocomplete="new-password" autofill="off" class="form-control" value={deliveryInfo.chargeInside} onChange={(e)=> {
                  setDeliveryInfo(prevState => ({
                    ...prevState,
                    chargeInside: e.target.value
                  }));
                }}/>
              </div>
              <div className="col-sm-3">
                <label>Charge Outside</label>
                <input type="number" role="presentation" autocomplete="new-password" autofill="off" class="form-control" value={deliveryInfo.chargeOutside} onChange={(e)=> {
                  setDeliveryInfo(prevState => ({
                    ...prevState,
                    chargeOutside: e.target.value
                  }));
                }}/>
              </div>
              <div className="col-sm-3">
                <label>&nbsp;</label>
                <button onClick={()=> updateDeliveryInfo()} className="btn btn-info">Update</button>
              </div>   
            </div>
          </div>
          
        </div>

        

      </div>
    </div>
    </>
    
  );
}

export default Customization;
