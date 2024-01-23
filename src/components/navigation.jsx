import React, { useCallback, useState } from 'react';
import Dropdown from 'rsuite/Dropdown';
import { useEffect } from 'react';
import WordCloud from "react-d3-cloud";
import {ButtonToolbar} from 'react-bootstrap';
import {ScrollModal} from './modal-popup'

export const Navigation = (props) => {
 

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            LinkedIn Trending Page
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
            <a href="#featuresdisplay"  className="page-scroll">
              Explore WordCloud
            </a>
            </li>
            <li>
            <a href="#timelinedisplay"  className="page-scroll">
              Explore Timeline
            </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
