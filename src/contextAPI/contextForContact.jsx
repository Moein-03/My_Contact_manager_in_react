import { createContext } from "react";

const ContextCreater = createContext({
    loading: false,
    setLoading: () => {},
    contact: {},
    setContact: () => {},
    contacts: [],
    filteredContact: [],
    groups: [],
    contactChangeHandler: () => {},
    deleteContactHandler: () => {},
    updateContactHandler: () => {},
    makeContactHandler: () => {},
    searchContactHandler: () => {}
}); 

export default ContextCreater