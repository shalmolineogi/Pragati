import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from } from "rxjs";
import { User } from "./user.model";
import { map, tap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";

export interface AuthResData {
  messege: string;
  token: string;
  expiresIn: string;
  userId: string;
  email: string;
  name: string;
  clgname: string;
  contact:string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  // private _userAutheticated = false;
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;

  constructor(private http: HttpClient) {}
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }
  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return false;
        }
      })
    );
  }

  SignUp(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    clgname: string,
    contact: string
  ) {
    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      clgname: clgname,
      contact: contact,
    };
    return this.http.post("http://localhost:3000/api/users/signup", user);
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: "authData" })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          userId: string;
          name: string;
          email: string;
          clgname: string,
          contact:string,
          token: string;
          expirationDate: string;
        };
        const expirationTime = new Date(parsedData.expirationDate);
        if (expirationTime < new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.name,
          parsedData.email,
          parsedData.clgname,
          parsedData.contact,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  LogIn(email: string, password: string) {
    // this._userAutheticated = true;
    const user = {
      // fname: fname,
      // lname: lname,
      email: email,
      password: password,
    };
    return this.http
      .post<AuthResData>("http://localhost:3000/api/users/login", user)
      .pipe(tap(this.setUserData.bind(this)));

    // return fetch("http://localhost:3000/api/users/login", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // })
    //   .then((data) => {
    //     console.log(data);
    //     return data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return err;
    //   });
  }

  LogOut() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({ key: "authData" });
  }
  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.LogOut();
    }, duration);
  }
  private setUserData(userData: AuthResData) {
    const expirationDate = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.userId,
      userData.name,
      userData.email,
      userData.clgname,
      userData.contact,
      userData.token,
      expirationDate
    );
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      userData.userId,
      userData.name,
      userData.email,
      userData.clgname,
      userData.contact,
      userData.token,
      expirationDate.toISOString()
    );
  }

  private storeAuthData(
    userId: string,
    name: string,
    email: string,
    clgname:string,
    contact:string,
    token: string,
    expirationDate: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      name: name,
      email: email,
      clgname:clgname,
      contact:contact,
      token: token,
      expirationDate: expirationDate,
    });

    Plugins.Storage.set({ key: "authData", value: data });
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
}
