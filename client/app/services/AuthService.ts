import {Injectable,NgZone} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {tokenNotExpired} from 'angular2-jwt';
import {Subject} from 'rxjs/Subject'

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

zoneImpl: NgZone;
user: Object;

constructor(private router: Router,zone: NgZone) {  
   this.zoneImpl = zone;
   this.user = JSON.parse(localStorage.getItem('profile'));
}
  
  private useremail;
  profileUpdated$:Subject<any> = new Subject();
	lock = new Auth0Lock('1mvHGykVHvxzpwstp2wTmrzLrpzouVTm','angular2-auth.auth0.com');

	login() {
   this.lock.show((error: string, profile: Object, id_token: string) => {
     if (error) {
       console.log(error);
       return false;
     }
     localStorage.setItem('profile', JSON.stringify(profile));
     localStorage.setItem('id_token', id_token);
     this.profileUpdated$.next(profile);
     this.zoneImpl.run(() => this.user = profile);
     this.router.navigate(['Dashboard']);     
    });
 }

 logout() {
   localStorage.removeItem('profile');
   localStorage.removeItem('id_token');
   this.profileUpdated$.next(null);
   this.zoneImpl.run(() => this.user = null);
 }

 loggedIn() {
    return tokenNotExpired();
  } 
}