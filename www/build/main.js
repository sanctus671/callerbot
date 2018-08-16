webpackJsonp([6],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_announcement_announcement__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__ = __webpack_require__(87);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], EventsPage);
    return EventsPage;
}());

//# sourceMappingURL=events.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__ = __webpack_require__(294);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__["a" /* FeedbackProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], FeedbackPage);
    return FeedbackPage;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(37);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_terms_conditions_terms_conditions__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__ = __webpack_require__(31);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(31);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 125:
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
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/events/events.module": [
		422,
		5
	],
	"../pages/feedback/feedback.module": [
		423,
		4
	],
	"../pages/forgot-password/forgot-password.module": [
		424,
		3
	],
	"../pages/login/login.module": [
		425,
		2
	],
	"../pages/settings/settings.module": [
		426,
		1
	],
	"../pages/sign-up/sign-up.module": [
		427,
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
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(169);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], AnnouncementModal);
    return AnnouncementModal;
}());

//# sourceMappingURL=announcement.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(52);
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
  Generated class for the FeedbackProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FeedbackProvider = /** @class */ (function () {
    function FeedbackProvider(http, storage) {
        this.http = http;
        this.storage = storage;
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], FeedbackProvider);
    return FeedbackProvider;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_country_country__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__ = __webpack_require__(88);
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
    function PrayerPage(navCtrl, platform, countryProvider, channelProvider, alertCtrl, storage, events, localNotifications, ngZone) {
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
    }
    PrayerPage.prototype.ionViewDidEnter = function () {
        this.getSalatTimes();
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
                        title: prayer.prayerName + " prayer (Adzan)",
                        text: "Starts at " + prayer.adzanTime.trim(),
                        trigger: { at: new Date(prayerTime.year(), prayerTime.month(), prayerTime.day(), prayerTime.hour(), prayerTime.minutes()) }
                    });
                }
                if (prayerTime2.isAfter(today)) {
                    this.localNotifications.schedule({
                        title: prayer.prayerName + " prayer (Ikhama)",
                        text: "Starts at " + prayer.ikhamaTime.trim(),
                        trigger: { at: new Date(prayerTime2.year(), prayerTime2.month(), prayerTime2.day(), prayerTime2.hour(), prayerTime2.minutes()) }
                    });
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
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    PrayerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-prayer',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\prayer\prayer.html"*/'<ion-content padding>\n    \n    <div class="subscribe-form" *ngIf="!subscribedChannel && !loading">\n        <div class="login-top-section signup-top-section">\n\n            <img class="logo" src="assets/imgs/logo-light.png" />\n            <h2>Please choose your location</h2>\n        </div>    \n\n        <ion-list class="login-form" ion-card>\n            \n            <ion-item>\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    Region\n                </ion-label>\n                <ion-select [(ngModel)]="region" (ionChange)="getCities()">\n                    <ion-option value="{{region.regionId}}" *ngFor="let region of regions">{{region.regionName}}</ion-option>\n                </ion-select>\n            </ion-item>        \n            \n\n            <ion-item *ngIf="region">\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    City\n                </ion-label>\n                <ion-select [(ngModel)]="subscription.cityId" (ionChange)="getChannels()">\n                    <ion-option value="{{city.cityId}}" *ngFor="let city of cities">{{city.cityName}}</ion-option>\n                </ion-select>\n            </ion-item>\n           \n\n        </ion-list>\n    \n        <div class="choose-channel" *ngIf="subscription.cityId">\n            <h2>Please choose your channel</h2>\n\n            <div class="channels">\n                <button ion-button  *ngFor="let channel of channels" [outline]="subscription.hubId !== channel.hubId" color=\'light\' round class="subscribe-button" (click)="selectChannel(channel)">\n                    <ion-icon name="heart"></ion-icon> \n                    {{channel.channelName}}\n                </button>                    \n            </div>\n        \n        </div>\n        \n    </div>\n    \n    \n    \n    <div class="channel-feed" *ngIf="subscribedChannel && !loading">\n        \n\n        <div class="channel-header">\n            <img src="assets/imgs/prayer.png" />\n            <h2>{{subscribedChannel.channelName}}</h2>\n        </div>\n        \n        <div class="channel-items">\n            \n            <ion-row class="channel-item channel-headers">\n                <ion-col>Prayer</ion-col>\n                <ion-col>Adzan Time</ion-col>\n                <ion-col>Ikhama Time</ion-col>\n            </ion-row>            \n            \n            <ion-row class="channel-item" *ngFor="let prayerTime of prayerTimes">\n                <ion-col>{{prayerTime.prayerName}}</ion-col>\n                <ion-col>{{prayerTime.adzanTime}}</ion-col>\n                <ion-col>{{prayerTime.ikhamaTime}}</ion-col>\n            </ion-row>\n        </div>\n\n        \n        <div class="channel-unsubscribe">\n        <button ion-button color=\'light\' outline round class="unsubscribe-button" (click)="unsubscribe()">\n            <ion-icon name="notifications-off"></ion-icon> Unsubscribe\n        </button>            \n        </div>\n        \n    </div>\n    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\prayer\prayer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__providers_country_country__["a" /* CountryProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], PrayerPage);
    return PrayerPage;
}());

