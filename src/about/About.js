
import { Col, Container, Row } from 'react-bootstrap';
import classes from './About.module.css';
import img from './about-people.jpg';
const About = () => {
    return (
        <>
            <div className={classes.img}>
                <div className={classes.blk}>
                    <Container className={classes.container}>
                        <div className={classes.img_head}>
                            <h1>About for Bacola</h1>
                            <h4>We can do more for you</h4>
                        </div>
                    </Container>
                </div>
            </div>
            <Container className={classes.container2}>
                <div className={classes.about}>
                    <p>In nec purus eget neque accumsan finibus. Duis condimentum elit ut libero commodo iaculis. Donec augue diam, tristique et ultricies nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque efficitur elit ante, vel vulputate tortor blandit nec.</p>
                    <div className={`p-lg-4 p-sm-0`}>
                        <div className={classes.heading}>
                            <h1>Quisque erat urna, congue et libero in<br />
                                eleifend euismod velit.</h1>
                            <p className='mt-4'>In nec purus eget neque accumsan finibus. Duis condimentum elit ut libero commodo iaculis. Donec augue diam, tristique et ultricies nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque efficitur elit ante, vel vulputate tortor blandit nec.</p>
                        </div>
                    </div>

                    <div className={classes.intro}>
                        <Row>
                            <Col lg={6} sm={12} className='p-lg-4 p-sm-0'>
                                <img src={img} alt='people' className='w-100'/>
                            </Col>
                            <Col lg={6} sm={12} className='d-flex  align-items-center p-4'>
                                <div className={classes.inner}>
                                    <p>Rachel Leonard - Bacola CEO</p>
                                    <h1>Duis convallis luctus pretium. Pellentesque habitant morbi</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                                    <p>In fermentum mi ut sapien semper, a sagittis lorem vulputate. Integer gravida, dui eget aliquet tempus, turpis orci vehicula ipsum, eget porttitor sapien tortor at neque. Cras id pulvinar lacus, ac volutpat neque. Ut at magna id justo bibendum lobortis. Integer tortor nulla, ultricies et nisi sit amet, interdum dictum felis. In semper laoreet dui vitae pharetra. Etiam sit amet molestie nulla, eu efficitur orci. Praesent rutrum ante justo, eget malesuada ante ornare ac. Ut dignissim blandit urna, eget euismod leo rhoncus nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque lobortis libero ante. Nullam in feugiat erat. Aenean sed justo dapibus, sodales nisi ut, fringilla lorem. Vestibulum in orci ac nisl condimentum fermentum at et sem. Curabitur fermentum dolor eu lacus consectetur varius.</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={classes.div}>
                        <p>
                        In nec purus eget neque accumsan finibus. Duis condimentum elit ut libero commodo iaculis. Donec augue diam, tristique et ultricies nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque efficitur elit ante, vel vulputate tortor blandit nec.
                        </p>
                    </div>
                    <div >
                        <p>In nec purus eget neque accumsan finibus. Duis condimentum elit ut libero commodo iaculis. Donec augue diam, tristique et ultricies nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque efficitur elit ante, vel vulputate tortor blandit nec.
                        </p>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default About;