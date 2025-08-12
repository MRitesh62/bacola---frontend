import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from './AddCategory.module.css'
const AddCategory = () => {
    return (
        <>
            <div className={classes.main}>
                <Formik
                    initialValues={{category_name:''}}
                    validate={values => {
                        const error = {};
                        if (!values.category_name) {
                            error.category_namename = 'Required';
                        }
                        return error;
                     }}
                    onSubmit={(values,{setSubmitting }) => {
                        setTimeout(() => {
                            axios.post("http://localhost:8001/api/add-category", { category_name: values.category_name },
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
                            <h1>Add category</h1>
                            <div className={classes.form}>
                                <label>Category Name</label> <br />
                                <Field type="text" name="category_name" placeholder="Enter category name" />
                                <ErrorMessage name="category_name" component="div"/><br/>
                            <button disabled={isSubmitting}>Add</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default AddCategory;