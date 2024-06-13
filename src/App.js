import { useState, useLayoutEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useImmer } from "use-immer";

import {
  AddContact,
  ViewContact,
  Contacts,
  EditContact,
  Navbar,
} from "./components";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";

import "./App.css";
import {
  BACKGROUND,
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/colors";

import ContextCreater from "./contextAPI/contextForContact";

import _ from 'lodash';
import { ToastContainer, toast } from "react-toastify";

/* import contactSchema from "./validations/validations"; */

/* import Swal from "sweetalert2"; */

const App = () => {
  const [loading, setLoading] = useImmer(false);
  /* const [forceRender, setForceRender] = useState(false); */
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [contact, setContact] = useImmer({});
  /* const [errors, setErrors] = useState([]); */
  
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const createContactForm = async values => {
    /* event.preventDefault(); */
    try {
      /* setLoading(draft => !draft); */
      /* await contactSchema.validate(contact, { abortEarly: false }); */

      const { status } = await createContact(values);

      if (status === 201) {
        /* const allContacts = [...contacts, data];

        setContacts(allContacts);
        setFilteredContacts(allContacts); */
        /* setContact(draft => { draft.push(data) } );
        setFilteredContacts(draft => { draft.push(data) } ); */

        toast.success('مخاطب با موفقیت ساخته شد');

        setContact({});
        navigate("/contacts");
      }
    } catch (err) {
      /* setErrors(err.inner) */
      /* Swal.fire({
        title: 'شما برخی از اطلاعات را به درستی وارد نکردید!',
        icon: 'error',
        text: `${errors}`,
        confirmButtonText: 'باشه'
      }); */
      console.log(err);
    }
  };

  const contactChangeHandler = event => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);

      setContacts(draft => contacts.filter(c => c.id !== contactId));
      setFilteredContacts(draft => contacts.filter(c => c.id !== contactId))

      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        /* setContacts(contactsData); */

        toast.error('مخاطب با موفقیت حذف شد');

        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };


  // let TimeOut;

  const contactSearch = _.debounce(etv => {
    // clearTimeout(TimeOut);
    
    !etv && setFilteredContacts([...contacts]);

    // TimeOut = setTimeout(() => {
      /* setFilteredContacts(
        contacts.filter(contact => {
          return contact.fullname
            .toLowerCase()
            .includes(etv.toLowerCase());
          })
      ); */

      setFilteredContacts(draft => draft.filter(c => c.fullname.toLowerCase().startsWith(etv.toLowerCase()) ) );

    // }, 1000);
  }, 1000);

  return (
    <ContextCreater.Provider value={{
      loading,
      setLoading,
      contact,
      setContact,
      contacts,     
      filteredContacts,
      groups,
      contactChangeHandler,
      deleteContactHandler: confirmDelete,
      makeContactHandler: createContactForm,
      searchContactHandler: contactSearch
    }}>
      <div className="App">
          <ToastContainer rtl={true} position="top-right" theme="colored"/>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Navigate to="/contacts" />} />
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/contacts/add" element={<AddContact/>}/>
            <Route path="/contacts/:contactId" element={<ViewContact />} />
            <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
          </Routes>
        </div>
     </ContextCreater.Provider>
  );
};

export default App;