//# sourceMappingURL=prayer.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(52);
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
    function CountryProvider(http) {
        this.http = http;
        console.log('Hello CountryProvider Provider');
    }
    CountryProvider.prototype.getCountries = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/countries").subscribe(function (res) {
                resolve(res);
            }, function (e) {
                reject(e);
            });
        });
    };
    CountryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], CountryProvider);
    return CountryProvider;
}());

//# sourceMappingURL=country.js.map

/***/ }),

/***/ 297:
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], TermsConditionsModal);
    return TermsConditionsModal;
}());

//# sourceMappingURL=terms-conditions.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(52);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], AuthenticationProvider);
    return AuthenticationProvider;
}());

//# sourceMappingURL=authentication.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(361);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_prayer_prayer__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_events_events__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_feedback_feedback__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tabs_tabs__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_terms_conditions_terms_conditions__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modals_announcement_announcement__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_authentication_authentication__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_country_country__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_channel_channel__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_feedback_feedback__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_geolocation__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_local_notifications__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_background_mode__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_in_app_browser__ = __webpack_require__(169);
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
                        { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'FeedbackPage', segment: 'feedback', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
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
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_in_app_browser__["a" /* InAppBrowser */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sign_up_sign_up__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__ = __webpack_require__(31);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 171,
	"./af.js": 171,
	"./ar": 172,
	"./ar-dz": 173,
	"./ar-dz.js": 173,
	"./ar-kw": 174,
	"./ar-kw.js": 174,
	"./ar-ly": 175,
	"./ar-ly.js": 175,
	"./ar-ma": 176,
	"./ar-ma.js": 176,
	"./ar-sa": 177,
	"./ar-sa.js": 177,
	"./ar-tn": 178,
	"./ar-tn.js": 178,
	"./ar.js": 172,
	"./az": 179,
	"./az.js": 179,
	"./be": 180,
	"./be.js": 180,
	"./bg": 181,
	"./bg.js": 181,
	"./bm": 182,
	"./bm.js": 182,
	"./bn": 183,
	"./bn.js": 183,
	"./bo": 184,
	"./bo.js": 184,
	"./br": 185,
	"./br.js": 185,
	"./bs": 186,
	"./bs.js": 186,
	"./ca": 187,
	"./ca.js": 187,
	"./cs": 188,
	"./cs.js": 188,
	"./cv": 189,
	"./cv.js": 189,
	"./cy": 190,
	"./cy.js": 190,
	"./da": 191,
	"./da.js": 191,
	"./de": 192,
	"./de-at": 193,
	"./de-at.js": 193,
	"./de-ch": 194,
	"./de-ch.js": 194,
	"./de.js": 192,
	"./dv": 195,
	"./dv.js": 195,
	"./el": 196,
	"./el.js": 196,
	"./en-au": 197,
	"./en-au.js": 197,
	"./en-ca": 198,
	"./en-ca.js": 198,
	"./en-gb": 199,
	"./en-gb.js": 199,
	"./en-ie": 200,
	"./en-ie.js": 200,
	"./en-il": 201,
	"./en-il.js": 201,
	"./en-nz": 202,
	"./en-nz.js": 202,
	"./eo": 203,
	"./eo.js": 203,
	"./es": 204,
	"./es-do": 205,
	"./es-do.js": 205,
	"./es-us": 206,
	"./es-us.js": 206,
	"./es.js": 204,
	"./et": 207,
	"./et.js": 207,
	"./eu": 208,
	"./eu.js": 208,
	"./fa": 209,
	"./fa.js": 209,
	"./fi": 210,
	"./fi.js": 210,
	"./fo": 211,
	"./fo.js": 211,
	"./fr": 212,
	"./fr-ca": 213,
	"./fr-ca.js": 213,
	"./fr-ch": 214,
	"./fr-ch.js": 214,
	"./fr.js": 212,
	"./fy": 215,
	"./fy.js": 215,
	"./gd": 216,
	"./gd.js": 216,
	"./gl": 217,
	"./gl.js": 217,
	"./gom-latn": 218,
	"./gom-latn.js": 218,
	"./gu": 219,
	"./gu.js": 219,
	"./he": 220,
	"./he.js": 220,
	"./hi": 221,
	"./hi.js": 221,
	"./hr": 222,
	"./hr.js": 222,
	"./hu": 223,
	"./hu.js": 223,
	"./hy-am": 224,
	"./hy-am.js": 224,
	"./id": 225,
	"./id.js": 225,
	"./is": 226,
	"./is.js": 226,
	"./it": 227,
	"./it.js": 227,
	"./ja": 228,
	"./ja.js": 228,
	"./jv": 229,
	"./jv.js": 229,
	"./ka": 230,
	"./ka.js": 230,
	"./kk": 231,
	"./kk.js": 231,
	"./km": 232,
	"./km.js": 232,
	"./kn": 233,
	"./kn.js": 233,
	"./ko": 234,
	"./ko.js": 234,
	"./ky": 235,
	"./ky.js": 235,
	"./lb": 236,
	"./lb.js": 236,
	"./lo": 237,
	"./lo.js": 237,
	"./lt": 238,
	"./lt.js": 238,
	"./lv": 239,
	"./lv.js": 239,
	"./me": 240,
	"./me.js": 240,
	"./mi": 241,
	"./mi.js": 241,
	"./mk": 242,
	"./mk.js": 242,
	"./ml": 243,
	"./ml.js": 243,
	"./mn": 244,
	"./mn.js": 244,
	"./mr": 245,
	"./mr.js": 245,
	"./ms": 246,
	"./ms-my": 247,
	"./ms-my.js": 247,
	"./ms.js": 246,
	"./mt": 248,
	"./mt.js": 248,
	"./my": 249,
	"./my.js": 249,
	"./nb": 250,
	"./nb.js": 250,
	"./ne": 251,
	"./ne.js": 251,
	"./nl": 252,
	"./nl-be": 253,
	"./nl-be.js": 253,
	"./nl.js": 252,
	"./nn": 254,
	"./nn.js": 254,
	"./pa-in": 255,
	"./pa-in.js": 255,
	"./pl": 256,
	"./pl.js": 256,
	"./pt": 257,
	"./pt-br": 258,
	"./pt-br.js": 258,
	"./pt.js": 257,
	"./ro": 259,
	"./ro.js": 259,
	"./ru": 260,
	"./ru.js": 260,
	"./sd": 261,
	"./sd.js": 261,
	"./se": 262,
	"./se.js": 262,
	"./si": 263,
	"./si.js": 263,
	"./sk": 264,
	"./sk.js": 264,
	"./sl": 265,
	"./sl.js": 265,
	"./sq": 266,
	"./sq.js": 266,
	"./sr": 267,
	"./sr-cyrl": 268,
	"./sr-cyrl.js": 268,
	"./sr.js": 267,
	"./ss": 269,
	"./ss.js": 269,
	"./sv": 270,
	"./sv.js": 270,
	"./sw": 271,
	"./sw.js": 271,
	"./ta": 272,
	"./ta.js": 272,
	"./te": 273,
	"./te.js": 273,
	"./tet": 274,
	"./tet.js": 274,
	"./tg": 275,
	"./tg.js": 275,
	"./th": 276,
	"./th.js": 276,
	"./tl-ph": 277,
	"./tl-ph.js": 277,
	"./tlh": 278,
	"./tlh.js": 278,
	"./tr": 279,
	"./tr.js": 279,
	"./tzl": 280,
	"./tzl.js": 280,
	"./tzm": 281,
	"./tzm-latn": 282,
	"./tzm-latn.js": 282,
	"./tzm.js": 281,
	"./ug-cn": 283,
	"./ug-cn.js": 283,
	"./uk": 284,
	"./uk.js": 284,
	"./ur": 285,
	"./ur.js": 285,
	"./uz": 286,
	"./uz-latn": 287,
	"./uz-latn.js": 287,
	"./uz.js": 286,
	"./vi": 288,
	"./vi.js": 288,
	"./x-pseudo": 289,
	"./x-pseudo.js": 289,
	"./yo": 290,
	"./yo.js": 290,
	"./zh-cn": 291,
	"./zh-cn.js": 291,
	"./zh-hk": 292,
	"./zh-hk.js": 292,
	"./zh-tw": 293,
	"./zh-tw.js": 293
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
webpackContext.id = 402;

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__ = __webpack_require__(339);
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
    function MyApp(app, platform, statusBar, splashScreen, authProvider, storage, events, backgroundMode, localNotifications) {
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.useNative = false;
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
            if (_this.useNative) {
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
        });
    }
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 52:
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

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prayer_prayer__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_events__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feedback_feedback__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__ = __webpack_require__(31);
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
    function TabsPage(app, alertCtrl, authProvider) {
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__events_events__["a" /* EventsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__prayer_prayer__["a" /* PrayerPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__feedback_feedback__["a" /* FeedbackPage */];
    }
    TabsPage.prototype.logout = function () {
        var _this = this;
        console.log("here");
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\tabs\tabs.html"*/'<ion-tabs tabsPlacement="top" tabsLayout=\'title-hide\' color=\'secondary\' selectedIndex="2">\n  <ion-tab [root]="tab1Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Announcements" tabIcon="megaphone"></ion-tab>\n   <ion-tab [root]="tab3Root" tabTitle="Prayer Time" tabIcon="pulse"></ion-tab> \n  <ion-tab [root]="tab4Root" tabTitle="Feedback" tabIcon="star"></ion-tab>\n  <ion-tab tabTitle="Logout" tabIcon="exit" (ionSelect)="logout()"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(52);
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
  Generated class for the ChannelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChannelProvider = /** @class */ (function () {
    function ChannelProvider(http, storage) {
        this.http = http;
        this.storage = storage;
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
                        resolve(res);
                    }, function (e) {
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
                    }, function (e) {
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
                        resolve(res);
                    }, function (e) {
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
                        resolve(res);
                    }, function (e) {
                        reject(e);
                    });
                }
            });
        });
    };
    ChannelProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ChannelProvider);
    return ChannelProvider;
}());

//# sourceMappingURL=channel.js.map

/***/ })

},[340]);
//# sourceMappingURL=main.js.map