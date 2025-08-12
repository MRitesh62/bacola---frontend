import axios from "axios";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from './Addproduct.module.css'

const AddProduct = () => {
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [brand, setBrand] = useState([]);

    //category fetching

    useEffect(() => {
        axios.get('http://localhost:8001/api/get-categories')
            .then(response => {
                // console.log(response.data.data);
                setCategory(response.data.data)
            })
            .catch(err => console.log(err)
            )
    }, [])

    //subcategory fetching

    // useEffect((categoryId) => {
    //     axios.get(`http://localhost:8001/api/get-sub_categories?main_category=${categoryId}`)
    //         .then(response => {
    //             console.log(response);
    //             setSubcategory(response.data.data)
    //         })
    //         .catch(err => console.log(err)
    //         )
    // }, [])

    const categorychanges = (categoryId, setFieldValue) => {
        setFieldValue("subcategory_name", "");
        if (categoryId) {
            axios.get(`http://localhost:8001/api/get-sub_categories?main_category=${categoryId}`)
            .then(response => {
                console.log(response);
                setSubcategory(response.data.data)
            })
            .catch(err => console.log(err)
            )
        } else {
            setSubcategory([]);
        }
    }
    //brand fetching
    useEffect(() => {
        axios.get('http://localhost:8001/api/get-brands')
            .then(response => {
                // console.log(response);
                setBrand(response.data.data)
            })
            .catch(err => console.log(err)
            )
    }, [])

    return (
        <>
            <div className={classes.main}>
                <Formik
                    initialValues={{
                        category_name: '',
                        subcategory_name: '',
                        brand_name: '',
                        rating: '',
                        discount: ''
                    }}
                    validate={values => {
                        const error = {};
                        if (!values.category_name) {
                            error.category_namename = 'Required';
                        }
                        return error;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const formData = new FormData();
                        formData.append("name", values.product_name);
                        formData.append("category", values.category_name);
                        formData.append("sub_category", values.subcategory_name);
                        if (values.brand && values.brand.trim() !== "") {
                            formData.append("brand", values.brand);
                        }
                        formData.append("price", values.price);
                        formData.append("discount", values.discount);
                        formData.append("rating", values.rating);
                        formData.append("availability", values.availability);
                        formData.append("short_description", values.short_description);
                        formData.append("long_description", values.long_description);
                        formData.append("type", values.type);
                        formData.append("mfg", values.mfg);
                        formData.append("life", values.life);
                        formData.append("tags", values.tags);

                        // Append the image
                        if (values.image) {
                            Array.from(values.image).forEach((file) => {
                                formData.append("images", file);
                            });
                        }
                        setTimeout(() => {
                            axios.post("http://localhost:8001/api/add-product", formData,
                                { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
                                .then(response => {
                                    // console.log(response);
                                    alert(response.data.message)

                                })
                                .catch(err => {
                                    console.log(err);
                                    // alert(err.response.message)
                                })
                            setSubmitting(false);
                        }, 400)
                    }}
                >
                    {({ setFieldValue, isSubmitting }) => (
                        <Form style={{width:'90%'}}>
                            <h1>Add Product</h1>
                            <div className={classes.form}>
                                <div className="d-inline-block me-5">
                                    <label>Product Name</label> <br />
                                    <Field type="text" name="product_name" placeholder="Enter product name" />
                                    <ErrorMessage name="product_name" component="div" /><br />
                                </div>
                                <div className="d-inline-block">
                                    <label>Product Image</label> <br />
                                    <input
                                        type="file"
                                        name="image"
                                        multiple
                                        onChange={(event) => {
                                            setFieldValue("image", event.currentTarget.files);
                                        }}
                                    />
                                    <ErrorMessage name="image" component="div" /><br />
                                </div> <br/>
                                <div className="d-inline-block me-5">
                                    <label>Category Name</label> <br />
                                    <Field as='select' name="category_name"
                                        onChange={(e) => {
                                            const categoryId = e.target.value;
                                            setFieldValue("category_name", categoryId);
                                            categorychanges(categoryId,setFieldValue)
                                    }}>
                                        <option value='' disabled >Select Category</option>
                                        {
                                            category.map(data => (
                                                <option value={data._id}>{data.category_name}</option>
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="category_name" component="div" /><br />
                                </div>
                                <div className="d-inline-block me-5" >
                                    <label>Subcategory Name</label> <br />
                                    <Field as='select' name="subcategory_name">
                                        <option value='' disabled >Select Subcategory</option>
                                        {
                                            subcategory.map(data => (
                                                <option value={data._id}>{data.category_name}</option>
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="subcategory_name" component="div" /><br />
                                </div>
                                <div className="d-inline-block me-5">
                                    <label>Brand Name</label> <br />
                                    <Field as='select' name="brand_name">
                                        <option value='' disabled >Select Brand</option>
                                        {
                                            brand.map(data => (
                                                <option value={data._id}>{data.name}</option>
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="brand_name" component="div" /><br />
                                </div>
                                <div>
                                    <label>Price</label> <br />
                                    <Field type="text" name="price" placeholder="Enter product price" />
                                    <ErrorMessage name="price" component="div" /><br />
                                </div>

                                <div>
                                    <label>Discount</label> <br />
                                    <Field type="number" name="discount" />
                                    <ErrorMessage name="discount" component="div" /><br />
                                </div>
                                <div>
                                    <label>Rating</label> <br />
                                    <Field type="text" name="rating" placeholder="Enter product rating" />
                                    <ErrorMessage name="rating" component="div" /><br />
                                </div>
                                <div>
                                    <label>Availability</label> <br />
                                    <Field type="text" name="availability" placeholder="Enter product availability" />
                                    <ErrorMessage name="availability" component="div" /><br />
                                </div>
                                <div>
                                    <label>Short Description</label> <br />
                                    <Field type="text" name="short_description" placeholder="Enter product short Description" />
                                    <ErrorMessage name="short_description" component="div" /><br />
                                </div><div>
                                    <label>Long Description</label> <br />
                                    <Field type="text" name="long_description" placeholder="Enter product long Description" />
                                    <ErrorMessage name="long_description" component="div" /><br />
                                </div><div>
                                    <label>Type</label> <br />
                                    <Field type="text" name="type" placeholder="Enter product type" />
                                    <ErrorMessage name="type" component="div" /><br />
                                </div><div>
                                    <label>Mfg</label> <br />
                                    <Field type="text" name="mfg" placeholder="Enter product Mfg" />
                                    <ErrorMessage name="mfg" component="div" /><br />
                                </div><div>
                                    <label>Life</label> <br />
                                    <Field type="text" name="life" placeholder="Enter product life" />
                                    <ErrorMessage name="life" component="div" /><br />
                                </div><div>
                                    <label>Tags</label> <br />
                                    <Field type="text" name="tags" placeholder="Enter product Tags" />
                                    <ErrorMessage name="tags" component="div" /><br />
                                </div>
                                <button disabled={isSubmitting}>Add</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default AddProduct;