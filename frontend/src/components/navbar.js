const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/"><img src="/images/Logo.jpg" className="logo-image" alt="Logo"></img></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active text-dark" aria-current="page" href="/viewBill">View Data</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/createBill">Create Data</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/searchBill">Search Data</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}

export default Navbar