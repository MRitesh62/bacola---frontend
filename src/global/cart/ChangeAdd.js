import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import classes from './Cart.module.css';

const ChangeAdd = ({onAddressUpdate}) => {
    const [disp_err, setDisp_err] = useState('');
    const id = sessionStorage.getItem('user');

    // Validation Schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        street: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        pinCode: Yup.string().matches(/^\d{6}$/, 'Must be a 6-digit pin code').required('Required'),
        country: Yup.string().required('Required'),
        phone: Yup.string().matches(/^\d{10}$/, 'Must be a 10-digit phone number').required('Required'),
    });

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    street: '',
                    city: '',
                    state: '',
                    pinCode: '',
                    country: '',
                    phone: ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const response = await axios.put(`http://localhost:8001/api/update-user/${id}`, values);
                        // console.log(response);
                        const newAddress = `${values.street}, ${values.city}, ${values.state}`;
                    onAddressUpdate(newAddress);
                        setDisp_err(''); // Clear error on success
                    } catch (error) {
                        setDisp_err(error.response?.data?.message || 'Something went wrong');
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={classes.form}>
                        <div>
                            
                            <ErrorMessage name="email" component="div" className="error" />
                            <Field type="text" name="email" placeholder="Email" />
                        </div>

                        <div>
                            
                            <ErrorMessage name="street" component="div" className="error" />
                            <Field type="text" name="street" placeholder="Street" />
                        </div>

                        <div>
                            
                            <ErrorMessage name="city" component="div" className="error" />
                            <Field type="text" name="city" placeholder="City" />
                        </div>

                        <div>
           
                            <ErrorMessage name="state" component="div" className="error" />
                            <Field type="text" name="state" placeholder="State" />
                        </div>

                        <div>
                           
                            <ErrorMessage name="pinCode" component="div" className="error" />
                            <Field type="text" name="pinCode" placeholder="Pin Code" />
                        </div>

                        <div>
                            
                            <ErrorMessage name="country" component="div" className="error" />
                            <Field type="text" name="country" placeholder="Country" />
                        </div>

                        <div>
                            
                            <ErrorMessage name="phone" component="div" className="error" />
                            <Field type="text" name="phone" placeholder="Phone" />
                        </div>

                        {disp_err && <p className="error">{disp_err}</p>}

                        <button type="submit" disabled={isSubmitting}>
                            Update
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ChangeAdd;
