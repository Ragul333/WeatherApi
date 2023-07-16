import React from "react";
import cloudy from "../assets/cloudy.png";
import moment from "moment";
import errorImg from '../assets/error.png'

const CurrentDayCard = ({ setPlace, Onsubmit, data, error, fahrenheit , navigation }) => {
    return <>
        <div className="card-container">
            {error ? <><p className="current-condition" style={{cursor:'pointer'}} onClick={()=>{window.location.reload(false)}}>Click to Retry !</p><img src={errorImg} style={{ maxHeight: '30vh' }} /></> : <>
                <div class="buttonIn">
                    <input type="text" id="input" placeholder="Enter the city name ..." onChange={(e) => { setPlace(e.target.value) }} />
                    <button id="button" onClick={() => { Onsubmit(true); }}>Search</button>
                </div>

                <img className="current-temperature-logo" src={data?.current?.condition?.icon} />
                <h2 className="current-day-temp">
                    {fahrenheit ? data?.current?.temp_f : !navigation ? "31" : data?.current?.temp_c}<span className="current-day-temp-unit">{`°${fahrenheit ? 'F' : 'C'}`}</span>
                </h2>
                <p className="current-day">{moment(data?.localtime).format('dddd')}<span className="current-time"> {moment(data?.localtime).format('LT')}</span></p>
                <hr className="hr-line" />
                <p className="current-condition"><span className="current-condition-img"><img src={data?.current?.condition?.icon} /></span> {data?.current?.condition?.text}</p>
                <p className="current-condition"><span className="current-condition-img"></span> {`${data?.location?.name ? data?.location?.name : ""} , ${data?.location?.region ? data?.location?.region : ""}`}</p>
            </>
            }
        </div>
    </>
}

export default CurrentDayCard;