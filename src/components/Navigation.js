import React from "react";
import { Link } from "react-router-dom";
import { BiRedo } from "react-icons/bi";
import PropTypes from "prop-types";
import {LocaleConsumer} from '../context/LocaleContext'

function Navigation({ logout, name }) {
  return (
    <LocaleConsumer>
    {
      // eslint-disable-next-line no-empty-pattern
      ({}) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/add" className="AddNote_">
                   AddNote
                </Link>
              </li>
              <li>
                <button onClick={logout} className="button-logout">
                  {name} < BiRedo/>
                </button>
              </li>
            </ul>
          </nav>
           )
          }
        }
      </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
