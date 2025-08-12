import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from 'react-bootstrap/Modal';

function UpdateBrand({data,...props}) {
  return (
    <div>
      <Modal   {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Brand</Modal.Title>
        </Modal.Header>

        <Modal.Body>
                  <Formik
                      initialValues={{ name: data?.name || '' }}
                      validate={values => {
                          const error = {};
                          if (!values.name) {
                              error.name = 'Required';
                          }
                          return error;
                      }}
                      onSubmit={(values, { setSubmitting,resetForm }) => {
                          axios.put(`http://localhost:8001/api/update-brand/${data._id}`, {name: values.name },
                            { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
                              .then(response => {
                                  console.log(response);
                                  alert(response.data.message);
                                  resetForm();
                                  props.onHide();
                              })
                          .catch(err=>{console.log(err);
                          })
                          setSubmitting(false);
                      }}
                  >
                      {({ isSubmitting }) => (
                          <Form>
                              <div>
                                  <Field type="text" name="name" />
                                  <ErrorMessage name="name" component="div"/>
                              </div>
                              <button disabled={isSubmitting}>Add Brand</button>
                          </Form>
                      )}
          </Formik>
        </Modal.Body>

       
      </Modal>
    </div>
  );
}

export default UpdateBrand;