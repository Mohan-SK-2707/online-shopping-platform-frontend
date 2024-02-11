import { Button, Card, Divider, Form, Input, List, Modal, Popconfirm, Spin, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from "../dashboard/Navbar";
import './Address.css';
import './Profile.css';




const Address = () => {

    const toast = (type, message, standby) => {
        messageApi.open({
            type: type,
            content: message,
            duration: standby
        });
    };


    const [id, setId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [primary, setPrimary] = useState(false);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [deliveryCustomerNo, setDeliveryCustomerNo] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [enableUpdate, setEnableUpdate] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        const fetchAddressByUserId = async () => {
            const addressResponse = await axios.get(`http://localhost:8085/online-shopping-platform/account/address/${encodeURIComponent('650046c390fc095ba87e6472')}`);
            console.log(addressResponse.data);
            setAddresses(addressResponse.data);
        };

        fetchAddressByUserId();
    }, []);

    const fetchAddressById = async (id) => {
        try {
            const addressResponse = await axios.get(`http://localhost:8085/online-shopping-platform/account/address?id=${id}`);
            console.log(addressResponse);
            setId(addressResponse.data.id);
            setCustomerName(addressResponse.data.customerName);
            setAddress(addressResponse.data.address);
            setCity(addressResponse.data.city);
            setState(addressResponse.data.state);
            setPincode(addressResponse.data.pincode);
            setDeliveryCustomerNo(addressResponse.data.deliveryCustomerNo);
        } catch (error) {
            console.error(error);
        }
    }

    const removeAddress = async (addressId) => {
        try {
            setSpinner(true);
            const removeAddressResponse = await axios.delete(`http://localhost:8085/online-shopping-platform/account/address?id=${addressId}`);
            console.log(removeAddressResponse);
            toast('success', 'Address removed', 2);
            const addressesResponse = await axios.get(`http://localhost:8085/online-shopping-platform/account/address/${encodeURIComponent('650046c390fc095ba87e6472')}`);
            setAddresses(addressesResponse.data);
            setTimeout(() => {
                setSpinner(false);
            }, 2000);
        } catch (error) {
            console.error(error);
            toast('error', 'Something went wrong...', 4);
            setTimeout(() => {
                setSpinner(false);
            }, 3000);
        }
    };

    const doUpdateAddress = async (addressId) => {
        try {
            setSpinner(true);
            const updateAddressResponse = await axios.put(`http://localhost:8085/online-shopping-platform/account/address?id=${addressId}`, {
                customerName: customerName,
                primary: primary,
                address: address,
                city: city,
                state: state,
                pincode: pincode,
                deliveryCustomerNo: deliveryCustomerNo
            });
            console.log(updateAddressResponse);
            const addressResponse = await axios.get(`http://localhost:8085/online-shopping-platform/account/address/${encodeURIComponent('650046c390fc095ba87e6472')}`);
            console.log(addressResponse.data);
            setAddress(addressResponse.data);
            const addressesResponse = await axios.get(`http://localhost:8085/online-shopping-platform/account/address/${encodeURIComponent('650046c390fc095ba87e6472')}`);
            setAddresses(addressesResponse.data);
            setEnableUpdate(false);
            setTimeout(() => {
                setSpinner(false);
            }, 3000);
            toast('success', 'Address updated', 2);
        } catch (error) {
            console.error(error);
            toast('error', 'Something went wrong...', 4);
            setTimeout(() => {
                setSpinner(false);
            }, 3000);
        }
    };

    const data = [
        {
            title: addresses.map((addr, index) => (
                <div>{addr.primary ? 'Primary' : 'Secondary'}</div>
            )),
        },
    ];


    return (
        <>
            <Navbar />
            {contextHolder}
            <Spin spinning={spinner} fullscreen />
            <div className="side-nav">
                <h1 >Account</h1>
                <Divider></Divider>
                <a href='/account/profile' className="usr-prf" >User Profile</a>
                <Divider></Divider>
                <a href='/account/address' className="usr-prf" >Manage Address</a>
            </div>

            <div className="add-addr"> 
            <span style={{ border: '10px',color:'darkgray' }} >Add Address</span>
            </div>
            <div className="addrr">
                <List
                    grid={{
                        gutter: 15,
                        column: 3,
                    }}
                    style={{ width: '100%' }}
                    dataSource={addresses}
                    renderItem={(addr, index) => (
                        <List.Item>
                            <Card actions={[
                                <><Popconfirm
                                    title="Remove the address"
                                    description="Are you sure to remove this address?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => removeAddress(addr.id)}
                                >
                                    <span style={{ border: '10px' }}>Remove</span>
                                </Popconfirm></>,
                                <span style={{ border: '10px' }} onClick={() => fetchAddressById(addr.id) && setEnableUpdate(true)} >Edit</span> //doUpdateAddress(addr.id)}
                            ]} title={addr.primary ? 'Primary' : 'Secondary'} style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', columnGap: '10%' }}>
                                    <p style={{ marginBottom: '4x' }}><strong>Customer Name:</strong> {addr.customerName}</p>
                                    <p style={{ marginBottom: '4px' }}><strong>Address Line:</strong> {addr.address}</p>
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
            <Modal
                title="Update Address"
                style={{
                    top: 20,
                }}
                open={enableUpdate}
                onCancel={() => setEnableUpdate(false)}
                footer={null}
            >
                <Form layout="horizontal" labelCol={{
                    span: 7
                }} wrapperCol={{
                    span: 14
                }}>
                    <Form.Item label="Customer Name">
                        <Input type='text' onChange={(e) => setCustomerName(e.target.value)} value={customerName} />
                    </Form.Item>
                    <Form.Item label="Address">
                        <Input type='text' onChange={(e) => setAddress(e.target.value)} value={address} />
                    </Form.Item>
                    <Form.Item label="City">
                        <Input type='text' onChange={(e) => setCity(e.target.value)} value={city} />
                    </Form.Item>
                    <Form.Item label="State">
                        <Input type='text' onChange={(e) => setState(e.target.value)} value={state} />
                    </Form.Item>
                    <Form.Item label="Pincode">
                        <Input type='text' onChange={(e) => setPincode(e.target.value)} value={pincode} />
                    </Form.Item>
                    <Form.Item label="Delivery customer No">
                        <Input type='text' onChange={(e) => setDeliveryCustomerNo(e.target.value)} value={deliveryCustomerNo} />
                    </Form.Item>
                    <Button style={{ backgroundColor: 'ButtonShadow', marginLeft: '40%' }} onClick={() => doUpdateAddress(id)} >Update</Button>
                </Form>
            </Modal>
        </>
    );
}

export default Address;