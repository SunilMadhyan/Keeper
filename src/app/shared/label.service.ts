import { Injectable } from  "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { UserLabels } from "../constants/userlabels";
import { Observable } from "rxjs";

@Injectable({
   providedIn: 'root' 
})
export class LabelService {

    constructor(private http: HttpClient) { }

    public getLabels(): Observable<HttpResponse<UserLabels>> {
        return this.http.get<UserLabels>(
            'assets/label.json', { observe: 'response' });
    }
}