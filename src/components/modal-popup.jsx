"use client";
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from './modal.css';

// const style = {
//   height: 30,
//   border: "1px solid blue",
//   margin: 6,
//   padding: 8
// };


// const Background = styled.div`
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.8);
//   position: fixed;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalWrapper = styled.div`
//   width: 800px;
//   height: 500px;
//   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
//   background: #fff;
//   color: #000;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   position: relative;
//   z-index: 10;
//   border-radius: 10px;
// `;

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background: #000;
// `;

// const ModalContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   line-height: 1.8;
//   color: #141414;



export const ScrollModal = ({ showmodal, setShowModal, modalData, modaltitledata }) => {

  return (
    <>
      {showmodal ? (
        <body>
     <Modal
       show={showmodal}
       onHide={() => setShowModal(false)}
       scrollable
     >
       <Modal.Header closeButton>
         <Modal.Title
           id="example-custom-modal-styling-title"
           style={{ color: "Brown" }}
         >
           Feeds for {modaltitledata}
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <ul>
           {modalData}
         </ul>
       </Modal.Body>
     </Modal>
     </body>
      ) : null}
    </>
  );
};