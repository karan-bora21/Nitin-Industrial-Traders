import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    onLogout(); // Notify the parent to update authentication state
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{
        background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
        borderRadius: "10px",
        padding: "10px 20px",
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
        <img src="/images/Logo.png" className="logo-image me-2" alt="Logo" />
        </a>

        {/* Toggle button for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-3">
              <a
                className="nav-link text-dark fw-semibold"
                href="/createBill"
                style={{ transition: "color 0.3s" }}
              >
                Enter Data
              </a>
            </li>
            <li className="nav-item mx-3">
              <a
                className="nav-link text-dark fw-semibold"
                href="/viewBill"
                style={{ transition: "color 0.3s" }}
              >
                View Data
              </a>
            </li>
            <li className="nav-item mx-3">
              <a
                className="nav-link text-dark fw-semibold"
                href="/searchBill"
                style={{ transition: "color 0.3s" }}
              >
                Search Data
              </a>
            </li>
            <li className="nav-item mx-3">
              <a
                className="nav-link text-dark fw-semibold"
                href="/addParty"
                style={{ transition: "color 0.3s" }}
              >
                Add Party & Item
              </a>
            </li>
            <li className="nav-item mx-3">
              <a
                className="nav-link text-dark fw-semibold"
                href="/editBill"
                style={{ transition: "color 0.3s" }}
              >
                Edit Bill
              </a>
            </li>
          </ul>

          {/* Logout Icon */}
          <div className="nav-item">
            <button
              className="btn btn-transparent p-0"
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "none",
                position: "relative",
              }}
              title="Logout"
            >
              <FaSignOutAlt
                size={24}
                color="red"
                style={{ cursor: "pointer" }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
