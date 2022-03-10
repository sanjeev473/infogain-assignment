import React, { useState, useContext } from 'react';
import CustomerContext from "../context/CustomerContext";
import { useNavigate } from 'react-router-dom';

function CreatePurchase() {
    const { customerdata, addCustomer } = useContext(CustomerContext);
    const [customerId, setCustomerId] = useState('');
    const [purchased, setPurchase] = useState('');
    let navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        const customer = {
            customerId: Number(customerId),
            purchased: Number(purchased),
        }
        addCustomer(customer);
        setCustomerId('')
        setPurchase('')
        navigate("/");
    }

    return (
        <div className='row justify-content-center align-items-center'>
            <div className='col-lg-6'>
                <div className='bg-light p-5 shadow border'>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className='form-label' htmlFor='customer-name'>Customer Name</label>
                            <select className='form-control' onChange={e => setCustomerId(e.target.value)} value={customerId}>
                                <option value={''} disabled>Please Select</option>
                                {customerdata.map((customer) => (
                                    <option key={customer.id} value={customer.id}>{customer.name.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className='form-label' htmlFor='create-purchase'>Create Purchase</label>
                            <input type="text" value={purchased} placeholder='Enter purchase' name="purchase" id="create-purchase" onChange={e => setPurchase(e.target.value)} className="form-control" />
                        </div>
                        <div className="mb-3 d-grid">
                            <button className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePurchase