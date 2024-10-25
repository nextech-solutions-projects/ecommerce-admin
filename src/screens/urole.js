import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {withRouter, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Urole(){
    

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('')
    const [section,setSection] = useState('')
    const [alist,setAlist] = useState([])



    function submitHandle(){
      const data = new FormData()
      data.append("name",name)
      data.append("email",email)
      data.append("password",password)
      data.append("role",role);
      data.append("section",section)

      
      
      fetch('https://sowdaapp.com/sandweep/adminpost',{                                             
        method: 'POST',
        body: data
      })   
      .then(res=> res.json())
      .then(res=> console.log(res.message))
      .catch(err=> console.log(err))
    }


    useEffect(()=>{
      fetch('https://sowdaapp.com/sandweep/fetchadmin',{                                             
        method: 'POST'
      })   
      .then(res=> res.json())
      .then(res=> {
        setAlist(res.message)
      })
      .catch(err=> console.log(err))
    },[alist])


    function delit(x){

      const data = new FormData();
      data.append("id",x)
      fetch('https://sowdaapp.com/sandweep/deladmin',{                                             
        method: 'POST',
        body : data
      })   
      .then(res=> res.json())
      .then(res=> {
        console.log(res.message)
      })
      .catch(err=> console.log(err))
    }



    return (

        <>
        <ToastContainer/>
        <div class="container-fluid">
      <div class="text-center">
        <img
          src="resources/img/FL Logo.png"
          alt=""
          class="banner-logo-panel mb-3"
        />
      </div>
      <div class="row mb-5">
        <div class="col-lg-10 mx-auto">
          <div
            class="userRole-panel p-3 border border-secondary rounded bg-white"
          >
            <div class="row">
              <div class="col-lg-10">
                <h3 class="text-secondary">User Role</h3>
              </div>
              <div class="col-lg-2">
                <div class="text-end">
                  <Link to={'/'} class="link-secondary">
                    <i class="fa-solid fa-xmark fs-3"></i>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-lg-4">
                <div class="addUser">
                  <p
                    class="text-secondary text-center py-2 fs-5 panel-Background rounded-top mb-0"
                  >
                    Add User
                  </p>
                  <div class="addUser-form bg-light py-2 px-3 h-100">
                    <div class="formRadios text-center mb-3">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="radioOptions"
                          id="superShopRadio"
                          value="option1"
                          onChange={(e)=> setSection('Shop')}
                        />
                        <label class="form-check-label" for="superShopRadio"
                          >Super Shop</label
                        >
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="radioOptions"
                          id="kitchenRadio"
                          value="option1"
                          onChange={(e)=> setSection('Kitchen')}
                        />
                        <label class="form-check-label" for="kitchenRadio"
                          >Kitchen</label
                        >
                      </div>
                    </div>
                    <input
                      class="form-control border-0 rounded-0 mb-3"
                      type="text"
                      placeholder="Username"
                      onChange={(e)=> setName(e.target.value)}
                    />
                    <input
                      class="form-control border-0 rounded-0 mb-3"
                      type="email"
                      placeholder="Email"
                      autoComplete="off"
                      onChange={(e)=> setEmail(e.target.value)}
                    />
                    <input
                      class="form-control border-0 rounded-0 mb-3"
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      onChange={(e)=> setPassword(e.target.value)}
                    />
                    <select
                      onChange={(e)=> setRole(e.target.value)}
                      class="form-select border-0 rounded-0 mb-3 text-secondary"
                    >
                      <option value="">Choose User Role</option>
                      <option>Manager</option>
                      <option>Sales</option>
                    </select>
                    <button class="btn submit-btn w-100 mb-2" onClick={submitHandle}>Submit</button>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 userList">
                <p
                  class="text-secondary text-center py-2 fs-5 panel-Background rounded-top mb-0"
                >
                  User List
                </p>
                <table class="table">
                  <thead class="text-center">
                    <tr class="text-secondary fs-6">
                      <th scope="col" class="border-0">User Type</th>
                      <th scope="col" class="border-0">Username</th>
                      <th scope="col" class="border-0">User Email</th>
                      <th scope="col" class="border-0">Section</th>
                      <th scope="col" class="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody class="text-center bg-light">
                    
                    {alist.map(item=>(
                       <tr class="text-secondary fs-6">
                        <td class="border-0">{item.role}</td>
                        <td class="border-0">{item.name}</td>
                        <td class="border-0">{item.email}</td>
                        <td class="border-0">{item.section}</td>
                        <td class="border-0"><button class="btn btn-warning" onClick={()=> delit(item.id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    );
}

export default withRouter(Urole);