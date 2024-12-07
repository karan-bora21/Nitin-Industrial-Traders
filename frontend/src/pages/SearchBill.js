import { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import BillDetails from '../components/BillDetails';

const SearchBill = ({onLogout}) => {
    const [GRNNumber, setGRNNumber] = useState(null);
    const [companyNames, setCompanyNames] = useState(null);
    const [partyName, setPartyName] = useState("");
    const [itemNames, setItemNames] = useState(null);
    const [materialName, setMaterialName] = useState("");
    const [Error, setError] = useState('');
    const [bills, setBills] = useState(null);

    useEffect(() => {
        const fetchCompanyNames = async() => {
            const response1 = await fetch('/api/inventory/getCompanyNames');
            const response2 = await fetch('api/inventory/getMaterialNames');

            const json1 = await response1.json();
            const json2 = await response2.json();

            if(response1.ok && response2.ok) {
                setCompanyNames(json1);
                setItemNames(json2);
            }
            
        }
        fetchCompanyNames();
    }, []);

    const handleSubmit = async(event) => {
        event.preventDefault()
        const PartyName = document.getElementsByName("PartyName")[0].value
        const MaterialName = document.getElementsByName("MaterialName")[0].value

        const bill = {GRNNumber, PartyName, MaterialName};

        const response = await fetch("/api/inventory/searchBill", {
            method: 'POST',
            body: JSON.stringify(bill),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        if(!response.ok) {
            setError(json.Error);
        }
        if(response.ok) {
            setGRNNumber('');
            setError('')
            setBills(json)
        }
    }
    
    return (
        <div>
            <Navbar onLogout={onLogout}/>
            <div className="searchBill h-25 m-auto rounded p-4 mt-2 mb-4">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-group-sm mt-2 col-lg-4 col-sm-12">
                              <label className="form-label">GRN Number</label>
                              <input 
                                type="number" 
                                className="form-control"
                                onChange={(event) => {setGRNNumber(event.target.value)}}
                              />
                            </div>

                            <div className="input-group-sm mt-2 col-lg-4 col-sm-12">
                              <label className="form-label">Party Name</label>
                              <input
                                type="text"
                                value={partyName}
                                name="PartyName"
                                className="form-control"
                                onChange={(e) => setPartyName(e.target.value)}
                                data-bs-toggle="dropdown" 
                              />
                              <div className="dropdown">
                                <ul className="dropdown-menu w-100 overflow-auto" 
                                    style={{ maxHeight: '200px', maxWidth: '100%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
                                >
                                  {companyNames && companyNames.filter(item => {
                                    const searchTerm = partyName.toLowerCase();
                                    const companyName = item.CompanyName.toLowerCase();

                                    return searchTerm && companyName.startsWith(searchTerm);
                                  }).map((item, index) => (
                                    <li key={index}>
                                      <div className="dropdown-item" type="button" onClick={() => setPartyName(item.CompanyName)}>
                                        {item.CompanyName}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="input-group-sm mt-2 col-lg-4 col-sm-12">
                              <label className="form-label">Material Name</label>
                              <input
                                type="text"
                                value={materialName}
                                name="MaterialName"
                                className="form-control"
                                onChange={(e) => setMaterialName(e.target.value)}
                                data-bs-toggle="dropdown" 
                              />
                              <div className="dropdown">
                                <ul className="dropdown-menu w-100 overflow-auto" 
                                    style={{ maxHeight: '200px', maxWidth: '100%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
                                >
                                  {itemNames && itemNames.filter(item => {
                                    const searchTerm = materialName.toLowerCase();
                                    const itemName = item.MaterialName.toLowerCase();
                                    
                                    return searchTerm && itemName.startsWith(searchTerm);
                                  }).map((item, index) => (
                                    <li key={index}>
                                      <div className="dropdown-item" type="button" onClick={() => setMaterialName(item.MaterialName)}>
                                        {item.MaterialName}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button className="btn btn-primary">Submit</button>
                            {Error && <div>{Error}</div>}
                        </div>
                    </form>
                </div>
                <div className='mt-4 table-responsive search-bill-table'>
                    <table className="table table-sm table-hover table-light table-bordered border-dark">
                      <thead>
                        <tr>
                          <th scope="col">GRN No</th>
                          <th scope="col">Party Name</th>
                          <th scope="col">Invoice date</th>
                          <th scope="col">Invoice No</th>
                          <th scope="col">Transporter</th>
                          <th scope="col">Lr No</th>
                          <th scope="col">Material</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">No of Box</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bills && bills.map((bill) => (
                          <BillDetails key={bill.GRNNumber} bill={bill}/>  
                        ))}
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SearchBill;