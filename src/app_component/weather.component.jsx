import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react.js';
import "./ul.style.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Weather = props  =>{
  return(
    <div >
      <div className="container text-light">
        <h1>{props.city}</h1>
      </div>

      <ul>
        <li><CanvasJSChart options = {props.air_chart}/></li>
        <li><CanvasJSChart options = {props.wind_chart}/></li>
        <li><CanvasJSChart options = {props.pressure_chart}/></li>
        <li><CanvasJSChart options = {props.rain_chart}/></li>
      </ul>

      </div>
  );
};

export default Weather;
