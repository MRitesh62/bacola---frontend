import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from '../../category/add-category/AddCategory.module.css'
const AddBrand = () => {
    return (
        <>
            <div className={classes.main}>
                <Formik
                    initialValues={{name:''}}
                    validate={values => {
                        const error = {};
                        if (!values.name) {
                            error.name = 'Required';
                        }
                        return error;
                     }}
                    onSubmit={(values,{setSubmitting }) => {
                        setTimeout(() => {
                            axios.post("http://localhost:8001/api/add-brand", { name: values.name },
                                { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
                                .then(response => {
                                    // console.log(response);
                                    alert(response.data.message)
                                    
                                })
                                .catch(err => {
                                    // console.log(err);
                                    alert(err.response.data.message)
                                })
                            setSubmitting(false);
                        },400)
                    }}
                >
                    {({ isSubmitting }) => (
                             <Form>
                            <h1>Add Brand</h1>
                            <div className={classes.form}>
                                <label>Brand Name</label> <br />
                                <Field type="text" name="name" placeholder="Enter Brand name" />
                                <ErrorMessage name="name" component="div"/><br/>
                            <button disabled={isSubmitting}>Add</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default AddBrand;