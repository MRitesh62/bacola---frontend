import { Container } from "react-bootstrap";
import { useState,useEffect } from 'react';
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

import classes from './Pwd.module.css'
import { useNavigate } from "react-router-dom";


const ForgetPwd = () => {
    const [disp_err, setDisp_err] = useState("");
    const [timer, setTimer] = useState(0);
    const [otpsent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [serverOtp, setServerOtp] = useState(null);
    const [email,setEmail]=useState('')

    const navigate = useNavigate();

     const validationSchema = Yup.object({
            email: Yup.string().required("email is required"),
           
     })
        useEffect(() => {
            if (timer > 0) {
                const id = setInterval(() => {
                    setTimer(prev => {
                        if (prev === 1) {
                            clearInterval(id);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
                return () => clearInterval(id);
            } 
        }, [timer]); 
    
    const handleSendOtp = async (values, { setSubmitting }) => {
            setEmail(values.email)
            axios.post('http://localhost:8001/api/forget', values)
            .then(response => {
                console.log(response);
                alert(response.data.message);
                setServerOtp(response.data.otp);
                setOtpSent(true)
                setTimer(30);

            })
            .catch(error => {
                // console.error(error.response.data.message);
                setDisp_err(error.response.data.message)

            })
        setSubmitting(false);    
    }

    const verifyOtp = () => {
        if (otp === String(serverOtp)) {
            sessionStorage.setItem("email", email);  // Store email for later use
            navigate('/update-password');
        } else {
            setDisp_err("Invalid OTP. Please try again");
        }
    };
    
    
    return (
        <>
            <Container>
            <Formik
                initialValues={{email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSendOtp}
            >
                {({ isSubmitting }) => (
                    <div className={classes.div}>
                        <Form>
                            <div>
                                <label>Email address * </label> &nbsp;&nbsp;
                                <ErrorMessage name="email" component="div" className='error' /><br />
                                <Field type="text" name="email" placeholder="email" />
                            </div>
                                <button type="submit" disabled={isSubmitting || timer > 0}
                                className={timer>0?classes.btn:''}>
                               {timer>0?`Resend OTP in ${timer}`:" Send OTP"}
                            </button><br/>

                            <p className='error'>{disp_err}</p><br />
                        </Form>
                    </div>
                )}
                </Formik>
                
                {otpsent && (
                    <div className={classes.div}>
                        <div>
                        <label>Enter OTP *</label><br/>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    /><br/>
                    <button onClick={verifyOtp}>Verify OTP</button>
                
                    </div>
                    </div> 
                )}
            </Container>
        </>
    )
}

export default ForgetPwd;