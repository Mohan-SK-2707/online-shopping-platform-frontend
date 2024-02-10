import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Divider, List } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from "../dashboard/Navbar";
import './Address.css';
import './Profile.css';




const Address = () => {

    const [addressLine, setAddressline] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState([]);


    useEffect(() => {
        const fetchAddressByUserId = async () => {
            const addressResponse = await axios.get(`http://localhost:8085/online-shopping-platform/account/address/${encodeURIComponent('650046c390fc095ba87e6472')}`);
            console.log(addressResponse.data);
            setAddress(addressResponse.data);
        };
        fetchAddressByUserId();
    }, []);

    const data = [
        {
            title: address.map((addr, index) => (
                <div>{addr.primary ? 'Primary' : 'Secondary'}</div>
            )),
        },
    ];


    return (
        <>
            <Navbar />
            <div className="side-nav">
                <h1 >Account</h1>
                <Divider></Divider>
                <a href='/account/profile' className="usr-prf" >User Profile</a>
                <Divider></Divider>
                <a href='/account/address' className="usr-prf" >Manage Address</a>
            </div>

            <div className="addrr">
                <List
                    grid={{
                        gutter: 10,
                        column: address.length,
                    }}
                    style={{ width: '70%' }}
                    dataSource={address} // Assuming address is an array of address objects
                    renderItem={(addr, index) => (
                        <List.Item>
                            <Card actions={[
                                <CloseCircleOutlined key="remove" />,
                                <EditOutlined key="edit" />
                            ]} title={addr.primary ? 'Primary' : 'Secondary'} style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', columnGap: '10%' }}>
                                    <p style={{ marginBottom: '4x' }}><strong>Customer Name:</strong> {addr.customerName}</p>
                                    <p style={{ marginBottom: '4px' }}><strong>Address Line:</strong> {addr.addressLine}</p>
                                    <p style={{ marginBottom: '4px' }}><strong>City:</strong> {addr.city}</p>
                                    <p style={{ marginBottom: '4px' }}><strong>State:</strong> {addr.state}</p>
                                    <p style={{ marginBottom: '4px' }}><strong>Pincode:</strong> {addr.pincode}</p>
                                    <p style={{ marginBottom: '4px' }}><strong>Delivery Customer No:</strong> {addr.deliveryCustomerNo}</p>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}

export default Address;