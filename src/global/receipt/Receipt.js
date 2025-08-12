
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

import classes from './Receipt.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { add } from 'date-fns/fp';

const Receipt = () => {
    const [address, setAddress] = useState('');
    const data = sessionStorage.getItem('orderDetails')
    const userId = sessionStorage.getItem('user');
    // console.log(user);

    useEffect(() => {
        try {
            axios.get(`http://localhost:8001/api/get-user/${userId}`)
                .then((response) => (
                setAddress(response.data.data)
                
            ))
        } catch (error) {
            console.log(error);
            
        }
    },[])

    
    // console.log(data);
    const abc = data ? JSON.parse(data) : {};

    const products = abc.products;
    // console.log(products);

    const total = abc.total;
    // console.log(total);

    const payment = abc.paymentMethod;
    // console.log(payment);

    const upiId = abc.upiId;
    // console.log(upiId);
    
    
    
    
    return (
        <>
            <Container className={classes.container}>
                <div>
                    <div className={classes.thanking}>
                        <p>Thank you. Your order has been received.</p>
                    </div>
                    <ul className={classes.overview}>
                        <li>order number: <strong>123</strong></li>
                        <li>date: <strong>{new Date().toLocaleDateString('en-GB')}</strong></li>
                        <li>total: <strong>{total+5}</strong></li>
                        <li>payment method: <strong>{payment}</strong></li>
                    </ul>
                    <div className={classes.detail}>
                        <h2>Order Details</h2>
                        <Table  bordered >
                            <tbody>
                            <tr>
                                <th>Product</th>
                                <th>Total</th>
                            </tr>
                                {
                                    products.map(product => (
                                        <tr>
                                        <td>{product.productId.name} × <strong>{product.quantity}</strong></td>
                                        <td>${product.price * product.quantity}</td>
                                    </tr>
                                    ))
                          }
                            <tr>
                                <td><strong>Subtotal:</strong></td>
                                <td>${total}</td>
                            </tr>
                            <tr>
                                <td><strong>Shipping:</strong></td>
                                <td>$5.00 <small>via Flat rate</small></td>
                            </tr>
                            <tr>
                                <td><strong>Payment method:</strong></td>
                                <td>{payment}</td>
                            </tr>
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td><strong>${total + 5}</strong></td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className={classes.address}>
                        <h2>Shipping Address</h2>
                        <p className='m-0'>{address.street},</p>
                        <p className='m-0'>{address.city},</p>
                        <p className='m-0'>{address.state},</p>
                        <p className='m-0'>{address.pinCode},</p>
                        <p className='m-0'>{address.country},</p>
                        <p className='m-0'>{address.phone}</p>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Receipt;