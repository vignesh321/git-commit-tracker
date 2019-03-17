import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {HttpClient} from '@angular/common/http';
//import {fullCommit, Commiter, Author} from "./commits"
import {fullCommit, newFullCommit} from "./commits"
//import { CommitService } from './commit.service';


import { totalCommit } from './totalCommits';
import { CompileShallowModuleMetadata } from '@angular/compiler';
//import { totalCommitMap  ChildrenIntoArray } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'BitBucket Commit Analysis';
  BarChart=[];
  PieChart=[];
  public data : fullCommit[] ;

  public dateLable: string[] = [];
  public countLable: number[] = [];
  public dateColor: string[] = [];
  public totalDateCommits : number = 0;

  public committerLable: string[] = [];
  public committerCount: number[] = [];
  public comitterColor: string[] = [];
  public totalAuthorCommits : number = 0;
  
  public repoDataMap = new Map();
  public repoData: string[] = [];
  public repoDataCount:number[] = [];
  repoColour: any = [];

  public commits = [];
  public totalCommit: { key: string, value : number};
  public totalCommitArray: totalCommit[];

  public totalCommitMap = new Map();
  public developerCommitMap= new Map();


  public newData: newFullCommit[];
  

  //constructor(private _commitService: CommitService){}

  constructor(private Http : HttpClient){


    /* this.Http.get("../assets/data/data.json").subscribe(data=>{
      this.data = data['commits'];
      this.doAfterconstructor();
    }) */

    //"../assets/data/data-new.json"
    this.Http.get("../assets/data/data.json").subscribe( data=>{
      this.data = data['commits'];
      this.doAfterconstructor();
    })
    
    
  }


  public createObjectFromJSON(){
    
  }

  ngOnInit() {
  
    console.log("inside init  method");
 }


  doAfterconstructor(){
  
      for( let element in this.data ){

        let commitDate = this.data[element].committerDate;
        let committerName = this.data[element].committerName;
        let repoData = this.data[element].repo;
        

        
        this.generateDateCommits(commitDate);
        this.generateComitterData(committerName);
        this.generateReposData(repoData);
      }

      this.totalCommitMap.forEach((value: number, key: string) => {
        
        this.dateLable.push(key);
        this.countLable.push(value);
        this.totalDateCommits++;
      });

      this.developerCommitMap.forEach((value: number, key: string) => {
        
        this.committerLable.push(key);
        this.committerCount.push(value);
        this.totalAuthorCommits++;
      });

      this.repoDataMap.forEach((value: number, key: string) => {
        
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.repoData.push(key);
        this.repoDataCount.push(value);
        this.repoColour.push("#"+randomColor);
        console.log(randomColor);
      });


      //console.log( this.dateLable);
      console.log( this.repoData);

      //this.repoData= Array.from(new Set(this.repoData));//[... new Set(this.repoData)];
      
      this.showBarChart();
      this.showBarChartCommitter();
      this.showPieChart();
  }
  


  generateDateCommits(commitDate: string){
    if ( this.totalCommitMap.get( commitDate) == null ){
      //console.log("not found");
      this.totalCommitMap.set(commitDate, 1);
      //this.dateLable.push(commitDate);
    }else{
      let value = this.totalCommitMap.get(commitDate);
      this.totalCommitMap.set(commitDate, value + 1);
    }  
  }

  generateComitterData(committerName: string){
    if ( this.developerCommitMap.get(committerName) == null ){
      this.developerCommitMap.set(committerName, 1);
    }else{
      let value = this.developerCommitMap.get(committerName);
      this.developerCommitMap.set(committerName, value+1);
    }
  }

  generateReposData(repoData: string){

    if ( this.repoDataMap.get(repoData) == null ){
      this.repoDataMap.set(repoData, 1);
    }else{
      let value = this.repoDataMap.get(repoData);
      this.repoDataMap.set(repoData, value+1);
    }
  }


  //Show Chart 1
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
     /* annotation: {
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
    } */
    }

    });
  }


  //Show Chart 2
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




  showPieChart(){

    this.BarChart = new Chart('repoChart', {
      type: 'pie',
    data: {
     labels: this.repoData, //repoData,
     datasets: [{
         label: '# Commits in Repo',
         data: this.repoDataCount,
         backgroundColor: this.repoColour,
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Commit Stats for Single Repository",
         display:true
     }/* ,
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     } */
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