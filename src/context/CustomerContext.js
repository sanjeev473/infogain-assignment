import { createContext, useState, useEffect } from 'react'

const CustomerContext = createContext()

export const CustomerProvider = ({ children }) => {
    const [customerdata, setCustomer] = useState([])

    useEffect(() => {
        fetchCustomer()
    }, [])

    // Fetch customer from JSON DB
    const fetchCustomer = async () => {
        const response = await fetch(`/customer?_embed=purchase`)
        const data = await response.json();
        setCustomer(data);
    }

    // Add customer
    const addCustomer = async (newCustomer) => {
        if (newCustomer.purchased > 50 && newCustomer.purchased < 100) {
            newCustomer['rewards'] = newCustomer.purchased - 50;
        } else if (newCustomer.purchased > 100) {
            newCustomer['rewards'] = 2 * (newCustomer.purchased - 100) + 50;
        } else {
            newCustomer['rewards'] = 0;
        }
        newCustomer['date'] = (new Date()).toString();
        const response = await fetch('/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCustomer),
        })
        const data = await response.json()
        setCustomer((prev) => {
            const result = prev.slice();
            const customer = result.filter(customer => customer.id === data.customerId)[0];
            customer.purchase.push(data);
            return result;
        })
    }

    const deleteTransaction = async (id, customerid) => {
        if (window.confirm("Are you sure ? want to delete ")) {
            try {
                const res = await fetch(`/purchase/${id}`, { method: 'DELETE' });
                if (!res.ok) return;
            } catch (e) {
                console.log(e);
                return;
            }
            setCustomer((prevCustomers) => {
                // copy customers
                const newCustomers = prevCustomers.slice();

                // find customer
                const customer = newCustomers.find(customer => customer.id === customerid);

                // delete transaction with transaction id == id
                customer.purchase = customer.purchase.filter((trans) => trans.id !== id);
                return newCustomers;
            });
        }
    }


    // const updateTransaction = async (id, customerid) => {
    //     setCustomer((prevCustomers) => {
    //         // copy customers
    //         const newCustomers = prevCustomers.slice();

    //         // find customer
    //         const customer = newCustomers.find(customer => customer.id === customerid);
    //         // const transIndex = customer.purchase.findIndex((trans) => trans.id === id);
    //         // customer.purchase[transIndex] = {
    //         //     "customerId": 1,
    //         //     "purchased": "12322",
    //         //     "rewards": 1196,
    //         //     "date": "Wed Mar 02 2022 20:31:52 GMT+0530 (India Standard Time)",
    //         //     "id": id
    //         // };
    //         // return updated customers
    //         return newCustomers;
    //     });
    // }

    return (
        <CustomerContext.Provider value={{ customerdata, addCustomer, deleteTransaction }}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerContext;