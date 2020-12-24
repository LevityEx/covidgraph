import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import ReactTooltip from 'react-tooltip';

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
                <Typography variant="h4" color='primary'>{props.altName}</Typography> 
                    <Divider light/>
                <Typography variant='body1' paragraph>{props.error}</Typography>
            </>
        );
    } else {
        return (
            <>
                <Typography variant="h4" color='primary'>{props.name}</Typography>
                    <Divider light/>
                <Typography variant='body1' paragraph>Total cases - {round(props.cases)}</Typography>
                <Typography variant='body1' paragraph>New cases - {round(props.casesToday)}</Typography>
                <Typography variant='body1' paragraph>Deaths - {round(props.deaths)}</Typography> 
                <Typography variant='body1' paragraph>Recovered - {round(props.recovered)}</Typography>
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