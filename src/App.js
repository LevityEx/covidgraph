import React from 'react';
import './App.css';
import CovidMap from './CovidMap/CovidMap';
import TooltipContent from './TooltipContent/TooltipContent';




function TitleCard(props) {
  if(props.show) {
    return(
      <>
        <div className="title-card">
            <span className="close" onClick={props.onClick}><b>X</b></span>
            <h1>Covid-19 Map v1.4.0</h1>
            <hr/>
            <p>
              Click and drag to navigate, hover over countries to see <strong>Covid-19</strong> stats.<br/>
              <span className="mobiletag"><b>Mobile users:</b> Use device in horizontal mode.</span>
            </p>
            <span className="author">Made by Robert Walford</span>
        </div>
      </>
    );
  }
  return null;
}


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
      altName: ""
    });
  }

  closeTitle() {
    this.setState({
      showTitle: !this.state.showTitle,
    });
  }

  render() {
    return (
      <div className="App">
        <TitleCard show={this.state.showTitle} onClick={this.closeTitle}/>
        <CovidMap 
          onHover={this.handleMouseEnter} 
          onLeave={this.handleMouseExit}

        />
        <TooltipContent
          countryName={this.state.name} 
          deaths={this.state.deaths} 
          recovered={this.state.recovered} 
          cases={this.state.cases} 
          casesToday={this.state.casesToday}
          altName={this.state.altName} 
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
