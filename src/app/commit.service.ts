import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { commits } from './commits';

@Injectable()
export class CommitService{

    private _url: string = "/Users/vignesh/my-works/angular/graph/src/assets/data/data.json";

    constructor(private http:HttpClient){}

    getCommitData(): Observable<commits[]>{
        return this.http.get<commits[]>(this._url);
    }
}