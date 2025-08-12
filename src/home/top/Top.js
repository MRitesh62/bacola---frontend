import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from './Top.module.css';
import top1 from './top1.webp';
import top2 from './top2.gif';
import bottom1 from './bottom1.jpg';
import bottom2 from './bottom2.webp'
import { IoIosArrowRoundForward } from "react-icons/io";
const Top = () => {
    const navigate = useNavigate();
    return (
        <>
            <section>
                <Container className={classes.container}>
                    <Row className={classes.top_img}>
                        
                            <Col md={8} sm={12} className={`${classes.top_col1}`} >
                            <a>
                            <img src={top1} alt="img" className="w-100 h-100" />
                                
                                    <div className={classes.content}>
                                        <div className={classes.header}>
                                            <p>Exclusive Offer
                                                <span>-20% off</span>
                                            </p>
                                        </div>
                                        <div className={classes.main}>
                                            <h3>Feed your family the best </h3>
                                            <p>Only this week. Don’t miss...</p>
                                        </div>
                                        <div className={classes.footer}>
                                            <p style={{ color: '#202435' }}>from
                                                <span>$7.99</span></p>
                                        </div>
                                        <button onClick={()=>navigate('/shop')}>Shop now <IoIosArrowRoundForward /></button>
                                    </div>
                                </a>
                            </Col>
                            <Col md={4} sm={12} className={`${classes.top_col2}`}>
                                <a href="#">
                                    <img src={top2} alt="img" className="w-100 h-100" />
                                </a>
                            </Col>
                    </Row>
                    <Row className={classes.bottom_img}>
                       
                            <Col md={6}sm={12}  style={{ position: 'relative' }}className={classes.bottom_col}>
                                <a href="#">
                                    <img src={bottom1} alt="img" className="w-100 h-100"/>
                                    <div className={classes.content2}>
                                        <div className={classes.header2}>
                                            <h4>Everything is so fresh</h4>
                                            <h3>only in Bacola</h3>
                                            <p>Bacola Weekend Discount</p>
                                        </div>
                                        <button>Shop Now</button>
                                    </div>
                                </a>
                            </Col>
                            <Col md={6} sm={12} style={{ position: 'relative' }} className={classes.bottom_col}>
                                <a href="#">
                                    <img src={bottom2} alt="img" className="w-100 h-100"/>
                                    <div className={classes.content2}>
                                        <div className={classes.header2}>
                                            <h4>Big discount on</h4>
                                            <h3>organic legumes</h3>
                                            <p>Bacola Weekend Discount</p>
                                        </div>
                                        <button>Shop Now</button>
                                    </div>
                                </a>
                            </Col>
                    </Row>
                </Container>
            </section >

        </>
    )
}

export default Top;