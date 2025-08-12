import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
function UpdateProduct({ data, ...props }) {
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [brand, setBrand] = useState([]);
    // console.log(data);

    useEffect(() => {
        axios.get('http://localhost:8001/api/get-categories')
            .then(response => {
                // console.log(response.data.data);
                setCategory(response.data.data)
            })
            .catch(err => console.log(err)
            )
    }, [])
    useEffect(() => {
        axios.get('http://localhost:8001/api/get-sub_categories')
            .then(response => {
                // console.log(response);
                setSubcategory(response.data.data)
            })
            .catch(err => console.log(err)
            )
    }, [])
    useEffect(() => {
        axios.get('http://localhost:8001/api/get-brands')
            .then(response => {
                // console.log(response.data.data);
                setBrand(response.data.data)

            })
            .catch(err => console.log(err)
            )
    }, [])
    // console.log(brand);
    if (!data) return <div>Loading product details...</div>;
    return (
        <div>
            <Modal   {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: data?.name || '',
                            category: data?.category?._id || '',
                            sub_category: data?.subcategory?._id || '',
                            brand: data?.brand?._id|| '',
                            price: data?.price || '',
                            discount: data?.discount || '',
                            rating: data?.rating || '',
                            availability: data?.availability || '',
                            short_description: data?.short_description || '',
                            long_description: data?.long_description || '',
                            type: data?.type || '',
                            mfg: data?.mfg || '',
                            life: data?.life || '',
                            tags: data?.tags || '',
                            images:null 
                        }}

                        validate={values => {
                            const error = {};
                            if (!values.name) {
                                error.name = 'Required';
                            }
                            return error;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            // console.log(values.brand);
                            console.log('Submitted values:', values);
                            
                            const formData = new FormData();
                            formData.append("name", values.name.trim() === "" ? data.name : values.name);
                            formData.append("category", values.category === "" ? data.category : values.category);
                            if (values.sub_category && values.sub_category.trim() !== "") {
                            formData.append("sub_category", values.sub_category );
                                
                            }
                            if (values.brand && values.brand.trim() !== "") {
                                formData.append("brand", values.brand);
                            } else {
                                formData.append("brand", null); 
                            }
                            // For numeric fields, you can check explicitly for an empty string
                            formData.append("price", values.price === "" ? data.price : values.price);
                            formData.append("discount", values.discount === "" ? data.discount : values.discount);
                            formData.append("rating", values.rating === "" ? data.rating : values.rating);

                            // For other fields, adjust similarly:
                            formData.append("availability", values.availability.trim() === "" ? data.availability : values.availability);
                            formData.append("short_description", values.short_description.trim() === "" ? data.short_description : values.short_description);
                            formData.append("long_description", values.long_description.trim() === "" ? data.long_description : values.long_description);
                            formData.append("type", values.type.trim() === "" ? data.type : values.type);
                            formData.append("mfg", values.mfg.trim() === "" ? data.mfg : values.mfg);
                            formData.append("life", values.life.trim() === "" ? data.life : values.life);
                            formData.append("tags", values.tags.trim() === "" ? data.tags : values.tags);

                            // Append images if any new images are selected; otherwise, you could leave them out or handle separately.
                            if (values.images && values.images.length > 0) {
                                Array.from(values.images).forEach((file) => {
                                    formData.append("images", file);
                                });
                            }
                            setTimeout(() => {
                                axios.put(`http://localhost:8001/api/update-product/${data._id}`, formData,
                                    { headers: {"Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
                                    .then(response => {
                                        // console.log(response);
                                        alert(response.data.message);
                                        props.onHide()

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
                            <Form>
                                <div>
                                    <div>
                                        <label>Product Name</label> <br />
                                        <Field type="text" name="name" placeholder="Enter product name" />
                                        <ErrorMessage name="name" component="div" /><br />
                                    </div>
                                    <div>
                                        <label>Product Image</label> <br />
                                        <input
                                            type="file"
                                            name="images"
                                            multiple
                                            onChange={(event) => {
                                                setFieldValue("images", event.currentTarget.files);
                                            }}
                                        />
                                        <ErrorMessage name="image" component="div" /><br />
                                    </div>
                                    <div>
                                        <label>Category Name</label> <br />
                                        <Field as='select' name="category">
                                            <option value='' disabled >Select Category</option>
                                            {
                                                category.map((data) => {
                                                    // console.log("Category ID:", data._id); 
                                                    return (
                                                        <option key={data._id} value={data._id}>
                                                            {data.category_name}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="category" component="div" /><br />
                                    </div>
                                    <div>
                                        <label>Subcategory Name</label> <br />
                                        <Field as='select' name="sub_category">
                                            <option value='' disabled >Select Subcategory</option>
                                            {
                                                subcategory.map(data => (
                                                    <option value={data._id}>{data.category_name}</option>
                                                ))
                                            }
                                        </Field>
                                        <ErrorMessage name="sub_category" component="div" /><br />
                                    </div>
                                    <div>
                                        <label>Brand Name</label> <br />
                                        <Field as='select' name="brand">
                                            <option value='' disabled >Select Brand</option>
                                            {
                                                brand.map((data) => {
                                                    // console.log(data._id);

                                                    return <option value={data._id}>{data.name}</option>
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="brand" component="div" /><br />
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
                                    <button type='submit' disabled={isSubmitting}>Update</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>


            </Modal>
        </div>
    );
}

export default UpdateProduct;