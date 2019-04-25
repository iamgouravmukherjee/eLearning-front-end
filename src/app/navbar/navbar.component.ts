import { Component, OnInit } from "@angular/core";
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

    

     constructor(private router: Router) {}

    logout() {
        if (sessionStorage.getItem('token')) {
            sessionStorage.removeItem('token');
            this.router.navigateByUrl('/home');
        }
    }
    notLoggedIn = () => !sessionStorage.getItem('token');
    loggedIn = () => sessionStorage.getItem('token');
}