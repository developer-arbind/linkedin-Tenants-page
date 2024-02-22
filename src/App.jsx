import React from "react";
import Modal from 'react-responsive-modal';
import Spinner from "../src/utils/Spinner";
import {getMessageFromStatus} from "../src/common/ResponseUtils.js";
import {getCCTCategories, getContentExtractionFields} from "../src/utils/AttributeUtils.jsx";
import {getCookieVal} from "../src/common/Util";
import {CUD_FORBIDDEN_MESSAGE} from "../src/utils/Constants.jsx";
import "../src/css/attribute.scss"

export default class CCTCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      fields: [],
      filteredItems: []
    };
    this.filterSupportedFields = this.filterSupportedFields.bind(this);
    this.addSupportedField = this.addSupportedField.bind(this);
  }

  async componentDidMount() {
    let sfResponse = await getCCTCategories(this.props.fabric);
    // let sfResponse = {"fields" : []}
    if (sfResponse.error) {
      this.setState({
        fields: [],
        error: sfResponse.error.statusText ? sfResponse.error.statusText : getMessageFromStatus(
            sfResponse.error.status),
        isLoaded: true
      })
    } else {
      this.setState({
        isLoaded: true,
        fields: sfResponse.fields,
        filteredItems: sfResponse.fields
      });
    }
  }

  addSupportedField(err, fa) {
    if (err) {
      return this.props.showErrorDialogue(err.message ? err.message : "Unexpected Error Occurred");
    }
    this.setState({isLoaded:false});
    this.props.showSuccessDialogue("Successfully Added");
    this.componentDidMount();
  }

  filterSupportedFields(evt) {
    let searchText = evt.target.value.toLowerCase();
    this.setState({filteredItems: this.state.fields.filter(item => {
        return item.ucfContentExtractionFieldId.toLowerCase().indexOf(searchText) !== -1;
      })});
  }

  render() {
    const { error, isLoaded, filteredItems } = this.state;

    if (error) {
      return <div>Error: {error} </div>;
    // } else if (!isLoaded) {
    //   return <Spinner />;
    } else {
      return (
          <div className="list-container">
            <div className="header-row columns-2">
              <h1>CCT Tenants</h1>
              <div className="action-button">
                <AddNewSourceButton addSupportedField={this.addSupportedField} fabric={this.props.fabric} />
              </div>
            </div>
            <div>
              <input type="search" placeholder="Search" onChange={this.filterSupportedFields} />
            </div>
            {filteredItems.map(item => (
                <SupportedFieldRow
                    fabric={this.props.fabric}
                    key={item.ucfContentExtractionFieldId}
                    item={item}
                />
            ))}
          </div>
      );
    }
  }
}

function SupportedFieldRow(props) {
  return (<div className="columns-2">
    <div className="row-title">
      <h2> {props.item.ucfContentExtractionFieldId} </h2>
    </div>
  </div>);
}

class AddNewSourceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      field: "",
      validate: false
    };
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCreateField = this.onCreateField.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value, validate: false})
  }

  onOpenModal() {
    this.setState({ open: true, validate: false });
  };

  onCloseModal() {
    this.setState({ open: false, validate: false });
  };

  async onCreateField() {
    if (!this.state.field) {
      this.setState({validate: true});
      return;
    }

    let formData = new FormData();
    formData.append("fieldId", this.state.field);
    formData.append("JSESSIONID", getCookieVal("JSESSIONID"));

    const response = await fetch("/cf-tools/fast-serve/api/contentExtractionField/" + this.props.fabric, {
      method: 'post',
      credentials: 'same-origin',
      body: formData
    });

    if (response.ok) {
      const json = await response.json();
      this.props.addSupportedField(null, json);
      this.onCloseModal();
    } else {
      if (response.status === 403) {
        this.props.addSupportedField(CUD_FORBIDDEN_MESSAGE, null);
      } else {
        this.props.addSupportedField(response.statusText, null);
      }
      this.onCloseModal();
    }
  }

  render() {
    const { open, validate, field } = this.state;
    return (
        <div>
          <button className="artdeco-button artdeco-button--secondary" onClick={this.onOpenModal}>
            Add New
          </button>
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className="react-modal">
              <div className="modal-header">
                <h2 className="modal-title">CREATE UCF SUPPORTED FIELD</h2>
              </div>
              <form className="modal-form">
                <div className="input-box">
                  <label htmlFor="fieldName">Name</label>
                  <input type="text" name="field" id="fieldName" onChange={this.handleChange.bind(this)} placeholder="eg: TITLE"/>
                  {validate && !field ? <span className="error-msg" >Enter Name </span> : null }
                </div>

              </form>
              <div className="modal-footer modal-action-buttons">
                  <span>
                    <button type="button"
                            className="artdeco-button artdeco-button--secondary"
                            onClick={this.onCloseModal}>
                      Cancel
                    </button>
                  </span>
                <span>
                    <button type="button"
                            className="artdeco-button"
                            onClick={this.onCreateField}>
                      Save
                    </button>
                  </span>
              </div>
            </div>
          </Modal>
        </div>
    );
  }
}