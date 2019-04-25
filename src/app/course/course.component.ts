import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CourseService } from "./course.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-course",
    templateUrl: "./course.component.html",
    styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

    courseId: string = "";
    course: Subscription;
    private courseInfo: {} = {};
    private response: Subscription;
    private responseData;
    constructor(private route: ActivatedRoute, private courseService: CourseService) { }

    loggedIn = () => sessionStorage.getItem('token');
    notLoggedIn = () => !sessionStorage.getItem('token');

    ngOnInit() {
        this.courseId = this.route.snapshot.paramMap.get("courseId");
        console.log('course id: ', this.courseId);
        this.observeChanges();
    }

    addCourse() {
        this.courseService.addCourse(this.courseId, sessionStorage.getItem('token'))
    }

    observeChanges() {
        this.courseService.getCourseDetails(this.courseId);
        this.course = this.courseService.observeChangesInCourse()['courses'].subscribe(doc => {
            this.courseInfo = doc['course'][0] ;
            console.log('[course]', this.courseInfo);
        })
        this.response = this.courseService.observeChangesInCourse()['response'].subscribe(res => {
            this.responseData = res;
            console.log('[response in client]', res);
            if(res.hasOwnProperty('error')) {
                alert(res['error']);
            }
        })
    }
}