import { useEffect } from "react"

const ExcelBill = () => {
    useEffect(() => {
        const fetchBills = async() => {
            await fetch('/api/inventory/excelBill')
        }
        fetchBills()
    }, [])

    return (
        <div>
            <h1>Excel file successfully downloaded</h1>
        </div>
    )
}

export default ExcelBill