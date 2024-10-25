import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { withRouter } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
function Print(props){
    var i = props.match.params.id;
    var list = [1,2,3,4,5]
    const [pname,setPname] = useState('')
    const [price,setPrice] = useState('')



    function makepdf(){
          const data = new FormData();
          data.append("id",i)
          fetch("https://sowdaapp.com/sandweep/barcode",{                                             
          method: 'POST',
          body : data
          })
          .then(res=> res.json())
          .then(res=> {
          })
        .catch(err=>console.log(err))


        var x = i+'.pdf';
        window.location= "https://foodlandhalalmarket.com/"+x;
    }


    useEffect(()=>{
        const data = new FormData();
        data.append("id",i)
        fetch("https://sowdaapp.com/sandweep/fetchsproduct",{                                             
        method: 'POST',
        body : data
        })
        .then(res=> res.json())
        .then(res=> {
            setPname(res.message[0].pname)
            setPrice(res.message[0].price)
        })
      .catch(err=>console.log(err))


    },[])
    return (


        <>
        <button onClick={makepdf}>Generate pdf</button>
        <div id="mdf">
            <h1>hello there</h1>
        
        </div>
        <div class="container">
            <table class="table table-bordered">

                {list.map(item=>(
                    <tr>
                    <td>
                        
                        
                    <center><b>Foodland</b>
                    <Barcode value={i} width={5}/>
                    <br/>
                    <b>{pname} | Price {price} $</b>
                    </center>

                    </td>

                    <td>
                    <center><b>Foodland</b>
                    <Barcode value={i} width={5}/>
                    <br/>
                    <b>{pname} | Price {price} $</b>
                    </center>
                    </td>

                    <td>
                    <center><b>Foodland</b>
                    <Barcode value={i} width={5}/>
                    <br/>
                    <b>{pname} | Price {price} $</b>
                    </center>
                    </td>


                    

                    
                </tr>
                ))}
            </table>
       </div>
       </>
    );
}

export default withRouter(Print); 