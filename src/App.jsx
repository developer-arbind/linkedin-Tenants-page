import React from "react";
import {getMessageFromStatus} from "../src/common/ResponseUtils.js";
import {getCCTCategories, getCCTTenats} from "../src/utils/AttributeUtils.jsx";
import {getCookieVal, clearString} from "../src/common/Util";
import {CUD_FORBIDDEN_MESSAGE} from "../src/utils/Constants.jsx";
import "../src/css/attribute.scss";
import Modal from 'react-responsive-modal';

export default class CCTCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      fields: [],
      filteredItems: [],
      error: {
         occured: false,
        message: ""
      },
      
      expand: false
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


    // } else if (!isLoaded) { //spinner add karlena.
    //   return <Spinner />;
   
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



export class PopUp extends React.Component {
  constructor(props){
      super(props);
  }
render() {
  
  const { open, update, description, validate, field, tenants, tag, selecteTenant, handleChange, onCloseModal, onCreateField} = this.props;
  return (
      <Modal open={open} center onClose={onCloseModal}>
      <div className="react-modal" style={{display: open ? "block" : "none"}}>
        <div className="modal-header">
          <h2 className="modal-title">{update ? "Edit CCT Categories" : "Edit Tenants"}</h2>
        </div>
        <form className="modal-form">
          <div className="input-box">
            <label htmlFor="fieldName">Name</label>
            <input type="text" name="field" id="fieldName" value={field}  onChange={handleChange} placeholder="eg: TITLE"/>
            {validate && !field ? <span className="error-msg" style={{zIndex: 9999}}>Enter Name*</span> : null }
          </div>
         
        <div className="input-box">
        <label htmlFor="fieldName">Description</label>
          <textarea name="description" cols="30" rows="5" value={description} onChange={handleChange} placeholder="your description here"></textarea>
        </div>
        <div className="tenants">
            <input type="text" disabled={true} value={tag} name="tag" />
            {
              tenants.length > 0 && !update ? tenants.map((tnt, i) => {
                  return <button key={i} onClick={(e) => selecteTenant(e, i, tnt)}>
                    {tnt.tenant} <span>{tenants[i].selected ? "X" : ""}</span>
                  </button>
              }) : tenants.length > 0 && update ? tenants.map((tnt, i) => {
                  return <button key={i} onClick={(e) => selecteTenant(e, i, tenants)}>
                    {tnt} <span>X</span>
                  </button>
              }) : null
            } 
        </div>
        </form>
        <div className="modal-footer modal-action-buttons">
            <span>
              <button type="button"
                      className="artdeco-button artdeco-button--secondary"
                      onClick={onCloseModal}>
                Cancel
              </button>
            </span>
          <span>
              <button type="button"
                      className="artdeco-button"
                      onClick={onCreateField}>
                {!update ? "Save" : "Update"}
              </button>
            </span>
        </div>
      </div>
    </Modal>
  )
}
}



export class SupportedFieldRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      field: this.props.item.ucfContentExtractionFieldId,
      description: this.props.item.ucfContentExtractionFieldDes,
      validate: false, 
      tenants: this.props.item.tenants,
      tag: "",
      hide: true,
      snap: this.props.item.tenants
    };
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.deleteTenant = this.deleteTenant.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value, validate: false})
  }

  deleteTenant(e, index, tnt){
      e.preventDefault();
      const updatedTenant = tnt.filter((tenant, i) => {
          if (i !== index){
              return tenant;
          }
      });
      this.setState({tenants: updatedTenant});
  }

  onOpenModal() {
      if(this.state.open)return;
      this.setState({ open: true, validate: false });
      this.closeX(false, this.state.hide);
  };

  closeX(hide, back){
    if(back) return this.setState({hide: false});
    document.querySelector(".react-responsive-modal-closeButton").style.display =  hide ? "none" : "block";
  }
  
  onCloseModal() {
    this.setState({ open: false, validate: false });
    this.closeX(true, this.state.hide);

    this.setState({tenants: this.props.item.tenants})
  };


  async onUpdate(){
      this.setState({ open: false, validate: false });
      this.closeX(true, this.state.hide);
      const response = await fetch("/endpoint", {
          method: 'post',
          credentials: 'same-origin',
          body: JSON.stringify({
              name: this.state.field,
              description: this.state.description,
              tenants: this.state.tenants
          })
      });

      if(!response.ok){
          return 
      };

      const result = await response.json();
      
      console.log("success!: ", result);
  }
  render() {

      console.log(this.props.item)
    return (
      <div className="columns-2">
        <div className="row-title">
        <details id={`${this.props.item.ucfContentExtractionFieldId}`}>
          <summary style={{display: "inline"}}>{this.props.item.ucfContentExtractionFieldId}</summary>
          <h3>{this.props.item.ucfContentExtractionFieldDes}</h3>
          <h4>{this.props.item.createdOn}</h4>
         
        </details>
        <p style={{
            color: "black",
            cursor: "pointer",
            display: "inline",
            float: "right"
          }} onClick={() => {
            if(!this.state.expand){ 
               document.getElementById(this.props.item.ucfContentExtractionFieldId).setAttribute("open", "true");
            }else {
              document.getElementById(this.props.item.ucfContentExtractionFieldId).removeAttribute("open");
            }
            this.setState({expand: !this.state.expand ? true : false});
          }}>{!this.state.expand ?  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10" height="10" viewBox="0 0 50 50">
          <path d="M 44.988281 13.984375 C 44.726563 13.992188 44.476563 14.101563 44.292969 14.292969 L 25 33.585938 L 5.707031 14.292969 C 5.519531 14.097656 5.261719 13.992188 4.992188 13.988281 C 4.582031 13.992188 4.21875 14.238281 4.0625 14.613281 C 3.910156 14.992188 4 15.421875 4.292969 15.707031 L 24.292969 35.707031 C 24.683594 36.097656 25.316406 36.097656 25.707031 35.707031 L 45.707031 15.707031 C 46.003906 15.421875 46.09375 14.980469 45.9375 14.601563 C 45.777344 14.222656 45.402344 13.976563 44.988281 13.984375 Z"></path>
          </svg> :<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10" height="10" viewBox="0 0 32 32">
<path d="M29.71,21.79l-1.42,1.42L16,10.91,3.71,23.21,2.29,21.79,16,8.09Z"></path>
</svg>}</p>
        <p style={{color: "black", cursor: "pointer", display: "inline", float: "right"}} onClick={this.onOpenModal}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10" height="10" viewBox="0 0 50 50">
<path d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
</svg></p>
         
          {this.state.open && (
            RenderPopUP(
              true,
              true, 
              this.onUpdate, 
              this.onCloseModal, 
              this.handleChange,
              this.deleteTenant,
              this.state.validate, 
              this.state.field, 
              this.state.tenants,
              this.state.tag,
              this.state.description 
            )
          )}
        </div>
      </div>
    );
  }
}