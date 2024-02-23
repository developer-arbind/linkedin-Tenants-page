import React from "react";
import { RenderPopUP } from "../App";

import "../css/attribute.scss";


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
            <h2>{this.props.item.ucfContentExtractionFieldId}</h2>
            <h3>{this.props.item.ucfContentExtractionFieldDes}</h3>
            <h4>{this.props.item.createdOn}</h4>
            <button onClick={this.onOpenModal}>edit</button>
            <button>expand</button>
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