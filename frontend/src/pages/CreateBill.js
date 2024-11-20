import { useState, useEffect } from "react";
import item from "../item";
import Navbar from "../components/navbar";

const CreateBill = () => {
    const [partyName, setPartyName] = useState("");
    const [companyNames, setCompanyNames] = useState(null);

    useEffect(() => {
        const fetchCompanyNames = async() => {
            const response = await fetch('/api/inventory/getCompanyNames');
            const json = await response.json();

            if(response.ok) {
                console.log("a");
                setCompanyNames(json);
            }
            
        }
        fetchCompanyNames();
    }, []);

    function addRow() {
        const table = document.getElementById("materialTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
    
        // Insert cells
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        const select = document.createElement("select");
        select.className = "form-select";
        select.name = "materialName[]";
    
        item.items.forEach((optionText) => {
          const option = document.createElement("option");
          option.textContent = optionText;
          select.appendChild(option);
        });
    
        // Add the select element to the first cell
        cell1.appendChild(select);
        cell2.innerHTML = '<input type="number" name="quantity[]" placeholder="Quantity" class="form-control" required>';
    }

    const getMaterialName = () => {
        const MaterialNames = document.getElementsByName("materialName[]")
        var MaterialName = []
    
        for(var i = 0; i < MaterialNames.length; i++) {
            MaterialName.push(MaterialNames[i].value)
        }

        return MaterialName
    }

    const getQunatity = () => {
        const Quantities = document.getElementsByName("quantity[]")
        var Quantity = []
        
        for(var i = 0; i < Quantities.length; i++) {
            Quantity.push(Quantities[i].value)
        }

        return Quantity
    }

    const handleSubmit = async(event) => {
        const PartyName = document.getElementsByName("PartyName")[0].value
        const InvoiceDate = document.getElementsByName("InvoiceDate")[0].value
        const InvoiceNumber = document.getElementsByName("InvoiceNumber")[0].value
        const Transporter = document.getElementsByName("Transporter")[0].value
        const LRNumber = document.getElementsByName("LRNo")[0].value
        const Material = getMaterialName()
        const Quantity = getQunatity()
        const NumberOfBox = document.getElementsByName("NoOfBox")[0].value

        const bill = {PartyName, InvoiceDate, InvoiceNumber, Transporter, LRNumber, Material, Quantity, NumberOfBox}
        
        await fetch("/api/inventory", {
            method: 'POST',
            body: JSON.stringify(bill),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    console.log(companyNames);

    return (
        <div>
            <Navbar />
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
                            name="PartyNameInput"
                            className="form-control"
                            onChange={(e) => setPartyName(e.target.value)}
                            data-bs-toggle="dropdown" 
                        />
                        <div className="dropdown">
                            <ul className="dropdown-menu w-100">
                                {companyNames && companyNames.filter(item => {
                                    const searchTerm = partyName.toLowerCase();
                                    const companyName = item.CompanyName.toLowerCase();
                                    
                                    return searchTerm && companyName.startsWith(searchTerm);
                                }).map((item, index) => (
                                    <li key={index}>
                                        <div className="dropdown-item" type="button">
                                            {item.CompanyName}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    <div className="input-group-sm mt-2">
                        <label className="form-label">Party Name</label>
                        <select className="form-select" name="PartyName">
                            <option selected>Open Party</option>
                            {companyNames && companyNames.map((item) => (
                                <option>{item.CompanyName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Invoice Date</label>
                        <input type="date" name="InvoiceDate" className="form-control"/>
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Invoice Number</label>
                        <input type="text" name="InvoiceNumber" className="form-control"/>
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Transporter</label>
                        <input type="text" name="Transporter" className="form-control"/>
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="class-label">Transporter LR No</label>
                        <input type="number" name="LRNo" className="form-control"/>
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
                                    <tr>
                                        <td>
                                            <select className="form-select" name="materialName[]">
                                                <option selected>Open Items</option>
                                                {item.items.map((item) => (
                                                    <option>{item}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td><input type="number" name="quantity[]" placeholder="Quantity" className="form-control" required /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <button type="button" onClick={addRow} className="btn btn-primary ms-3 me-3">Add</button>
                                <button type="button" className="btn btn-primary" onClick={
                                    () => {
                                        const table = document.getElementById("tableBody")
                                        table.removeChild(table.lastElementChild)
                                    }
                                }>Delete</button>
                            </div>
                        </div>
                    </div>

                    <div className="input-group-sm mt-2">
                        <label className="form-label">No Of Box</label>
                        <input type="number" name="NoOfBox" className="form-control"/>
                    </div>
                            
                    <div className="mt-4">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBill