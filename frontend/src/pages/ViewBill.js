import { useEffect, useState, useRef } from "react"
// Components
import { DownloadTableExcel } from 'react-export-table-to-excel'
import BillDetails from "../components/BillDetails"
import Navbar from "../components/navbar"

const ViewBill = ({ onLogout }) => {
    const [bills, setBills] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const tableRef = useRef(null);

    const fetchBills = async (start, end) => {
        const url = start && end ? `/api/inventory?startDate=${start}&endDate=${end}` : '/api/inventory';
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
            setBills(json);
        }
    };

    useEffect(() => {
        fetchBills(); // Fetch latest 10 bills on initial load
    }, []);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchBills(startDate, endDate); // Fetch filtered bills
    };

    return (
        <div>
            <Navbar onLogout={onLogout} />
            <div className="w-75 m-auto p-2 mt-4">
                <form onSubmit={handleFilterSubmit} className="mb-4">
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="endDate" className="form-label">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-end">
                            <button type="submit" className="btn btn-danger w-100">Filter</button>
                        </div>
                    </div>
                </form>

                <div className="table-responsive view-bill-table">
                    <h4 className="mb-4 grn-text text-center"><strong>GRN Data</strong></h4>
                    <table className="table table-sm table-hover table-light table-bordered border-dark" ref={tableRef}>
                        <thead>
                            <tr>
                                <th scope="col" className="text-center align-middle">GRN No</th>
                                <th scope="col" className="text-center align-middle">Party Name</th>
                                <th scope="col" className="text-center align-middle">Invoice date</th>
                                <th scope="col" className="text-center align-middle">Invoice No</th>
                                <th scope="col" className="text-center align-middle">Transporter</th>
                                <th scope="col" className="text-center align-middle">Lr No</th>
                                <th scope="col" className="text-center align-middle">Material</th>
                                <th scope="col" className="text-center align-middle">Quantity</th>
                                <th scope="col" className="text-center align-middle">No of Box</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills && bills.map((bill) => (
                                <BillDetails key={bill._id} bill={bill} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-75 p-2">
                    <DownloadTableExcel filename="bill data" sheet="bills" currentTableRef={tableRef.current}>
                        <button className="btn btn-success">Export Bill</button>
                    </DownloadTableExcel>
                </div>
            </div>
        </div>
    );
};

export default ViewBill;
