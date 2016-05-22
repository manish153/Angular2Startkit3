System.register(['angular2/core', 'angular2/router', './DashboardComponent', '../../services/AuthService'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, DashboardComponent_1, AuthService_1;
    var SidebarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (DashboardComponent_1_1) {
                DashboardComponent_1 = DashboardComponent_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            }],
        execute: function() {
            SidebarComponent = (function () {
                function SidebarComponent(service) {
                    var _this = this;
                    this.service = service;
                    this.user = JSON.parse(localStorage.getItem('profile'));
                    this.user = this.service.profileUpdated$.subscribe(function (profile) {
                        _this.user = profile;
                    });
                }
                SidebarComponent.prototype.logout = function () {
                    //this.user = this.service.profileUpdated$.subscribe(profile => { 
                    //this.user = profile})
                    this.user = 'user@example.com';
                    this.service.logout();
                };
                SidebarComponent = __decorate([
                    core_1.Component({
                        selector: 'app-sidebar',
                        template: "\n      <header class=\"demo-drawer-header\">\n          <img src=\"../app/assets/images/user.jpg\" class=\"demo-avatar\">\n          <div class=\"demo-avatar-dropdown\">\n            <span>{{user.email}}</span>\n            <div class=\"mdl-layout-spacer\"></div>\n            <button id=\"accbtn\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon\">\n              <i class=\"material-icons\" role=\"presentation\">arrow_drop_down</i>\n              <span class=\"visuallyhidden\">Accounts</span>\n            </button>\n            <ul class=\"mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect\" for=\"accbtn\">\n              <li class=\"mdl-menu__item\" [routerLink]=\"['./Profile']\">My Profile</li>\n              <li class=\"mdl-menu__item\" (click)=\"logout()\">Logout</li>\n              \n            </ul>\n          </div>\n        </header>\n        <nav class=\"demo-navigation mdl-navigation mdl-color--blue-grey-800\">\n          \n          <a class=\"mdl-navigation__link\" [routerLink]=\"['./Dashboard']\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">dashboard</i>Dashboard</a>\n          \n\n          <a class=\"mdl-navigation__link\" [routerLink]=\"['./Tasks']\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">assignment</i>Tasks</a>\n\n          <a class=\"mdl-navigation__link\" [routerLink]=\"['./Requests']\" ><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">delete</i>Service Requests</a>\n\n          <a class=\"mdl-navigation__link\" [routerLink]=\"['./Payments']\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">report</i>Payments</a>\n          <a class=\"mdl-navigation__link\" [routerLink]=\"['./BusinessRoots']\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">forum</i>Apartments</a>\n          <a class=\"mdl-navigation__link\" [routerLink]=\"['./Residents']\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">flag</i>Residents</a>\n          <a class=\"mdl-navigation__link\" [routerLink]=\"['./Community']\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">local_offer</i>My Community</a>\n          \n\n          <div class=\"mdl-layout-spacer\"></div>\n          <a class=\"mdl-navigation__link\" href=\"\"><i class=\"mdl-color-text--blue-grey-400 material-icons\" role=\"presentation\">help_outline</i><span class=\"visuallyhidden\">Help</span></a>\n        </nav>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES, DashboardComponent_1.DashboardComponent]
                    }), 
                    __metadata('design:paramtypes', [AuthService_1.AuthService])
                ], SidebarComponent);
                return SidebarComponent;
            })();
            exports_1("SidebarComponent", SidebarComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL2FwcC9TaWRlYmFyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbIlNpZGViYXJDb21wb25lbnQiLCJTaWRlYmFyQ29tcG9uZW50LmNvbnN0cnVjdG9yIiwiU2lkZWJhckNvbXBvbmVudC5sb2dvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVFBO2dCQStDRUEsMEJBQW9CQSxPQUFvQkE7b0JBL0MxQ0MsaUJBNERDQTtvQkFicUJBLFlBQU9BLEdBQVBBLE9BQU9BLENBQWFBO29CQUh4Q0EsU0FBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBSWpEQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxlQUFlQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFBQSxPQUFPQTt3QkFDeERBLEtBQUlBLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBO29CQUN0QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0xBLENBQUNBO2dCQUdERCxpQ0FBTUEsR0FBTkE7b0JBQ0VFLGtFQUFrRUE7b0JBQ2xFQSx1QkFBdUJBO29CQUN2QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0Esa0JBQWtCQSxDQUFDQTtvQkFDL0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO2dCQUN4QkEsQ0FBQ0E7Z0JBM0RIRjtvQkFBQ0EsZ0JBQVNBLENBQUNBO3dCQUNQQSxRQUFRQSxFQUFFQSxhQUFhQTt3QkFDdkJBLFFBQVFBLEVBQUVBLGloRkFtQ1RBO3dCQUVEQSxVQUFVQSxFQUFFQSxDQUFDQSwwQkFBaUJBLEVBQUVBLHVDQUFrQkEsQ0FBQ0E7cUJBQ3REQSxDQUFDQTs7cUNBb0JEQTtnQkFBREEsdUJBQUNBO1lBQURBLENBNURBLEFBNERDQSxJQUFBO1lBNURELCtDQTREQyxDQUFBIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2FwcC9TaWRlYmFyQ29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQge1JvdXRlciwgUm91dGVDb25maWcsIFJPVVRFUl9ESVJFQ1RJVkVTLCBDYW5BY3RpdmF0ZX0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcclxuaW1wb3J0IHtIb21lQ29tcG9uZW50fSBmcm9tICcuLi9ob21lL0hvbWVDb21wb25lbnQnXHJcbmltcG9ydCB7RGFzaGJvYXJkQ29tcG9uZW50fSBmcm9tICcuL0Rhc2hib2FyZENvbXBvbmVudCdcclxuaW1wb3J0IHtBcGFydG1lbnRDb21wb25lbnR9IGZyb20gJy4uL2FwYXJ0bWVudC9BcGFydG1lbnRDb21wb25lbnQnXHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL0F1dGhTZXJ2aWNlJ1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtc2lkZWJhcicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICA8aGVhZGVyIGNsYXNzPVwiZGVtby1kcmF3ZXItaGVhZGVyXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cIi4uL2FwcC9hc3NldHMvaW1hZ2VzL3VzZXIuanBnXCIgY2xhc3M9XCJkZW1vLWF2YXRhclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRlbW8tYXZhdGFyLWRyb3Bkb3duXCI+XHJcbiAgICAgICAgICAgIDxzcGFuPnt7dXNlci5lbWFpbH19PC9zcGFuPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWRsLWxheW91dC1zcGFjZXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImFjY2J0blwiIGNsYXNzPVwibWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1qcy1yaXBwbGUtZWZmZWN0IG1kbC1idXR0b24tLWljb25cIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPmFycm93X2Ryb3BfZG93bjwvaT5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5aGlkZGVuXCI+QWNjb3VudHM8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJtZGwtbWVudSBtZGwtbWVudS0tYm90dG9tLXJpZ2h0IG1kbC1qcy1tZW51IG1kbC1qcy1yaXBwbGUtZWZmZWN0XCIgZm9yPVwiYWNjYnRuXCI+XHJcbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibWRsLW1lbnVfX2l0ZW1cIiBbcm91dGVyTGlua109XCJbJy4vUHJvZmlsZSddXCI+TXkgUHJvZmlsZTwvbGk+XHJcbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibWRsLW1lbnVfX2l0ZW1cIiAoY2xpY2spPVwibG9nb3V0KClcIj5Mb2dvdXQ8L2xpPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgPG5hdiBjbGFzcz1cImRlbW8tbmF2aWdhdGlvbiBtZGwtbmF2aWdhdGlvbiBtZGwtY29sb3ItLWJsdWUtZ3JleS04MDBcIj5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPGEgY2xhc3M9XCJtZGwtbmF2aWdhdGlvbl9fbGlua1wiIFtyb3V0ZXJMaW5rXT1cIlsnLi9EYXNoYm9hcmQnXVwiPjxpIGNsYXNzPVwibWRsLWNvbG9yLXRleHQtLWJsdWUtZ3JleS00MDAgbWF0ZXJpYWwtaWNvbnNcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+ZGFzaGJvYXJkPC9pPkRhc2hib2FyZDwvYT5cclxuICAgICAgICAgIFxyXG5cclxuICAgICAgICAgIDxhIGNsYXNzPVwibWRsLW5hdmlnYXRpb25fX2xpbmtcIiBbcm91dGVyTGlua109XCJbJy4vVGFza3MnXVwiPjxpIGNsYXNzPVwibWRsLWNvbG9yLXRleHQtLWJsdWUtZ3JleS00MDAgbWF0ZXJpYWwtaWNvbnNcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+YXNzaWdubWVudDwvaT5UYXNrczwvYT5cclxuXHJcbiAgICAgICAgICA8YSBjbGFzcz1cIm1kbC1uYXZpZ2F0aW9uX19saW5rXCIgW3JvdXRlckxpbmtdPVwiWycuL1JlcXVlc3RzJ11cIiA+PGkgY2xhc3M9XCJtZGwtY29sb3ItdGV4dC0tYmx1ZS1ncmV5LTQwMCBtYXRlcmlhbC1pY29uc1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5kZWxldGU8L2k+U2VydmljZSBSZXF1ZXN0czwvYT5cclxuXHJcbiAgICAgICAgICA8YSBjbGFzcz1cIm1kbC1uYXZpZ2F0aW9uX19saW5rXCIgW3JvdXRlckxpbmtdPVwiWycuL1BheW1lbnRzJ11cIj48aSBjbGFzcz1cIm1kbC1jb2xvci10ZXh0LS1ibHVlLWdyZXktNDAwIG1hdGVyaWFsLWljb25zXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPnJlcG9ydDwvaT5QYXltZW50czwvYT5cclxuICAgICAgICAgIDxhIGNsYXNzPVwibWRsLW5hdmlnYXRpb25fX2xpbmtcIiBbcm91dGVyTGlua109XCJbJy4vQnVzaW5lc3NSb290cyddXCI+PGkgY2xhc3M9XCJtZGwtY29sb3ItdGV4dC0tYmx1ZS1ncmV5LTQwMCBtYXRlcmlhbC1pY29uc1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5mb3J1bTwvaT5BcGFydG1lbnRzPC9hPlxyXG4gICAgICAgICAgPGEgY2xhc3M9XCJtZGwtbmF2aWdhdGlvbl9fbGlua1wiIFtyb3V0ZXJMaW5rXT1cIlsnLi9SZXNpZGVudHMnXVwiPjxpIGNsYXNzPVwibWRsLWNvbG9yLXRleHQtLWJsdWUtZ3JleS00MDAgbWF0ZXJpYWwtaWNvbnNcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+ZmxhZzwvaT5SZXNpZGVudHM8L2E+XHJcbiAgICAgICAgICA8YSBjbGFzcz1cIm1kbC1uYXZpZ2F0aW9uX19saW5rXCIgW3JvdXRlckxpbmtdPVwiWycuL0NvbW11bml0eSddXCI+PGkgY2xhc3M9XCJtZGwtY29sb3ItdGV4dC0tYmx1ZS1ncmV5LTQwMCBtYXRlcmlhbC1pY29uc1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5sb2NhbF9vZmZlcjwvaT5NeSBDb21tdW5pdHk8L2E+XHJcbiAgICAgICAgICBcclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWRsLWxheW91dC1zcGFjZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxhIGNsYXNzPVwibWRsLW5hdmlnYXRpb25fX2xpbmtcIiBocmVmPVwiXCI+PGkgY2xhc3M9XCJtZGwtY29sb3ItdGV4dC0tYmx1ZS1ncmV5LTQwMCBtYXRlcmlhbC1pY29uc1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5oZWxwX291dGxpbmU8L2k+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseWhpZGRlblwiPkhlbHA8L3NwYW4+PC9hPlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgYCxcclxuXHJcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIERhc2hib2FyZENvbXBvbmVudF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTaWRlYmFyQ29tcG9uZW50IHtcclxuXHJcbiAgdXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2ZpbGUnKSk7XHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnVzZXIgPSB0aGlzLnNlcnZpY2UucHJvZmlsZVVwZGF0ZWQkLnN1YnNjcmliZShwcm9maWxlID0+IHtcclxuICAgICAgdGhpcy51c2VyID0gcHJvZmlsZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGxvZ291dCgpIHtcclxuICAgIC8vdGhpcy51c2VyID0gdGhpcy5zZXJ2aWNlLnByb2ZpbGVVcGRhdGVkJC5zdWJzY3JpYmUocHJvZmlsZSA9PiB7IFxyXG4gICAgLy90aGlzLnVzZXIgPSBwcm9maWxlfSlcclxuICAgIHRoaXMudXNlciA9ICd1c2VyQGV4YW1wbGUuY29tJztcclxuICAgIHRoaXMuc2VydmljZS5sb2dvdXQoKTtcclxuICB9XHJcbn0gIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
