import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })

export class DashboardService {

    private courses = new Subject();
    private baseUrl: string = "http://192.168.43.51:3002";
    constructor(private http: HttpClient) { }

    getCourses(token) {
        console.log('received', {token});
        this.http.post(`${this.baseUrl}/api/user/courses/`, { token })
            .subscribe(response => {
                console.log(response);
                this.courses.next(response);
            })
    }

    observeChanges() {
        return this.courses.asObservable();
    }
}