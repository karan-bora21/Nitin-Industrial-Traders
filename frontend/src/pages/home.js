import Navbar from "../components/navbar";

const Home = ({ onLogout }) => {
  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div className="container text-center py-5 mt-5">
        <h1 className="mb-4 fw-bold grn-text">GRN Portal</h1>
        
        {/* First Row: Three Buttons */}
        <div className="row justify-content-center g-3">
          <div className="col-12 col-sm-6 col-md-4">
            <a href="/createBill" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              Enter Data
            </a>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <a href="/viewBill" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              View Data
            </a>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <a href="/searchBill" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              Search Data
            </a>
          </div>
        </div>
        
        {/* Second Row: Two Buttons */}
        <div className="row justify-content-center g-3 mt-3">
          <div className="col-12 col-sm-6 col-md-4">
            <a href="/addParty" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              Add Party
            </a>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <a href="/editBill" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              Edit Bill
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
