import axios from "axios";
import { useEffect,useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from './AddSubcategory.module.css'
const AddSubCategory = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/api/get-categories')
            .then(response => {
                // console.log(response);
                setCategory(response.data.data)
            
            })
        .catch(err=>console.log(err))
    },[])
    return (
        <>
            <div>
                <h1>Add Subcategory</h1>
                <Formik
                    initialValues={{ sub_category: '', category: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.sub_category) {
                            errors.sub_category = 'Required';
                        }
                        if (!values.category) {
                            errors.category = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            axios.post('http://localhost:8001/api/add-sub_category', { category_name: values.sub_category, main_category: values.category },
                                { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`}}
                            )
                                .then(response => {
                                    console.log(response);
                                    alert(response.data.message)
                                })
                            .catch(err=>console.log(err)
                            )
                            setSubmitting(false);
                            // console.log(values);
                            
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="sub_category" />
                            <ErrorMessage name="sub_category" component="div" />
                            <Field as="select" name="category"  >
                                <option value='' disabled >Select Category</option>
                                {
                                    category.map(data => (
                                        <option value={data._id}>{data.category_name}</option>
                                    ))
                                }
                            </Field>
                            <ErrorMessage name="category" component="div" />
                            <button type="submit" disabled={isSubmitting}>
                                Add
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
export default AddSubCategory;