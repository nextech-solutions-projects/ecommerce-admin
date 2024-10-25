import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function Invoice(props) {
  const id = props.match.params.id;

  const [order, setOrder] = useState([]);
  const [orderitem, setOrderitem] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = new FormData();
    fetch(`${process.env.REACT_APP_URL}orders?id=eq:${id}`, {
      method: "GET",
      headers: {
        "Authorization":localStorage.getItem("atoken"),  // Correctly set the Content-Type
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          setOrder(res.payload.order);
        }
        
      })
      .catch((err) => console.log(err));
  }, []);




  function print() {
    window.print();
  }
  return (
    <div id="invoice">
      <div class="invoice overflow-auto">
        <div>
          <header>
            <div class="row">
              <div class="col">
                <img
                  width="200"
                  src={require("../image/icons/logo.png")}
                  data-holder-rendered="true"
                />
              </div>
              <div class="col company-details">
                <div>Islampur , Dhaka</div>
                <div>01715646569</div>
                <div>info@mayedamart.com</div>
              </div>
            </div>
          </header>

          {order.map((item) => (
            <main>
              <div class="row contacts">
                

                <div class="col invoice-to">
                  <h5 class="font-weight-bold border-bottom dorder-dark text-dark">
                    Customer Info
                  </h5>
                  <p class="fw-bold mb-0">Customer Name: {item.user.username}</p>
                  <p class="fw-bold mb-0">Email: {item.user.email}</p>
                  <p class="fw-bold mb-0">Phone: {item.deliveryPhoneNumber}</p>
                </div>
                <div class="col invoice-to">
                  <h5 class="font-weight-bold border-bottom dorder-dark text-dark">
                    Delivery Info
                  </h5>
                  <p class="fw-bold mb-0">Location: {item.deliveryAddress}</p>
                  <p class="fw-bold mb-0">Mobile: {item.deliveryPhoneNumber}</p>
                </div>

                <div class="col invoice-details">
                  <h3 class="invoice-id">INVOICE #{item.id}</h3>
                </div>
              </div>
              <table
                border="0"
                cellspacing="0"
                cellpadding="0"
                width="100%"
                class="table-bordered invoicetable border-dark"
              >
                <thead>
                  <tr>
                    <th width="5%" class="text-center">
                      SL
                    </th>
                    <th width="50%" class="text-center">
                      Product
                    </th>
                    <th width="15%" class="text-center">
                      Quantity
                    </th>
                    <th width="15%" class="text-end px-2">
                      Price
                    </th>
                    <th width="15%" class="text-end px-2">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.orderItems.map((x) => (
                    <tr>
                      <td class="text-center font-color">{x.id}</td>
                      <td class="font-color px-2">
                        <h6>{x.productName}</h6>
                      </td>

                      <td class="qty no text-center font-color">{x.quantity}</td>
                      <td class="text-end font-color px-2">{x.price} ৳</td>
                      <td class="text-end font-color px-2">
                        {x.quantity * x.price} ৳
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2"></td>
                    <td colspan="2" class="text-end font-color p-2">
                      Subtotal
                    </td>
                    <td class="text-end font-color p-2">{item.totalPrice} ৳</td>
                  </tr>
                  <tr>
                    <td colspan="2"></td>
                    <td colspan="2" class="text-end font-color p-2">
                      Delivery Fee
                    </td>
                    <td class="text-end font-color p-2">0 ৳</td>
                  </tr>
                  <tr>
                    <td class="font-color" colspan="2"></td>
                    <td
                      class="text-end font-color p-2 fw-bold fs-5"
                      colspan="2"
                    >
                      Grand Total
                    </td>
                    <td class="text-end font-color p-2 fw-bold fs-5">
                      {item.totalPrice} ৳
                    </td>
                  </tr>
                </tfoot>
              </table>
            </main>
          ))}
        </div>
        <div class="text-right noprint">
          <button onClick={() => print()} class="btn btn-info">
            <i class="fa fa-print"></i> Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Invoice);
