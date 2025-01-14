import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const CreateBill = ({ onLogout }) => {
    const [partyName, setPartyName] = useState("");
    const [companyNames, setCompanyNames] = useState(null);
    const [itemNames, setItemNames] = useState(null);
    const [materialRows, setMaterialRows] = useState([{ materialName: "", quantity: "" }]);

    useEffect(() => {
        const fetchCompanyNames = async () => {
            const response1 = await fetch("/api/inventory/getCompanyNames");
            const response2 = await fetch("/api/inventory/getMaterialNames");

            const json1 = await response1.json();
            const json2 = await response2.json();

            if (response1.ok && response2.ok) {
                setCompanyNames(json1);
                setItemNames(json2);
            }
        };
        fetchCompanyNames();
    }, []);

    const handleAddRow = () => {
        setMaterialRows([...materialRows, { materialName: "", quantity: "" }]);
    };

    const handleDeleteRow = () => {
        if (materialRows.length > 1) {
            setMaterialRows(materialRows.slice(0, -1));
        }
    };

    const handleMaterialChange = (index, key, value) => {
        const updatedRows = [...materialRows];
        updatedRows[index][key] = value;
        setMaterialRows(updatedRows);
    };

    const handleSubmit = async (event) => {
        const PartyName = partyName;
        const InvoiceDate = document.getElementsByName("InvoiceDate")[0].value;
        const InvoiceNumber = document.getElementsByName("InvoiceNumber")[0].value;
        const InvertDate = document.getElementsByName("InvertDate")[0].value;
        const Transporter = document.getElementsByName("Transporter")[0].value;
        const LRNumber = document.getElementsByName("LRNo")[0].value;
        const Material = materialRows.map((row) => row.materialName);
        const Quantity = materialRows.map((row) => row.quantity);
        const NumberOfBox = document.getElementsByName("NoOfBox")[0].value;

        const bill = {
            PartyName,
            InvoiceDate,
            InvoiceNumber,
            InvertDate,
            Transporter,
            LRNumber,
            Material,
            Quantity,
            NumberOfBox,
        };

        await fetch("/api/inventory", {
            method: "POST",
            body: JSON.stringify(bill),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <div>
            <Navbar onLogout={onLogout} />
            <div className="w-75 h-25 m-auto border rounded p-4 mt-4 mb-4">
                <div className="border-bottom">
                    <h4>Add New Bill</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group-sm mt-2">
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
                            <ul
                                className="dropdown-menu w-100 overflow-auto"
                                style={{ maxHeight: "200px", maxWidth: "100%", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
                            >
                                {companyNames &&
                                    companyNames
                                        .filter((item) => {
                                            const searchTerm = partyName.toLowerCase();
                                            const companyName = item.CompanyName.toLowerCase();
                                            return searchTerm && companyName.includes(searchTerm);
                                        })
                                        .map((item, index) => (
                                            <li key={index} className="dropdown-item">
                                                <div type="button" onClick={() => setPartyName(item.CompanyName)}>
                                                    {item.CompanyName}
                                                </div>
                                            </li>
                                        ))}
                            </ul>
                        </div>
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Invoice Date</label>
                        <input type="date" name="InvoiceDate" className="form-control" />
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Invoice Number</label>
                        <input type="text" name="InvoiceNumber" className="form-control" />
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Inward Date</label>
                        <input type="date" name="InvertDate" className="form-control" />
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Transporter</label>
                        <input type="text" name="Transporter" className="form-control" />
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Transporter LR No</label>
                        <input type="text" name="LRNo" className="form-control" />
                    </div>

                    <div className="mt-2">
                        <div>
                            <table className="table" id="materialTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Material Name</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {materialRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={row.materialName}
                                                    onChange={(e) => handleMaterialChange(index, "materialName", e.target.value)}
                                                    placeholder="Material Name"
                                                    data-bs-toggle="dropdown"
                                                />
                                                <div className="dropdown">
                                                    <ul
                                                        className="dropdown-menu w-100 overflow-auto"
                                                        style={{
                                                            maxHeight: "200px",
                                                            maxWidth: "100%",
                                                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                                        }}
                                                    >
                                                        {itemNames &&
                                                            itemNames
                                                                .filter((item) => {
                                                                    const searchTerm = row.materialName.toLowerCase();
                                                                    return searchTerm && item.MaterialName.toLowerCase().includes(searchTerm);
                                                                })
                                                                .map((item, idx) => (
                                                                    <li key={idx}>
                                                                        <div
                                                                            className="dropdown-item"
                                                                            type="button"
                                                                            onClick={() => handleMaterialChange(index, "materialName", item.MaterialName)}
                                                                        >
                                                                            {item.MaterialName}
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={row.quantity}
                                                    onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                                                    placeholder="Quantity"
                                                    required
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                <button type="button" onClick={handleAddRow} className="btn btn-primary ms-3 me-3">
                                    Add
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleDeleteRow}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="form-label">No Of Box</label>
                        <input type="number" name="NoOfBox" className="form-control" />
                    </div>

                    <div className="mt-4">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBill;
