import React from "react";

const CurrentDayDetails = ({ title, value, status }) => {
    return <div className="details-card">
        <p className="details-title">{title ? title : 'UV Index'}</p>
        <p className="details-value">{value ? value :'Speed'}</p>
        {/* <p className="details-status">{status}</p> */}
    </div>
}

export default CurrentDayDetails;