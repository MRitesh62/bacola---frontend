import { CiMail } from "react-icons/ci";
import { SiCodefresh } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { CiDiscount1, CiDollar } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { FaFacebookF,FaTwitter,FaInstagram } from "react-icons/fa";
import { Col, Container, Row } from 'react-bootstrap'
import classes from './Footer.module.css'
import img from './coupon.webp';
import img1 from './google-play.webp';
import img2 from './app-store.webp';
import payment from './payments.jpg';
const Footer = () => {
    return (
        <footer >
            <div style={{ backgroundColor: '#233a95' }}>
                <Container className={classes.container}>
                    <Row>
                        <Col lg={5} sm={12}>
                            <div className={classes.subscribe}>
                                <h6 className='fw-light'>$20 discount for your first order</h6>
                                <h3>Join our newsletter and get...</h3>
                                <p>Join our email subscription now to get updates on promotions and coupons.</p>
                                <div className={classes.input} style={{ position: 'relative' }}>
                                    <CiMail />
                                    <input placeholder='Your email address' />
                                    <button>Subscribe</button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7} sm={12}>
                            <div className={classes.coupon}>
                                <img src={img} alt='coupon' />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{paddingTop:'2.1875rem', backgroundColor:'#f7f8fd'}} >
                <Container className={classes.container}>
                    <Row className={`border-bottom text-center`} style={{paddingBottom:'25px'}}>
                        <Col lg={3} md={6} sm={12} className={classes.nb}>
                            <p> <SiCodefresh/> Everyday fresh products</p>
                        </Col>
                        <Col lg={3} md={6} sm={12} className={classes.lb}>
                            <p><TbTruckDelivery/> Free delivery for order over $70</p>
                        </Col>
                        <Col lg={3} md={6} sm={12} className={classes.lb}>
                            <p><CiDiscount1/> Daily Mega Discounts</p>
                        </Col>
                        <Col lg={3} md={6} sm={12} className={classes.lb}>
                            <p><CiDollar/> Best price on the market</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{padding:'2.875rem 0'}}>
                <Container className={`${classes.container} d-lg-flex justify-content-between`}>
                    <div className={`${classes.contact} d-flex`}>
                        <FiPhoneCall />
                        <div className={classes.number}>
                            <h4>8 800 555-55</h4>
                            <p>Working 8:00 - 22:00</p>
                        </div>
                    </div>
                    <div className={`${classes.social} d-lg-flex`}>
                        <div className={`${classes.app} d-md-flex`}>
                            <div className={` me-4 text-lg-end ${classes.content}`}>
                                <h6 class="entry-title">Download App on Mobile :</h6>
                                <p>15% discount on your first purchase</p>
                            </div>
                            <div className={classes.img}>
                                <img src={img1} />
                                <img src={img2}/>
                            </div>
                        </div>
                        <div className={classes.icon}>
                            <FaFacebookF />
                            <FaTwitter />
                            <FaInstagram/>
                        </div>
                    </div>
                </Container>
            </div>

            <div style={{padding:'1.875rem 0'}} className="border-top ">
                <Container className={`${classes.container} d-lg-flex align-items-center justify-content-between`}>
                    <div className={classes.copyright}>
                        <p>Copyright 2025 © Bacola WordPress Theme. All rights reserved. Powered by KlbTheme.</p>
                    </div>
                    <div className={classes.menu}>
                        <span>Privacy Policy</span>
                        <span>Terms and Conditions</span>
                        <span>Cookies</span>
                    </div>
                    <a href="#">
                        <img src={payment} alt="payment" className="w-100"/>
                    </a>
                </Container>
            </div>
        </footer>
    )
}

export default Footer;