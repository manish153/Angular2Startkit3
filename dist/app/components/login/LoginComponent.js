System.register(['angular2/core', 'angular2/router', 'angular2-jwt', '../../services/AuthService'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, angular2_jwt_1, AuthService_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(auth) {
                    this.auth = auth;
                    this.auth.login();
                }
                LoginComponent.prototype.login = function () {
                    this.auth.login();
                };
                LoginComponent.prototype.logout = function () {
                    this.auth.logout();
                };
                LoginComponent.loggedIn = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'protected',
                        template: '',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [angular2_jwt_1.AUTH_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [AuthService_1.AuthService])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL2xvZ2luL0xvZ2luQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbIkxvZ2luQ29tcG9uZW50IiwiTG9naW5Db21wb25lbnQuY29uc3RydWN0b3IiLCJMb2dpbkNvbXBvbmVudC5sb2dpbiIsIkxvZ2luQ29tcG9uZW50LmxvZ291dCIsIkxvZ2luQ29tcG9uZW50LmxvZ2dlZEluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFRQTtnQkFTRUEsd0JBQW9CQSxJQUFpQkE7b0JBQWpCQyxTQUFJQSxHQUFKQSxJQUFJQSxDQUFhQTtvQkFDbkNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0E7Z0JBQ0RELDhCQUFLQSxHQUFMQTtvQkFDRUUsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQTtnQkFFREYsK0JBQU1BLEdBQU5BO29CQUNFRyxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtnQkFDckJBLENBQUNBO2dCQUVNSCx1QkFBUUEsR0FBZkE7b0JBQ0VJLE1BQU1BLENBQUNBLDhCQUFlQSxFQUFFQSxDQUFDQTtnQkFDM0JBLENBQUNBO2dCQXRCSEo7b0JBQUNBLGdCQUFTQSxDQUFDQTt3QkFDUEEsUUFBUUEsRUFBRUEsV0FBV0E7d0JBQ3JCQSxRQUFRQSxFQUFFQSxFQUFFQTt3QkFDWkEsVUFBVUEsRUFBRUEsQ0FBQ0EsMEJBQWlCQSxDQUFDQTt3QkFDL0JBLFNBQVNBLEVBQUVBLENBQUNBLDZCQUFjQSxDQUFDQTtxQkFDOUJBLENBQUNBOzttQ0FtQkRBO2dCQUFEQSxxQkFBQ0E7WUFBREEsQ0F4QkEsQUF3QkNBLElBQUE7WUF4QkQsMkNBd0JDLENBQUEiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvbG9naW4vTG9naW5Db21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7Um91dGVyLCBSb3V0ZUNvbmZpZywgUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XHJcbmltcG9ydCB7QXV0aEh0dHAsIEF1dGhDb25maWcsIHRva2VuTm90RXhwaXJlZCwgQVVUSF9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyLWp3dCc7XHJcblxyXG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9BdXRoU2VydmljZSdcclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Byb3RlY3RlZCcsXHJcbiAgICB0ZW1wbGF0ZTogJycsXHJcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdLFxyXG4gICAgcHJvdmlkZXJzOiBbQVVUSF9QUk9WSURFUlNdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmF1dGgubG9naW4oKTtcclxuICB9XHJcbiAgbG9naW4oKSB7XHJcbiAgICB0aGlzLmF1dGgubG9naW4oKTtcclxuICB9XHJcblxyXG4gIGxvZ291dCgpIHtcclxuICAgIHRoaXMuYXV0aC5sb2dvdXQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBsb2dnZWRJbigpIHtcclxuICAgIHJldHVybiB0b2tlbk5vdEV4cGlyZWQoKTtcclxuICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
