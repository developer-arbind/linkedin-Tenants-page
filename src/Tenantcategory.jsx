import React from "react";
import {supportedTenant, allCatg, createdCatg} from "../src/utils/AttributeUtils.jsx";
import { objectsAreEqual} from "../src/common/Util";
import Modal from 'react-responsive-modal';
//using inline css

export default class CCTCategoryMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
          isLoaded: false,
          categories: [],
            tenants: [], 
            allcategories: [],
            selectedValues: [],
          error: {
             occured: false,
            message: ""
          },
          current_selected_tanent: [],
          second_refference: [],
          initialSaveDats: {
            titile: "",
            categories: [],
          },
          currentIndex: 0,
        };
        this.handleInput = this.handleInput.bind(this);
        this.openModel = this.openModel.bind(this); 
        this.closeModal = this.closeModal.bind(this);
        this.getSupportedTannet = this.getSupportedTannet.bind(this);
        this.switcTenant = this.switcTenant.bind(this);
        this.getAllSupportedCatg = this.getAllSupportedCatg.bind(this);
        this.createField = this.createField.bind(this);
        this.shiftTenant = this.shiftTenant.bind(this);
        this.showData = this.showData.bind(this);
        this.updateRankHandler = this.updateRankHandler.bind(this);
        this.updateSwip = this.updateSwip.bind(this);
        this.handlerCreateValue = this.handlerCreateValue.bind(this);
      };



      openModel(){
       
        document.getElementById("makeitclose") ? document.getElementById("makeitclose").style.display = "block" : console.log("$");
        document.querySelector(".react-responsive-modal-closeButton") ?  document.querySelector(".react-responsive-modal-closeButton").style.display = "block" : console.log("$")
        this.setState({open: true})  
      }
      
      updateSwip(name){
        const updatemapcct = this.state.allcategories.filter((tenant) => tenant.titile === name );
        
       
        
        if(!updatemapcct[0].hasOwnProperty("categories")){
          
          updatemapcct[0]["categories"] = [];
        }
        this.setState({initialSaveDats: {
          titile: name, categories: updatemapcct[0].categories}});
      }

      switcTenant(event) {
        this.setState({
            current_selected_tanent: this.state.categories.filter(tnt => event.target.value === tnt.titile)
        , categories: this.state.second_refference});

      }
      
      shiftTenant(tnt){
        //  this.setState({current_selected_tanent: tnt});
      }
      closeModal(){
        document.getElementById("makeitclose") ? document.getElementById("makeitclose").style.display = "none" : console.log("$");
        document.querySelector(".react-responsive-modal-closeButton").style.display =  "none"
        this.setState({open: false});
      }
       

      async getAllSupportedCatg(){
         this.setState({allcategories: (await allCatg()).categories});
          
       
        // const response = await fetch("/endpoint/get-all-catg", {
        //     method: "GET", 
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        // });
        // try {
        //     const result = response.json();
        //     this.setState({allcategories: result.allcategories});
        // }catch(err){
        //     console.log("error: ", err);
        // }
      }


      async getSupportedTannet(){
        this.setState({tenants: (await supportedTenant())});
       
        // const response = await fetch("/endpoint/get-tenant", {
        //     method: "GET", 
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        // });
        // try {
        //     const result = response.json();
        //     this.setState({tenants: result.tenants});
        // }catch(err){
        //     console.log("error: ", err);
        // }
      }
      async componentDidMount(){    
        this.setState({categories: (await createdCatg()).categories});
        await this.getAllSupportedCatg();
        await this.getSupportedTannet();

        this.setState({second_refference: [...this.state.categories]});
        console.log("current state: ", this.state);
     
        // const response = await fetch("/endpoint/created_categories", {
        //     method: "GET", 
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        // });
        // try {
        //     const result = response.json();
        //     this.setState({categories: result.categories});
        // }catch(err){
        //     console.log("error: ", err);
        // }

      };

    

      async createField(){
        const response = await fetch("/endpoint/create-feild", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categories: this.state.categories,
                tenant: this.state.initialSaveDats.titile
            })
        });
        try {
            const result = await response.json();
            console.log(result);
        }catch(err){
            console.log("error: ", err);
        }
      }

      handleInput(event, index, isRank,catg, name, name2){
        const text = Number(event.target.value);
        let replace = false;
        if(event.target.value.length === 2 && event.target.value.charAt(0) == 0){
          replace = true;
        }
        // if(isNaN(text) || !event.target.value){
        //     return;
        // };   

            let updatedCurrentTenantSnap = {processed: false, data: [], snap: []};
            const updateRank = this.state.categories.map((tenant) => {
              if (!updatedCurrentTenantSnap.processed) {
                updatedCurrentTenantSnap.data = {
                  ...tenant,
                  categories: this.state.current_selected_tanent[0].titile === tenant.titile
                    ? tenant.categories.map((mp) => {
                        if (mp.title === name) {
                            if(isRank){
                              return {
                                ...mp,
                                rank: !replace ? text : Number(event.target.value.charAt(event.target.value.length - 1)),
                              };
                            }
                            
                            return {
                                ...mp,
                                maps: mp.maps.map((mt) => {
                                    if(mt.title === name2){
                                      return {
                                        ...mt,
                                        rank: !replace ? text : Number(event.target.value.charAt(event.target.value.length - 1))
                                      }
                                    }
                                    
                                    return mt;
                                })
                            }
                        }
                        return mp;
                      })
                    : tenant.categories,
                };
                if(!objectsAreEqual(updatedCurrentTenantSnap.data, tenant)){
                  updatedCurrentTenantSnap.processed = true;
                  updatedCurrentTenantSnap.snap = updatedCurrentTenantSnap.data;
                }
                
              } else {
                updatedCurrentTenantSnap.processed = false;
                return tenant;
              }
              return updatedCurrentTenantSnap.data;
            });
            console.log("current data: ", updateRank);
            this.setState({categories: updateRank, current_selected_tanent: [updatedCurrentTenantSnap.snap]});
    };

    handlerCreateValue(event, index, isRank,catg, name, name2){
      const text = Number(event.target.value);
      let replace = false;
      if(event.target.value.length === 2 && event.target.value.charAt(0) == 0){
        replace = true;
      }
      // if(isNaN(text) || !event.target.value){
      //     return;
      // };   

          let updatedCurrentTenantSnap = {processed: false, data: [], snap: []};
          const updateRank = this.state.allcategories.map((tenant) => {
            if (!updatedCurrentTenantSnap.processed) {
              updatedCurrentTenantSnap.data = {
                ...tenant,
                categories: tenant.titile === this.state.initialSaveDats.titile
                  ? tenant.categories.map((mp) => {
                      if (mp.title === name) {
                      
                          if(isRank){
                            return {
                              ...mp,
                              rank: !replace ? text : Number(event.target.value.charAt(event.target.value.length - 1)),
                            };
                          }
                          
                          return {
                              ...mp,
                              maps: mp.maps.map((mt) => {
                                  if(mt.title === name2){
                                    return {
                                      ...mt,
                                      rank: !replace ? text : Number(event.target.value.charAt(event.target.value.length - 1))
                                    }
                                  }
                                  
                                  return mt;
                              })
                          }
                      }
                      return mp;
                    })
                  : tenant.categories,
              };
            
              if(!objectsAreEqual(updatedCurrentTenantSnap.data, tenant)){
                updatedCurrentTenantSnap.processed = true;
                updatedCurrentTenantSnap.snap = updatedCurrentTenantSnap.data;
              }
              
            } else {
              return tenant;
            }
            return updatedCurrentTenantSnap.data;
          });
          this.setState({allcategories: updateRank, initialSaveDats: updatedCurrentTenantSnap.snap});
  };

    showData(){
      console.log("data: ", this.state);
    }

    async updateRankHandler(){
       const response = await fetch("/endpoint/update-rank", {
         method: "POST",
          headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          categories: this.state.categories, //update rank
          tenant: this.state.current_selected_tanent[0].titile //example: TS
        })
       });
      try {
        const result = await response.json();
        this.setState({second_refference: [...this.state.categories]})
      }catch(err){
        console.log("error: ", err);
      }
    }

    render(){


        return (
          <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Select a Tenant</h2>
              <select name="tenants" id="tenants" onChange={(event) => this.switcTenant(event)} style={{ padding: "8px", fontSize: "16px" }}>
                  <option value="sec">Choose Tenant</option>
                  {this.state.categories.length > 0 ? this.state.categories.map((tenant, index) => {
                      return <option value={tenant.titile} key={index}>{tenant.titile}</option>
                  }) : <option value="error">No tenants found!</option>}
              </select>
          </div>

          <div>
              <button style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={this.openModel}>Add New</button>
              <h1 style={{ fontSize: "24px", marginTop: "20px" }}>Categories to CCTs Map</h1>
              <div>
                  {this.state.current_selected_tanent.length > 0 ? this.state.current_selected_tanent[0].categories.map((cct, index) => {
                      return (
                          <div key={index} style={{ marginBottom: "20px" }}>
                              <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>{cct.title}</h2>
                              <label htmlFor="rank" style={{ fontSize: "16px" }}>Rank:</label>
                              <br />
                              <input type="number" onChange={(event) => this.handleInput(event, index, true, true, cct.title)} value={this.state.current_selected_tanent[0].categories[index].rank} style={{ padding: "8px", fontSize: "16px" }} name="catg_rank" />
                              {cct.hasOwnProperty('maps') ? cct.maps.map((mp, index) => {
                                  return (
                                      <div key={index} style={{ marginTop: "10px" }}>
                                          <h3 style={{ fontSize: "16px" }}>{mp.title}</h3>
                                          <br />
                                          <input type="number" name="mpValue" value={mp.rank} onChange={(event) => this.handleInput(event, index, false, false, cct.title, mp.title)} style={{ padding: "8px", fontSize: "16px" }} />
                                      </div>
                                  )
                              }) : null}
                          </div>
                      )
                  }) : <div>Choose a tenant first</div>}
              </div>

              <div>
                  <button style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }} onClick={this.updateRankHandler}>Update Rankings</button>
                  <button style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={this.showData}>Show Data</button>
              </div>
          </div>
       <Modal open={this.state.open} center onClose={this.closeModal}>
      <div className="react-modal" id="makeitclose">
          <div className="modal-header">
            <h2 className="modal-title">Add CCT Catogory map</h2>
          </div>
          <button onClick={this.showData}>show data</button>
          <form className="modal-form">
            <div className="input-box">
              <label htmlFor="fieldName">Choose Tn</label>
                    <select name="" id="" onChange={(e) => this.updateSwip(e.target.value)}>
                      <option value="">select a tenant</option>
                        {
                            this.state.allcategories.length > 0 ? this.state.allcategories.map ((ct, index) => {
                                return <option value={ct.titile} key={index}>{ct.titile}</option>
                            }) : <option>no categories found!</option>
                        }
                    </select>
                       
              <div className="catgs">
                        {
                          this.state.initialSaveDats.titile ? this.state.initialSaveDats.hasOwnProperty("categories") ? this.state.initialSaveDats.categories.map((cct, index) => {
                            return <div className="catg" key={index}>
                              <h2>{cct.title}</h2>

                              <label htmlFor="for-creation-rank">rank: </label>
                              <input type="number" value={this.state.initialSaveDats.categories[index].rank} onChange={(event) => this.handlerCreateValue(event, index, true, true, cct.title, "")}/>
                              <br />
                            {
                                cct.hasOwnProperty('maps') ? cct.maps.map((mp, index) => {
                                    return <div className="mp" key={index}>
                                        <h3>{mp.title}</h3>
                                        <br />
                                        <input type="number" name="mpValue" value={mp.rank} onChange={(event) => this.handlerCreateValue(event, index, false,false, cct.title, mp.title)}/>
                                    </div>
                                }) : null
                            }
                        </div>
                          }) : <div>no catg maps</div> : null
                        }
              </div>
            </div>
           
          
          </form>
          <div className="modal-footer modal-action-buttons">
              <span>
                <button type="button"
                        className="artdeco-button artdeco-button--secondary"
                        onClick={this.closeModal}>
                  Cancel
                </button>
              </span>
            <span>
                <button type="button"
                        className="artdeco-button"
                        onClick={this.createField}>
                        Create
                </button>
              </span>
          </div>
        </div>
      </Modal>
            </div>
        )
      }



      
}