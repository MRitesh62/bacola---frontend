import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { cart } from '../../store/product-action';
import classes from './CheckOut.module.css';

const CheckOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(false);
    const token = sessionStorage.getItem('token');

    const cartString = sessionStorage.getItem('cart');
    const cartData = cartString ? JSON.parse(cartString) : {};
    const products = cartData?.data?.products || [];

    let total = products.reduce((acc, data) => acc + data.price * data.quantity, 0);
    let shippingFee = 5;
    let grandTotal = total + shippingFee;

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        if (paymentMethod === 'upi' && !upiId.trim()) {
            alert("Please enter your UPI ID.");
            return;
        }

        // Save order details if needed (optional)
        sessionStorage.setItem('orderDetails', JSON.stringify({ products, total: total, paymentMethod, upiId }));


    };

    const mail = sessionStorage.getItem('email')
    console.log(mail);

    const handlePlaceOrder = async () => {
        setLoading(true)
        const orderDetails = {
            email: mail, // Replace with user's email from sessionStorage or state
            total: total + 5,
            paymentMethod: paymentMethod,
        };

        try {
            await axios.post("http://localhost:8001/api/order", orderDetails);
            alert("Order placed! Confirmation email sent.");
            // sessionStorage.removeItem('cart')
            clearCart();
            // console.log("Cart after clearing:", sessionStorage.getItem("cart"));
            navigate("/receipt");
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Order placed, but email not sent.");
        }finally {
            setLoading(false); 
        }
    };
    // clear Cart
    const clearCart = async () => {
        try {
            await axios.delete(`http://localhost:8001/api/clear-cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh cart after removing item
            dispatch(cart());

        } catch (error) {
            console.error("Error removing item:", error.response?.data || error.message);
        }
    }

    return (
        <Container className={classes.container}>
            <div className={classes.main}>

                <h3>Your Orders</h3>
                {products.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((data, index) => (
                                <tr key={index}>
                                    <td>{data?.productId.name} <strong> x {data?.quantity}</strong></td>
                                    <td>${data?.price * data?.quantity}</td>
                                </tr>
                            ))}
                            <tr>
                                <td><strong>Subtotal</strong></td>
                                <td>${total.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Shipping Fee</strong></td>
                                <td>${shippingFee}</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td>${grandTotal.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {products.length > 0 && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="upi"
                                    onChange={() => setPaymentMethod('upi')}
                                    required
                                />
                                &nbsp;UPI
                            </label>
                            <br />
                            {paymentMethod === 'upi' && (
                                <input
                                    type="text"
                                    placeholder="Enter Your UPI ID"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    required
                                />
                            )}
                        </div>

                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    onChange={() => setPaymentMethod('cash on delivery')}
                                    required
                                />
                                &nbsp;Cash on Delivery
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="checkbox" required /> &nbsp;
                                <span>
                                    I have read and agree to the website
                                    <strong style={{ color: 'red' }}> terms and conditions</strong>
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            onClick={handlePlaceOrder}
                            className={classes.button}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    &nbsp; Placing Order...
                                </>
                            ) : (
                                "Place Order"
                            )}
                        </button>                    </form>
                )}
            </div>
        </Container>
    );
}

export default CheckOut;
