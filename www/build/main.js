webpackJsonp([6],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_announcement_announcement__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventsPage = /** @class */ (function () {
    function EventsPage(navCtrl, navParams, storage, modalCtrl, events, channelProvider, ngZone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.channelProvider = channelProvider;
        this.ngZone = ngZone;
        this.announcements = [];
        this.events.subscribe("mqtt:message", function (message) {
            _this.getAnnouncements();
        });
        this.events.subscribe("network:online", function () {
            _this.getAnnouncements();
        });
    }
    EventsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading = true;
        this.subscribedChannel = null;
        this.storage.get("subscribedChannel").then(function (data) {
            console.log(data);
            _this.loading = false;
            if (data) {
                _this.subscribedChannel = data;
                _this.getAnnouncements();
            }
        });
    };
    EventsPage.prototype.getAnnouncements = function () {
        var _this = this;
        if (this.subscribedChannel) {
            this.channelProvider.getAnnouncements(this.subscribedChannel.hubId).then(function (announcements) {
                _this.ngZone.run(function () {
                    _this.announcements = _this.filterAnnouncements(announcements);
                });
                _this.storage.set("announcements", announcements);
                console.log(announcements);
            }).catch(function () {
                _this.storage.get("announcements").then(function (data) {
                    if (data) {
                        _this.ngZone.run(function () {
                            _this.announcements = _this.filterAnnouncements(data);
                        });
                    }
                });
            });
        }
    };
    EventsPage.prototype.filterAnnouncements = function (announcements) {
        var filteredAnnouncements = [];
        for (var _i = 0, announcements_1 = announcements; _i < announcements_1.length; _i++) {
            var announcement = announcements_1[_i];
            var announcementDateEnd = __WEBPACK_IMPORTED_MODULE_5_moment__(announcement.eventEnd, 'DD-MM-YYYY hh:mm A');
            var announcementDateStart = __WEBPACK_IMPORTED_MODULE_5_moment__(announcement.eventStart, 'DD-MM-YYYY hh:mm A');
            var today = __WEBPACK_IMPORTED_MODULE_5_moment__();
            if (announcementDateEnd.isAfter(today) /* && announcementDateStart.isBefore(today)*/) {
                filteredAnnouncements.push(announcement);
            }
        }
        return filteredAnnouncements;
    };
    EventsPage.prototype.openAnnouncement = function (announcement) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__modals_announcement_announcement__["a" /* AnnouncementModal */], { announcement: announcement });
        modal.present();
    };
    EventsPage.prototype.stripHtml = function (html) {
        return html.replace(/<(?:.|\n)*?>/gm, '');
    };
    EventsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-events',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\events\events.html"*/'\n\n\n<ion-content padding>\n    \n    <div class="subscribe-form" *ngIf="!subscribedChannel && !loading">\n        <div class="login-top-section signup-top-section">\n\n            <img class="logo" src="assets/imgs/logo-light.png" />\n            <h2>You are not subscribed to a channel</h2>\n        </div>  \n    </div>\n        \n    <div class="channel-feed" *ngIf="subscribedChannel && !loading">\n        \n        \n        <div class="channel-header">\n            <img src="assets/imgs/prayer.png" />\n            <h2>{{subscribedChannel.channelName}}</h2>\n        </div>\n        \n        <div class="channel-items">\n            <ion-row class="channel-item" *ngFor="let announcement of announcements" (click)="openAnnouncement(announcement)">\n                <ion-col col-4>{{announcement.title}}</ion-col>\n                <ion-col col-6>{{stripHtml(announcement.message)}}</ion-col>\n                <ion-col col-2>\n                    \n                    <ion-icon ios=\'ios-arrow-forward\' md=\'ios-arrow-forward\'></ion-icon>                    \n                    \n                </ion-col>\n            </ion-row>\n        </div>\n        \n    </div>        \n        \n        \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\events\events.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__["a" /* ChannelProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__["a" /* ChannelProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _g || Object])
    ], EventsPage);
    return EventsPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=events.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(navCtrl, navParams, authProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.user = { email: "" };
        this.properties = { loading: false, error: "" };
    }
    ForgotPasswordPage.prototype.signup = function () {
        var _this = this;
        this.properties.loading = true;
        this.properties.error = "";
        this.authProvider.resetPassword(this.user).then(function (token) {
            _this.properties.loading = false;
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
            _this.navCtrl.popToRoot();
        }).catch(function (e) {
            _this.properties.loading = false;
            console.log(e);
            _this.properties.error = e.error;
        });
    };
    ForgotPasswordPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ForgotPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotPasswordPage');
    };
    ForgotPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forgot-password',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\forgot-password\forgot-password.html"*/'<ion-content>\n    \n    <div class="signup-back">\n        <button ion-button clear navPop color="light">\n            <span ion-text showWhen="ios">Cancel</span>\n            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </div>\n    \n    <div class="login-top-section signup-top-section">\n\n        <img class="logo" src="/assets/imgs/logo-light.png" />\n        <h2>Reset Password</h2>\n    </div>\n\n\n\n    \n    \n    <ion-list class="login-form" ion-card>\n\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="mail"></ion-icon> \n                Email\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="reset()" [disabled]="properties.loading">\n            Reset \n            <ion-icon *ngIf="!properties.loading" name="arrow-round-forward"></ion-icon>\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n   \n        \n        \n    </ion-list>\n    \n\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\forgot-password\forgot-password.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _c || Object])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_terms_conditions_terms_conditions__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignUpPage = /** @class */ (function () {
    function SignUpPage(navCtrl, navParams, authProvider, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.modalCtrl = modalCtrl;
        this.user = { appUserName: "", email: "", password: "", verifyPassword: "", mobile: "" };
        this.properties = { loading: false, error: "" };
    }
    SignUpPage.prototype.signup = function () {
        var _this = this;
        this.properties.loading = true;
        this.properties.error = "";
        if (this.user.password !== this.user.verifyPassword) {
            this.properties.loading = false;
            this.properties.error = "Password do not match";
            return;
        }
        delete this.user.verifyPassword;
        this.authProvider.register(this.user).then(function (data) {
            _this.doLogin();
        }).catch(function (e) {
            _this.properties.loading = false;
            console.log(e);
            if (e && e.status === 201) {
                _this.doLogin();
            }
            _this.properties.error = "There was an error";
        });
    };
    SignUpPage.prototype.doLogin = function () {
        var _this = this;
        this.authProvider.login(this.user).then(function (user) {
            _this.properties.loading = false;
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
            _this.navCtrl.popToRoot();
        }).catch(function (e) {
            _this.properties.loading = false;
            _this.properties.error = "Could not login";
        });
    };
    SignUpPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    SignUpPage.prototype.openTos = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_terms_conditions_terms_conditions__["a" /* TermsConditionsModal */]);
        modal.present();
    };
    SignUpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
    };
    SignUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sign-up',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\sign-up\sign-up.html"*/'<ion-content>\n    \n    \n    <div class="signup-back">\n        <button ion-button clear navPop color="light">\n            <span ion-text showWhen="ios">Cancel</span>\n            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </div>   \n    \n    \n    <div class="login-top-section signup-top-section">\n\n        <img class="logo" src="assets/imgs/logo-light.png" />\n        <h2>Sign Up</h2>\n    </div>\n\n\n\n    \n    \n    <ion-list class="login-form" ion-card>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="person"></ion-icon> \n                Name\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.appUserName"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="mail"></ion-icon> \n                Email\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="call"></ion-icon> \n                Phone Number\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.mobile"></ion-input>\n        </ion-item>        \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="key"></ion-icon> \n                Password\n            </ion-label>\n            <ion-input clearInput type="password" [(ngModel)]="user.password"></ion-input>\n        </ion-item>        \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="key"></ion-icon> \n                Verify Password\n            </ion-label>\n            <ion-input clearInput type="password" [(ngModel)]="user.verifyPassword"></ion-input>\n        </ion-item>\n        \n        <p class="forgot-password sign-up-tos">By proceeding, you agree to our <a (click)="openTos()">Terms & Conditions</a></p>\n        \n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="signup()" [disabled]="properties.loading">\n            Continue \n            <ion-icon *ngIf="!properties.loading" name="arrow-round-forward"></ion-icon>\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n   \n        \n        \n    </ion-list>\n    \n\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\sign-up\sign-up.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]) === "function" && _d || Object])
    ], SignUpPage);
    return SignUpPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, authProvider, storage, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.user = { appUserName: "", email: "", mobile: "", password: "" };
        this.properties = { loading: false, error: "" };
        this.storage.get("user").then(function (data) {
            if (data) {
                console.log(data);
                //this.user.userId = data.userId;
                _this.user.appUserName = data.appUserName;
                _this.user.email = data.email;
                _this.user.mobile = data.mobile;
                _this.user.password = "";
            }
        });
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.save = function () {
        var _this = this;
        this.properties.loading = true;
        var user = JSON.parse(JSON.stringify(this.user));
        if (!user.password) {
            delete user.password;
        }
        this.authProvider.updateUser(user).then(function (data) {
            _this.properties.loading = false;
            var alert = _this.alertCtrl.create({
                title: 'Success',
                message: 'Your user details have been updated',
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
            //popup
        }).catch(function (e) {
            _this.properties.loading = false;
            console.log(e);
            _this.properties.error = e.error.message;
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\settings\settings.html"*/'<ion-content>\n    \n    \n    <ion-list class="login-form" ion-card>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="person"></ion-icon> \n                Name\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.appUserName"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="mail"></ion-icon> \n                Email\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="call"></ion-icon> \n                Phone Number\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.mobile"></ion-input>\n        </ion-item>        \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="key"></ion-icon> \n                Password\n            </ion-label>\n            <ion-input clearInput type="password" [(ngModel)]="user.password"></ion-input>\n        </ion-item> \n        \n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="save()" [disabled]="properties.loading">\n            Save\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n   \n        \n        \n    </ion-list>    \n    \n    \n    \n\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object])
    ], SettingsPage);
    return SettingsPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FeedbackPage = /** @class */ (function () {
    function FeedbackPage(navCtrl, navParams, feedbackProvider, alertCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.feedbackProvider = feedbackProvider;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.feedback = { userEmail: "", message: "" };
        this.properties = { loading: false, error: "" };
        this.storage.get("user").then(function (data) {
            if (data) {
                console.log(data);
                _this.feedback.userEmail = data.email;
            }
        });
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
    };
    FeedbackPage.prototype.send = function () {
        var _this = this;
        this.properties.loading = true;
        this.feedbackProvider.sendFeedback(this.feedback).then(function () {
            _this.properties.loading = false;
            var alert = _this.alertCtrl.create({
                title: 'Success',
                message: 'Your feedback has been sent',
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
            //popup
        }).catch(function (e) {
            _this.properties.loading = false;
            console.log(e);
            _this.properties.error = e.error;
        });
    };
    FeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feedback',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\feedback\feedback.html"*/'<ion-content padding>\n    \n    <p class="module-description">Provide feedback for us by filling out the form below.</p>\n    \n    <ion-list class="login-form" ion-card>\n\n      \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="thumbs-up"></ion-icon> \n                Feedback Message\n            </ion-label>\n            <ion-textarea [(ngModel)]="feedback.message"></ion-textarea>\n        </ion-item> \n        \n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="send()" [disabled]="properties.loading">\n            Send\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n   \n        \n        \n    </ion-list>      \n    \n    \n    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\feedback\feedback.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__["a" /* FeedbackProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__["a" /* FeedbackProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _e || Object])
    ], FeedbackPage);
    return FeedbackPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 127;

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/events/events.module": [
		424,
		5
	],
	"../pages/feedback/feedback.module": [
		426,
		4
	],
	"../pages/forgot-password/forgot-password.module": [
		425,
		3
	],
	"../pages/login/login.module": [
		427,
		2
	],
	"../pages/settings/settings.module": [
		428,
		1
	],
	"../pages/sign-up/sign-up.module": [
		429,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 169;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AnnouncementModal = /** @class */ (function () {
    function AnnouncementModal(platform, params, viewCtrl, iab) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.iab = iab;
        this.announcement = params.data.announcement;
    }
    AnnouncementModal.prototype.openAttachment = function (url) {
        this.iab.create(url, "_system");
    };
    AnnouncementModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AnnouncementModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'announcement',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\modals\announcement\announcement.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            {{announcement ? announcement.title : "Announcement"}}\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content class=\'standard-background\' padding>\n    <div [innerHtml]="announcement.message"></div>\n    \n    <div class="attachment" *ngIf="announcement.attachementData">\n        \n        <button ion-button color=\'primary\' round class="subscribe-button" (click)="openAttachment(announcement.attachementData)">\n            <ion-icon name="attach"></ion-icon> \n            View Attachment\n        </button>          \n        \n    </div>\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\modals\announcement\announcement.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _d || Object])
    ], AnnouncementModal);
    return AnnouncementModal;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=announcement.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_country_country__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_connection_connection__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PrayerPage = /** @class */ (function () {
    function PrayerPage(navCtrl, platform, countryProvider, channelProvider, alertCtrl, storage, events, localNotifications, ngZone, connectionProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.countryProvider = countryProvider;
        this.channelProvider = channelProvider;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.events = events;
        this.localNotifications = localNotifications;
        this.ngZone = ngZone;
        this.connectionProvider = connectionProvider;
        this.connectionStatus = true;
        this.loading = true;
        this.subscription = { cityId: "", hubId: "" };
        this.cities = [];
        this.regions = [];
        this.region = "";
        this.channels = [];
        this.prayerTimes = [];
        this.getCountries();
        this.storage.get("subscribedChannel").then(function (data) {
            _this.loading = false;
            if (data) {
                console.log(data);
                _this.subscribedChannel = data;
                _this.getSalatTimes();
            }
        });
        this.storage.get("subscription").then(function (data) {
            if (data) {
                console.log(data);
                _this.subscription = data;
            }
        });
        this.user = { appUserName: "", email: "", mobile: "", password: "" };
        this.storage.get("user").then(function (data) {
            if (data) {
                console.log(data);
                _this.user.userId = data.userId;
                _this.user.appUserName = data.appUserName;
                _this.user.email = data.email;
                _this.user.mobile = data.mobile;
                _this.user.password = "";
            }
        });
        this.events.subscribe("mqtt:message", function () {
            _this.getSalatTimes();
        });
        this.events.subscribe("network:online", function () {
            _this.getSalatTimes();
            _this.getCountries();
        });
        this.connectionStatus = this.connectionProvider.getConnectionStatus();
        console.log(this.connectionStatus);
        this.events.subscribe("network:offline", function () {
            console.log("here");
            _this.connectionStatus = false;
        });
        this.events.subscribe("network:online", function () {
            console.log("here");
            _this.connectionStatus = true;
        });
        this.platform.resume.subscribe(function () {
            _this.connectionStatus = _this.connectionProvider.getConnectionStatus();
        });
    }
    PrayerPage.prototype.ionViewDidEnter = function () {
        this.getSalatTimes();
        this.connectionStatus = this.connectionProvider.getConnectionStatus();
    };
    PrayerPage.prototype.getSalatTimes = function () {
        var _this = this;
        if (this.subscribedChannel) {
            this.channelProvider.getSalatTimes(this.subscribedChannel.hubId).then(function (times) {
                _this.ngZone.run(function () {
                    _this.prayerTimes = _this.filterPrayers(times);
                });
                _this.storage.set("salatTimes", times);
                _this.generateNotifications();
            }).catch(function () {
                _this.storage.get("salatTimes").then(function (data) {
                    if (data) {
                        _this.ngZone.run(function () {
                            _this.prayerTimes = _this.filterPrayers(data);
                        });
                        _this.generateNotifications();
                    }
                });
            });
        }
    };
    PrayerPage.prototype.filterPrayers = function (prayerTimes) {
        var filteredPrayers = [];
        for (var _i = 0, prayerTimes_1 = prayerTimes; _i < prayerTimes_1.length; _i++) {
            var prayer = prayerTimes_1[_i];
            var prayerExpiry = __WEBPACK_IMPORTED_MODULE_5_moment__(prayer.expireDateTime, 'DD-MM-YYYY');
            var prayerStart = __WEBPACK_IMPORTED_MODULE_5_moment__(prayer.activateDateTime, 'DD-MM-YYYY');
            var today = __WEBPACK_IMPORTED_MODULE_5_moment__();
            if (prayerExpiry.isAfter(today) && prayerStart.isBefore(today)) {
                filteredPrayers.push(prayer);
            }
        }
        return filteredPrayers;
    };
    PrayerPage.prototype.generateNotifications = function () {
        var _this = this;
        console.log(this.prayerTimes);
        if (!this.platform.is("cordova")) {
            return;
        }
        this.localNotifications.getScheduledIds().then(function (ids) {
            _this.localNotifications.cancel(ids);
        });
        var id = 2;
        for (var _i = 0, _a = this.prayerTimes; _i < _a.length; _i++) {
            var prayer = _a[_i];
            var prayerTime = __WEBPACK_IMPORTED_MODULE_5_moment__((prayer.activateDateTime + " " + prayer.adzanTime), 'DD-MM-YYYY hh:mm A');
            var prayerTime2 = __WEBPACK_IMPORTED_MODULE_5_moment__((prayer.activateDateTime + " " + prayer.ikhamaTime), 'DD-MM-YYYY hh:mm A');
            var prayerExpiry = __WEBPACK_IMPORTED_MODULE_5_moment__((prayer.expireDateTime + " " + prayer.adzanTime), 'DD-MM-YYYY hh:mm A');
            var days = prayerExpiry.diff(prayerTime, 'days') + 1;
            var today = __WEBPACK_IMPORTED_MODULE_5_moment__();
            for (var i = 0; i < days; i++) {
                if (prayerTime.isAfter(today)) {
                    this.localNotifications.schedule({
                        id: id,
                        title: prayer.prayerName + " prayer (Adzan)",
                        text: "Starts at " + prayer.adzanTime.trim(),
                        at: new Date(prayerTime.year(), prayerTime.month(), prayerTime.date(), prayerTime.hour(), prayerTime.minutes())
                    });
                    id++;
                }
                if (prayerTime2.isAfter(today)) {
                    this.localNotifications.schedule({
                        id: id,
                        title: prayer.prayerName + " prayer (Ikhama)",
                        text: "Starts at " + prayer.ikhamaTime.trim(),
                        at: new Date(prayerTime2.year(), prayerTime2.month(), prayerTime2.date(), prayerTime2.hour(), prayerTime2.minutes())
                    });
                    id++;
                }
                prayerTime.add(1, 'days');
                prayerTime2.add(1, 'days');
            }
            console.log(prayerTime);
        }
    };
    PrayerPage.prototype.getCountries = function () {
        var _this = this;
        this.countryProvider.getCountries().then(function (data) {
            console.log(data[0].regionsList);
            _this.regions = data[0].regionsList;
        }).catch(function () {
        });
    };
    PrayerPage.prototype.getCities = function () {
        for (var _i = 0, _a = this.regions; _i < _a.length; _i++) {
            var region = _a[_i];
            console.log(region.regionId);
            console.log(this.region);
            if (parseInt(region.regionId) === parseInt(this.region)) {
                console.log(region.citiesList);
                this.cities = region.citiesList;
            }
        }
    };
    PrayerPage.prototype.getChannels = function () {
        var _this = this;
        this.channels = [];
        this.channelProvider.getChannels(this.subscription.cityId).then(function (data) {
            console.log(data);
            _this.channels = data;
        }).catch(function () {
        });
    };
    PrayerPage.prototype.selectChannel = function (channel) {
        var _this = this;
        this.subscription.hubId = channel.hubId;
        var alert = this.alertCtrl.create({
            title: 'Subscribe',
            message: 'Are you sure you want to subscribe to this channel?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.storage.set("subscription", _this.subscription);
                        console.log(channel);
                        _this.storage.set("subscribedChannel", channel);
                        setTimeout(function () {
                            _this.subscribedChannel = channel;
                        }, 500);
                        _this.channelProvider.subscribe(_this.user.email, channel.hubId).then(function (data) {
                            console.log(data);
                            var id = data["subscriberId"];
                            _this.subscription.subscriberId = id;
                            _this.storage.set("subscription", _this.subscription);
                            _this.events.publish("channel:subscribed", channel.hubId);
                            _this.getSalatTimes();
                        }).catch(function () {
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    PrayerPage.prototype.unsubscribe = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Unsubscribe',
            message: 'Are you sure you want to unsubscribe from this channel?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.storage.remove("subscription");
                        _this.storage.remove("subscribedChannel");
                        _this.subscribedChannel = null;
                        var id = _this.subscription["subscriptionId"];
                        var hubId = _this.subscription["hubId"];
                        console.log(id);
                        console.log(_this.subscription);
                        _this.channelProvider.unsubscribe(id).then(function (data) {
                            console.log(data);
                            _this.events.publish("channel:unsubscribed", hubId);
                            _this.subscription = { cityId: "", hubId: "" };
                        }).catch(function () {
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    PrayerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-prayer',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\prayer\prayer.html"*/'\n\n<ion-content padding>\n    \n    <div class="offline-status" *ngIf="!connectionStatus">\n        <ion-spinner></ion-spinner>\n        Checking for internet connection...    \n    </div>    \n    \n    <div class="subscribe-form" *ngIf="!subscribedChannel && !loading">\n        <div class="login-top-section signup-top-section">\n\n            <img class="logo" src="assets/imgs/logo-light.png" />\n            <h2>Please choose your location</h2>\n        </div>    \n\n        <ion-list class="login-form" ion-card>\n            \n            <ion-item>\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    Region\n                </ion-label>\n                <ion-select [(ngModel)]="region" (ionChange)="getCities()">\n                    <ion-option value="{{region.regionId}}" *ngFor="let region of regions">{{region.regionName}}</ion-option>\n                </ion-select>\n            </ion-item>        \n            \n\n            <ion-item *ngIf="region">\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    City\n                </ion-label>\n                <ion-select [(ngModel)]="subscription.cityId" (ionChange)="getChannels()">\n                    <ion-option value="{{city.cityId}}" *ngFor="let city of cities">{{city.cityName}}</ion-option>\n                </ion-select>\n            </ion-item>\n           \n\n        </ion-list>\n    \n        <div class="choose-channel" *ngIf="subscription.cityId">\n            <h2>Please choose your channel</h2>\n\n            <div class="channels">\n                <button ion-button  *ngFor="let channel of channels" [outline]="subscription.hubId !== channel.hubId" color=\'light\' round class="subscribe-button" (click)="selectChannel(channel)">\n                    <ion-icon name="heart"></ion-icon> \n                    {{channel.channelName}}\n                </button>                    \n            </div>\n        \n        </div>\n        \n    </div>\n    \n    \n    \n    <div class="channel-feed" *ngIf="subscribedChannel && !loading">\n        \n\n        <div class="channel-header">\n            <img src="assets/imgs/prayer.png" />\n            <h2>{{subscribedChannel.channelName}}</h2>\n        </div>\n        \n        <div class="channel-items">\n            \n            <ion-row class="channel-item channel-headers">\n                <ion-col>Prayer</ion-col>\n                <ion-col>Adzan Time</ion-col>\n                <ion-col>Ikhama Time</ion-col>\n            </ion-row>            \n            \n            <ion-row class="channel-item" *ngFor="let prayerTime of prayerTimes">\n                <ion-col>{{prayerTime.prayerName}}</ion-col>\n                <ion-col>{{prayerTime.adzanTime}}</ion-col>\n                <ion-col>{{prayerTime.ikhamaTime}}</ion-col>\n            </ion-row>\n        </div>\n\n        \n        <div class="channel-unsubscribe">\n        <button ion-button color=\'light\' outline round class="unsubscribe-button" (click)="unsubscribe()">\n            <ion-icon name="notifications-off"></ion-icon> Unsubscribe\n        </button>            \n        </div>\n        \n    </div>\n    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\prayer\prayer.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_country_country__["a" /* CountryProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_country_country__["a" /* CountryProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__["a" /* ChannelProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__["a" /* ChannelProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_7__providers_connection_connection__["a" /* ConnectionProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_connection_connection__["a" /* ConnectionProvider */]) === "function" && _k || Object])
    ], PrayerPage);
    return PrayerPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=prayer.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connection_connection__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the CountryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CountryProvider = /** @class */ (function () {
    function CountryProvider(http, connectionProvider) {
        this.http = http;
        this.connectionProvider = connectionProvider;
        console.log('Hello CountryProvider Provider');
    }
    CountryProvider.prototype.getCountries = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/countries").subscribe(function (res) {
                _this.connectionProvider.setConnectionStatus(true);
                resolve(res);
            }, function (e) {
                console.log(e);
                if (e && e.status === 0) {
                    _this.connectionProvider.setConnectionStatus(false);
                }
                reject(e);
            });
        });
    };
    CountryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_connection_connection__["a" /* ConnectionProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_connection_connection__["a" /* ConnectionProvider */]) === "function" && _b || Object])
    ], CountryProvider);
    return CountryProvider;
    var _a, _b;
}());

//# sourceMappingURL=country.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the FeedbackProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FeedbackProvider = /** @class */ (function () {
    function FeedbackProvider(http, storage, connectionProvider) {
        this.http = http;
        this.storage = storage;
        this.connectionProvider = connectionProvider;
        console.log('Hello FeedbackProvider Provider');
    }
    FeedbackProvider.prototype.sendFeedback = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/secured/feedbacks/submit", data, { headers: headers }).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
            });
        });
    };
    FeedbackProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__["a" /* ConnectionProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__["a" /* ConnectionProvider */]) === "function" && _c || Object])
    ], FeedbackProvider);
    return FeedbackProvider;
    var _a, _b, _c;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsConditionsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TermsConditionsModal = /** @class */ (function () {
    function TermsConditionsModal(platform, params, viewCtrl) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
    }
    TermsConditionsModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    TermsConditionsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'terms-conditions',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\modals\terms-conditions\terms-conditions.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Terms & Conditions\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content class=\'standard-background\' padding>\n    <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id erat sit amet leo blandit tristique nec eu leo. Nulla est risus, consectetur vel molestie eget, euismod ut urna. Integer auctor pretium pellentesque. Nullam porta, metus vel facilisis gravida, enim mi malesuada neque, et sagittis est ex vitae neque. Ut at rutrum ligula. Aliquam vel feugiat augue. Morbi sodales porta auctor. Proin rhoncus sapien mi, ac fringilla nisl vulputate eget. Phasellus consectetur augue nunc, a scelerisque sapien tempus sed. Ut pulvinar euismod elementum. Ut libero augue, luctus a faucibus nec, imperdiet porttitor risus. Curabitur eu lacus sollicitudin mi congue iaculis. Nunc tempus nulla a ligula iaculis, a sollicitudin turpis aliquet.\n    </p>\n    \n    <p>\nMorbi pellentesque lobortis ligula, at euismod nulla convallis scelerisque. Nulla ullamcorper tortor aliquet, sollicitudin nibh ac, scelerisque sapien. Maecenas efficitur ligula in erat congue, quis cursus orci ornare. Donec sed magna dapibus, finibus nisl nec, faucibus nunc. Ut porta sit amet diam at sollicitudin. Ut hendrerit magna vitae nisl dignissim, eget venenatis purus ornare. Nulla commodo ante a interdum porta. Pellentesque dui enim, tempus sed nunc nec, pulvinar efficitur orci. Ut non imperdiet erat, et fringilla odio. Nulla porta facilisis malesuada. Morbi sed arcu justo. Cras elementum mollis ipsum, et pretium mi congue nec.\n   </p>\n<p>\nCras hendrerit felis vel blandit mattis. Integer pellentesque tristique tristique. Phasellus sed lorem tellus. Donec tristique sit amet arcu nec luctus. Maecenas eu ipsum quis nibh faucibus malesuada. Nam lectus turpis, finibus sit amet sapien vel, malesuada hendrerit sem. Nulla tincidunt justo varius diam sagittis, et ornare risus pulvinar. Cras eu faucibus mi. Maecenas non dui eget ex varius semper. Aenean at efficitur massa.\n       </p>\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\modals\terms-conditions\terms-conditions.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]) === "function" && _c || Object])
    ], TermsConditionsModal);
    return TermsConditionsModal;
    var _a, _b, _c;
}());

