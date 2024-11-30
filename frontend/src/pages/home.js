import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container text-center header py-5">
        <h1 className="mb-4 fw-bold grn-text">GRN Portal</h1>
        <div className="row justify-content-center g-3 mt-4">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <a href="/createBill" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              Enter Data
            </a>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <a href="/viewBill" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              View Data
            </a>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <a href="/searchBill" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              Search Data
            </a>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <a href="/addParty" className="btn btn-custom home-button w-100 text-white text-decoration-none">
              Add Party
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
