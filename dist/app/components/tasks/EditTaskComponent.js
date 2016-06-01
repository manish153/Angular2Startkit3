System.register(['angular2/core', "angular2/router", '../app/MaterialDesignLiteUpgradeElement', "../apartment/ApartmentService", "../../services/SharedService"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, MaterialDesignLiteUpgradeElement_1, ApartmentService_1, SharedService_1;
    var EditTaskComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (MaterialDesignLiteUpgradeElement_1_1) {
                MaterialDesignLiteUpgradeElement_1 = MaterialDesignLiteUpgradeElement_1_1;
            },
            function (ApartmentService_1_1) {
                ApartmentService_1 = ApartmentService_1_1;
            },
            function (SharedService_1_1) {
                SharedService_1 = SharedService_1_1;
            }],
        execute: function() {
            EditTaskComponent = (function () {
                function EditTaskComponent(apartmentService, params, sharedService) {
                    this.apartmentService = apartmentService;
                    this.sharedService = sharedService;
                    console.log('I am in Edit ' + JSON.stringify(this.sharedService.temp));
                    this.data = this.sharedService.temp;
                    console.log(JSON.stringify(this.data));
                }
                EditTaskComponent.prototype.onSubmit = function (form) {
                    //this.apartmentService.postTasks(this.data);
                };
                EditTaskComponent = __decorate([
                    core_1.Component({
                        selector: 'edit-tasks',
                        template: "<div mdl class=\"mdl-grid demo-content\">\n      \n          <div class=\"demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col\">\n                <h3>EDIT Task Page</h3>   \n\n                <form action=\"#\" (ngSubmit)=\"onSubmit()\">\n                  <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">\n                    <input class=\"mdl-textfield__input\" type=\"text\" id=\"taskname\" [(ngModel)]=\"data.taskname\"/>\n                    <label class=\"mdl-textfield__label\" for=\"taskname\">Task Name</label>\n                    \n                   </div> <br/>\n                  <div class=\"mdl-textfield mdl-js-textfield\">\n                    <textarea class=\"mdl-textfield__input\" type=\"text\" rows= \"5\" id=\"taskdesc\" [(ngModel)]=\"data.taskdesc\"></textarea>\n                    <label class=\"mdl-textfield__label\" for=\"taskdesc\">Task Description</label>\n                  </div> <br/>\n                <!--  <select [(ngModel)]=\"data.taskstatus\">\n                      <option *ngFor=\"#taskstatus of dropdownValues\" [ngValue]=\"taskstatus\">{{taskstatus}}</option>\n                  </select> -->\n      \n                <br/>  <button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" type=\"submit\">SAVE</button>\n                </form>\n          </div>\n          <div class=\"demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing\">\n            <div class=\"demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop\">\n              <div class=\"mdl-card__title mdl-card--expand mdl-color--teal-300\">\n                <h2 class=\"mdl-card__title-text\">View Tasks</h2>\n              </div>\n              <div class=\"mdl-card__supporting-text mdl-color-text--grey-600\">\n                View Existing Tasks  \n              </div>\n              <div class=\"mdl-card__actions mdl-card--border\">\n                <a [routerLink]=\"['../Tasks']\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">View All Tasks</a>\n              </div>\n            </div>\n            <div class=\"demo-separator mdl-cell--1-col\"></div>\n            <div class=\"demo-options mdl-card mdl-color--deep-purple-500 mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop\">\n              <div class=\"mdl-card__supporting-text mdl-color-text--blue-grey-50\">\n                <h3>View options</h3>\n                <ul>\n                  <li>\n                    <label for=\"chkbox1\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\">\n                      <input type=\"checkbox\" id=\"chkbox1\" class=\"mdl-checkbox__input\">\n                      <span class=\"mdl-checkbox__label\">Click per object</span>\n                    </label>\n                  </li>\n                  <li>\n                    <label for=\"chkbox2\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\">\n                      <input type=\"checkbox\" id=\"chkbox2\" class=\"mdl-checkbox__input\">\n                      <span class=\"mdl-checkbox__label\">Views per object</span>\n                    </label>\n                  </li>\n                  <li>\n                    <label for=\"chkbox3\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\">\n                      <input type=\"checkbox\" id=\"chkbox3\" class=\"mdl-checkbox__input\">\n                      <span class=\"mdl-checkbox__label\">Objects selected</span>\n                    </label>\n                  </li>\n                  <li>\n                    <label for=\"chkbox4\" class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect\">\n                      <input type=\"checkbox\" id=\"chkbox4\" class=\"mdl-checkbox__input\">\n                      <span class=\"mdl-checkbox__label\">Objects viewed</span>\n                    </label>\n                  </li>\n                </ul>\n              </div>\n              <div class=\"mdl-card__actions mdl-card--border\">\n                <a href=\"#\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-50\">Change location</a>\n                <div class=\"mdl-layout-spacer\"></div>\n                <i class=\"material-icons\">location_on</i>\n              </div>\n            </div>\n          </div>\n         </div>\n\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES, MaterialDesignLiteUpgradeElement_1.MDL]
                    }), 
                    __metadata('design:paramtypes', [ApartmentService_1.ApartmentService, router_1.RouteParams, SharedService_1.SharedService])
                ], EditTaskComponent);
                return EditTaskComponent;
            }());
            exports_1("EditTaskComponent", EditTaskComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL3Rhc2tzL0VkaXRUYXNrQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBd0ZBO2dCQUlJLDJCQUFvQixnQkFBa0MsRUFBQyxNQUFtQixFQUFXLGFBQTRCO29CQUE3RixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO29CQUErQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtvQkFDL0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7b0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFekMsQ0FBQztnQkFFRCxvQ0FBUSxHQUFSLFVBQVMsSUFBSTtvQkFFYiw2Q0FBNkM7Z0JBRTdDLENBQUM7Z0JBaEdMO29CQUFDLGdCQUFTLENBQUM7d0JBQ1AsUUFBUSxFQUFFLFlBQVk7d0JBQ3RCLFFBQVEsRUFBRSxtMklBMEVUO3dCQUNELFVBQVUsRUFBRSxDQUFDLDBCQUFpQixFQUFFLHNDQUFHLENBQUM7cUJBRXZDLENBQUM7O3FDQUFBO2dCQW1CRix3QkFBQztZQUFELENBakJBLEFBaUJDLElBQUE7WUFqQkQsaURBaUJDLENBQUEiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvdGFza3MvRWRpdFRhc2tDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVMsUm91dGVQYXJhbXN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcclxuaW1wb3J0IHtNREx9IGZyb20gJy4uL2FwcC9NYXRlcmlhbERlc2lnbkxpdGVVcGdyYWRlRWxlbWVudCc7XHJcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIENvbnRyb2xHcm91cH0gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xyXG5pbXBvcnQge0FwYXJ0bWVudFNlcnZpY2V9IGZyb20gXCIuLi9hcGFydG1lbnQvQXBhcnRtZW50U2VydmljZVwiO1xyXG5pbXBvcnQge1NoYXJlZFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9TaGFyZWRTZXJ2aWNlXCI7ICBcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdlZGl0LXRhc2tzJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBtZGwgY2xhc3M9XCJtZGwtZ3JpZCBkZW1vLWNvbnRlbnRcIj5cclxuICAgICAgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVtby1ncmFwaHMgbWRsLXNoYWRvdy0tMmRwIG1kbC1jb2xvci0td2hpdGUgbWRsLWNlbGwgbWRsLWNlbGwtLTgtY29sXCI+XHJcbiAgICAgICAgICAgICAgICA8aDM+RURJVCBUYXNrIFBhZ2U8L2gzPiAgIFxyXG5cclxuICAgICAgICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIiNcIiAobmdTdWJtaXQpPVwib25TdWJtaXQoKVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkIG1kbC10ZXh0ZmllbGQtLWZsb2F0aW5nLWxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibWRsLXRleHRmaWVsZF9faW5wdXRcIiB0eXBlPVwidGV4dFwiIGlkPVwidGFza25hbWVcIiBbKG5nTW9kZWwpXT1cImRhdGEudGFza25hbWVcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibWRsLXRleHRmaWVsZF9fbGFiZWxcIiBmb3I9XCJ0YXNrbmFtZVwiPlRhc2sgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj4gPGJyLz5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cIm1kbC10ZXh0ZmllbGRfX2lucHV0XCIgdHlwZT1cInRleHRcIiByb3dzPSBcIjVcIiBpZD1cInRhc2tkZXNjXCIgWyhuZ01vZGVsKV09XCJkYXRhLnRhc2tkZXNjXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJtZGwtdGV4dGZpZWxkX19sYWJlbFwiIGZvcj1cInRhc2tkZXNjXCI+VGFzayBEZXNjcmlwdGlvbjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PiA8YnIvPlxyXG4gICAgICAgICAgICAgICAgPCEtLSAgPHNlbGVjdCBbKG5nTW9kZWwpXT1cImRhdGEudGFza3N0YXR1c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCIjdGFza3N0YXR1cyBvZiBkcm9wZG93blZhbHVlc1wiIFtuZ1ZhbHVlXT1cInRhc2tzdGF0dXNcIj57e3Rhc2tzdGF0dXN9fTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD4gLS0+XHJcbiAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGJyLz4gIDxidXR0b24gY2xhc3M9XCJtZGwtYnV0dG9uIG1kbC1qcy1idXR0b24gbWRsLWJ1dHRvbi0tcmFpc2VkIG1kbC1idXR0b24tLWNvbG9yZWRcIiB0eXBlPVwic3VibWl0XCI+U0FWRTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVtby1jYXJkcyBtZGwtY2VsbCBtZGwtY2VsbC0tNC1jb2wgbWRsLWNlbGwtLTgtY29sLXRhYmxldCBtZGwtZ3JpZCBtZGwtZ3JpZC0tbm8tc3BhY2luZ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVtby11cGRhdGVzIG1kbC1jYXJkIG1kbC1zaGFkb3ctLTJkcCBtZGwtY2VsbCBtZGwtY2VsbC0tNC1jb2wgbWRsLWNlbGwtLTQtY29sLXRhYmxldCBtZGwtY2VsbC0tMTItY29sLWRlc2t0b3BcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWRsLWNhcmRfX3RpdGxlIG1kbC1jYXJkLS1leHBhbmQgbWRsLWNvbG9yLS10ZWFsLTMwMFwiPlxyXG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwibWRsLWNhcmRfX3RpdGxlLXRleHRcIj5WaWV3IFRhc2tzPC9oMj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWRsLWNhcmRfX3N1cHBvcnRpbmctdGV4dCBtZGwtY29sb3ItdGV4dC0tZ3JleS02MDBcIj5cclxuICAgICAgICAgICAgICAgIFZpZXcgRXhpc3RpbmcgVGFza3MgIFxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZGwtY2FyZF9fYWN0aW9ucyBtZGwtY2FyZC0tYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJy4uL1Rhc2tzJ11cIiBjbGFzcz1cIm1kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtanMtcmlwcGxlLWVmZmVjdFwiPlZpZXcgQWxsIFRhc2tzPC9hPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbW8tc2VwYXJhdG9yIG1kbC1jZWxsLS0xLWNvbFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVtby1vcHRpb25zIG1kbC1jYXJkIG1kbC1jb2xvci0tZGVlcC1wdXJwbGUtNTAwIG1kbC1zaGFkb3ctLTJkcCBtZGwtY2VsbCBtZGwtY2VsbC0tNC1jb2wgbWRsLWNlbGwtLTMtY29sLXRhYmxldCBtZGwtY2VsbC0tMTItY29sLWRlc2t0b3BcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWRsLWNhcmRfX3N1cHBvcnRpbmctdGV4dCBtZGwtY29sb3ItdGV4dC0tYmx1ZS1ncmV5LTUwXCI+XHJcbiAgICAgICAgICAgICAgICA8aDM+VmlldyBvcHRpb25zPC9oMz5cclxuICAgICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGtib3gxXCIgY2xhc3M9XCJtZGwtY2hlY2tib3ggbWRsLWpzLWNoZWNrYm94IG1kbC1qcy1yaXBwbGUtZWZmZWN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjaGtib3gxXCIgY2xhc3M9XCJtZGwtY2hlY2tib3hfX2lucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1kbC1jaGVja2JveF9fbGFiZWxcIj5DbGljayBwZXIgb2JqZWN0PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hrYm94MlwiIGNsYXNzPVwibWRsLWNoZWNrYm94IG1kbC1qcy1jaGVja2JveCBtZGwtanMtcmlwcGxlLWVmZmVjdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hrYm94MlwiIGNsYXNzPVwibWRsLWNoZWNrYm94X19pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZGwtY2hlY2tib3hfX2xhYmVsXCI+Vmlld3MgcGVyIG9iamVjdDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoa2JveDNcIiBjbGFzcz1cIm1kbC1jaGVja2JveCBtZGwtanMtY2hlY2tib3ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNoa2JveDNcIiBjbGFzcz1cIm1kbC1jaGVja2JveF9faW5wdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWRsLWNoZWNrYm94X19sYWJlbFwiPk9iamVjdHMgc2VsZWN0ZWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGtib3g0XCIgY2xhc3M9XCJtZGwtY2hlY2tib3ggbWRsLWpzLWNoZWNrYm94IG1kbC1qcy1yaXBwbGUtZWZmZWN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjaGtib3g0XCIgY2xhc3M9XCJtZGwtY2hlY2tib3hfX2lucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1kbC1jaGVja2JveF9fbGFiZWxcIj5PYmplY3RzIHZpZXdlZDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWRsLWNhcmRfX2FjdGlvbnMgbWRsLWNhcmQtLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm1kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtanMtcmlwcGxlLWVmZmVjdCBtZGwtY29sb3ItdGV4dC0tYmx1ZS1ncmV5LTUwXCI+Q2hhbmdlIGxvY2F0aW9uPC9hPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1kbC1sYXlvdXQtc3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+bG9jYXRpb25fb248L2k+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgIGAsXHJcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIE1ETF1cclxuXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRWRpdFRhc2tDb21wb25lbnQge1xyXG5cclxuICAgIGRhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwYXJ0bWVudFNlcnZpY2U6IEFwYXJ0bWVudFNlcnZpY2UscGFyYW1zOiBSb3V0ZVBhcmFtcyAsIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnSSBhbSBpbiBFZGl0ICcgK0pTT04uc3RyaW5naWZ5KHRoaXMuc2hhcmVkU2VydmljZS50ZW1wKSk7XHJcbiAgICAgIHRoaXMuZGF0YT10aGlzLnNoYXJlZFNlcnZpY2UudGVtcDtcclxuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uU3VibWl0KGZvcm0pIHtcclxuICAgIFxyXG4gICAgLy90aGlzLmFwYXJ0bWVudFNlcnZpY2UucG9zdFRhc2tzKHRoaXMuZGF0YSk7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
