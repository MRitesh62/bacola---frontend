import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import classes from './SingleProduct.module.css';
import { FaCheck } from "react-icons/fa6";
import { FaFacebookF ,FaTwitter,FaPinterestP,FaLinkedinIn,FaRedditAlien,FaWhatsapp} from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiMilkCarton } from "react-icons/gi";
import { CiDollar } from "react-icons/ci";
import { useAddToCart, useAddTolist } from '../../addFun';
import Review from '../../global/review/Review';
const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState('');
    const [filepath, setFilepath] = useState('');
    let[count,setCount]=useState(1)
    const { addFun: addToCart } = useAddToCart();
    const { addFun: addToWishlist } = useAddTolist();
    const [activeTab, setActiveTab] = useState("description");

    const user = sessionStorage.getItem('user')
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8001/api/get-product/${id}`)
            .then((response) => (
                // console.log(response.data.data),
                setFilepath(response?.data?.filepath),
                setProduct(response?.data?.data)

            ))
    }, [id]);
    const starsArray = [1, 2, 3, 4, 5];

    return (
        <section style={{ backgroundColor: '#f7f8fd', padding: '50px 0' }}>
            <Container className={classes.container}>
                <div className={classes.header}>
                    <h1>{product.name} </h1>
                    <div className={classes.star}>
                        {product.brand && (
                            <p className='d-inline'>
                                Brand: <span>{product.brand.name}</span> |
                            </p>
                        )}
                        {
                            starsArray.map((star) => (
                                <FaStar key={star} color={star <= product.rating ? '#ffcd00' : '#C0C0C0'} />
                            ))}

                    </div>
                </div>
                <Row >
                    <Col lg={5} sm={12}>
                        <span className={classes.discount}>{product.discount}%</span>
                        <img src={`${filepath}${product?.images}`} alt='product' className='w-100'/>
                    </Col>
                    <Col lg={4} sm={12} className={classes.product_detail}>
                        <p><del>${product.price}</del>${(product.price - ((product.price * product.discount) / 100)).toFixed(2)}</p>
                        <span className={classes.availability}>{product.availability}</span>
                        <div className={classes.short_desc}>{product.short_description}</div>
                        <div className='d-sm-block d-md-flex justify-content-between my-4 '>
                        <div className={classes.counter}>
                            <button onClick={()=>count>1?setCount(count-1):setCount(1)}>-</button>
                            <h3>{count}</h3>
                            <button onClick={()=>setCount(count+1)}>+</button>
                        </div>
                            <button className={classes.cart}
                                onClick={() => {
                                    
                                    user?addToCart(product._id, count):navigate('/login')
                                }}>add to cart</button>
                        </div>
                        <button className={classes.wishlist}  onClick={() => addToWishlist(product._id)}><CiHeart />add to wishlist</button>
                        <ul className={`my-4 p-0  ${classes.check}`}>
                        {product.type ? <li><FaCheck />Type: {product.type}</li>:''}
                        {product.mfg ? <li><FaCheck />MFG: {product.mfg}</li>:''}
                        {product.life ? <li><FaCheck />Life: {product.life}</li>:''}
                        </ul>
                        <ul className={classes.line}>
    
                        {product.category?.category_name ? <li style={{color:'#71778e'}}>category: <span style={{color:'black'}}>{product.category?.category_name}</span></li>:''}
                        {product.tags ? <li style={{color:'#71778e'}}>tags: <span style={{color:'black'}}>{product.tags}</span></li>:''}
                        </ul>
                        <ul className={classes.social}>
                            <li style={{backgroundColor:'#3b5998'}}><FaFacebookF/></li>
                            <li style={{backgroundColor:'#1da1f2'}}><FaTwitter/></li>
                            <li style={{backgroundColor:'#e60023'}}><FaPinterestP/> </li>
                            <li style={{backgroundColor:'#0077b5'}}><FaLinkedinIn/> </li>
                            <li style={{backgroundColor:'#ff4500'}}><FaRedditAlien/> </li>
                            <li style={{backgroundColor:'#25d366'}}><FaWhatsapp/> </li>
                        </ul>
                    </Col>
                    <Col lg={3} sm={12}>
                        <div className={`py-4 px-4 ${classes.ship}`}>
                            <div className='d-flex gap-3'>
                                <LiaShippingFastSolid />
                                <p>Free Shipping apply to all orders over $100</p>
                            </div>
                            <div className='d-flex gap-3'>
                                <GiMilkCarton />
                                <p>Guranteed 100% Organic from natural farmas</p>
                            </div>
                            <div className='d-flex gap-3'>
                                <CiDollar />
                                <p>1 Day Returns if you change your mind</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container className={classes.container2}>
            <div className={classes.header2}>
    <button 
        className={activeTab === "description" ? classes.active : ""} 
        onClick={() => setActiveTab("description")}
    >
        Description
    </button>
    <button 
        className={activeTab === "reviews" ? classes.active : ""} 
        onClick={() => setActiveTab("reviews")}
    >
        Reviews
    </button>
</div>

                <div className={classes.content}>
                    {activeTab === "description" && <p>{product.long_description}</p>}
                    {activeTab === "reviews" && <p>{<Review/>}</p>}
                </div>
            </Container>
        </section>
    )
}

export default SingleProduct;