import React, {useState} from "react";
import {getMessageFromStatus} from "./common/ResponseUtils.js";
import {getCCTCategories, getContentExtractionFields, getCCTTenats} from "../src/utils/AttributeUtils.jsx";
import {getCookieVal, clearString} from "./common/Util";
import {CUD_FORBIDDEN_MESSAGE} from "./utils/Constants.jsx";
import "../src/css/attribute.scss";
import { SupportedFieldRow, PopUp } from "./App";


export default class CCTCategory1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      fields: [],
      filteredItems: [],
      error: {
         occured: false,
        message: ""
      }
    };
    this.filterSupportedFields = this.filterSupportedFields.bind(this);
    this.addSupportedField = this.addSupportedField.bind(this);
    this.showErrorDialogue = this.showErrorDialogue.bind(this);
  }

  showErrorDialogue(errMessage, hide){
      this.setState({error: {
        occured: hide ? false : true,
        message: errMessage
      }, validate: false})
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
      return this.showErrorDialogue(err.message ? err.message : "Unexpected Error Occurred");
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


    // } else if (true === true) {
    //   return <Spinner />;
   
      return (
          <div className="list-container">
            <div className="header-row columns-2">
              <h1>CCT Categories</h1>
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

            {
              error.occured ? <div className="error-modal">
                  {error.message}
                  <button onClick={() => this.showErrorDialogue(true, true )}>X</button>
              </div> : null
            }
          </div>
      );
  }
}



function RenderPopUP(open, update, onCreateField, onCloseModal, handleChange, selecteTenant, validate, field, tenants, tag, description){
  return (
    <PopUp 
      open={open} 
      update={update} 
      onCreateField={onCreateField} 
      onCloseModal={onCloseModal} 
      handleChange={handleChange} 
      selecteTenant={selecteTenant} 
      validate={validate} 
      field={field} 
      tenants={tenants} 
      tag={tag}
      description={description}
    />
  );
}
export { RenderPopUP };
class AddNewSourceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      field: "",
      description: "",
      validate: false, 
      tenants: [],
      tag: "",
      hide: true,
  
    };
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCreateField = this.onCreateField.bind(this);
    this.onTenantsGet = this.onTenantsGet.bind(this);
    this.selecteTenant = this.selecteTenant.bind(this);
   
  }

 

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value, validate: false})
  }
  

  selecteTenant(e, index, tnt){
    e.preventDefault();
   
    const existsTenant = this.state.tag ? this.state.tag.split(',').filter(tenant => tenant === tnt.tenant) : [];

    if(existsTenant.length > 0) this.setState({tag: clearString(this.state.tag.split(',').map(tenant => {
      if(tenant !== tnt.tenant){
        return tenant + ",";
      }
  }).join(""))});
    else this.setState({tag: this.state.tag.charAt(this.state.tag.length - 1) === "," || !this.state.tag ? this.state.tag + tnt.tenant + "," : this.state.tag + "," + tnt.tenant + ","})

    this.setState({tenants: this.state.tenants.map((tnt, i) => {return index !== i ? {tenant: tnt.tenant, selected: tnt.selected} : {tenant: tnt.tenant, selected: !tnt.selected ? true : false}})});
  }


  async onTenantsGet(){
    if(this.state.tenants.length > 0)return;
      const result = await getCCTTenats();
      console.log("tenants: ", result);
      if(!result.error){
        const fields = result.fields.map((tnt) => {return {tenant: tnt, selected: false}});
        this.setState({tenants: fields});
      }
  }
  onOpenModal() {
    this.setState({ open: true, validate: false });
    this.onTenantsGet();
    this.closeX(false, this.state.hide);
  };

  closeX(hide, back){
    if(back)return this.setState({hide: false});
    document.querySelector(".react-responsive-modal-closeButton").style.display =  hide ? "none" : "block";
  }
  
  onCloseModal() {
    console.log("lagging: ");
    this.setState({ open: false, validate: false });
    this.closeX(true, this.state.hide);
    this.setState({field: "", description: "", tag: "", tenants: this.state.tenants.map(tnt => {return {
        ...tnt,
        selected: false
    }})})
  };

  async onCreateField() {
    if (!this.state.field) {
      this.setState({validate: true});
      return;
    }

    let formData = new FormData();
    formData.append("name", this.state.field);
    formData.append("description", this.state.description);
    formData.append("tenants", this.state.tenants);
    formData.append("JSESSIONID", getCookieVal("JSESSIONID")); //optional field!

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
    return (
        <div>
          <button className="artdeco-button artdeco-button--secondary" onClick={this.onOpenModal}>
            Add New 
          </button>
          {RenderPopUP(this.state.open, 
                      false, 
                      this.onCreateField.bind(this), 
                      this.onCloseModal.bind(this), 
                      this.handleChange.bind(this), 
                      this.selecteTenant.bind(this), 
                      this.state.validate, 
                      this.state.field, 
                      this.state.tenants, 
                      this.state.tag,
                      this.state.description
                    )
          }
        </div>
    );
  }
}