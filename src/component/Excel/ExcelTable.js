import { useEffect, useState } from "react"

const Excel = () => {
    const [excels,setExcel] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8080/TrackandTrace/api/getFileName?customer=Rio Tinto Ltd";
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                setExcel(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <table id='excel'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Customer Name</th>
                    <th>Excel Filename</th>
                    <th>Table Name</th>
                    <th>Active</th>
                    <th>Default status</th>
                </tr>
            </thead>
            <tbody>
                {
                excels.map((excel, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{excel.customerName}</td>
                        <td>{excel.excelFileName}</td>
                        <td>{excel.tableId.tableName}</td>
                        <td>{excel.deleted === true ? 'Inactive' : 'Active'}</td>
                        <td>{excel.defaultTemplate === true ? 'Inactive' : 'Active'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Excel;
