
import { useState } from 'react';
import { Container } from "react-bootstrap";
import classes from "./Login.module.css";
import { Register,LoginCom } from "./Register";
const Login = () => {
   
    const [disp, setDisp] = useState(<LoginCom/>);
    const [active, setActive] = useState('login');
    return (
        <Container className={classes.container}>
            <div className={`${classes.head}`}>
            <span 
                    onClick={() => {
                        setDisp(<LoginCom />);
                        setActive("login");
                    }} 
                    className={active === "login" ? classes.active : ''}
                >
                    Login
                </span>

                <span 
                    onClick={() => {
                        setDisp(<Register />);
                        setActive("register");
                    }} 
                    className={active === "register" ? classes.active : ''}
                >
                    Register
                </span>
            </div>
            {disp}
        </Container >
    )
}

export default Login; 