import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
//import { CommitService } from './commit.service';


import SampleJson from '../assets/data/data.json';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Git Commit Charts';
  BarChart=[];
  public data;
  
  public commits = [];
  totalCommit: { key: string, value : number};

  //constructor(private _commitService: CommitService){}

  constructor(){
    console.log('Reading local json files');
    console.log(SampleJson);
    this.data = SampleJson;
    
    var jsonString = `{
      "commit": "3f4852fa5f932e5e815ef1be39c72ac8be4687d4",
     "author": {
        "name": "Andrew Clark",
        "email": "git@andrewclark.io",
        "date": "Fri, 8 Mar 2019 18:53:14 -0800"
      },
      "commiter": {
        "name": "GitHub",
        "email": "noreply@github.com",
        "date": "Fri, 8 Mar 2019 18:53:14 -0800"
      }
    }`
    

    var jsonStringList  = `
      {
        "commit": "3f4852fa5f932e5e815ef1be39c72ac8be4687d4",
       "author": {
          "name": "Andrew Clark",
          "email": "git@andrewclark.io",
          "date": "Fri, 8 Mar 2019 18:53:14 -0800"
        },
        "commiter": {
          "name": "GitHub",
          "email": "noreply@github.com",
          "date": "Fri, 8 Mar 2019 18:53:14 -0800"
        }
      },
      {
      "commit": "3f4852fa5f932e5e815ef1be39c72ac8be4687d4",
      "author": {
         "name": "Andrew Clark",
         "email": "git@andrewclark.io",
         "date": "Fri, 8 Mar 2019 18:53:14 -0800"
       },
       "commiter": {
         "name": "GitHub",
         "email": "noreply@github.com",
         "date": "Fri, 8 Mar 2019 18:53:14 -0800"
       }
     }
    `;

    var jsonObject = JSON.parse(jsonString);
    var jsonObjectList : Object[] = JSON.parse(jsonStringList);

    console.log( jsonObject.commit);
    console.log( jsonObject.author.name);

    for( let obj in jsonObjectList){
      console.log( obj );
      console.log( obj["commits.commit"]);
      console.log( obj["author"]);
    }
    


    //JSON.parse(this.data);

    //console.log(this.createObjectFromJSON());

  }


  public createObjectFromJSON(){
    JSON.parse(this.data, (key, value) => {
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
      return value;
    });
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