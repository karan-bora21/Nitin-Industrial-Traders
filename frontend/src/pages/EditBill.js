import { useState } from "react";
import Navbar from "../components/navbar";

const EditBill = ({ onLogout }) => {
    const [GRNNumber, setGRNNumber] = useState("");
    const [billData, setBillData] = useState(null);
    const [materialRows, setMaterialRows] = useState([]);

    // Fetch bill details
    const fetchBillDetails = async () => {
        try {
            const response = await fetch(`/api/inventory/editBill/${GRNNumber}`);
            const data = await response.json();
            if (response.ok) {
                setBillData(data);
                setMaterialRows(
                    data.Material.map((material, index) => ({
                        materialName: material,
                        quantity: data.Quantity[index],
                    }))
                );
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error fetching bill details:", error);
        }
    };

    // Update the bill
    const handleUpdate = async () => {
        const updatedBill = {
            ...billData,
            Material: materialRows.map((row) => row.materialName),
            Quantity: materialRows.map((row) => row.quantity),
        };

        try {
            const response = await fetch(`/api/inventory/editBill/${GRNNumber}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBill),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Bill updated successfully!");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error updating bill:", error);
        }
    };

    // Handle field changes
    const handleChange = (field, value) => {
        setBillData({ ...billData, [field]: value });
    };

    // Handle material row changes
    const handleMaterialChange = (index, key, value) => {
        const updatedRows = [...materialRows];
        updatedRows[index][key] = value;
        setMaterialRows(updatedRows);
    };

    // Add or delete material rows
    const handleAddRow = () => {
        setMaterialRows([...materialRows, { materialName: "", quantity: "" }]);
    };

    const handleDeleteRow = () => {
        if (materialRows.length > 1) {
            setMaterialRows(materialRows.slice(0, -1));
        }
    };

    return (
        <div>
            <Navbar onLogout={onLogout} />
            <div className="w-75 m-auto p-4 border rounded mt-4">
                <h4>Update Bill</h4>
                <div className="input-group-sm mt-2">
                    <label className="form-label">Enter GRN Number</label>
                    <input
                        type="number"
                        className="form-control"
                        value={GRNNumber}
                        onChange={(e) => setGRNNumber(e.target.value)}
                    />
                    <button onClick={fetchBillDetails} className="btn btn-danger mt-2">
                        Fetch Bill
                    </button>
                </div>

                {billData && (
                    <div className="mt-4">
                        {/* Party Name */}
                        <div className="input-group-sm mt-2">
                            <label className="form-label">Party Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={billData.PartyName}
                                onChange={(e) => handleChange("PartyName", e.target.value)}
                            />
                        </div>

                        {/* Invoice Date */}
                        <div className="input-group-sm mt-2">
                            <label className="form-label">Invoice Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={billData.InvoiceDate}
                                onChange={(e) => handleChange("InvoiceDate", e.target.value)}
                            />
                        </div>

                        {/* Invoice Number */}
                        <div className="input-group-sm mt-2">
                            <label className="form-label">Invoice Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={billData.InvoiceNumber}
                                onChange={(e) => handleChange("InvoiceNumber", e.target.value)}
                            />
                        </div>

                        {/* Transporter */}
                        <div className="input-group-sm mt-2">
                            <label className="form-label">Transporter</label>
                            <input
                                type="text"
                                className="form-control"
                                value={billData.Transporter}
                                onChange={(e) => handleChange("Transporter", e.target.value)}
                            />
                        </div>

                        {/* LR Number */}
                        <div className="input-group-sm mt-2">
                            <label className="form-label">Transporter LR Number</label>
                            <input
                                type="number"
                                className="form-control"
                                value={billData.LRNumber}
                                onChange={(e) => handleChange("LRNumber", e.target.value)}
                            />
                        </div>

                        {/* Material and Quantity */}
                        <div className="mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Material Name</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materialRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={row.materialName}
                                                    onChange={(e) =>
                                                        handleMaterialChange(index, "materialName", e.target.value)
                                                    }
                                                    placeholder="Material Name"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={row.quantity}
                                                    onChange={(e) =>
                                                        handleMaterialChange(index, "quantity", e.target.value)
                                                    }
                                                    placeholder="Quantity"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button type="button" onClick={handleAddRow} className="btn btn-danger me-3">
                                Add Row
                            </button>
                            <button type="button" onClick={handleDeleteRow} className="btn btn-danger">
                                Delete Row
                            </button>
                        </div>

                        {/* Number of Boxes */}
                        <div className="input-group-sm mt-2">
                            <label className="form-label">Number of Boxes</label>
                            <input
                                type="number"
                                className="form-control"
                                value={billData.NumberOfBox}
                                onChange={(e) => handleChange("NumberOfBox", e.target.value)}
                            />
                        </div>

                        <button onClick={handleUpdate} className="btn btn-danger mt-4">
                            Update Bill
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditBill;
