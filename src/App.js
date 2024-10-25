import "./App.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./screens/home";
import Login from "./screens/login";
import Urole from "./screens/urole";
import Shop from "./screens/shop.js";
import Addproduct from "./screens/addproduct";
import Product from "./screens/product";
import Sproduct from "./screens/sproduct";
import Print from "./screens/print";
import Pos from "./screens/pos";
import Order from "./screens/order";
import Invoice from "./screens/invoice";
import Invoicelist from "./screens/invoicelist";
import Bill from "./screens/bill";
import Flash from "./screens/flash";
import DeliveryBoy from "./screens/deliveryBoy";
import Social from "./screens/social";
import Customization from "./screens/customization";
import Socialpublic from "./screens/socialPublic";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Shop />
      </Route>

      <Route path="/login/">
        <Login />
      </Route>

      <Route path="/urole/">
        <Urole />
      </Route>

      <Route path="/shop">
        <Shop />
      </Route>

      <Route path="/product">
        <Product />
      </Route>

      <Route path="/pos">
        <Pos />
      </Route>

      <Route path="/invoicelist">
        <Invoicelist />
      </Route>

      <Route path="/bill">
        <Bill />
      </Route>

      <Route path="/deliveryBoy">
        <DeliveryBoy />
      </Route>

      <Route path="/order">
        <Order />
      </Route>

      <Route path="/flash">
        <Flash />
      </Route>

      <Route path="/customization">
        <Customization />
      </Route>

      <Route path="/invoice/:id">
        <Invoice />
      </Route>

      <Route path="/print/:id">
        <Print />
      </Route>

      <Route path="/sproduct/:id">
        <Sproduct />
      </Route>

      <Route path="/addproduct">
        <Addproduct />
      </Route>

      <Route path="/social">
        <Social />
      </Route>


      <Route path="/socialPublic">
        <Socialpublic />
      </Route>
    </Router>
  );
}

export default App;
