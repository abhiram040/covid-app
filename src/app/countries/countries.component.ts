import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "src/app/services/data-service.service";
import { GlobalDataSummary } from '../models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GoogleChartInterface } from 'ng2-google-charts';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  
        data:GlobalDataSummary[];
        countries:string[]=[];
        totalConfirmed=0;
        totalActive=0;
        totalDeaths=0;
        totalRecovered=0;
        selectedCountryData : DateWiseData[]; 
  dateWiseData ;
  lineChart:GoogleChartInterface={
    chartType:'LineChart'
  }
  loading = true;
  options: {
    height : 500, 
    animation:{
      duration: 1000,
      easing: 'out',
    },
  }
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
     
    this.service.getDateWiseData().subscribe(
      (result)=>{
      this.dateWiseData=result;
      this.updateChart();
      
    }
    )
    
    
    this.service.getGlobalData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
           this.countries.push(cs.country)
      })
    })
  }
  
  updateChart(){
    let dataTable = [];
    dataTable.push(["Cases" , 'Date'])
    this.selectedCountryData.forEach(cs=>{
      dataTable.push([cs.cases , cs.date])
    })
    // this.lineChart={
    //   chartType: 'LineChart',
    //   dataTable:dataTable,
    //   //firstRowIsData: true,
    //   options: {
    //     height:500
    //   }
    // };
   
  }
  updateValue(country:string)
  {
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })
 
    this.selectedCountryData  = this.dateWiseData[country]
    // console.log(this.selectedCountryData);
    this.updateChart();
    
  }
  }


