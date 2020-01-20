import React from 'react';
import './App.css';
import"bootstrap/dist/css/bootstrap.min.css";
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

const API_key = "75d67d6eb2c4613a31f46c117e9728a6";

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      city:undefined,
      country:undefined,
      error:undefined,
      message:undefined,
      air_chart : undefined,
      pressure_chart : undefined,
      wind_chart : undefined,
      rain_chart : undefined,

    };
    }

  getWeather = async(e)=>{
    e.preventDefault();

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    if (city && country){

    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country }&appid=${API_key}`)    //API call
    const response = await api_call.json();

    if(response.cod === "200"){     //cod = 200 request success

    //parsing response
    var dt_txt = [];
    var temperature = [];
    var humidity = [];
    var pressure = [];
    var deg = [];
    var speed = [];
    var rain = [];

    response.list.forEach(function(element){    //parsing data
      dt_txt.push(new Date(element["dt_txt"]));
      temperature.push(element["main"]["temp"]);
      humidity.push(element["main"]["humidity"]);
      pressure.push(element["main"]["pressure"]);
      deg.push(element["wind"]["deg"]);
      speed.push(element["wind"]["speed"]);
      if("rain" in element){
        rain.push(element["rain"]["3h"])
      }
      else{
        rain.push(0)
      }
    });
    //parsing response

    //making chart option
    const air_chart = {
			animationEnabled: true,
			title:{
				text: "Air"
			},
			axisX: {
				valueFormatString: "DDD HH:mm"
			},
			axisY: {
        suffix:" °K",
				includeZero: false
			},
      axisY2: {
        suffix: " %",
  			lineColor: "#C24642",
  			titleFontColor: "#C24642",
  			labelFontColor: "#C24642"
    	},
      toolTip: {
		    shared: true
    	},
			data: [{
				type: "spline",
        name: "temperature",
				dataPoints: temperature.map((elem, index) =>({y:elem,x:dt_txt[index]})),
        showInLegend: true,
			},
      {
        type: "spline",
        name: "Humidity",
        showInLegend: true,
        axisYType: "secondary",
        dataPoints: humidity.map((elem, index) =>({y:elem,x:dt_txt[index]})),
      }]
		};

    const pressure_chart = {
			animationEnabled: true,
			title:{
				text: "Pressure"
			},
			axisX: {
				valueFormatString: "DDD HH:mm"
			},
      axisY:{
        includeZero: false,
        suffix: " hPa",
  			lineColor: "#369EAD",
  			titleFontColor: "#369EAD",
  			labelFontColor: "#369EAD"
      },
      data: [{
        type: "spline",
        name: "Pressure",
        dataPoints : pressure.map((elem, index) =>({y:elem,x:dt_txt[index]})),
        },
        ]
		};

    const wind_chart = {
			animationEnabled: true,
			title:{
				text: "Wind"
			},
			axisX: {
				valueFormatString: "DDD HH:mm"
			},
      axisY:{
  			lineColor: "#369EAD",
        suffix: " km/h",
  			titleFontColor: "#369EAD",
  			labelFontColor: "#369EAD"
      },
      axisY2: {
          suffix: " °",
    			lineColor: "#C24642",
    			titleFontColor: "#C24642",
    			labelFontColor: "#C24642"
    	},
      toolTip: {
		    shared: true
    	},
      data: [{
        type: "spline",
        name: "Speed",
        showInLegend: true,
        dataPoints : speed.map((elem, index) =>({y:elem,x:dt_txt[index]})),
        },
        {
        type: "spline",
        name: "Degree",
        showInLegend: true,
        axisYType: "secondary",
        dataPoints: deg.map((elem, index) =>({y:elem,x:dt_txt[index]})),
      }]
  		};

    const rain_chart = {
			animationEnabled: true,
			title:{
				text: "Rain"
			},
			axisX: {
				valueFormatString: "DDD HH:mm"
			},
			axisY: {
				suffix: " mm",
				includeZero: false
			},
			data: [{
				type: "column",
        color: "#3158bd",
				dataPoints: rain.map((elem, index) =>({y:elem,x:dt_txt[index]})),

			}]
		};
    //making chart option

    this.setState({
      city:`${response.city.name},${response.city.country}`,
      air_chart :  air_chart,
      pressure_chart : pressure_chart,
      wind_chart : wind_chart,
      rain_chart : rain_chart,
      error:false,
      message:"ok"

    })
    }
    else{this.setState({error:true,message:response.message});}  //if cod != 200 display request error
  }
    else{this.setState({error:true,message:"Please enter a city and a country"});}
  }
  state ={}

  render(){

  return (
    <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error} message={this.state.message}/>
      <div>{this.state.message ==="ok" ?
        <Weather city={this.state.city} air_chart={this.state.air_chart}
       pressure_chart={this.state.pressure_chart}  wind_chart={this.state.wind_chart}
        rain_chart={this.state.rain_chart}/> : null  }
        </div>
    </div>

  );
  }
}

export default App;
