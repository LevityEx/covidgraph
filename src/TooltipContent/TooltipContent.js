import React from 'react';
import ReactTooltip from 'react-tooltip';

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
                <p>Deaths (total) - {props.deaths} </p>  
                <p>Deaths (today) - {props.deathsToday}</p> 
                <p>Cases (total) - {props.cases}</p> 
                <p>Cases (today) - {props.casesToday}</p> 
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