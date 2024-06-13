import { useContext } from "react";
import ContextCreater from "../contextAPI/contextForContact";
import { useLocation } from "react-router-dom";

import SearchContact from "./Contacts/SearchContact";

import { BACKGROUND, PURPLE } from "../helpers/colors";

import HOC from "./higher_order_component/HOC";

const Navbar = () => {
  const location = useLocation();

  const context = useContext(ContextCreater);

  let { contactQuery, searchContactHandler } = context

  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: PURPLE }} /> وب
              اپلیکیشن مدیریت{"  "}
              <span style={{ color: PURPLE }}>مخاطبین</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact query={contactQuery} search={searchContactHandler} />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default HOC(Navbar);
