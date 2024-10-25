import { Link } from "react-router-dom";
function Topbar() {
  return (
    <div class="text-center px-5 mb-4">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-2">
          <Link
            to={"/shop"}
            class="btn btn-secondary adminPanel-btn  pt-3 fs-5"
          >
            Dashboard
          </Link>
        </div>
        <div class="col-lg-2">
          <Link
            to={"/invoicelist"}
            class="btn btn-secondary adminPanel-btn pt-3 fs-5"
          >
            Sales
          </Link>
        </div>
        <div class="col-lg-2">
          <Link
            to={"/deliveryBoy"}
            class="btn btn-secondary adminPanel-btn pt-3 fs-5"
          >
            Delivery Boy
          </Link>
        </div>
        <div class="col-lg-2">
          <Link
            to={"/customization"}
            class="btn btn-secondary adminPanel-btn pt-3 fs-5"
          >
            Customization
          </Link>
        </div>  
      </div>
    </div>
  );
}

export default Topbar;
