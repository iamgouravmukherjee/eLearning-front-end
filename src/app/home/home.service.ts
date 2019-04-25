import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})

export class HomeListService {

    private courseList = new Subject();
    private baseUrl: string = `http://192.168.43.51:3002`
    constructor(private http: HttpClient) {}

    getLists() {
        this.http.get(`${this.baseUrl}/api/courses/`)
            .subscribe(courseList => {
                this.courseList.next(courseList);
            })
    }
    observeChangeInCourses() {
        return this.courseList.asObservable();
    }
}