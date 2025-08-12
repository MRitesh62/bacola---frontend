
import { Col, Container, Row } from 'react-bootstrap';
import classes from './Contact.module.css';

import { FaLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from 'react-icons/fi';
import { CiMail } from 'react-icons/ci';

const Contact = () => {
    return (
        <>
            <Container className={classes.container}>
                <div className={classes.contact}>
                    <h1>Get In Touch</h1>
                    <p>Get In Touch
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel.</p>
                    <Row>
                        <Col lg={4} sm={12} className={classes.box}>
                            <div>
                                <FaLocationDot />
                                <h4>102 Street 2714 Donovan</h4>
                                <p>Lorem ipsum dolar site amet discont</p>
                            </div>
                        </Col>
                        <Col lg={4} sm={12} className={classes.box}>
                            <div>
                                <FiPhoneCall />
                                <h4>+02 1234 567 88</h4>
                                <p>Lorem ipsum dolar site amet discont</p>
                            </div>
                        </Col>
                        <Col lg={4} sm={12} className={classes.box}>
                            <div>
                                <CiMail />
                                <h4>info@example.com</h4>
                                <p>Lorem ipsum dolar site amet discont</p>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={classes.form}>
                    <div>
                        <div className={classes.head}>
                            <h1>Send Us</h1>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel.</p>

                        </div>
                        <form>
                            <Row>
                                <Col lg={6}>
                                    <label>Your Name *</label> <br />
                                    <input type='text' required />
                                </Col>
                                <Col lg={6}>
                                    <label>Your Email *</label><br />
                                    <input type='email' required />
                                </Col>
                                <Col lg={12}>
                                    <label>Subject *</label><br />
                                    <input type='text' required />
                                </Col>
                                <Col lg={12}>
                                    <label>Your Message</label><br />
                                    <textarea rows='5' />
                                </Col>
                                <Col>
                                    <button type='submit'>send message</button>

                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default Contact;