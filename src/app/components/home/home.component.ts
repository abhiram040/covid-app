import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed=0;
  totalActive=0;
  totalDeaths=0;
  totalRecovered=0;
  loading=true;
  globalData:GlobalDataSummary[];
  // pieChart:GoogleChartInterface = {
  //   chartType:"PieChart"
    
  // }
  // columnChart:GoogleChartInterface = {
  //   chartType:"ColumnChart"
    
  // }
  datatable = [];
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart", 
    height: 500, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }
  constructor(private dataService : DataServiceService) { }

//   this.pieChart = {
//     chartType: 'PieChart',
//     dataTable:datatable,
//      //firstRowIsData: true,
//   options: {
//     height:500
//   },
// };
// this.columnChart = {
//   chartType: 'ColumnChart',
//   dataTable:datatable,
//    //firstRowIsData: true,
// options: {
//   height:500
// },
// };
// }
  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next:(result)=>{
        console.log(result);
        this.globalData=result;
        result.forEach(cs=>{
          if(!Number.isNaN(cs.confirmed)){
          this.totalActive+=cs.active
          this.totalConfirmed+=cs.confirmed
          this.totalDeaths+=cs.deaths
          this.totalRecovered+=cs.recovered
          }
        })
        this.initChart("c");
      },
      complete : ()=>{
        this.loading = false;
      }
    }
  )
}
  updateChart(input:HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value)
  }
  initChart(caseType:string){
    this.datatable = [];
    //datatable.push(["country", "Cases"])
    this.globalData.forEach(cs=>{
      let value:number;
      if(caseType=="c")
      if(cs.confirmed>10000)
      value=cs.confirmed
  
      if(caseType=="d")
      if(cs.deaths>5000)
      value=cs.deaths
  
      if(caseType=="r")
      if(cs.recovered>5000)
     value=cs.recovered
  
      if(caseType=="a")
      if(cs.active>10000)
      value=cs.active
  
      this.datatable.push([
        cs.country, value
      ])
    })
   console.log(this.datatable); 
}

}