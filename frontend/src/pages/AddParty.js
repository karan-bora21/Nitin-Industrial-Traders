import { useState } from 'react';
import Navbar from '../components/navbar';

const AddParty = ({onLogout}) => {
    const [party, setParty] = useState("");
    const [message1, setMessage1] = useState("");
    const [material, setMaterial] = useState("");
    const [message2, setMessage2] = useState("");


    const handleSubmit1 = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submit

        const PartyName = { party };

        const response = await fetch("/api/inventory/addNewCompany", {
            method: 'POST',
            body: JSON.stringify(PartyName),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok) {
            setMessage1("Party added successfully!");
            setParty("")
        } else if (response.status === 409) {
            setMessage1(json.message1); // "Party already exists"
        } else {
            setMessage1("An error occurred. Please try again.");
        }
    }

    const handleSubmit2 = async(e) => {
        e.preventDefault(); // Prevent page refresh on form submit

        const MaterialName = { material };

        const response = await fetch("/api/inventory/addNewMaterial", {
            method: 'POST',
            body: JSON.stringify(MaterialName),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok) {
            setMessage2("Material added successfully!");
            setParty("")
        } else if (response.status === 409) {
            setMessage2(json.message2); // "Material already exists"
        } else {
            setMessage2("An error occurred. Please try again.");
        }
    }

    return (
        <div>
            <Navbar onLogout={onLogout}/>
            <div className="w-75 h-25 m-auto border rounded p-4 mt-4 mb-4">
                <div className="border-bottom">
                    <h4>Add Party and Material</h4>
                </div>
                <form onSubmit={handleSubmit1}>
                    <div className="mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Add Party</label>
                        <input
                            value = {party}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(e) => setParty(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
                {message1 && (
                    <div className="mt-3 alert alert-info" role="alert">
                        {message1}
                    </div>
                )}

                <form onSubmit={handleSubmit2}>
                    <div className="mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Add Material</label>
                        <input
                            value = {material}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(e) => setMaterial(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
                {message2 && (
                    <div className="mt-3 alert alert-info" role="alert">
                        {message2}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddParty;