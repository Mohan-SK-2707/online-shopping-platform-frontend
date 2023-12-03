import { useEffect, useState } from "react"

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const [name, setNames] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8080/TrackandTrace/api/order/getAllOrderData?requestedCustomerName=Rio Tinto Ltd&value";
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                setNames(data.name);
                setOrders(data.data);
            })
            .catch(error => {
                console.error("Error in fetch order data:", error);
            })
    }, []);

    return (
        <table id='orders'>
            <thead>
                <tr>
                    <th>S.No</th>
                    {orders.length > 0 && Object.values(name).map((columnName) => (
                        <th>{columnName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    Object.values(orders).map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.ersGoldNumber}</td>
                            <td>{order.quote}</td>
                            <td>{order.isGoldNumber}</td>
                        </tr>
                    ))}

            </tbody>
        </table>
    );
};

export default Orders;