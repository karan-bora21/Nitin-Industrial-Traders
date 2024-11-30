const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/images/Logo.png" className="logo-image me-2" alt="Logo" />
        </a>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active text-dark" href="/viewBill">
                View Data
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/createBill">
                Create Data
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/searchBill">
                Search Data
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
