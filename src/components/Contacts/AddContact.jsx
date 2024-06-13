import { Link } from "react-router-dom";
import { useContext } from "react";
import ContextCreater from "../../contextAPI/contextForContact";

import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import contactSchema from "../../validations/validations";

const AddContact = () => {

  const context = useContext(ContextCreater);

  let { 
    loading,
    contact,
    contactChangeHandler,
    groups,
    makeContactHandler } = context;
    
  
  /* let formik = useFormik({
    initialValues: {
      fullname: '',
      photo: '',
      mobile: '',
      email: '',
      job: '',
      group: ''
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      makeContactHandler(values)
    }
  }); */

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <Formik
                    initialValues= {{
                      fullname: '',
                      photo: '',
                      mobile: '',
                      email: '',
                      job: '',
                      group: ''
                    }}
                    validationSchema= {contactSchema}
                    onSubmit= {values => {
                      makeContactHandler(values)
                    }}
                  > 
                      <Form>
                        <div className="mb-2">
                          <Field
                            /* id="fullname" */
                            name="fullname"
                            type="text"
                            /* value={formik.values.fullname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} */
                            /* {...formik.getFieldProps('fullname')} */
                            className="form-control"
                            placeholder="نام و نام خانوادگی"
                            /* required={true} */
                          />
                          {/* {formik.touched.fullname && formik.errors.fullname ? (
                            <div className="text-danger">{formik.errors.fullname}</div>
                          ) : null} */}
                          <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>}/>
    
                        </div>
                        <div className="mb-2">
                          <Field
                            /* id="photo" */
                            name="photo"
                            type="text"
                            /* value={formik.values.photo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} */
                            /* {...formik.getFieldProps('photo')} */
                            className="form-control"
                            /* required={true} */
                            placeholder="آدرس تصویر"
                          />
                          {/* {formik.touched.photo && formik.errors.photo ? (
                            <div className="text-danger">{formik.errors.photo}</div>
                          ) : null} */}
                          <ErrorMessage name="photo" render={msg => <div className="text-danger">{msg}</div>}/>
    
                        </div>
                        <div className="mb-2">
                          <Field
                            /* id="mobile" */
                            name="mobile"
                            type="number"
                            /* value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} */
                            /* {...formik.getFieldProps('mobile')} */
                            className="form-control"
                            /* required={true} */
                            placeholder="شماره موبایل"
                          />
                          {/* {formik.touched.mobile && formik.errors.mobile ? (
                            <div className="text-danger">{formik.errors.mobile}</div>
                          ) : null} */}
                          <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>}/>
    
                        </div>
                        <div className="mb-2">
                          <Field
                            /* id="email" */
                            type="email"
                            name="email"
                            /*value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} */
                            /* {...formik.getFieldProps('email')} */
                            className="form-control"
                            /* required={true} */
                            placeholder="آدرس ایمیل"
                          />
                          {/* {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                          ) : null} */}
                          <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>}/>
    
                        </div>
                        <div className="mb-2">
                          <Field
                            /* id="job" */
                            type="text"
                            name="job"
                            /*value={formik.values.job}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} */
                            /* {...formik.getFieldProps('job')} */
                            className="form-control"
                            /* required={true} */
                            placeholder="شغل"
                          />
                          {/* {formik.touched.job && formik.errors.job ? (
                            <div className="text-danger">{formik.errors.job}</div>
                          ) : null} */}
                          <ErrorMessage name="job" render={msg => <div className="text-danger">{msg}</div>}/>
    
                        </div>
                        <div className="mb-2">
                          <Field
                            /* id="group" */
                            as="select"
                            name="group"
                            /* value={formik.values.group}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} */
                            /* {...formik.getFieldProps('group')} */
                            /* required={true} */
                            className="form-control"
                          >
                            <option value="">انتخاب گروه</option>
                            {groups.length &&
                              groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                          </Field>
                          {/* {formik.touched.group && formik.errors.group ? (
                            <div className="text-danger">{formik.errors.group}</div>
                          ) : null} */}
                          <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>}/>
    
                        </div>
                        <div className="mx-2">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: PURPLE }}
                            value="ساخت مخاطب"
                          />
                          <Link
                            to={"/contacts"}
                            className="btn mx-2"
                            style={{ backgroundColor: COMMENT }}
                          >
                            انصراف
                          </Link>
                        </div>
                      </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
