import { useEffect, useState } from "react";
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';

import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getContact,
  getAllGroups,
  updateContact,
} from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";

import { Formik, Form, ErrorMessage, Field } from "formik";
import contactSchema from "../../validations/validations";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {},
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupsData } = await getAllGroups();
        setState({
          ...state,
          loading: false,
          contact: contactData,
          groups: groupsData,
        });
      } catch (err) {
        console.log(err);
        setState({ ...state, loading: false });
      }
    };

    fetchData();
  }, []);

  /* const setContactInfo = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: [event.target.value],
      },
    });
  }; */

  const submitForm = async values => {
    /* event.preventDefault(); */
    try {
      setState({ ...state, loading: true });
      const { data, status } = await updateContact(values, contactId);
      
      if (status === 200) {
        setState({ ...state, loading: false });

        toast.info('مخاطب با موفقیت عوض شد :)')
        
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setState({ ...state, loading: false });
    }
  };

  const { loading, contact, groups } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                  initialValues ={/* {
                    fullname: contact.fullname,
                    photo: contact.photo,
                    mobile: contact.mobile,
                    email: contact.email,
                    job: contact.job,
                    group: contact.group
                    } */
                    contact
                }
                  validationSchema = {contactSchema}
                  onSubmit = {values => {
                    submitForm(values)
                  }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          className="form-control"
                        /*  value={contact.fullname}
                          onChange={setContactInfo}
                          required={true} */
                          placeholder="نام و نام خانوادگی"
                        />
                        <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>}/>
                      </div>

                      <div className="mb-2">
                        <Field
                          name="photo"
                          type="text"
                          /* value={contact.photo}
                          onChange={setContactInfo} */
                          className="form-control"
                          /* required={true} */
                          placeholder="آدرس تصویر"
                        />
                        <ErrorMessage name="photo" render={msg => <div className="text-danger">{msg}</div>}/>
                      </div>

                      <div className="mb-2">
                        <Field
                          name="mobile"
                          type="number"
                          className="form-control"
                          /* value={contact.mobile}
                          onChange={setContactInfo}
                          required={true} */
                          placeholder="شماره موبایل"
                        />
                        <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>}/>
                      </div>

                      <div className="mb-2">
                        <Field
                          name="email"
                          type="email"
                          className="form-control"
                          /* value={contact.email}
                          onChange={setContactInfo}
                          required={true} */
                          placeholder="آدرس ایمیل"
                        />
                        <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>}/>
                      </div>
                      <div className="mb-2">
                        <Field
                          name="job"
                          type="text"
                          className="form-control"
                          /* value={contact.job}
                          onChange={setContactInfo}
                          required={true} */
                          placeholder="شغل"
                        />
                        <ErrorMessage name="job" render={msg => <div className="text-danger">{msg}</div>}/>
                      </div>
                      <div className="mb-2">
                        <Field
                          as="select"
                          name="group"
                          /* value={contact.group}
                          onChange={setContactInfo}
                          required={true} */
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>}/>
                      </div>
                      <div className="mb-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="ویرایش مخاطب"
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
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
