import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "./dashboard.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})

export class DashboardComponent implements OnInit {

    ngOnInit() {
        this.observeChanges();
    }

    private course: Subscription;
    private courseInfo: {} = {};
    constructor(private router: Router, private service: DashboardService) { }

    logout() {
        if (sessionStorage.getItem('token')) {
            sessionStorage.removeItem('token');
            this.router.navigateByUrl('/home');
        }
    }

    observeChanges() {
        this.service.getCourses(sessionStorage.getItem('token'));
        this.course = this.service.observeChanges().subscribe(doc => {
            this.courseInfo = doc['courses'];
            console.log('[course]', doc['courses']);
        })
    }
}