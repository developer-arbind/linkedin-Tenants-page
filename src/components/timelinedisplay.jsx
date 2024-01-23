import React, { useCallback, useState } from 'react';
import Dropdown from 'rsuite/Dropdown';
import { useEffect } from 'react';
import WordCloud from "react-d3-cloud";
import {ButtonToolbar} from 'react-bootstrap';
import {ScrollModal} from './modal-popup'
import Modal from 'react-modal';
import { Chart, Series } from 'devextreme-react/chart';
import { dataSource } from './barchartdata.js';

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

export const TimelineDisplay = (props) => {

  const [renderGraph, setRenderGraph] = useState(true);
  const [datatopics, setDataTopics] = useState("");
  const [datapositive, setDataPositive] = useState("");
  const [datanegative, setDataNegative] = useState("");

    useEffect(() => {
      fetch('barchartdata.json')
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setRenderGraph(true)
          setDataTopics(result);
        });
    fetch('barchartdataNegative.json')
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setRenderGraph(true)
      setDataNegative(result);
    });
    fetch('barchartdataPositive.json')
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setRenderGraph(true)
      setDataPositive(result);
    });
    }, []);

  
  
  return (
      <div id="timelinedisplay" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Timeline</h2>
          </div>
          <div className="row">
            <div className="col-xs-6 col-md-4">
                <Chart
                  id="chart"
                  dataSource={datatopics}
                  width={300}
                  height = {200}
                >
                  <Series
                    valueField="value"
                    argumentField="label"
                    name="Trending topics"
                    type="bar"
                  
                    color="#ffaa66"
                  />
                </Chart>
            </div> 
            <div className="col-xs-6 col-md-4">
            <Chart
                id="chart"
                dataSource={datapositive}
                width={300}
                height = {200}
              >
                <Series
                  valueField="value"
                  argumentField="label"
                  name="Trending Positive"
                  type="bar"
                
                  color="#ffaa66"
                />
          </Chart>
          </div>   
          <div className="col-xs-6 col-md-4">
              <Chart
                id="chart"
                dataSource={datanegative}
                width={300}
                height = {200}
              >
                <Series
                  valueField="value"
                  argumentField="label"
                  name="Trending Negative"
                  type="bar"
                
                  color="#ffaa66"
                />
              </Chart>
          </div>
        </div>
      </div>  
    </div>
)};
