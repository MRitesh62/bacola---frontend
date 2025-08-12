import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState,useEffect } from 'react';
import classes from './Card.module.css'
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useAddToCart, useAddTolist } from '../../addFun';
const Card = ({ map, hover, lg }) => {
    const [addedItems, setAddedItems] = useState([]);
    const navigate = useNavigate();
    const user = sessionStorage.getItem('user');
    const { addFun: addToCart } = useAddToCart();
    const { addFun: addWishlist } = useAddTolist();
    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem("addedItems")) || [];
        setAddedItems(stored);
    }, []);

    // Save to sessionStorage whenever addedItems changes
    useEffect(() => {
        sessionStorage.setItem("addedItems", JSON.stringify(addedItems));
    }, [addedItems]);
    const clickhandle = (productId) => {
        if (user) {
            addToCart(productId);
            toast.success("Product added to cart!");
            setAddedItems(prev => [...prev, productId]);
        }
        else {
            navigate('/login')
        }
    }
    const listClickHandle = (productId) => {
        if (user) {
            addWishlist(productId);
            toast.success("Product added to wishlist!");
        }
        else {
            navigate('/login')
        }
    }


    return (

        <Row className='m-0 mb-5'>
            {
                map?.map((product, index) => (
                    <Col lg={lg} sm={6} className={`${classes.box} ${hover}`} key={index}>
                        <CiHeart className={classes.heart}
                            onClick={() => listClickHandle(product._id)}
                        />
                        <Link to={`/product/${product._id}`}>
                            <span>{product.discount}%</span>
                            <img src={`${product.filepath}${product.images[0]}`} alt="product" />
                            <h3 className="text-truncate" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {product.name} </h3>
                            <p>{product.availability} </p>
                            <div className={classes.star}>
                                {[...Array(product.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                                {[...Array(5 - product.rating)].map((_, i) => (
                                    <FaStar key={`empty-${i}`} color="#C0C0C0" />
                                ))}

                            </div>
                            <div className="d-flex  gap-1">
                                <del>${(product.price + ((product.price * product.discount) / 100)).toFixed(2)}</del>
                                <h4>${product.price} </h4>
                            </div>
                        </Link>
                        {addedItems.includes(product._id) ? (
                            <Link to="/cart" className="btn btn-success">Go to Cart</Link>
                        ) : (
                            <button onClick={() => clickhandle(product._id)}>Add to Cart</button>
                        )}
                    </Col>

                ))
            }
        </Row>
    )
}

export default Card;