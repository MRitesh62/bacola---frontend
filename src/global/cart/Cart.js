
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { cart } from "../../store/product-action";
import classes from './Cart.module.css'
import axios from "axios";
import ChangeAdd from "./ChangeAdd";
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [disp, setDisp] = useState(false);

    const data = useSelector(state => state.cart.cart.data || { products: [] })
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('user');

    // console.log("data", data);

    useEffect(() => {
        dispatch(cart())
    }, [dispatch])

    useEffect(() => {
        dispatch(cart());

        // Fetch User Address
        const fetchAddress = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/api/get-user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // console.log(res.data.data.street);
                const address =` ${res.data.data.street}, ${res.data.data.city}, ${res.data.data.state}`
                // console.log(address);
                
                setAddress(address);
            } catch (error) {
                console.error("Error fetching address:", error.response?.data || error.message);
            }
        };

        if (userId) {
            fetchAddress();
        }
    }, [dispatch, token, userId]);

    //address update
    const addressUpdate = (newAddress) => {
        setAddress(newAddress);
        setDisp(false);
    }


    
     // Increase or decrease product quantity
     const updateHandle = async (productId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1
        //  console.log("id", productId);
        //  console.log("q",newQuantity);
         
            
        try {
           const da= await axios.put(`http://localhost:8001/api/update-cart/${productId}`, 
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Refresh cart after updating quantity
            console.log(da.data);
            dispatch(cart());
            
        } catch (error) {
            console.error("Error updating item quantity:", error.response?.data || error.message);
        }
    };

    // remove product
    const removeHandle = async (productId) => {
        try {
            await axios.delete(`http://localhost:8001/api/remove-product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh cart after removing item
            dispatch(cart());

        } catch (error) {
            console.error("Error removing item:", error.response?.data || error.message);
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



    const total = data.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return (
        <Container className={classes.container}>
            {data?.products?.length > 0 ? (
                <Row>
                    <Col lg={8}>
                        <Table>
                            <thead>
                                <tr style={{textTransform:'capitalize'}}>
                                    <th>product</th>
                                    <th className="d-none d-md-block">price</th>
                                    <th>quantity</th>
                                    <th>subtotal</th>
                                </tr>
                            </thead>

                            <tbody style={{verticalAlign:'middle'}}>
                                {data.products.map(item => (
                                    <tr key={item.productId._id} >
                                        <td>
                                            <div className="d-md-flex align-items-center">
                                            <img src={`${item.productId.filepath}${item.productId.images[0]}`} alt="product " className={classes.img} />
                                            {item.productId.name}
                                            </div>
                                        </td>
                                        <td className="d-none d-md-table-cell">${item.price.toFixed(2)}</td>
                                        <td>
                                            <div className={classes.quantity}>
                                                 <button onClick={() => updateHandle(item.productId._id, item.quantity - 1)}>-</button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button onClick={() => updateHandle(item.productId._id, item.quantity + 1)}>+</button>
                                            </div>
                                        </td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td><IoClose onClick={()=>removeHandle(item.productId._id)}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-end">
                        <button onClick={clearCart} className={classes.clear}>Remove All</button>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className={classes.total}>
                            <h3>Cart Totals</h3>
                            <div>
                                <h5>subtotal</h5>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <div>
                                <h5 className="w-50">shipping</h5>
                                <div className="d-flex w-50 align-items-end"  style={{fontSize:'0.81rem',border:'none',flexDirection:'column'}}>
                                    <p className="m-1">Fee $5</p>
                                    <p>Shipping to <strong>{address}</strong> </p>
                                    {!disp && (
                                        <p onClick={() => setDisp(true)} className="btn btn-link p-0">Change Address</p>
                                    )}

                                    {/* Change Address Form */}
                                    {disp && <ChangeAdd onAddressUpdate={addressUpdate} />}
                                
                                </div>
                            </div>
                            <div>
                                <h5>total</h5>
                                <p>${Number(total.toFixed(2)) + 5}</p>
                            </div>
                            <button onClick={()=>navigate('/checkout ')}>
                            Proceed to checkout</button>
                        </div>
                    </Col>
                </Row>
            ) : (
                <h1 className="m-5">Your cart is empty !</h1>
            )}
        </Container>
    )
}

export default Cart;