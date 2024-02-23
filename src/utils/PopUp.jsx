import React from "react"; 
import Modal from 'react-responsive-modal';
export default class PopUp extends React.Component {
    constructor(props){
        super(props);
    }
  render() {
    
    const { open, update, description, validate, field, tenants, tag, selecteTenant, handleChange, onCloseModal, onCreateField} = this.props;
    return (
        <Modal open={open} center onClose={onCloseModal}>
        <div className="react-modal" style={{display: open ? "block" : "none"}}>
          <div className="modal-header">
            <h2 className="modal-title">Edit CCT Categories</h2>
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