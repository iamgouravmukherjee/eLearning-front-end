import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })

export class CourseService {

    private course = new Subject();
    private response = new Subject();
    private baseUrl: string = `http://192.168.43.51:3002`;
    constructor(private http: HttpClient) { }

    getCourseDetails(courseId) {
        this.http.get(`${this.baseUrl}/api/courses/${courseId}`)
            .subscribe(course => {
                this.course.next(course);
            })
    }

    addCourse(courseId, token) {
        console.log(`received\n courseID: ${courseId}\ntoken: ${token}`);
        this.http.post(`${this.baseUrl}/api/courses/addCourse/${courseId}`, { token })
            .subscribe(response => {
                console.log('[response in service]', response);
                this.response.next(response);
            });

    }

    observeChangesInCourse() {
        return {courses: this.course.asObservable(), response: this.response.asObservable()};
    }
}