import { Component, OnInit } from "@angular/core";
import { HomeListService } from "./home.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    
    private courseLists: Subscription;
    private lists: [] = [];

    constructor(private courseService: HomeListService) {}
    
    ngOnInit() {
        this.courseService.getLists();
        this.observeChanges();
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    

    observeChanges() {
        this.courseLists = this.courseService.observeChangeInCourses().subscribe(response => {
           console.log('response from [server]', response);
           this.lists = response['courses'];
        })
    }
}