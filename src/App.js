import React from 'react';
import CovidMap from './CovidMap/CovidMap';
import TooltipContent from './TooltipContent/TooltipContent';

import {Box, CssBaseline, Divider, Grid, Link, Paper, Typography} from '@material-ui/core';
import { responsiveFontSizes, withStyles, createMuiTheme, ThemeProvider  } from "@material-ui/core/styles";
import 'fontsource-roboto';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fb8c00',
      dark: '#af6200'
    },
    secondary: {
      main: '#039be5',
      dark: '#026ca0'
    },
    type: 'dark',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }

});
theme = responsiveFontSizes(theme);

const useStyles = ({
  root: {
    height: '100vh',
  },
  left: {
    height: '100%'
  },
});


//component with functions inside
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.closeTitle = this.closeTitle.bind(this);
    this.fetchCovidData = this.fetchCovidData.bind(this);

    this.state = {
      name: "",
      deaths: "",
      recovered: "",
      cases: "",
      casesToday: "",
      error: "",
      altName: "",
      countries: [],
      showTitle: true,
      colour: ""
    };
  }

  fetchCovidData() {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => {
        if(res.ok) {
          return res.json();
        } else if(res.status === 404) {
          return Promise.reject('error 404');
        }
      })
      .then(
        (result) => {
          this.setState({
            countries: result,
          });
        },
        (error) => {
          console.log(error);
        }
      )

    console.log('updated');
  }

  componentDidMount() {
    this.fetchCovidData();
    setInterval(this.fetchCovidData, 6000);
  }
  

  handleMouseEnter(code, name) {
    const countries = this.state.countries;
    const countryData = countries.find(element => element.countryInfo.iso2 === code);
    const nameList = ['USA', 'DRC'];
    
    if(countryData) {
      var countryName = countryData.country;      

      console.log(countryData.cases);
      var c = "";
      if(countryData.cases <= 1000) {
        c = 'stat-green';
      } else if(countryData.cases <= 1000000) {
        c = 'stat-orange';
      } else {
        c = 'stat-red';
      }
      this.setState({colour: c});

      if(nameList.includes(countryData.country)) {
        countryName = name;
      }
      this.setState({
        name: countryName,
        deaths: countryData.deaths,
        recovered: countryData.recovered,
        cases: countryData.cases,
        casesToday: countryData.todayCases,
      }); 

    } else {
      this.setState({
        altName: name,
        error: "Country info not found",
        colour: "stat-red"
      });
    }
  }

  handleMouseExit() {
    this.setState({
      name: "",
      deaths: "",
      recovered: "",
      cases: "",
      casesToday: "",
      error: "",
      altName: "", 
      colour: ""

    });
  }

  closeTitle() {
    this.setState({
      showTitle: !this.state.showTitle,
    });
  }

  render() {
    const {classes} = this.props;


    return (
      <ThemeProvider theme={theme}>
      	<CssBaseline/>
        <Grid 
          container 
          direction="row"
          className={classes.root}>
          <Grid item xs={12} md={4}  component={Paper} elevation={8} square className={classes.left}>

            <Grid container 
              direction="column"
              justify="space-between"
              alignItems="center"
              align='center'
              className={classes.left}>

              <Grid item spacing={3}>
                <Box padding={3}>
                  <Typography variant="h2" component="h1" color='primary'>myCovidMap</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box padding={3}>
                  <Typography variant='h6'>
                  Welcome to <Typography component='span' variant='h6' color='primary'>myCovidMap</Typography>, a simple, interactive web app built using <Typography component='span' variant='h6'><Link underline='hover' color='secondary'>React</Link></Typography>, <Typography component='span' variant='h6' color='secondary'>react-simple-maps</Typography>, data from <Typography component='span' variant='h6' color='secondary'> disease.sh</Typography>, and <Typography component='span' variant='h6' color='secondary'>material-ui</Typography>.
                  </Typography>
                </Box>
              </Grid>

              <Grid item>
                
                  <Typography variant='h3' paragraph>How to use:</Typography>
                    <Divider light/>
                  <Typography variant='body1'  paragraph>
                  <Typography component='span' variant='h6' color='secondary'>Step 1:</Typography> <Typography component='span' variant='body1' color='primary'>Hover over</Typography> or <Typography component='span' variant='body1' color='primary'>tap</Typography> on a country to see covid information.
                  </Typography>
                  <Typography variant='body1'  paragraph>
                  <Typography component='span' variant='h6' color='secondary'>Step 2:</Typography> Use <Typography component='span' variant='body1' color='primary'>controls</Typography> to position map or <Typography component='span' variant='body1' color='primary'>click</Typography> and drag with mouse.
                  </Typography>
                <Typography variant='body1' paragraph>
                    <Typography component='span' variant='body1' color='primary'>Mobile</Typography> users may need to <Typography component='span' variant='body1' color='primary'>scroll down</Typography> to find the map.
                  </Typography>
              </Grid>


              <Grid item component={Paper} elevation={12} style={{ width: '70%'}}>
                 <Box display='flex' justifyContent='center' alignItems='center' padding={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h4" >World Information</Typography> 
                        <Divider/>
                      </Grid>
                      
                      {/* Todo: add mapping and proper data to grid */ }
                      <Grid item xs={6}>
                        <Typography variant='body1'>Total Cases</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='body2'>900000</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='body1'>New Cases</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='body2'>900000</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='body1'>Total Deaths</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='body2'>900000</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='body1'>Recoveries</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='body2'>900000</Typography>
                      </Grid>
                    </Grid>
                 </Box>   
              </Grid>

              <Grid item>
                <Box padding={3}>
                  <Typography variant="button">github.com/LevityEx</Typography>
                </Box>

              </Grid>

            </Grid>

          </Grid>

          <Grid item xs={12} md={8}>
 
              <CovidMap 
                //send stats here to choose colour for countries.
                onHover={this.handleMouseEnter} // apply colours here
                onLeave={this.handleMouseExit}
                colour={this.state.colour}
                className={classes.map}
                />
              <TooltipContent
                countryName={this.state.name} 
                deaths={this.state.deaths} 
                recovered={this.state.recovered} 
                cases={this.state.cases} 
                casesToday={this.state.casesToday}
                altName={this.state.altName} 
                error={this.state.error}/>
          
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
export default withStyles(useStyles)(App);

/*<CovidMap 
              //send stats here to choose colour for countries.
              onHover={this.handleMouseEnter} // apply colours here
              onLeave={this.handleMouseExit}
              colour={this.state.colour}/>
            <TooltipContent
              countryName={this.state.name} 
              deaths={this.state.deaths} 
              recovered={this.state.recovered} 
              cases={this.state.cases} 
              casesToday={this.state.casesToday}
              altName={this.state.altName} 
              error={this.state.error}/>*/