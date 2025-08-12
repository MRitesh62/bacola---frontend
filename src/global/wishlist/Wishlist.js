import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { format } from 'date-fns';

import { IoClose } from "react-icons/io5";
import { wishlist } from "../../store/product-action";
import classes from './Whishlist.module.css';

const Wishlist = () => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.list.list.data || {products:[]});
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        dispatch(wishlist())
    },[dispatch])

    // console.log(data);
    // console.log(data.products);
    
      // remove list
      const removeHandle = async (productId) => {
        try {
            await axios.delete(`http://localhost:8001/api/remove-wishlist/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            dispatch(wishlist());

        } catch (error) {
            console.error("Error removing item:", error.response?.data || error.message);
        }
    };

    // clear list
    const clearList = async () => {
        try {
            await axios.delete(`http://localhost:8001/api/clear-wishlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh cart after removing item
            dispatch(wishlist());

        } catch (error) {
            console.error("Error removing item:", error.response?.data || error.message);
        }
    }

    return (
        <>
             <Container className={classes.container}>
            {data?.products.length > 0 ? (
                <Row>
                        <Col lg={12}>
                        <Table>
                            <thead>
                                <tr style={{textTransform:'capitalize'}}>
                                    <th>product</th>
                                    <th>price</th>
                                    <th>Date Added</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody style={{verticalAlign:'middle'}}>
                                {data?.products.map(item => (
                                    <tr key={item.productId._id} >
                                        <td>
                                            <div className="d-flex align-items-center">
                                            <img src={`${item.productId.filepath}${item?.productId?.images}`} alt="product image" className={classes.img} />
                                            {/* {item.productId.images} */}
                                                {item.productId.name}
                                            </div>
                                        </td>
                                        <td>${item.productId.price}</td>
                                        <td>
                                            <div className={classes.quantity}>
                                            <p>{format(new Date(item.addedAt), "dd MMM yyyy")}</p>
                                            </div>
                                        </td>
                                        <td>{item.productId.availability} </td>
                                        <td onClick={()=>removeHandle(item.productId._id)}>{<IoClose />}</td>
                                       </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-end mb-3">
                        <button onClick={clearList} className={classes.clear}>Remove All</button>
                        </div>
                    </Col>
                    
                </Row>
            ) : (
                <h1 className="m-5">Your Wishlist is empty !</h1>
            )}
        </Container>
        </>
    )
}

export default Wishlist;