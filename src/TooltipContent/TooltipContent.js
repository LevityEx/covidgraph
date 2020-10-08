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
                <p>Total cases - {round(props.cases)}</p> 
                <p>New cases - {round(props.casesToday)}</p> 
                <p>Deaths - {round(props.deaths)}</p>  
                <p>Recovered - {round(props.recovered)}</p> 
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
                    recovered={props.recovered}
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