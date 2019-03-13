import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {fullCommit, Commiter, Author} from "./commits"
//import { CommitService } from './commit.service';


import SampleJson from '../assets/data/data.json';
import { JsonPipe } from '@angular/common';
import { totalCommit } from './totalCommits';
//import { totalCommitMap  ChildrenIntoArray } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Git Commit Charts';
  BarChart=[];
  public data : fullCommit[] ;

  public dateLable: string[] = [];
  public countLable: number[] = [];
  public dateColor: string[] = [];
  public totalDateCommits : number = 0;

  public committerLable: string[] = [];
  public committerCount: number[] = [];
  public comitterColor: string[] = [];
  
  public commits = [];
  public totalCommit: { key: string, value : number};
  public totalCommitArray: totalCommit[];

  public totalCommitMap = new Map();
  public developerCommitMap= new Map();

  //constructor(private _commitService: CommitService){}

  constructor(private Http : HttpClient){


    this.Http.get("../assets/data/data.json").subscribe(data=>{
      this.data = data['commits'];
      this.doAfterconstructor();
    })

    console.log('Reading local json files');
    console.log(SampleJson);
    
  }


  public createObjectFromJSON(){
    
  }

  ngOnInit() {
  
    console.log("inside init  method");
 }


  doAfterconstructor(){
  
      for( let element in this.data ){
        let commitDate = this.data[element].commiter.date;
        let committerName = this.data[element].commiter.name;
        
        if ( this.totalCommitMap.get( commitDate) == null ){
          console.log("not found");
          this.totalCommitMap.set(commitDate, 1);
          //this.dateLable.push(commitDate);
        }else{
          let value = this.totalCommitMap.get(commitDate);
          this.totalCommitMap.set(commitDate, ++value);
        }      

        if ( this.developerCommitMap.get(committerName) == null ){
          this.developerCommitMap.set(committerName, 1);
        }else{
          let value = this.developerCommitMap.get(committerName);
          this.developerCommitMap.set(committerName, ++value);
        }
      }

      this.totalCommitMap.forEach((value: number, key: string) => {
        //console.log(key, value);
        this.dateLable.push(key);
        this.countLable.push(value);
        this.dateColor.push('#1E90FF');
        this.totalDateCommits++;
      });

      this.developerCommitMap.forEach((value: number, key: string) => {
        //console.log(key, value);
        this.committerLable.push(key);
        this.committerCount.push(value);
        this.comitterColor.push('#42f4ce');
      });

      console.log( this.dateLable);

      
      this.showBarChart();
      this.showBarChartCommitter();
  }

  showBarChart(){

    this.BarChart = new Chart('barChart', {
      type: 'bar',
    data: {
     labels: this.dateLable,
     datasets: [{
         label: '# of Commits -- ' + this.totalDateCommits,
         data: this.countLable,
         backgroundColor: "#1E90FF",    
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
     },
     annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 5,
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 4,
        label: {
          enabled: false,
          content: 'Test label'
        }
      }]
    }
    }

    });
  }



  showBarChartCommitter(){

    this.BarChart = new Chart('comitterBarChart', {
      type: 'horizontalBar',
    data: {
     labels: this.committerLable,
     datasets: [{
         label: '# of Commits by Developer',
         data: this.committerCount,
         backgroundColor: "#99cc00",
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Commit Stats for Individual Developers",
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









































/*  TEMP CODE
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


var jsonStringList  = `{
  "commits": [{
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
 }]
}`;

var jsonObject = JSON.parse(jsonString);
var jsonObjectList : Object[] = JSON.parse(jsonStringList);

console.log( jsonObject.commit);
console.log( jsonObject.author.name);

for( let obj in jsonObjectList){
  console.log( obj );
  console.log( obj["commits.commit"]);
  console.log( obj["author"]);
}
 */