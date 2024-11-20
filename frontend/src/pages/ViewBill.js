import { useEffect, useState, useRef } from "react"
//Components
import { DownloadTableExcel } from 'react-export-table-to-excel'
import BillDetails from "../components/BillDetails"
import Navbar from "../components/navbar"

const ViewBill = () => {
    const [bills, setBills] = useState(null)
    const tableRef = useRef(null)

    useEffect(() => {
        const fetchBills = async () => {
            const response = await fetch('/api/inventory')
            const json = await response.json()

            if(response.ok) {
                setBills(json)
            }
        }
        fetchBills()
    }, [])

    return (
        <div>
          <Navbar />
          <div className="w-75 m-auto p-2 mt-4 table-responsive view-bill-table">
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
                  <BillDetails key={bill.GRNNumber} bill={bill}/>  
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-75 m-auto p-2">
            <DownloadTableExcel filename="bill data" sheet="bills" currentTableRef={tableRef.current}>
                <button className="btn btn-success">Export Bill</button>
            </DownloadTableExcel>
          </div>
        </div>
    )
}

export default ViewBill