//# sourceMappingURL=terms-conditions.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthenticationProvider = /** @class */ (function () {
    function AuthenticationProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        console.log('Hello AuthenticationProvider Provider');
    }
    AuthenticationProvider.prototype.login = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/users/appsignin", data).subscribe(function (res) {
                res["password"] = data["password"];
                _this.storage.set("user", res).then(function () {
                    //this.events.publish("user:loggedin");  
                });
                resolve(res);
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.register = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/users/appsignup", data).subscribe(function (res) {
                resolve(res);
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.resetPassword = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/users/forgotpassword", data).subscribe(function (res) {
                resolve(res);
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.clear().then(function () {
                resolve();
            }, function (e) {
                reject(e);
            });
        });
    };
    AuthenticationProvider.prototype.updateUser = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/users/secured/changeappprofile", data, { headers: headers }).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
            });
        });
    };
    AuthenticationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _b || Object])
    ], AuthenticationProvider);
    return AuthenticationProvider;
    var _a, _b;
}());

//# sourceMappingURL=authentication.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(363);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_prayer_prayer__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_events_events__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_feedback_feedback__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tabs_tabs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_terms_conditions_terms_conditions__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modals_announcement_announcement__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_authentication_authentication__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_country_country__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_channel_channel__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_feedback_feedback__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_connection_connection__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_geolocation__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_local_notifications__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_background_mode__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_in_app_browser__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_network__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_prayer_prayer__["a" /* PrayerPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_events_events__["a" /* EventsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__modals_terms_conditions_terms_conditions__["a" /* TermsConditionsModal */],
                __WEBPACK_IMPORTED_MODULE_15__modals_announcement_announcement__["a" /* AnnouncementModal */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/events/events.module#EventsPageModule', name: 'EventsPage', segment: 'events', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'FeedbackPage', segment: 'feedback', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sign-up/sign-up.module#SignUpPageModule', name: 'SignUpPage', segment: 'sign-up', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_prayer_prayer__["a" /* PrayerPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_events_events__["a" /* EventsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__modals_terms_conditions_terms_conditions__["a" /* TermsConditionsModal */],
                __WEBPACK_IMPORTED_MODULE_15__modals_announcement_announcement__["a" /* AnnouncementModal */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_authentication_authentication__["a" /* AuthenticationProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_country_country__["a" /* CountryProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_channel_channel__["a" /* ChannelProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_feedback_feedback__["a" /* FeedbackProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_connection_connection__["a" /* ConnectionProvider */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_network__["a" /* Network */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sign_up_sign_up__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, authProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.user = { appUserName: "", email: "", password: "", mobile: "" };
        this.properties = { loading: false, error: "" };
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.properties.loading = true;
        this.properties.error = "";
        this.authProvider.login(this.user).then(function (user) {
            _this.properties.loading = false;
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
            _this.navCtrl.popToRoot();
        }).catch(function (e) {
            _this.properties.loading = false;
            _this.properties.error = e.error;
            console.log(e);
        });
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__sign_up_sign_up__["a" /* SignUpPage */]);
    };
    LoginPage.prototype.forgotPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\login\login.html"*/'<ion-content>\n    \n    <div class="login-top-section">\n\n        <img class="logo" src="assets/imgs/logo-light.png" />\n\n    </div>\n\n\n\n    \n    \n    <form ion-list class="login-form" ion-card (ngSubmit)="login()">\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="mail"></ion-icon> \n                Email\n            </ion-label>\n            <ion-input clearInput type="text" name="username" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="key"></ion-icon> \n                Password\n            </ion-label>\n            <ion-input clearInput type="password" name="password" [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n        \n        <p class="forgot-password"><a (click)="forgotPassword()">Forgot your password?</a></p>\n        \n        <button ion-button full color=\'light\' round class="login-button" (click)="login()" [disabled]="properties.loading">\n            <ion-icon *ngIf="!properties.loading" name="log-in"></ion-icon>\n            <ion-spinner *ngIf="properties.loading" color=\'primary\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        <p class="sign-up">Don\'t have an account? <a (click)="signup()">Sign Up!</a></p>\n   \n        \n        \n    </form>\n    \n\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _c || Object])
    ], LoginPage);
    return LoginPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 174,
	"./af.js": 174,
	"./ar": 175,
	"./ar-dz": 176,
	"./ar-dz.js": 176,
	"./ar-kw": 177,
	"./ar-kw.js": 177,
	"./ar-ly": 178,
	"./ar-ly.js": 178,
	"./ar-ma": 179,
	"./ar-ma.js": 179,
	"./ar-sa": 180,
	"./ar-sa.js": 180,
	"./ar-tn": 181,
	"./ar-tn.js": 181,
	"./ar.js": 175,
	"./az": 182,
	"./az.js": 182,
	"./be": 183,
	"./be.js": 183,
	"./bg": 184,
	"./bg.js": 184,
	"./bm": 185,
	"./bm.js": 185,
	"./bn": 186,
	"./bn.js": 186,
	"./bo": 187,
	"./bo.js": 187,
	"./br": 188,
	"./br.js": 188,
	"./bs": 189,
	"./bs.js": 189,
	"./ca": 190,
	"./ca.js": 190,
	"./cs": 191,
	"./cs.js": 191,
	"./cv": 192,
	"./cv.js": 192,
	"./cy": 193,
	"./cy.js": 193,
	"./da": 194,
	"./da.js": 194,
	"./de": 195,
	"./de-at": 196,
	"./de-at.js": 196,
	"./de-ch": 197,
	"./de-ch.js": 197,
	"./de.js": 195,
	"./dv": 198,
	"./dv.js": 198,
	"./el": 199,
	"./el.js": 199,
	"./en-au": 200,
	"./en-au.js": 200,
	"./en-ca": 201,
	"./en-ca.js": 201,
	"./en-gb": 202,
	"./en-gb.js": 202,
	"./en-ie": 203,
	"./en-ie.js": 203,
	"./en-il": 204,
	"./en-il.js": 204,
	"./en-nz": 205,
	"./en-nz.js": 205,
	"./eo": 206,
	"./eo.js": 206,
	"./es": 207,
	"./es-do": 208,
	"./es-do.js": 208,
	"./es-us": 209,
	"./es-us.js": 209,
	"./es.js": 207,
	"./et": 210,
	"./et.js": 210,
	"./eu": 211,
	"./eu.js": 211,
	"./fa": 212,
	"./fa.js": 212,
	"./fi": 213,
	"./fi.js": 213,
	"./fo": 214,
	"./fo.js": 214,
	"./fr": 215,
	"./fr-ca": 216,
	"./fr-ca.js": 216,
	"./fr-ch": 217,
	"./fr-ch.js": 217,
	"./fr.js": 215,
	"./fy": 218,
	"./fy.js": 218,
	"./gd": 219,
	"./gd.js": 219,
	"./gl": 220,
	"./gl.js": 220,
	"./gom-latn": 221,
	"./gom-latn.js": 221,
	"./gu": 222,
	"./gu.js": 222,
	"./he": 223,
	"./he.js": 223,
	"./hi": 224,
	"./hi.js": 224,
	"./hr": 225,
	"./hr.js": 225,
	"./hu": 226,
	"./hu.js": 226,
	"./hy-am": 227,
	"./hy-am.js": 227,
	"./id": 228,
	"./id.js": 228,
	"./is": 229,
	"./is.js": 229,
	"./it": 230,
	"./it.js": 230,
	"./ja": 231,
	"./ja.js": 231,
	"./jv": 232,
	"./jv.js": 232,
	"./ka": 233,
	"./ka.js": 233,
	"./kk": 234,
	"./kk.js": 234,
	"./km": 235,
	"./km.js": 235,
	"./kn": 236,
	"./kn.js": 236,
	"./ko": 237,
	"./ko.js": 237,
	"./ky": 238,
	"./ky.js": 238,
	"./lb": 239,
	"./lb.js": 239,
	"./lo": 240,
	"./lo.js": 240,
	"./lt": 241,
	"./lt.js": 241,
	"./lv": 242,
	"./lv.js": 242,
	"./me": 243,
	"./me.js": 243,
	"./mi": 244,
	"./mi.js": 244,
	"./mk": 245,
	"./mk.js": 245,
	"./ml": 246,
	"./ml.js": 246,
	"./mn": 247,
	"./mn.js": 247,
	"./mr": 248,
	"./mr.js": 248,
	"./ms": 249,
	"./ms-my": 250,
	"./ms-my.js": 250,
	"./ms.js": 249,
	"./mt": 251,
	"./mt.js": 251,
	"./my": 252,
	"./my.js": 252,
	"./nb": 253,
	"./nb.js": 253,
	"./ne": 254,
	"./ne.js": 254,
	"./nl": 255,
	"./nl-be": 256,
	"./nl-be.js": 256,
	"./nl.js": 255,
	"./nn": 257,
	"./nn.js": 257,
	"./pa-in": 258,
	"./pa-in.js": 258,
	"./pl": 259,
	"./pl.js": 259,
	"./pt": 260,
	"./pt-br": 261,
	"./pt-br.js": 261,
	"./pt.js": 260,
	"./ro": 262,
	"./ro.js": 262,
	"./ru": 263,
	"./ru.js": 263,
	"./sd": 264,
	"./sd.js": 264,
	"./se": 265,
	"./se.js": 265,
	"./si": 266,
	"./si.js": 266,
	"./sk": 267,
	"./sk.js": 267,
	"./sl": 268,
	"./sl.js": 268,
	"./sq": 269,
	"./sq.js": 269,
	"./sr": 270,
	"./sr-cyrl": 271,
	"./sr-cyrl.js": 271,
	"./sr.js": 270,
	"./ss": 272,
	"./ss.js": 272,
	"./sv": 273,
	"./sv.js": 273,
	"./sw": 274,
	"./sw.js": 274,
	"./ta": 275,
	"./ta.js": 275,
	"./te": 276,
	"./te.js": 276,
	"./tet": 277,
	"./tet.js": 277,
	"./tg": 278,
	"./tg.js": 278,
	"./th": 279,
	"./th.js": 279,
	"./tl-ph": 280,
	"./tl-ph.js": 280,
	"./tlh": 281,
	"./tlh.js": 281,
	"./tr": 282,
	"./tr.js": 282,
	"./tzl": 283,
	"./tzl.js": 283,
	"./tzm": 284,
	"./tzm-latn": 285,
	"./tzm-latn.js": 285,
	"./tzm.js": 284,
	"./ug-cn": 286,
	"./ug-cn.js": 286,
	"./uk": 287,
	"./uk.js": 287,
	"./ur": 288,
	"./ur.js": 288,
	"./uz": 289,
	"./uz-latn": 290,
	"./uz-latn.js": 290,
	"./uz.js": 289,
	"./vi": 291,
	"./vi.js": 291,
	"./x-pseudo": 292,
	"./x-pseudo.js": 292,
	"./yo": 293,
	"./yo.js": 293,
	"./zh-cn": 294,
	"./zh-cn.js": 294,
	"./zh-hk": 295,
	"./zh-hk.js": 295,
	"./zh-tw": 296,
	"./zh-tw.js": 296
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 404;

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__ = __webpack_require__(342);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(app, platform, statusBar, splashScreen, authProvider, storage, events, backgroundMode, localNotifications, alertCtrl) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.authProvider = authProvider;
        this.storage = storage;
        this.events = events;
        this.backgroundMode = backgroundMode;
        this.localNotifications = localNotifications;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.useNative = false;
        this.connectionStatus = true;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.styleDefault();
            if (_this.platform.is("android")) {
                _this.statusBar.backgroundColorByHexString("#952517");
                _this.statusBar.styleLightContent();
            }
            else {
                _this.statusBar.styleLightContent();
            }
            _this.storage.get("user").then(function (token) {
                console.log(token);
                if (token) {
                    _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */]);
                    _this.app.getRootNav().popToRoot();
                }
                setTimeout(function () { _this.splashScreen.hide(); }, 500);
            }).catch(function () {
                _this.splashScreen.hide();
            });
            if (platform.is("cordova") && (platform.is("android") || platform.is("ios"))) {
                _this.useNative = true;
            }
            _this.mqttConnect();
            _this.events.subscribe('channel:subscribed', function (hubId) {
                console.log(hubId);
                _this.mqttSubscribe(hubId);
            });
            _this.events.subscribe('channel:unsubscribed', function (hubId) {
                console.log(hubId);
                _this.mqttUnsubscribe(hubId);
            });
            _this.backgroundMode.setDefaults({ silent: true });
            _this.backgroundMode.enable();
            _this.events.subscribe("network:online", function () {
                _this.mqttConnect();
            });
        });
    }
    MyApp.prototype.mqttConnect = function () {
        var _this = this;
        if (this.useNative) {
            console.log(mqtt);
            console.log("connecting mqtt");
            //use the native MQTT plugin
            mqtt.init({
                host: "b-f4be5e8b-748c-4ac6-875f-56badddbf4c7-1.mq.ap-southeast-2.amazonaws.com",
                port: 8883,
                username: "wentity",
                password: 'wentity@1234',
                ssl: true,
                offlineCaching: false
            });
            mqtt.connect();
            mqtt.on("connect", function () {
                console.log("connect success");
                _this.storage.get("subscription").then(function (data) {
                    if (data) {
                        _this.mqttSubscribe(data.hubId);
                    }
                });
            }, function (status) {
                //alert("failed: " + status);
                _this.storage.get("subscription").then(function (data) {
                    if (data) {
                        var alert = _this.alertCtrl.create({
                            title: 'Connection Failed',
                            subTitle: 'Failed to retreive Salat times from the server',
                            message: 'Please check your internet connection.',
                            buttons: ['Dismiss']
                        });
                        alert.present();
                    }
                });
                console.log(status);
            });
        }
        else {
            /*
             * for non android and ios
            this.client  = mqttJs.connect({
                username:"wentity",
                password:"wentity@1234",
                host:'b-f4be5e8b-748c-4ac6-875f-56badddbf4c7-1.mq.ap-southeast-2.amazonaws.com',
                port:8883,
                protocol: 'wss'
            });
            this.client.on('connect', () => {
                console.log("success");
                this.storage.get("subscription").then((data) => {
                    if (data){
                        this.mqttSubscribe(data.hubId);
                    }
                });
            });
            */
        }
    };
    MyApp.prototype.mqttSubscribe = function (hubId) {
        var _this = this;
        console.log(hubId);
        if (this.useNative) {
            console.log("subscribing");
            mqtt.subscribe({
                topic: hubId,
                qos: 2
            });
            console.log("running callback");
            mqtt.on("subscribe", function (subscription) {
                console.log("here");
                console.log(subscription);
                _this.mqttListen(hubId);
            }, function (e) {
                console.log(e);
            });
        }
        else if (this.client) {
            this.client.subscribe(hubId, { qos: 2 });
            this.mqttListen(hubId);
        }
    };
    MyApp.prototype.mqttListen = function (hubId) {
        var _this = this;
        if (this.useNative) {
            mqtt.on("message", function (message) {
                console.log(message);
                _this.events.publish("mqtt:message", { message: message });
                alert("An update to your Salat times or an announcement has been made.");
                _this.localNotifications.schedule({
                    id: 1,
                    title: 'Update Received',
                    text: 'An update to your Salat times or an announcement has been made.'
                });
            });
        }
        else if (this.client) {
            this.client.on('message', function (value) {
                console.log(value);
                _this.events.publish("mqtt:message", { message: value });
                alert("An update to your Salat times or an announcement has been made.");
            });
        }
    };
    MyApp.prototype.mqttUnsubscribe = function (hubId) {
        if (this.useNative) {
            mqtt.unsubscribe({
                topic: hubId
            });
            mqtt.on("unsubscribe", function (topic) {
                console.log(topic);
            }, function (e) {
                console.log(e);
            });
        }
        else if (this.client) {
            this.client.unsubscribe(hubId, {});
        }
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__["a" /* BackgroundMode */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__["a" /* BackgroundMode */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _k || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ConnectionProvider = /** @class */ (function () {
    function ConnectionProvider(http, events, platform, network) {
        var _this = this;
        this.http = http;
        this.events = events;
        this.platform = platform;
        this.network = network;
        this.connectionStatus = (this.network.type && this.network.type !== "none") || !this.platform.is("cordova");
        this.platform.ready().then(function () {
            _this.connectionStatus = (_this.network.type && _this.network.type !== "none") || !_this.platform.is("cordova");
        });
        console.log("settng up");
        this.network.onDisconnect().subscribe(function () {
            console.log('network was disconnected :-(');
            _this.connectionStatus = false;
            _this.events.publish("network:offline");
        });
        this.network.onConnect().subscribe(function () {
            console.log('network connected!');
            _this.connectionStatus = true;
            setTimeout(function () {
                _this.events.publish("network:online");
            }, 3000);
        });
        this.platform.resume.subscribe(function () {
            _this.connectionStatus = (_this.network.type && _this.network.type !== "none") || !_this.platform.is("cordova");
        });
    }
    ConnectionProvider.prototype.getConnectionStatus = function () {
        return this.connectionStatus;
    };
    ConnectionProvider.prototype.setConnectionStatus = function (status) {
        if (this.connectionStatus !== status) {
            this.connectionStatus = status;
            if (status) {
                this.events.publish("network:online");
            }
            else {
                this.events.publish("network:offline");
            }
        }
    };
    ConnectionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */]) === "function" && _d || Object])
    ], ConnectionProvider);
    return ConnectionProvider;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=connection.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSettings; });
