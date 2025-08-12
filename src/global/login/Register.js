import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { cart } from "../../store/product-action";
export const Register = () => {
    const validationSchema = Yup.object({
        userName: Yup.string().required("Username is required").min(3, "username must be greater than 2"),
        email: Yup.string().required("email is required").email("Invaild email"),
        password: Yup.string().required("password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "password must contain atleast one uppercase & lower, number and special symbol"),
        street: Yup.string().required("street is required"),
        city: Yup.string().required("city is required"),
        state: Yup.string().required("state is required"),
        pinCode: Yup.string().required("pin code is required"),
        country: Yup.string().required("country is required"),
        phone: Yup.string().required("phone number is required")
    })
    const [disp_err, setDisp_err] = useState("")
    const navigate = useNavigate();
    return (
        <Container className={classes.container}>
            <Formik
                initialValues={{
                    userName: '',
                    password: '',
                    email: '',
                    street: '',
                    city: '',
                    state: '',
                    pinCode: '',
                    country: '',
                    phone: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        axios.post('http://localhost:8001/api/signup', values)
                            .then(response => {
                                console.log(response);
                                sessionStorage.setItem("token", response.data.token);
                                // console.log(response.data.token);
                                navigate('/login')
                                // console.log("welcome");

                            })
                            .catch(error => {
                                // console.error(error.response.data.message);
                                setDisp_err(error.response.data.message)

                            })
                        setSubmitting(false);
                    }, 400);
                }}

            >
                {({ isSubmitting }) => (
                    <Form>

                        <div>
                            <label>Username * </label> &nbsp;&nbsp;
                            <ErrorMessage name="userName" component="div" className='error' /><br />
                            <Field type="text" name="userName" placeholder="username" />
                        </div>

                        <div>
                            <label>Email address * </label> &nbsp;&nbsp;
                            <ErrorMessage name="email" component="div" className='error' /><br />
                            <Field type="text" name="email" placeholder="email" />
                        </div>

                        <div>
                            <label>Password * </label> &nbsp;&nbsp;
                            <ErrorMessage name="password" component="div" className='error' /><br />
                            <Field type="password" name="password" placeholder="password" />
                        </div>

                        <div>
                            <label>Street * </label> &nbsp;&nbsp;
                            <ErrorMessage name="street" component="div" className='error' /><br />
                            <Field type="text" name="street" placeholder="Street" />
                        </div>

                        <div>
                            <label>city * </label> &nbsp;&nbsp;
                            <ErrorMessage name="city" component="div" className='error' /><br />
                            <Field type="text" name="city" placeholder="City" />
                        </div>

                        <div>
                            <label>state * </label> &nbsp;&nbsp;
                            <ErrorMessage name="state" component="div" className='error' /><br />
                            <Field type="text" name="state" placeholder="State" />
                        </div>

                        <div>
                            <label>Pin Code * </label> &nbsp;&nbsp;
                            <ErrorMessage name="pinCode" component="div" className='error' /><br />
                            <Field type="text" name="pinCode" placeholder="Pin Code" />
                        </div>

                        <div>
                            <label>Country * </label> &nbsp;&nbsp;
                            <ErrorMessage name="country" component="div" className='error' /><br />
                            <Field type="text" name="country" placeholder="Conutry" />
                        </div>

                        <div>
                            <label>phone * </label> &nbsp;&nbsp;
                            <ErrorMessage name="phone" component="div" className='error' /><br />
                            <Field type="text" name="phone" placeholder="Phone" />
                        </div>

                        <p className='error'>{disp_err}</p><br />
                        <button type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </Container >
    )
}

export const LoginCom = () => {
    const validationSchema = Yup.object({
        email: Yup.string().required("required"),
        password: Yup.string().required("required")
    })
    const [disp_err, setDisp_err] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Container className={classes.container}>
            <Formik
                initialValues={{ password: '', email: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        //    console.log(values);

                        axios.post('http://localhost:8001/api/login', values)
                            .then(response => {
                                // console.log(response);
                                sessionStorage.setItem("token", response.data.token);
                                sessionStorage.setItem("user", response.data.data._id);
                                // console.log(response.data.data);
                                if (response.data.data.isAdmin) {
                                    // console.log("dashdoard");
                                    
                                    navigate('/dashboard')
                                }
                                else {
                                    // alert("get register")
                                    navigate('/home')
                                    dispatch(cart());
                                }
                                // console.log("welcome");

                            })
                            .catch(error => {
                                // console.error(error.response.data.message);
                                setDisp_err(error.response.data.message)

                            })
                        setSubmitting(false);
                    }, 400);
                }}

            >
                {({ isSubmitting }) => (
                    <div className={classes.div}>
                        <Form>
                            <div>
                                <label>Email address * </label> &nbsp;&nbsp;
                                <ErrorMessage name="email" component="div" className='error' /><br />
                                <Field type="text" name="email" placeholder="email" />
                            </div>

                            <div>
                                <label>Password * </label> &nbsp;&nbsp;
                                <ErrorMessage name="password" component="div" className='error' /><br />
                                <Field type="password" name="password" placeholder="password" />
                            </div>
                            <p className='error'>{disp_err}</p><br />
                            <button type="submit" disabled={isSubmitting}>
                                Login
                            </button>

                        </Form>
                        <p onClick={() => navigate('/forget-password')} className={`mt-3 ${classes.pwd}`}>Forget Password</p>
                    </div>
                )}
            </Formik>
        </Container >
    )
}