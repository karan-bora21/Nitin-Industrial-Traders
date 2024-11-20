import Navbar from "../components/navbar"

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container text-center header">
        <div>
          <h1 className="mb-4"><strong>GRN Portal</strong></h1>
          <div className="mt-4">
            <button type="button" className="btn btn-custom home-button"><a href="/createBill" className="text-white">Enter Data</a></button>
            <button type="button" className="btn btn-custom home-button"><a href="/viewBill" className="text-white">View Data</a></button>
            <button type="button" className="btn btn-custom home-button"><a href="/searchBill" className="text-white">Search Data</a></button>
            <button type="button" className="btn btn-custom home-button"><a href="/addParty" className="text-white">Add Party</a></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home