var AppSettings = /** @class */ (function () {
    function AppSettings() {
    }
    //public static apiUrl = 'http://websites.localhost/lawnmower/api/public/api';
    AppSettings.apiUrl = 'http://13.210.209.65/callerbotlive/api';
    return AppSettings;
}());

//# sourceMappingURL=app.settings.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prayer_prayer__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_events__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feedback_feedback__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TabsPage = /** @class */ (function () {
    function TabsPage(app, alertCtrl, platform, authProvider, events) {
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.authProvider = authProvider;
        this.events = events;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__events_events__["a" /* EventsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__prayer_prayer__["a" /* PrayerPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__feedback_feedback__["a" /* FeedbackPage */];
    }
    TabsPage.prototype.logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: function () {
                        //logout
                        _this.authProvider.logout().then(function () {
                            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                            _this.app.getRootNav().popToRoot();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\tabs\tabs.html"*/'<ion-tabs tabsPlacement="top" tabsLayout=\'title-hide\' color=\'secondary\' selectedIndex="2">\n  <ion-tab [root]="tab1Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Announcements" tabIcon="megaphone"></ion-tab>\n   <ion-tab [root]="tab3Root" tabTitle="Prayer Time" tabIcon="pulse"></ion-tab> \n  <ion-tab [root]="tab4Root" tabTitle="Feedback" tabIcon="star"></ion-tab>\n  <ion-tab tabTitle="Logout" tabIcon="exit" (ionSelect)="logout()"></ion-tab>\n</ion-tabs>\n\n\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* App */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["k" /* Platform */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* Events */]) === "function" && _e || Object])
    ], TabsPage);
    return TabsPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the ChannelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChannelProvider = /** @class */ (function () {
    function ChannelProvider(http, storage, connectionProvider) {
        this.http = http;
        this.storage = storage;
        this.connectionProvider = connectionProvider;
        console.log('Hello ChannelProvider Provider');
    }
    ChannelProvider.prototype.getChannels = function (cityId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/secured/channel/listbycity/" + cityId, { headers: headers }).subscribe(function (res) {
                        _this.connectionProvider.setConnectionStatus(true);
                        resolve(res);
                    }, function (e) {
                        if (e && e.status === 0) {
                            _this.connectionProvider.setConnectionStatus(false);
                        }
                        reject(e);
                    });
                }
            });
        });
    };
    ChannelProvider.prototype.subscribe = function (userEmail, hubId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/secured/subscribers/subscribe", { userEmail: userEmail, hub: hubId }, { headers: headers }).subscribe(function (res) {
                        console.log(res);
                        resolve(res);
                    }, function (e) {
                        console.log(e);
                        reject(e);
                    });
                }
            });
        });
    };
    ChannelProvider.prototype.unsubscribe = function (subscriberId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.delete(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/secured/subscribers/unsubscribe/" + subscriberId, { headers: headers }).subscribe(function (res) {
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
            });
        });
    };
    ChannelProvider.prototype.getChannel = function (subscriberId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/secured/subscribers/channelview/" + subscriberId, { headers: headers }).subscribe(function (res) {
                        resolve(res);
                        _this.connectionProvider.setConnectionStatus(true);
                    }, function (e) {
                        if (e && e.status === 0) {
                            _this.connectionProvider.setConnectionStatus(false);
                        }
                        reject(e);
                    });
                }
            });
        });
    };
    ChannelProvider.prototype.getSalatTimes = function (hubId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/secured/salattimes/listby/" + hubId + "/1/99", { headers: headers }).subscribe(function (res) {
                        _this.connectionProvider.setConnectionStatus(true);
                        resolve(res);
                    }, function (e) {
                        if (e && e.status === 0) {
                            _this.connectionProvider.setConnectionStatus(false);
                        }
                        reject(e);
                    });
                }
            });
        });
    };
    ChannelProvider.prototype.getAnnouncements = function (hubId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/secured/events/listby/" + hubId + "/1/99", { headers: headers }).subscribe(function (res) {
                        _this.connectionProvider.setConnectionStatus(true);
                        resolve(res);
                    }, function (e) {
                        if (e && e.status === 0) {
                            _this.connectionProvider.setConnectionStatus(false);
                        }
                        reject(e);
                    });
                }
            });
        });
    };
    ChannelProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__["a" /* ConnectionProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__["a" /* ConnectionProvider */]) === "function" && _c || Object])
    ], ChannelProvider);
    return ChannelProvider;
    var _a, _b, _c;
}());

//# sourceMappingURL=channel.js.map

/***/ })

},[343]);
//# sourceMappingURL=main.js.map