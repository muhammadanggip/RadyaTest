import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';




@Component({
  selector: 'app-index1',
  templateUrl: './index1.component.html',
  styleUrls: ['./index1.component.scss']
})

/**
 * Index-1 component
 */
export class Index1Component implements OnInit {

  currentSection = 'home';


  WeatherData:any;
  LocationData:any;
  currentDate:any;
  currentDate2:any;
  Location : any;
  viewCity : any;
  viewRegion : any;
  viewCountry: any ;
  viewTemp: any ;
  viewMain: any ;
  viewMainDesc : any;
  viewIcon : any;

  ForecastData:any;
  hourly: any;
  userForm: FormGroup;




  constructor(private fb: FormBuilder) {

   }

  ngOnInit() {
  this.getLocation();
  this.userForm = this.fb.group({city: []})
  }

  getLocation() {
    fetch('http://ip-api.com/json')
    .then(response=>response.json())
    .then(Loc=>{
      this.setLocData(Loc);
    })
  }

  setLocData(Loc){
    this.LocationData = Loc;
    this.viewCity = this.LocationData.city;
    this.currentDate = new Date().toLocaleString("en-GB", {timeZone: this.LocationData.timezone});
    this.currentDate2 = new Date();
    this.getWeatherData(this.viewCity);
    this.getForecastHourly(this.viewCity);
  }

  getWeatherData(city) {
    var getCity = city;
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+getCity+'&appid=4052eb52fa98f267284a208f6875c8fc')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);
    })
  }

  setWeatherData(data){
    this.WeatherData = data;
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.viewTemp = this.WeatherData.temp_celcius;
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    var mainWheater = this.WeatherData.weather;
    this.viewMain = mainWheater[0].main;
    this.viewMainDesc = mainWheater[0].description;
    this.viewIcon = "http://openweathermap.org/img/w/"+mainWheater[0].icon+".png";
  }
  
  getForecastHourly(city) {
    var getCity = city;
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+getCity+'&appid=4052eb52fa98f267284a208f6875c8fc')
    .then(response=>response.json())
    .then(data=>{this.setForecastHourly(data);
      console.log(data)
    })
  }

  setForecastHourly(data){
    this.ForecastData = data;
    this.hourly =  this.ForecastData.list;
    this.viewCountry = this.ForecastData.city.country;
  }

  submit() {
    alert('Change city to : ' + this.userForm.get('city').value)
    this.viewCity = this.userForm.get('city').value;
    this.getWeatherData(this.viewCity);
    this.getForecastHourly(this.viewCity);
  }

  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50) {
      navbar.classList.add('nav-sticky');
    } else {
      navbar.classList.remove('nav-sticky');
    }
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  toggleMenu() {
    document.getElementById('navbarCollapse').classList.toggle('show');
  }
}
