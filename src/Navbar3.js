

import React from 'react';
import { Link } from "react-router-dom";


export default function Navbar3() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Company Name
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter ID"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  Search
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
      
    </div>
  )
}

