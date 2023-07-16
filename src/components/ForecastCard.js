import React from "react";

const ForecastCard = ({ day, img, maxTemp, minTemp }) => {
    return <>
        <div className="forecast-card">
            <p className="forecast-day">{day}</p>
            <img className="forecast-day-img" src={img} />
            <p className="forecast-temp">{maxTemp}° <span className="forecast-mintemp"> {minTemp}°</span></p>
        </div>
    </>
}

export default ForecastCard;