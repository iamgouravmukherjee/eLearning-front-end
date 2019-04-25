import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
   selector: "app-login",
   templateUrl: "./login.component.html",
   styleUrls: ["../signup/signup.component.css"]
})
export class LoginComponent implements OnInit {

   private response: Subscription;
   private text: string = "";
   private password: string = "";
   private form: HTMLFormElement = null;
   constructor(private loginService: LoginService, private router:Router) { }

   ngOnInit() {
      if(sessionStorage.getItem('token')) {
         this.router.navigateByUrl('/home');
      }
      this.observeChanges();
   }

   handleInput(element, selector) {
      if (selector == "username") {
         this.text = element.value
      } else {
         this.password = element.value;
      }
   }

   handleSumbit(event) {
      event.preventDefault();
      this.loginService.getUser(this.text, this.password);
   }

   observeChanges() {
      this.response = this.loginService.userUpdated().subscribe(response => {
         console.log('[response from server]', response);
         if(response['message'] === "success") {
            sessionStorage.setItem('token', response['data']);
            this.router.navigateByUrl('/home');
         }
      })
   }
}