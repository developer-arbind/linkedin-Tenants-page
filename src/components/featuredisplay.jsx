import React, { useCallback, useState } from 'react';
import Dropdown from 'rsuite/Dropdown';
import { useEffect } from 'react';
import WordCloud from "react-d3-cloud";
import {ButtonToolbar} from 'react-bootstrap';
import {ScrollModal} from './modal-popup'
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export const FeaturesDisplay = (props) => {

    const [url, setUrl] = useState("data1.json");
    const CustomDropdown = ({ ...props }) => (
      <Dropdown {...props} onSelect ={onDropDownSelect}>
        <Dropdown.Item eventKey = "All Topics">Get All Trending Topics</Dropdown.Item>
        <Dropdown.Item eventKey = "All Positive Posts" >Get Most Positive Posts</Dropdown.Item>
        <Dropdown.Item eventKey = "All Negative Posts" >Get Most Negative Posts</Dropdown.Item>
        <Dropdown.Item eventKey = "All Trends" >Get All Trends</Dropdown.Item>
        <Dropdown.Item eventKey = "Clear Selections" >Clear Selection</Dropdown.Item>
      </Dropdown>
    );
  
    
    //Config for WordCloud
    // const newData = data.map((item) => ({
    //   text: item.text,
    //   value: Math.random() * 1000
    // }));
    // useEffect(() => {
    //   fetch(url)
    //     .then((res) => res.json())
    //     .then((result) => {
    //       console.log(result);
    //       setRenderWordData(true);
    //       setData(result);
    //     });
    // }, []);
  
    const [wordCloudData, setData] = useState([]);
    const [modalData, setModalData] = useState("");
    const [renderWordCloud, setRenderWordData] = useState(false);
    const fontSize = useCallback((word) => Math.log2(word.value) * 2, []);
    const rotate = useCallback((word) => word.value % 360, []);
   
    const onWordClick = useCallback((event, word) => {
    //  console.log(word);
    setModalTitleData(`${word.text}`);
    
    fetch('feedlist.json')
    .then((res) => res.json())
    .then((result) => {
     // console.log(result);
      const arrayOfLists = result.map(
        record => <li><a href ={record.text}>{record.text}   </a><button>    Send Review   </button> <br/><br/></li> 
        )
      console.log(arrayOfLists);
      setModalData(arrayOfLists);
    });
    setShowModal(showmodal=>!showmodal);
    
      console.log(`onWordClick: ${word.text}`);
    }, []);
    const onWordMouseOver = useCallback((word) => {
      console.log(`onWordMouseOver: ${word}`);
    }, []);
    const onWordMouseOut = useCallback((word) => {
      console.log(`onWordMouseOut: ${word}`);
    }, []);
  
    //const fill = useCallback((d, i) => scaleOrdinal(schemeCategory10)(i), []);
  
   const onDropDownSelect = useCallback((eventKey, event) => {
     console.log(eventKey);
     if(eventKey === 'All Topics') {
      setUrl('data.json');
      fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRenderWordData(true);
        setData(result);
      });
     } 
     else if(eventKey === 'All Positive Posts') {
      setUrl('data1.json');
      fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRenderWordData(true);
        setData(result);
      });
     } 
     else if(eventKey === 'All Negative Posts') {
      setUrl('data2.json');
      fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRenderWordData(true);
        setData(result);
      });
     } 
     else {
      setUrl('data.json');
      setRenderWordData(false);
     }
    
     console.log(event);
     }, []);
  
    //Config for Modal Pop up
  
    const [showmodal, setShowModal] = useState(false);
    const [modaltitledata, setModalTitleData] = useState("");
    const [open, setOpen] = React.useState(false);
 
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setModalData(false);
        setShowModal(false);
    }
    
  
  return (
    <body>
        {/* <ScrollModal showmodal={showmodal} setShowModal={setShowModal} modalData = {modalData}  
        setModalData ={setModalData} modaltitledata={modaltitledata} setModalTitleData= {setModalTitleData}/> */}
        <div id="featuresdisplay" className="text-center">
        <div className="container">
            <div className="col-md-10 col-md-offset-1 section-title">
             <h2>Explore Features</h2>
            </div>
            <ButtonToolbar >
                <CustomDropdown title="Select the Trending View" trigger="click" placement="rightStart"/>
            </ButtonToolbar>
          
            {renderWordCloud ? ( <WordCloud
                    width={750}
                    height={500}
                    data={wordCloudData}
                    fontSize={fontSize}
                    rotate={0}
                    padding={3}
                    onWordClick={onWordClick}
                    //  fill={fill}
                    /> ) : null}
                
        </div>
        </div>
   
    <div>

    <Modal
      isOpen={showmodal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      scrollable
      contentLabel="Feeds data"
    >
      <button onClick={closeModal}>close</button>
      <div>{modalData}</div>
    </Modal>
  </div>
  </body>
  );
};
