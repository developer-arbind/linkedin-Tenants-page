import React from "react"; 
export default class Spinner extends React.Component {
  render() {
    return (
        <div className="spinner">
          <li-icon type="loader" id="loader" className="blue" aria-hidden="true">
            <div className="artdeco-spinner">
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
              <span className="artdeco-spinner-bars"></span>
            </div>
          </li-icon>
        </div>
    );
  }
}