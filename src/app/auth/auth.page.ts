import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLoggedIn = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private LoadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}
  onLogIn(email: string, password: string) {
    // this.authService.userIsAuthenticated;
    // this.isLoading = true;
    // // let code="";
    // this.LoadCtrl.create({
    //   keyboardClose: true,
    //   message: "Logging in...",
    // }).then((loadEl) => {
    //   loadEl.present();
    //   this.authService
    //     .LogIn(email, password)
    //     .then((resData) => {
    //       console.log("123 ", resData);
    //       this.isLoading = false;
    //       loadEl.dismiss();
    //       this.router.navigateByUrl("/home");
    //     })
    //     .catch((err) => {
    //       loadEl.dismiss();
    //       const code = err.messege;
    //       let msg = "Couldn't login, please try again";
    //       if (code != "Auth Successful") {
    //         this.showAlert(msg);
    //       }
    //     });
    // });
    this.isLoading = true;
    let code = "";
    this.LoadCtrl.create({
      keyboardClose: true,
      message: "Logging in...",
    }).then((loadEl) => {
      loadEl.present();
      this.authService.LogIn(email, password).subscribe(
        (resData) => {
          console.log(resData);
          code = resData["messege"];
          this.isLoading = false;
          loadEl.dismiss();
          this.router.navigateByUrl("/home");
        },
        (err) => {
          loadEl.dismiss();
          // const code = err.messege;
          console.log(code);
          let msg = "Couldn't login, please try again";
          if (code != "Auth Successful") {
            this.showAlert(msg);
          }
        }
      );
    });
  }
  onSubmit(form: NgForm) {
    let code = "";
    if (!form.valid) {
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;
      this.onLogIn(email, password);
      form.reset();
      // this.isLoading = true;
      // // let code="";
      // this.LoadCtrl.create({
      //   keyboardClose: true,
      //   message: "Logging in...",
      // }).then((loadEl) => {
      //   loadEl.present();
      //   this.authService.LogIn(email, password).subscribe(
      //     (resData) => {
      //       // console.log( resData["messege"]);
      //       code = resData["messege"];
      //       this.isLoading = false;
      //       loadEl.dismiss();
      //       this.router.navigateByUrl("/home");
      //     },
      //     (err) => {
      //       loadEl.dismiss();
      //       // const code = err.messege;
      //       console.log(code);
      //       let msg = "Couldn't login, please try again";
      //       if (code != "Auth Successful") {
      //         this.showAlert(msg);
      //       }
      //     }
      //   );
      // });
    }
  }
  onSubmitSignUp(form: NgForm) {
    this.isLoggedIn = true;
    if (!form.valid) {
      return;
    } else {
      const firstname = form.value.firstname;
      const lastname = form.value.lastname;
      const email = form.value.email;
      const password = form.value.password;
      const clgname = form.value.clgname;
      const contact = form.value.contact;
      console.log(firstname, lastname, email, password, clgname, contact);
      // console.log(
      //   form.value.firstname,
      //   form.value.lastname,
      //   form.value.email,
      //   form.value.password
      // );
      this.authService
        .SignUp(firstname, lastname, email, password, clgname, contact)
        .subscribe(
          (resData) => {
            console.log(resData);
            // console.log(resData.error.message);
          },
          (err) => {
            const code = err.error.messege;
            let msg = "Couldn't sign up, please try again";
            if (code == "Mail exists") {
              msg = code;
            }
            this.showAlert(msg);
          }
        );
    }
  }
  onAuthState() {
    this.isLoggedIn = !this.isLoggedIn;
  }
  onSignUp() {}

  private showAlert(msg: string) {
    this.alertCtrl
      .create({
        header: "Authentication Failed",
        message: msg,
        buttons: ["Okay"],
      })
      .then((alertEl) => alertEl.present());
  }
}
