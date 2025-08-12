
import { Col, Container, Row } from 'react-bootstrap';
import classes from './Other.module.css';
import { useNavigate } from 'react-router-dom';
const Other = () => {
    const navigate =useNavigate()
    return (
        <>
            <Container className={classes.container}>
                <Row style={{gap:'20px',justifyContent:'space-between'}}>
                    <Col lg={4} sm={12} className={classes.img1}>
                        <div className={classes.content}>
                            <h5>Weekend Discount 20%</h5>
                            <h3>Natural Eggs</h3>
                            <p>Eat one every day</p>
                            <button onClick={()=>navigate('/shop')}>shop now</button>
                        </div>
                    </Col>
                    <Col lg={4} sm={12} className={classes.img2}>
                        <div className={classes.content}>
                            <h5>Weekend Discount 40%</h5>
                            <h3>Taste the Best</h3>
                            <p>Shine the morning</p>
                            <button onClick={()=>navigate('/shop')}>shop now</button>
                        </div>
                    </Col>
                    <Col lg={4} sm={12} className={classes.img3}>
                        <div className={classes.content}>
                        <h5>Weekend Discount 30%</h5>
                            <h3>Ditch the Junk</h3>
                            <p>Breakfast made better</p>
                            <button onClick={()=>navigate('/shop')}>shop now</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Other;