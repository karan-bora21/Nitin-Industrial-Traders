import { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import BillDetails from '../components/BillDetails';
import item from '../item';
// import partyName from '../partyName';

const SearchBill = ({onLogout}) => {
    const [GRNNumber, setGRNNumber] = useState(null);
    const [Error, setError] = useState('');
    const [bills, setBills] = useState(null);
    const [companyNames, setCompanyNames] = useState(null);

    useEffect(() => {
        const fetchCompanyNames = async() => {
            const response = await fetch('/api/inventory/getCompanyNames');
            const json = await response.json();

            console.log(json);

            if(response.ok) {
                setCompanyNames(json);
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
                                <select className="form-select" name="PartyName">
                                    <option selected>Open Party</option>
                                    {companyNames && companyNames.map((item) => (
                                        <option>{item.CompanyName}</option>
                                    ))}
                                </select>
                            </div>

                            {/* <div className="input-group-sm mt-2 col-lg-4 col-sm-12">
                                <label className="form-label">Party Name</label>
                                <select className="form-select" name="PartyName">
                                    <option selected>Open Party</option>
                                    {partyName.partyNames.map((item) => (
                                        <option>{item}</option>
                                    ))}
                                </select>
                            </div> */}

                            <div className="input-group-sm mt-2 col-lg-4 col-sm-12">
                                <label className="form-label">Material Name</label>
                                <select className="form-select" name="MaterialName">
                                    <option selected>Open Items</option>
                                    {item.items.map((item) => (
                                        <option>{item}</option>
                                    ))}
                                </select>
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