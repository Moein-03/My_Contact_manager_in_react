import { Link } from "react-router-dom";
import { useContext } from "react";
import ContextCreater from "../../contextAPI/contextForContact";

import Contact from "./Contact";
import Spinner from "../Spinner";
import { CURRENTLINE, ORANGE, PINK, CYAN, COMMENT, INDIGO } from "../../helpers/colors";

const Contacts = () => {

  const context = useContext(ContextCreater);

  let { filteredContacts, loading, deleteContactHandler } = context;

  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 float-end">
                <Link
                  to={"/contacts/add"}
                  className="btn m-2"
                  style={{ backgroundColor: INDIGO }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <Contact
                  key={c.id}
                  confirmDelete={() => deleteContactHandler(c.id, c.fullname)}
                  contact={c}
                />
              ))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: CURRENTLINE }}
              >
                <p className="h3" style={{ color: ORANGE }}>
                  مخاطب یافت نشد ...
                </p>
                <img
                  src={require("../../assets/no-found.gif")}
                  alt="پیدا نشد"
                  className="w-25"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
