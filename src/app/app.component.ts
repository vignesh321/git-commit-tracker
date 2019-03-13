import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {fullCommit, Commiter, Author} from "./commits"
//import { CommitService } from './commit.service';


import SampleJson from '../assets/data/data.json';
import { JsonPipe } from '@angular/common';
import { totalCommit } from './totalCommits';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';

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
  
  public commits = [];
  public totalCommit: { key: string, value : number};
  public totalCommitArray: totalCommit[];

  public map = new Map();

  //constructor(private _commitService: CommitService){}

  constructor(private Http : HttpClient){


    this.Http.get("../assets/data/data.json").subscribe(data=>{
      this.data = data['commits'];
      console.log(this.data[1].author.name);
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
        
        if ( this.map.get( commitDate) == null ){
          console.log("not found");
          this.map.set(commitDate, 1);
          //this.dateLable.push(commitDate);
        }else{
          let value = this.map.get(commitDate);
          this.map.set(commitDate, ++value);
        }

        this.map.forEach((value: number, key: string) => {
          //console.log(key, value);
          this.dateLable.push(key);
          this.countLable.push(value);
      });

        console.log( this.dateLable);
      }

      
      this.showBarChart();
  }

  // generate the date wise commits 
  dateCommitArray(){
    //if ( this.totalCommitArray.keys)
  }



  showBarChart(){

    this.BarChart = new Chart('barChart', {
      type: 'bar',
    data: {
     //labels: ["2019-03-03", "2019-03-05", "2019-03-09", "2019-03-11", "2019-03-12", "2019-03-15"],
     labels: this.dateLable,
     datasets: [{
         label: '# of Commits',
         //data: [9,7 , 3, 5, 2, 100],
         data: this.countLable,
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