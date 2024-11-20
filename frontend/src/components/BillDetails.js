const BillDetails = ({bill}) => {
    return (
        <tr>
            <th scope="row" className="text-center align-top">{bill.GRNNumber}</th>
            <td>{bill.PartyName}</td>
            <td>{bill.InvoiceDate}</td>
            <td>{bill.InvoiceNumber}</td>
            <td>{bill.Transporter}</td>
            <td>{bill.LRNumber}</td>
            <td>
                <ul className="list-unstyled">
                    {bill.Material.map((material, index) => (
                        <li>{material}</li>
                    ))}
                </ul>
            </td>
            <td>
                <ul className="list-unstyled">
                    {bill.Quantity.map((quantity) => (
                        <li>{quantity}</li>
                    ))} 
                </ul>   
            </td>
            <td>{bill.NumberOfBox}</td>
        </tr>
    )
}

export default BillDetails