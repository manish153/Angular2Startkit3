System.register(['angular2/core', 'angular2/router', 'angular2-jwt', '../home/HomeComponent', '../about/AboutComponent', './HeaderComponent', '../login/LoginComponent', '../../services/AuthService', './SidebarComponent', './DashboardComponent', './MaterialDesignLiteUpgradeElement', './AuthRouterOutlet'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, angular2_jwt_1, HomeComponent_1, AboutComponent_1, HeaderComponent_1, LoginComponent_1, AuthService_1, SidebarComponent_1, DashboardComponent_1, MaterialDesignLiteUpgradeElement_1, AuthRouterOutlet_1;
    var AppComponent;
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
            function (HomeComponent_1_1) {
                HomeComponent_1 = HomeComponent_1_1;
            },
            function (AboutComponent_1_1) {
                AboutComponent_1 = AboutComponent_1_1;
            },
            function (HeaderComponent_1_1) {
                HeaderComponent_1 = HeaderComponent_1_1;
            },
            function (LoginComponent_1_1) {
                LoginComponent_1 = LoginComponent_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (SidebarComponent_1_1) {
                SidebarComponent_1 = SidebarComponent_1_1;
            },
            function (DashboardComponent_1_1) {
                DashboardComponent_1 = DashboardComponent_1_1;
            },
            function (MaterialDesignLiteUpgradeElement_1_1) {
                MaterialDesignLiteUpgradeElement_1 = MaterialDesignLiteUpgradeElement_1_1;
            },
            function (AuthRouterOutlet_1_1) {
                AuthRouterOutlet_1 = AuthRouterOutlet_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    router_1.RouteConfig([
                        { path: 'app/home', component: HomeComponent_1.HomeComponent, as: 'Home' },
                        { path: 'app/dashboard', component: DashboardComponent_1.DashboardComponent, as: 'Dashboard' },
                        { path: 'app/about', component: AboutComponent_1.AboutComponent, as: 'About' },
                        { path: 'app/login', component: LoginComponent_1.LoginComponent, as: 'Login' },
                        { path: 'app/**', redirectTo: ['Dashboard'] } // this redirect is not working for some reason
                    ]),
                    core_1.Component({
                        selector: 'my-app',
                        /*template: '<router-outlet></router-outlet>',*/
                        template: "\n    <body>\n    <div mdl class=\"demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header\">\n      <app-header mdl class=\"demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600\"></app-header>\n      <app-sidebar class=\"demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50\">\n      </app-sidebar>\n      <main class=\"mdl-layout__content mdl-color--grey-100\">\n         \n         <auth-router-outlet></auth-router-outlet>\n\n         \n      </main>\n    </div>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" style=\"position: fixed; left: -1000px; height: -1000px;\">\n        <defs>\n          <mask id=\"piemask\" maskContentUnits=\"objectBoundingBox\">\n            <circle cx=0.5 cy=0.5 r=0.49 fill=\"white\" />\n            <circle cx=0.5 cy=0.5 r=0.40 fill=\"black\" />\n          </mask>\n          <g id=\"piechart\">\n            <circle cx=0.5 cy=0.5 r=0.5 />\n            <path d=\"M 0.5 0.5 0.5 0 A 0.5 0.5 0 0 1 0.95 0.28 z\" stroke=\"none\" fill=\"rgba(255, 255, 255, 0.75)\" />\n          </g>\n        </defs>\n      </svg>\n      <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 500 250\" style=\"position: fixed; left: -1000px; height: -1000px;\">\n        <defs>\n          <g id=\"chart\">\n            <g id=\"Gridlines\">\n              <line fill=\"#888888\" stroke=\"#888888\" stroke-miterlimit=\"10\" x1=\"0\" y1=\"27.3\" x2=\"468.3\" y2=\"27.3\" />\n              <line fill=\"#888888\" stroke=\"#888888\" stroke-miterlimit=\"10\" x1=\"0\" y1=\"66.7\" x2=\"468.3\" y2=\"66.7\" />\n              <line fill=\"#888888\" stroke=\"#888888\" stroke-miterlimit=\"10\" x1=\"0\" y1=\"105.3\" x2=\"468.3\" y2=\"105.3\" />\n              <line fill=\"#888888\" stroke=\"#888888\" stroke-miterlimit=\"10\" x1=\"0\" y1=\"144.7\" x2=\"468.3\" y2=\"144.7\" />\n              <line fill=\"#888888\" stroke=\"#888888\" stroke-miterlimit=\"10\" x1=\"0\" y1=\"184.3\" x2=\"468.3\" y2=\"184.3\" />\n            </g>\n            <g id=\"Numbers\">\n              <text transform=\"matrix(1 0 0 1 485 29.3333)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">500</text>\n              <text transform=\"matrix(1 0 0 1 485 69)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">400</text>\n              <text transform=\"matrix(1 0 0 1 485 109.3333)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">300</text>\n              <text transform=\"matrix(1 0 0 1 485 149)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">200</text>\n              <text transform=\"matrix(1 0 0 1 485 188.3333)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">100</text>\n              <text transform=\"matrix(1 0 0 1 0 249.0003)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">1</text>\n              <text transform=\"matrix(1 0 0 1 78 249.0003)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">2</text>\n              <text transform=\"matrix(1 0 0 1 154.6667 249.0003)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">3</text>\n              <text transform=\"matrix(1 0 0 1 232.1667 249.0003)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">4</text>\n              <text transform=\"matrix(1 0 0 1 309 249.0003)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">5</text>\n              <text transform=\"matrix(1 0 0 1 386.6667 249.0003)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">6</text>\n              <text transform=\"matrix(1 0 0 1 464.3333 249.0003)\" fill=\"#888888\" font-family=\"'Roboto'\" font-size=\"9\">7</text>\n            </g>\n            <g id=\"Layer_5\">\n              <polygon opacity=\"0.36\" stroke-miterlimit=\"10\" points=\"0,223.3 48,138.5 154.7,169 211,88.5\n              294.5,80.5 380,165.2 437,75.5 469.5,223.3 \t\"/>\n            </g>\n            <g id=\"Layer_4\">\n              <polygon stroke-miterlimit=\"10\" points=\"469.3,222.7 1,222.7 48.7,166.7 155.7,188.3 212,132.7\n              296.7,128 380.7,184.3 436.7,125 \t\"/>\n            </g>\n          </g>\n        </defs>\n      </svg>\n      \n    <script src=\"https://code.getmdl.io/1.1.3/material.min.js\"></script>\n  </body>\n\n    ",
                        /*styleUrls: ['../app/assets/styles.css'], */
                        directives: [router_1.ROUTER_DIRECTIVES, SidebarComponent_1.SidebarComponent, HeaderComponent_1.HeaderComponent, MaterialDesignLiteUpgradeElement_1.MDL, AuthRouterOutlet_1.AuthRouterOutlet],
                        providers: [angular2_jwt_1.AUTH_PROVIDERS, AuthService_1.AuthService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL2FwcC9BcHBDb21wb25lbnQudHMiXSwibmFtZXMiOlsiQXBwQ29tcG9uZW50IiwiQXBwQ29tcG9uZW50LmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFnQkE7Z0JBbUZFQTtnQkFBZUMsQ0FBQ0E7Z0JBbkZsQkQ7b0JBQUNBLG9CQUFXQSxDQUFDQTt3QkFDVEEsRUFBQ0EsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsU0FBU0EsRUFBRUEsNkJBQWFBLEVBQUVBLEVBQUVBLEVBQUVBLE1BQU1BLEVBQUNBO3dCQUN4REEsRUFBQ0EsSUFBSUEsRUFBRUEsZUFBZUEsRUFBRUEsU0FBU0EsRUFBRUEsdUNBQWtCQSxFQUFFQSxFQUFFQSxFQUFFQSxXQUFXQSxFQUFDQTt3QkFDdkVBLEVBQUNBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLFNBQVNBLEVBQUVBLCtCQUFjQSxFQUFFQSxFQUFFQSxFQUFFQSxPQUFPQSxFQUFDQTt3QkFDM0RBLEVBQUNBLElBQUlBLEVBQUVBLFdBQVdBLEVBQUVBLFNBQVNBLEVBQUVBLCtCQUFjQSxFQUFFQSxFQUFFQSxFQUFFQSxPQUFPQSxFQUFDQTt3QkFDM0RBLEVBQUNBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLFVBQVVBLEVBQUVBLENBQUNBLFdBQVdBLENBQUNBLEVBQUNBLENBQUdBLCtDQUErQ0E7cUJBQ2hHQSxDQUFDQTtvQkFDREEsZ0JBQVNBLENBQUNBO3dCQUNQQSxRQUFRQSxFQUFFQSxRQUFRQTt3QkFDbEJBLGdEQUFnREE7d0JBQ2pEQSxRQUFRQSxFQUFFQSxzeElBZ0VSQTt3QkFDREEsNkNBQTZDQTt3QkFDN0NBLFVBQVVBLEVBQUVBLENBQUNBLDBCQUFpQkEsRUFBQ0EsbUNBQWdCQSxFQUFDQSxpQ0FBZUEsRUFBQ0Esc0NBQUdBLEVBQUNBLG1DQUFnQkEsQ0FBQ0E7d0JBQ3JGQSxTQUFTQSxFQUFFQSxDQUFDQSw2QkFBY0EsRUFBQ0EseUJBQVdBLENBQUNBO3FCQUMxQ0EsQ0FBQ0E7O2lDQU9EQTtnQkFBREEsbUJBQUNBO1lBQURBLENBckZBLEFBcUZDQSxJQUFBO1lBckZELHVDQXFGQyxDQUFBIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2FwcC9BcHBDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7Um91dGVyLCBSb3V0ZUNvbmZpZywgUk9VVEVSX0RJUkVDVElWRVMsQ2FuQWN0aXZhdGV9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XHJcbmltcG9ydCB7QXV0aEh0dHAsQXV0aENvbmZpZywgdG9rZW5Ob3RFeHBpcmVkLCBBVVRIX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjItand0JztcclxuXHJcblxyXG5pbXBvcnQge0hvbWVDb21wb25lbnR9IGZyb20gJy4uL2hvbWUvSG9tZUNvbXBvbmVudCdcclxuaW1wb3J0IHtBYm91dENvbXBvbmVudH0gZnJvbSAnLi4vYWJvdXQvQWJvdXRDb21wb25lbnQnXHJcbmltcG9ydCB7SGVhZGVyQ29tcG9uZW50fSBmcm9tICcuL0hlYWRlckNvbXBvbmVudCdcclxuaW1wb3J0IHtMb2dpbkNvbXBvbmVudH0gZnJvbSAnLi4vbG9naW4vTG9naW5Db21wb25lbnQnXHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL0F1dGhTZXJ2aWNlJ1xyXG5pbXBvcnQge1NpZGViYXJDb21wb25lbnR9IGZyb20gJy4vU2lkZWJhckNvbXBvbmVudCdcclxuaW1wb3J0IHtEYXNoYm9hcmRDb21wb25lbnR9IGZyb20gJy4vRGFzaGJvYXJkQ29tcG9uZW50J1xyXG5pbXBvcnQge01ETH0gZnJvbSAnLi9NYXRlcmlhbERlc2lnbkxpdGVVcGdyYWRlRWxlbWVudCdcclxuaW1wb3J0IHtBdXRoUm91dGVyT3V0bGV0fSBmcm9tICcuL0F1dGhSb3V0ZXJPdXRsZXQnXHJcblxyXG5cclxuQFJvdXRlQ29uZmlnKFtcclxuICAgIHtwYXRoOiAnYXBwL2hvbWUnLCBjb21wb25lbnQ6IEhvbWVDb21wb25lbnQsIGFzOiAnSG9tZSd9LFxyXG4gICAge3BhdGg6ICdhcHAvZGFzaGJvYXJkJywgY29tcG9uZW50OiBEYXNoYm9hcmRDb21wb25lbnQsIGFzOiAnRGFzaGJvYXJkJ30sXHJcbiAgICB7cGF0aDogJ2FwcC9hYm91dCcsIGNvbXBvbmVudDogQWJvdXRDb21wb25lbnQsIGFzOiAnQWJvdXQnfSwgICAgXHJcbiAgICB7cGF0aDogJ2FwcC9sb2dpbicsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQsIGFzOiAnTG9naW4nfSxcclxuICAgIHtwYXRoOiAnYXBwLyoqJywgcmVkaXJlY3RUbzogWydEYXNoYm9hcmQnXX0gICAvLyB0aGlzIHJlZGlyZWN0IGlzIG5vdCB3b3JraW5nIGZvciBzb21lIHJlYXNvblxyXG5dKVxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcclxuICAgIC8qdGVtcGxhdGU6ICc8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+JywqL1xyXG4gICB0ZW1wbGF0ZTogYFxyXG4gICAgPGJvZHk+XHJcbiAgICA8ZGl2IG1kbCBjbGFzcz1cImRlbW8tbGF5b3V0IG1kbC1sYXlvdXQgbWRsLWpzLWxheW91dCBtZGwtbGF5b3V0LS1maXhlZC1kcmF3ZXIgbWRsLWxheW91dC0tZml4ZWQtaGVhZGVyXCI+XHJcbiAgICAgIDxhcHAtaGVhZGVyIG1kbCBjbGFzcz1cImRlbW8taGVhZGVyIG1kbC1sYXlvdXRfX2hlYWRlciBtZGwtY29sb3ItLWdyZXktMTAwIG1kbC1jb2xvci10ZXh0LS1ncmV5LTYwMFwiPjwvYXBwLWhlYWRlcj5cclxuICAgICAgPGFwcC1zaWRlYmFyIGNsYXNzPVwiZGVtby1kcmF3ZXIgbWRsLWxheW91dF9fZHJhd2VyIG1kbC1jb2xvci0tYmx1ZS1ncmV5LTkwMCBtZGwtY29sb3ItdGV4dC0tYmx1ZS1ncmV5LTUwXCI+XHJcbiAgICAgIDwvYXBwLXNpZGViYXI+XHJcbiAgICAgIDxtYWluIGNsYXNzPVwibWRsLWxheW91dF9fY29udGVudCBtZGwtY29sb3ItLWdyZXktMTAwXCI+XHJcbiAgICAgICAgIFxyXG4gICAgICAgICA8YXV0aC1yb3V0ZXItb3V0bGV0PjwvYXV0aC1yb3V0ZXItb3V0bGV0PlxyXG5cclxuICAgICAgICAgXHJcbiAgICAgIDwvbWFpbj5cclxuICAgIDwvZGl2PlxyXG4gICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB2ZXJzaW9uPVwiMS4xXCIgc3R5bGU9XCJwb3NpdGlvbjogZml4ZWQ7IGxlZnQ6IC0xMDAwcHg7IGhlaWdodDogLTEwMDBweDtcIj5cclxuICAgICAgICA8ZGVmcz5cclxuICAgICAgICAgIDxtYXNrIGlkPVwicGllbWFza1wiIG1hc2tDb250ZW50VW5pdHM9XCJvYmplY3RCb3VuZGluZ0JveFwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PTAuNSBjeT0wLjUgcj0wLjQ5IGZpbGw9XCJ3aGl0ZVwiIC8+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9MC41IGN5PTAuNSByPTAuNDAgZmlsbD1cImJsYWNrXCIgLz5cclxuICAgICAgICAgIDwvbWFzaz5cclxuICAgICAgICAgIDxnIGlkPVwicGllY2hhcnRcIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD0wLjUgY3k9MC41IHI9MC41IC8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDAuNSAwLjUgMC41IDAgQSAwLjUgMC41IDAgMCAxIDAuOTUgMC4yOCB6XCIgc3Ryb2tlPVwibm9uZVwiIGZpbGw9XCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpXCIgLz5cclxuICAgICAgICAgIDwvZz5cclxuICAgICAgICA8L2RlZnM+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgdmlld0JveD1cIjAgMCA1MDAgMjUwXCIgc3R5bGU9XCJwb3NpdGlvbjogZml4ZWQ7IGxlZnQ6IC0xMDAwcHg7IGhlaWdodDogLTEwMDBweDtcIj5cclxuICAgICAgICA8ZGVmcz5cclxuICAgICAgICAgIDxnIGlkPVwiY2hhcnRcIj5cclxuICAgICAgICAgICAgPGcgaWQ9XCJHcmlkbGluZXNcIj5cclxuICAgICAgICAgICAgICA8bGluZSBmaWxsPVwiIzg4ODg4OFwiIHN0cm9rZT1cIiM4ODg4ODhcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgeDE9XCIwXCIgeTE9XCIyNy4zXCIgeDI9XCI0NjguM1wiIHkyPVwiMjcuM1wiIC8+XHJcbiAgICAgICAgICAgICAgPGxpbmUgZmlsbD1cIiM4ODg4ODhcIiBzdHJva2U9XCIjODg4ODg4XCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHgxPVwiMFwiIHkxPVwiNjYuN1wiIHgyPVwiNDY4LjNcIiB5Mj1cIjY2LjdcIiAvPlxyXG4gICAgICAgICAgICAgIDxsaW5lIGZpbGw9XCIjODg4ODg4XCIgc3Ryb2tlPVwiIzg4ODg4OFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiB4MT1cIjBcIiB5MT1cIjEwNS4zXCIgeDI9XCI0NjguM1wiIHkyPVwiMTA1LjNcIiAvPlxyXG4gICAgICAgICAgICAgIDxsaW5lIGZpbGw9XCIjODg4ODg4XCIgc3Ryb2tlPVwiIzg4ODg4OFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiB4MT1cIjBcIiB5MT1cIjE0NC43XCIgeDI9XCI0NjguM1wiIHkyPVwiMTQ0LjdcIiAvPlxyXG4gICAgICAgICAgICAgIDxsaW5lIGZpbGw9XCIjODg4ODg4XCIgc3Ryb2tlPVwiIzg4ODg4OFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiB4MT1cIjBcIiB5MT1cIjE4NC4zXCIgeDI9XCI0NjguM1wiIHkyPVwiMTg0LjNcIiAvPlxyXG4gICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgIDxnIGlkPVwiTnVtYmVyc1wiPlxyXG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT1cIm1hdHJpeCgxIDAgMCAxIDQ4NSAyOS4zMzMzKVwiIGZpbGw9XCIjODg4ODg4XCIgZm9udC1mYW1pbHk9XCInUm9ib3RvJ1wiIGZvbnQtc2l6ZT1cIjlcIj41MDA8L3RleHQ+XHJcbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPVwibWF0cml4KDEgMCAwIDEgNDg1IDY5KVwiIGZpbGw9XCIjODg4ODg4XCIgZm9udC1mYW1pbHk9XCInUm9ib3RvJ1wiIGZvbnQtc2l6ZT1cIjlcIj40MDA8L3RleHQ+XHJcbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPVwibWF0cml4KDEgMCAwIDEgNDg1IDEwOS4zMzMzKVwiIGZpbGw9XCIjODg4ODg4XCIgZm9udC1mYW1pbHk9XCInUm9ib3RvJ1wiIGZvbnQtc2l6ZT1cIjlcIj4zMDA8L3RleHQ+XHJcbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPVwibWF0cml4KDEgMCAwIDEgNDg1IDE0OSlcIiBmaWxsPVwiIzg4ODg4OFwiIGZvbnQtZmFtaWx5PVwiJ1JvYm90bydcIiBmb250LXNpemU9XCI5XCI+MjAwPC90ZXh0PlxyXG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT1cIm1hdHJpeCgxIDAgMCAxIDQ4NSAxODguMzMzMylcIiBmaWxsPVwiIzg4ODg4OFwiIGZvbnQtZmFtaWx5PVwiJ1JvYm90bydcIiBmb250LXNpemU9XCI5XCI+MTAwPC90ZXh0PlxyXG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT1cIm1hdHJpeCgxIDAgMCAxIDAgMjQ5LjAwMDMpXCIgZmlsbD1cIiM4ODg4ODhcIiBmb250LWZhbWlseT1cIidSb2JvdG8nXCIgZm9udC1zaXplPVwiOVwiPjE8L3RleHQ+XHJcbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPVwibWF0cml4KDEgMCAwIDEgNzggMjQ5LjAwMDMpXCIgZmlsbD1cIiM4ODg4ODhcIiBmb250LWZhbWlseT1cIidSb2JvdG8nXCIgZm9udC1zaXplPVwiOVwiPjI8L3RleHQ+XHJcbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPVwibWF0cml4KDEgMCAwIDEgMTU0LjY2NjcgMjQ5LjAwMDMpXCIgZmlsbD1cIiM4ODg4ODhcIiBmb250LWZhbWlseT1cIidSb2JvdG8nXCIgZm9udC1zaXplPVwiOVwiPjM8L3RleHQ+XHJcbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPVwibWF0cml4KDEgMCAwIDEgMjMyLjE2NjcgMjQ5LjAwMDMpXCIgZmlsbD1cIiM4ODg4ODhcIiBmb250LWZhbWlseT1cIidSb2JvdG8nXCIgZm9udC1zaXplPVwiOVwiPjQ8L3RleHQ+XHJcbiAgICAgICAgICAgICAgPHRleHQgdHJhbnNmb3JtPVwibWF0cml4KDEgMCAwIDEgMzA5IDI0OS4wMDAzKVwiIGZpbGw9XCIjODg4ODg4XCIgZm9udC1mYW1pbHk9XCInUm9ib3RvJ1wiIGZvbnQtc2l6ZT1cIjlcIj41PC90ZXh0PlxyXG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT1cIm1hdHJpeCgxIDAgMCAxIDM4Ni42NjY3IDI0OS4wMDAzKVwiIGZpbGw9XCIjODg4ODg4XCIgZm9udC1mYW1pbHk9XCInUm9ib3RvJ1wiIGZvbnQtc2l6ZT1cIjlcIj42PC90ZXh0PlxyXG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT1cIm1hdHJpeCgxIDAgMCAxIDQ2NC4zMzMzIDI0OS4wMDAzKVwiIGZpbGw9XCIjODg4ODg4XCIgZm9udC1mYW1pbHk9XCInUm9ib3RvJ1wiIGZvbnQtc2l6ZT1cIjlcIj43PC90ZXh0PlxyXG4gICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgIDxnIGlkPVwiTGF5ZXJfNVwiPlxyXG4gICAgICAgICAgICAgIDxwb2x5Z29uIG9wYWNpdHk9XCIwLjM2XCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHBvaW50cz1cIjAsMjIzLjMgNDgsMTM4LjUgMTU0LjcsMTY5IDIxMSw4OC41XHJcbiAgICAgICAgICAgICAgMjk0LjUsODAuNSAzODAsMTY1LjIgNDM3LDc1LjUgNDY5LjUsMjIzLjMgXHRcIi8+XHJcbiAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPGcgaWQ9XCJMYXllcl80XCI+XHJcbiAgICAgICAgICAgICAgPHBvbHlnb24gc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIHBvaW50cz1cIjQ2OS4zLDIyMi43IDEsMjIyLjcgNDguNywxNjYuNyAxNTUuNywxODguMyAyMTIsMTMyLjdcclxuICAgICAgICAgICAgICAyOTYuNywxMjggMzgwLjcsMTg0LjMgNDM2LjcsMTI1IFx0XCIvPlxyXG4gICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICA8L2c+XHJcbiAgICAgICAgPC9kZWZzPlxyXG4gICAgICA8L3N2Zz5cclxuICAgICAgXHJcbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vY29kZS5nZXRtZGwuaW8vMS4xLjMvbWF0ZXJpYWwubWluLmpzXCI+PC9zY3JpcHQ+XHJcbiAgPC9ib2R5PlxyXG5cclxuICAgIGAsIFxyXG4gICAgLypzdHlsZVVybHM6IFsnLi4vYXBwL2Fzc2V0cy9zdHlsZXMuY3NzJ10sICovXHJcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsU2lkZWJhckNvbXBvbmVudCxIZWFkZXJDb21wb25lbnQsTURMLEF1dGhSb3V0ZXJPdXRsZXRdLFxyXG4gICAgcHJvdmlkZXJzOiBbQVVUSF9QUk9WSURFUlMsQXV0aFNlcnZpY2VdXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7IFxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbiAgXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
