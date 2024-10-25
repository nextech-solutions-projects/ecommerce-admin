import { Link } from "react-router-dom";

function Navbar2() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand ms-3 pe-2" to={"/shop"}>
          Foodland Halal Market
        </Link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active border-start px-4 border-secondary"
                aria-current="page"
                href="#"
              >
                Live Sell
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;
