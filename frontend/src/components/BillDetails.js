const BillDetails = ({ bill }) => {
    return (
        <tr>
            <th scope="row" className="text-center align-top">{bill.GRNNumber}</th>
            <td>{bill.PartyName}</td>
            <td>{bill.InvoiceDate}</td>
            <td>{bill.InvoiceNumber}</td>
            <td>{bill.InvertDate}</td>
            <td>{bill.Transporter}</td>
            <td>{bill.LRNumber}</td>
            <td colSpan="2">
                <div>
                    {bill.Material.map((material, index) => (
                        <div
                            key={index}
                            className={`d-flex justify-content-between align-items-center ${
                                index !== bill.Material.length - 1 ? "material-quantity-row" : ""
                            }`}
                        >
                            <span>{material}</span>
                            <span>{bill.Quantity[index]}</span>
                        </div>
                    ))}
                </div>
            </td>
            <td className="text-center align-middle">{bill.NumberOfBox}</td>
        </tr>
    );
};

export default BillDetails;
