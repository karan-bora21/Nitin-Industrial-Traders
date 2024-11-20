import { useState } from 'react';
import Navbar from '../components/navbar';

const AddParty = () => {
    const [party, setParty] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
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
            setMessage("Party added successfully!");
            setParty("")
        } else if (response.status === 409) {
            setMessage(json.message); // "Party already exists"
        } else {
            setMessage("An error occurred. Please try again.");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="w-75 h-25 m-auto border rounded p-4 mt-4 mb-4">
                <div className="border-bottom">
                    <h4>Add Party and Material</h4>
                </div>
                <form onSubmit={handleSubmit}>
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
                {message && (
                    <div className="mt-3 alert alert-info" role="alert">
                        {message}
                    </div>
                )}

                {/* <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Add Material</label>
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
                {message && (
                    <div className="mt-3 alert alert-info" role="alert">
                        {message}
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default AddParty;