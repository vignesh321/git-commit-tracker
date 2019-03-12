import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
//import { CommitService } from './commit.service';


import SampleJson from '../assets/data/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Git Commit Charts';
  LineChart=[];
  BarChart=[];
  
  public commits = [];

  //constructor(private _commitService: CommitService){}

  constructor(){
    console.log('Reading local json files');
  console.log(SampleJson);
  }
  ngOnInit() {
  
    /* this._commitService.getCommitData()
          .subscribe( data => this.commits = data );
 */
    console.log( this.commits );
    this.showBarChart();
  }








  showBarChart(){

    this.BarChart = new Chart('barChart', {
      type: 'bar',
    data: {
     labels: ["2019-03-03", "2019-03-05", "2019-03-09", "2019-03-11", "2019-03-12", "2019-03-15"],
     datasets: [{
         label: '# of Commits',
         data: [9,7 , 3, 5, 2, 100],
         backgroundColor: [
              '#1E90FF'
         ],
         borderColor: [
              '#1E90FF'
         ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Commit Stats of All Developers",
         display:true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });
  }
}