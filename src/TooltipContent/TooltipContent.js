import React from 'react';
import ReactTooltip from 'react-tooltip';
import './TooltipContent.css';

const round = (num) => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else if (num > 1000) {
        return Math.round(num / 100) / 10 + "K";
    } 
    return num;
};

function Stats(props) {
    

    if(props.error !== "") {
       return (
            <>
                <h4>{props.altName}</h4> 
                <p>{props.error}</p>
            </>
        );
    } else {
        return (
            <>
                <h4>{props.name}</h4> 
                <p>Deaths (total) - {round(props.deaths)}</p>  
                <p>Deaths (today) - {round(props.deathsToday)}</p> 
                <p>Cases (total) - {round(props.cases)}</p> 
                <p>Cases (today) - {round(props.casesToday)}</p> 
            </>
        );
    }
}

function TooltipContent(props) {
    const country = props.countryName; 
    if(country !== "" || props.altName !== "") {
        return (
            <ReactTooltip>
                <Stats 
                    name={props.countryName}
                    deaths={props.deaths}
                    deathsToday={props.deathsToday}
                    cases={props.cases}
                    casesToday={props.casesToday}
                    altName={props.altName}
                    error={props.error}  
                />
            </ReactTooltip>
        );
    } 
    return null;
}

export default TooltipContent;