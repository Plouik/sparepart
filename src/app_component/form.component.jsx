import React from 'react';
import "./form.style.css";

const Form = props  =>{
  return(
    <div className ="container">
      <form onSubmit={props.loadweather}>
      <div>{props.error? error(props.message):null }</div>
      <div className = "row">
        <div className = "col-md-3 offset-md-2">
          <input type = "text" className="form-contol" name = "city" autoComplete="on" placeholder="City"/>
        </div>
        <div className = "col-md-3">
          <input type = "text" className="form-contol" name = "country" autoComplete="on"placeholder="County" />
        </div>
        <div className = "col-md-3 mt-md-0 text-md-left">
          <button className="btn btn-warning">Get Weather !</button>
        </div>
      </div>
      </form>
    </div>
  );
};

function error(message){
  return(
    <div className ="alert alert-danger mx-5" role="alert">
      {message}
    </div>
  );
}
export default Form;
