webpackJsonp([6],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_announcement_announcement__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__ = __webpack_require__(49);
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
    function EventsPage(navCtrl, navParams, storage, localNotifications, modalCtrl, events, channelProvider, ngZone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.localNotifications = localNotifications;
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], EventsPage);
    return EventsPage;
}());

//# sourceMappingURL=events.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(20);
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
                message: 'Your post has been sent',
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
            selector: 'page-feedback',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\feedback\feedback.html"*/'<ion-content padding>\n    \n    <p class="module-description">You can submit a post for your community.</p>\n    \n    <ion-list class="login-form" ion-card>\n\n      \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="thumbs-up"></ion-icon> \n                Community Post\n            </ion-label>\n            <ion-textarea [(ngModel)]="feedback.message"></ion-textarea>\n        </ion-item> \n        \n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="send()" [disabled]="properties.loading">\n            Send\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n   \n        \n        \n    </ion-list>      \n    \n    \n    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\feedback\feedback.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__["a" /* FeedbackProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], FeedbackPage);
    return FeedbackPage;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_terms_conditions_terms_conditions__ = __webpack_require__(303);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__ = __webpack_require__(49);
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
    function SettingsPage(navCtrl, navParams, events, authProvider, storage, alertCtrl, localNotifications) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.authProvider = authProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.localNotifications = localNotifications;
        this.user = { appUserName: "", email: "", mobile: "", password: "" };
        this.settings = { sound: "sound" };
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
        this.storage.set("settings", this.settings);
        this.events.publish("settings:updated", this.settings);
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
    SettingsPage.prototype.testNotifications = function (notificationType) {
        var sound = "";
        if (notificationType === "Azan A") {
            sound = 'file://assets/audio/Azan-A.mp3';
        }
        else if (notificationType === "Azan S") {
            sound = 'file://assets/audio/Azan-S.mp3';
        }
        this.localNotifications.schedule({
            id: 1,
            title: "Test notification",
            text: "This is a test",
            smallIcon: 'res://small_icon',
            sound: sound
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\settings\settings.html"*/'<ion-content>\n    \n    \n    <ion-list class="login-form" ion-card>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="person"></ion-icon> \n                Name\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.appUserName"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="mail"></ion-icon> \n                Email\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="call"></ion-icon> \n                Phone Number\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.mobile"></ion-input>\n        </ion-item>    \n        \n        <ion-item>\n          <ion-label>Play Sound At Prayer Time</ion-label>\n          <ion-select [(ngModel)]="settings.sound">\n            <ion-option value="sound">Play Sounds</ion-option>\n            <ion-option value="default">Play Default Notification</ion-option>\n          </ion-select>\n        </ion-item>        \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="key"></ion-icon> \n                Password\n            </ion-label>\n            <ion-input clearInput type="password" [(ngModel)]="user.password"></ion-input>\n        </ion-item> \n        \n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="save()" [disabled]="properties.loading">\n            Save\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n        <div class="test-notifications">\n            <p>Use the buttons below to check notifications are working correctly.</p>\n            \n        \n            <button ion-button (click)="testNotifications(\'Azan A\')">Azan A Notification</button>\n            <button ion-button (click)="testNotifications(\'Azan S\')">Azan S Notification</button>\n            <button ion-button (click)="testNotifications(\'None\')">Standard Notification</button>            \n            \n            \n        </div>   \n        \n        \n    </ion-list>    \n    \n    \n    \n\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 128:
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
webpackEmptyAsyncContext.id = 128;

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/events/events.module": [
		426,
		5
	],
	"../pages/feedback/feedback.module": [
		427,
		4
	],
	"../pages/forgot-password/forgot-password.module": [
		430,
		3
	],
	"../pages/login/login.module": [
		428,
		2
	],
	"../pages/settings/settings.module": [
		431,
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
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(172);
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

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__ = __webpack_require__(48);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__["a" /* ConnectionProvider */]])
    ], FeedbackProvider);
    return FeedbackProvider;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_country_country__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_connection_connection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_add_channel_add_channel__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_geocoder__ = __webpack_require__(302);
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
    function PrayerPage(navCtrl, geolocation, nativeGeocoder, platform, modalCtrl, countryProvider, channelProvider, alertCtrl, storage, events, localNotifications, ngZone, connectionProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
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
        this.cityName = "";
        this.regionName = "";
        this.channels = [];
        this.prayerTimes = [];
        this.subscriptions = [];
        this.settings = { sound: "sound" };
        this.getCountries();
        this.currentPosition = { latitude: false, longitude: false };
        this.storage.get("settings").then(function (data) {
            if (data) {
                _this.settings = data;
            }
        });
        this.storage.get("subscribedChannel").then(function (data) {
            _this.loading = false;
            if (data) {
                console.log(data);
                _this.subscribedChannel = data;
                _this.getSalatTimes(false);
            }
        });
        this.storage.get("subscription").then(function (data) {
            if (data) {
                console.log(data);
                _this.subscription = data;
            }
        });
        this.storage.get("subscriptions").then(function (data) {
            if (data) {
                console.log(data);
                _this.subscriptions = data;
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
                _this.getSubscriptions();
            }
        });
        this.events.subscribe("mqtt:message", function () {
            _this.getSalatTimes(true);
        });
        this.connectionStatus = this.connectionProvider.getConnectionStatus();
        this.events.subscribe("network:online", function () {
            _this.getSalatTimes(false);
            _this.getCountries();
            _this.ngZone.run(function () {
                _this.connectionStatus = true;
            });
        });
        this.events.subscribe("network:offline", function () {
            _this.ngZone.run(function () {
                _this.connectionStatus = false;
            });
        });
        this.events.subscribe("settings:updated", function (data) {
            _this.settings = data;
        });
        this.platform.resume.subscribe(function () {
            _this.ngZone.run(function () {
                _this.connectionStatus = _this.connectionProvider.getConnectionStatus();
            });
        });
    }
    PrayerPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.getSalatTimes(false);
        this.ngZone.run(function () {
            _this.connectionStatus = _this.connectionProvider.getConnectionStatus();
        });
    };
    PrayerPage.prototype.setLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp);
            _this.currentPosition.latitude = resp.coords.latitude;
            _this.currentPosition.longitude = resp.coords.longitude;
            _this.nativeGeocoder.reverseGeocode(_this.currentPosition.latitude, _this.currentPosition.longitude, { useLocale: true, maxResults: 1 })
                .then(function (result) {
                console.log(result[0]);
                var address = result[0];
                _this.cityName = address["subLocality"];
                _this.regionName = address["locality"];
                for (var _i = 0, _a = _this.regions; _i < _a.length; _i++) {
                    var region = _a[_i];
                    if (region.regionName === _this.regionName) {
                        _this.region = region.regionId;
                        _this.getCities();
                        for (var _b = 0, _c = _this.cities; _b < _c.length; _b++) {
                            var city = _c[_b];
                            if (city.cityName === _this.cityName) {
                                _this.subscription.cityId = city.cityId;
                            }
                        }
                    }
                }
            })
                .catch(function (error) { return console.log(error); });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    PrayerPage.prototype.getSubscriptions = function () {
        var _this = this;
        this.channelProvider.getSubscriptions(this.user.email).then(function (channels) {
            console.log(channels);
            //check for duplicates
            var duplicates = [];
            var seenIds = [];
            for (var index in channels) {
                if (channels[index].hub) {
                    if (seenIds.indexOf(channels[index].hub.hubId) > -1) {
                        console.log(channels[index].hub);
                        duplicates.push(index);
                    }
                    seenIds.push(channels[index].hub.hubId);
                }
            }
            for (var _i = 0, _a = duplicates.reverse(); _i < _a.length; _i++) {
                var itemIndex = _a[_i];
                channels.splice(parseInt(itemIndex), 1);
            }
            _this.subscriptions = channels;
            _this.storage.set("subscriptions", channels);
            if (!_this.subscribedChannel && channels && channels.length > 0) {
                _this.subscribedChannel = channels[0].hub;
                _this.subscription = { hubId: channels[0].hub.hubId, subscriberId: channels[0].subscriberId };
            }
        });
    };
    PrayerPage.prototype.getSalatTimes = function (isMqtt) {
        var _this = this;
        if (this.subscribedChannel) {
            this.channelProvider.getSalatTimes(this.subscribedChannel.hubId).then(function (times) {
                console.log(times);
                _this.ngZone.run(function () {
                    _this.prayerTimes = _this.filterPrayers(times);
                });
                _this.generateNotifications();
                var latestSalatTimeId = 0;
                if (times && times.length > 0) {
                    latestSalatTimeId = times[0].salatTimeId;
                }
                if (isMqtt) {
                    _this.generateMqttNotification(latestSalatTimeId);
                }
                else {
                    _this.storage.set("latestSalatTimeId", latestSalatTimeId);
                }
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
    PrayerPage.prototype.generateMqttNotification = function (latestSalatTimeId) {
        var _this = this;
        this.storage.get("latestSalatTimeId").then(function (id) {
            if (id !== latestSalatTimeId) {
                //is an update salat time
                _this.localNotifications.schedule({
                    id: 1,
                    title: 'Update Received',
                    text: 'An update to your Salat times has been made.',
                    smallIcon: 'res://small_icon'
                });
                alert("An update to your Salat times has been made.");
            }
            else {
                //is an announcement
                _this.localNotifications.schedule({
                    id: 1,
                    title: 'Update Received',
                    text: 'A new announcement has been made.',
                    smallIcon: 'res://small_icon'
                });
                alert("A new announcement has been made.");
            }
            _this.storage.set("latestSalatTimeId", latestSalatTimeId);
        });
    };
    PrayerPage.prototype.generateNotifications = function () {
        var _this = this;
        console.log(this.prayerTimes);
        if (!this.platform.is("cordova")) {
            return;
        }
        this.localNotifications.getScheduledIds().then(function (ids) {
            _this.localNotifications.cancel(ids);
            _this.scheduleNotifications();
        }).catch(function () {
            _this.scheduleNotifications();
        });
    };
    PrayerPage.prototype.scheduleNotifications = function () {
        var id = 2;
        for (var _i = 0, _a = this.prayerTimes; _i < _a.length; _i++) {
            var prayer = _a[_i];
            var prayerTime = __WEBPACK_IMPORTED_MODULE_5_moment__((prayer.activateDateTime + " " + prayer.adzanTime), 'DD-MM-YYYY hh:mm A');
            var prayerTime2 = __WEBPACK_IMPORTED_MODULE_5_moment__((prayer.activateDateTime + " " + prayer.ikhamaTime), 'DD-MM-YYYY hh:mm A');
            if (prayer.autoTimeUp && prayer.autoTimeUp > 0) {
                prayerTime.add(prayer.autoTimeUp, 'minutes');
                prayerTime2.add(prayer.autoTimeUp, 'minutes');
            }
            var prayerExpiry = __WEBPACK_IMPORTED_MODULE_5_moment__((prayer.expireDateTime + " " + prayer.adzanTime), 'DD-MM-YYYY hh:mm A');
            var days = prayerExpiry.diff(prayerTime, 'days') + 1;
            var today = __WEBPACK_IMPORTED_MODULE_5_moment__();
            var sound = "";
            if (prayer.prayerName === "Fajar" && (this.settings && this.settings.sound !== "default")) {
                sound = 'file://assets/audio/Azan-S.mp3';
            }
            else if (prayer.prayerName !== "Tahajjud" && prayer.prayerName !== "Chasht" && (this.settings && this.settings.sound !== "default")) {
                sound = 'file://assets/audio/Azan-A.mp3';
            }
            for (var i = 0; i < days; i++) {
                if (prayerTime.isAfter(today)) {
                    this.localNotifications.schedule({
                        id: id,
                        title: prayer.prayerName + " prayer (Adzan)",
                        text: "Starts at " + prayer.adzanTime.trim(),
                        smallIcon: 'res://small_icon',
                        sound: sound,
                        trigger: { at: new Date(prayerTime.year(), prayerTime.month(), prayerTime.date(), prayerTime.hour(), prayerTime.minutes()) }
                    });
                    id++;
                }
                if (prayerTime2.isAfter(today)) {
                    this.localNotifications.schedule({
                        id: id,
                        title: prayer.prayerName + " prayer (Ikhama)",
                        text: "Starts at " + prayer.ikhamaTime.trim(),
                        smallIcon: 'res://small_icon',
                        sound: sound,
                        trigger: { at: new Date(prayerTime2.year(), prayerTime2.month(), prayerTime2.date(), prayerTime2.hour(), prayerTime2.minutes()) }
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
            _this.setLocation();
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
                        var subscription = { subscriberId: 0, hub: channel };
                        _this.subscriptions.push(subscription);
                        _this.channelProvider.subscribe(_this.user.email, channel.hubId).then(function (data) {
                            console.log(data);
                            var id = data["subscriberId"];
                            _this.subscription.subscriberId = id;
                            subscription.subscriberId = id;
                            _this.storage.set("subscriptions", _this.subscriptions);
                            _this.storage.set("subscription", _this.subscription);
                            _this.events.publish("channel:subscribed", channel.hubId);
                            _this.getSalatTimes(false);
                        }).catch(function () {
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    PrayerPage.prototype.changeSubscribedChannel = function (subscription) {
        this.events.publish("channel:unsubscribed", this.subscription.hubId);
        var channel = subscription.hub;
        this.subscription.hubId = channel.hubId;
        this.subscription.subscriberId = subscription.subscriberId;
        this.subscription.hub = channel;
        this.subscribedChannel = channel;
        this.storage.set("subscribedChannel", channel);
        this.storage.set("subscription", this.subscription);
        this.getSalatTimes(false);
        this.events.publish("channel:subscribed", channel.hubId);
    };
    PrayerPage.prototype.openAddChannel = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_add_channel_add_channel__["a" /* AddChannelModal */], { subscriptions: this.subscriptions, region: this.region, city: this.subscription.cityId });
        modal.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                var channel_1 = data;
                _this.channelProvider.subscribe(_this.user.email, channel_1.hubId).then(function (data) {
                    console.log(data);
                    var id = data["subscriberId"];
                    var subscription = { subscriberId: id, hub: channel_1 };
                    _this.subscriptions.push(subscription);
                    _this.storage.set("subscriptions", _this.subscriptions);
                }).catch(function () {
                });
            }
        });
        modal.present();
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
                            _this.getSubscriptions();
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
            selector: 'page-prayer',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\prayer\prayer.html"*/'\n\n<ion-content padding>\n    \n    <div class="offline-status" *ngIf="!connectionStatus">\n        <ion-spinner></ion-spinner>\n        Checking for internet connection...    \n    </div>    \n    \n    <div class="subscribe-form" *ngIf="!subscribedChannel && !loading">\n        <div class="login-top-section signup-top-section">\n\n            <img class="logo" src="assets/imgs/logo-light.png" />\n            <h2>Please choose your location</h2>\n        </div>    \n\n        <ion-list class="login-form" ion-card>\n            \n            <ion-item>\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    Region\n                </ion-label>\n                <ion-select [(ngModel)]="region" (ionChange)="getCities()">\n                    <ion-option value="{{region.regionId}}" *ngFor="let region of regions">{{region.regionName}}</ion-option>\n                </ion-select>\n            </ion-item>        \n            \n\n            <ion-item *ngIf="region">\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    City\n                </ion-label>\n                <ion-select [(ngModel)]="subscription.cityId" (ionChange)="getChannels()">\n                    <ion-option value="{{city.cityId}}" *ngFor="let city of cities">{{city.cityName}}</ion-option>\n                </ion-select>\n            </ion-item>\n           \n\n        </ion-list>\n    \n        <div class="choose-channel" *ngIf="subscription.cityId">\n            <h2>Please choose your channel</h2>\n\n            <div class="channels">\n                <button ion-button  *ngFor="let channel of channels" [outline]="subscription.hubId !== channel.hubId" color=\'light\' round class="subscribe-button" (click)="selectChannel(channel)">\n                    <ion-icon name="heart"></ion-icon> \n                    {{channel.channelName}}\n                </button>                    \n            </div>\n        \n        </div>\n        \n    </div>\n    \n    <div *ngIf="!loading" class="channel-subscriptions">\n\n        <div *ngFor="let item of subscriptions">\n            \n            <ion-item class="channel-name-multiple" *ngIf="subscriptions.length > 1" (click)="changeSubscribedChannel(item)">\n                {{item.hub.channelName}}\n                <ion-icon [name]="subscribedChannel && item.hub && subscribedChannel.hubId === item.hub.hubId ? \'checkmark\' : \'add\'" item-end></ion-icon>\n            </ion-item>\n            \n\n            <div class="channel-feed" *ngIf="subscribedChannel && item.hub && subscribedChannel.hubId === item.hub.hubId" [ngClass]="{\'many-channels\':subscriptions.length > 1}">\n\n\n                <div class="channel-header">\n                    <img src="assets/imgs/prayer.png" />\n                    <h2>{{subscribedChannel.channelName}}</h2>\n                </div>\n\n                <div class="channel-items">\n\n                    <ion-row class="channel-item channel-headers">\n                        <ion-col>Prayer</ion-col>\n                        <ion-col>Adzan Time</ion-col>\n                        <ion-col>Ikhama Time</ion-col>\n                    </ion-row>            \n\n                    <ion-row class="channel-item" *ngFor="let prayerTime of prayerTimes">\n                        <ion-col>{{prayerTime.prayerName}}</ion-col>\n                        <ion-col>{{prayerTime.adzanTime}}</ion-col>\n                        <ion-col>{{prayerTime.ikhamaTime}}</ion-col>\n                        <div class="channel-remark" *ngIf="prayerTime.remark">{{prayerTime.remark}}</div>\n                    </ion-row>\n                </div>\n\n\n                <div class="channel-unsubscribe">\n                <button ion-button color=\'light\' outline round class="unsubscribe-button" (click)="unsubscribe()">\n                    <ion-icon name="notifications-off"></ion-icon> Unsubscribe\n                </button>            \n                </div>\n\n            </div>\n\n        </div>\n        \n    </div>\n    \n    <ion-fab right bottom *ngIf="subscribedChannel && subscribedChannel.hubId">\n      <button ion-fab (click)="openAddChannel()"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\prayer\prayer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_country_country__["a" /* CountryProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_7__providers_connection_connection__["a" /* ConnectionProvider */]])
    ], PrayerPage);
    return PrayerPage;
}());

//# sourceMappingURL=prayer.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddChannelModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_country_country__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddChannelModal = /** @class */ (function () {
    function AddChannelModal(platform, params, viewCtrl, countryProvider, channelProvider, alertCtrl, storage) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.countryProvider = countryProvider;
        this.channelProvider = channelProvider;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.subscriptions = params.data.subscriptions;
        this.subscription = { cityId: params.data.city, hubId: "" };
        this.cities = [];
        this.regions = [];
        this.region = params.data.region;
        this.channels = [];
        this.getCountries();
    }
    AddChannelModal.prototype.getCountries = function () {
        var _this = this;
        this.countryProvider.getCountries().then(function (data) {
            console.log(data[0].regionsList);
            _this.regions = data[0].regionsList;
        }).catch(function () {
        });
    };
    AddChannelModal.prototype.getCities = function () {
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
    AddChannelModal.prototype.getChannels = function () {
        var _this = this;
        this.channels = [];
        this.channelProvider.getChannels(this.subscription.cityId).then(function (data) {
            console.log(data);
            _this.channels = data;
        }).catch(function () {
        });
    };
    AddChannelModal.prototype.isSubscribed = function (channel) {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subscription = _a[_i];
            if (subscription.hub.hubId === channel.hubId) {
                return true;
            }
        }
        return false;
    };
    AddChannelModal.prototype.selectChannel = function (channel) {
        this.viewCtrl.dismiss(channel);
    };
    AddChannelModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddChannelModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'add-channel',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\modals\add-channel\add-channel.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Add Channel\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content padding>\n    \n    \n    <div class="subscribe-form">\n        <div class="login-top-section signup-top-section">\n\n            <img class="logo" src="assets/imgs/logo-light.png" />\n            <h2>Please choose your location</h2>\n        </div>    \n\n        <ion-list class="login-form" ion-card>\n            \n            <ion-item>\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    Region\n                </ion-label>\n                <ion-select [(ngModel)]="region" (ionChange)="getCities()">\n                    <ion-option value="{{region.regionId}}" *ngFor="let region of regions">{{region.regionName}}</ion-option>\n                </ion-select>\n            </ion-item>        \n            \n\n            <ion-item *ngIf="region">\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    City\n                </ion-label>\n                <ion-select [(ngModel)]="subscription.cityId" (ionChange)="getChannels()">\n                    <ion-option value="{{city.cityId}}" *ngFor="let city of cities">{{city.cityName}}</ion-option>\n                </ion-select>\n            </ion-item>\n           \n\n        </ion-list>\n    \n        <div class="choose-channel" *ngIf="subscription.cityId">\n            <h2>Please choose your channel</h2>\n\n            <div class="channels">\n                <button ion-button  *ngFor="let channel of channels" [disabled]="isSubscribed(channel)" [outline]="subscription.hubId !== channel.hubId" color=\'light\' round class="subscribe-button" (click)="selectChannel(channel)">\n                    <ion-icon name="heart"></ion-icon> \n                    {{channel.channelName}}\n                </button>                    \n            </div>\n        \n        </div>\n         \n    </div>\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\modals\add-channel\add-channel.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_country_country__["a" /* CountryProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], AddChannelModal);
    return AddChannelModal;
}());

//# sourceMappingURL=add-channel.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsConditionsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
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

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(20);
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

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(366);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_prayer_prayer__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_events_events__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_feedback_feedback__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_terms_conditions_terms_conditions__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modals_announcement_announcement__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modals_add_channel_add_channel__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_authentication_authentication__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_country_country__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_channel_channel__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_feedback_feedback__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_connection_connection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_geolocation__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_native_geocoder__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_local_notifications__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_background_mode__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_in_app_browser__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_network__ = __webpack_require__(174);
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
                __WEBPACK_IMPORTED_MODULE_15__modals_announcement_announcement__["a" /* AnnouncementModal */],
                __WEBPACK_IMPORTED_MODULE_16__modals_add_channel_add_channel__["a" /* AddChannelModal */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/events/events.module#EventsPageModule', name: 'EventsPage', segment: 'events', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'FeedbackPage', segment: 'feedback', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sign-up/sign-up.module#SignUpPageModule', name: 'SignUpPage', segment: 'sign-up', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule', name: 'ForgotPasswordPage', segment: 'forgot-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
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
                __WEBPACK_IMPORTED_MODULE_15__modals_announcement_announcement__["a" /* AnnouncementModal */],
                __WEBPACK_IMPORTED_MODULE_16__modals_add_channel_add_channel__["a" /* AddChannelModal */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_19__providers_authentication_authentication__["a" /* AuthenticationProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_country_country__["a" /* CountryProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_channel_channel__["a" /* ChannelProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_feedback_feedback__["a" /* FeedbackProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_connection_connection__["a" /* ConnectionProvider */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_network__["a" /* Network */]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sign_up_sign_up__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(56);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 175,
	"./af.js": 175,
	"./ar": 176,
	"./ar-dz": 177,
	"./ar-dz.js": 177,
	"./ar-kw": 178,
	"./ar-kw.js": 178,
	"./ar-ly": 179,
	"./ar-ly.js": 179,
	"./ar-ma": 180,
	"./ar-ma.js": 180,
	"./ar-sa": 181,
	"./ar-sa.js": 181,
	"./ar-tn": 182,
	"./ar-tn.js": 182,
	"./ar.js": 176,
	"./az": 183,
	"./az.js": 183,
	"./be": 184,
	"./be.js": 184,
	"./bg": 185,
	"./bg.js": 185,
	"./bm": 186,
	"./bm.js": 186,
	"./bn": 187,
	"./bn.js": 187,
	"./bo": 188,
	"./bo.js": 188,
	"./br": 189,
	"./br.js": 189,
	"./bs": 190,
	"./bs.js": 190,
	"./ca": 191,
	"./ca.js": 191,
	"./cs": 192,
	"./cs.js": 192,
	"./cv": 193,
	"./cv.js": 193,
	"./cy": 194,
	"./cy.js": 194,
	"./da": 195,
	"./da.js": 195,
	"./de": 196,
	"./de-at": 197,
	"./de-at.js": 197,
	"./de-ch": 198,
	"./de-ch.js": 198,
	"./de.js": 196,
	"./dv": 199,
	"./dv.js": 199,
	"./el": 200,
	"./el.js": 200,
	"./en-au": 201,
	"./en-au.js": 201,
	"./en-ca": 202,
	"./en-ca.js": 202,
	"./en-gb": 203,
	"./en-gb.js": 203,
	"./en-ie": 204,
	"./en-ie.js": 204,
	"./en-il": 205,
	"./en-il.js": 205,
	"./en-nz": 206,
	"./en-nz.js": 206,
	"./eo": 207,
	"./eo.js": 207,
	"./es": 208,
	"./es-do": 209,
	"./es-do.js": 209,
	"./es-us": 210,
	"./es-us.js": 210,
	"./es.js": 208,
	"./et": 211,
	"./et.js": 211,
	"./eu": 212,
	"./eu.js": 212,
	"./fa": 213,
	"./fa.js": 213,
	"./fi": 214,
	"./fi.js": 214,
	"./fo": 215,
	"./fo.js": 215,
	"./fr": 216,
	"./fr-ca": 217,
	"./fr-ca.js": 217,
	"./fr-ch": 218,
	"./fr-ch.js": 218,
	"./fr.js": 216,
	"./fy": 219,
	"./fy.js": 219,
	"./gd": 220,
	"./gd.js": 220,
	"./gl": 221,
	"./gl.js": 221,
	"./gom-latn": 222,
	"./gom-latn.js": 222,
	"./gu": 223,
	"./gu.js": 223,
	"./he": 224,
	"./he.js": 224,
	"./hi": 225,
	"./hi.js": 225,
	"./hr": 226,
	"./hr.js": 226,
	"./hu": 227,
	"./hu.js": 227,
	"./hy-am": 228,
	"./hy-am.js": 228,
	"./id": 229,
	"./id.js": 229,
	"./is": 230,
	"./is.js": 230,
	"./it": 231,
	"./it.js": 231,
	"./ja": 232,
	"./ja.js": 232,
	"./jv": 233,
	"./jv.js": 233,
	"./ka": 234,
	"./ka.js": 234,
	"./kk": 235,
	"./kk.js": 235,
	"./km": 236,
	"./km.js": 236,
	"./kn": 237,
	"./kn.js": 237,
	"./ko": 238,
	"./ko.js": 238,
	"./ky": 239,
	"./ky.js": 239,
	"./lb": 240,
	"./lb.js": 240,
	"./lo": 241,
	"./lo.js": 241,
	"./lt": 242,
	"./lt.js": 242,
	"./lv": 243,
	"./lv.js": 243,
	"./me": 244,
	"./me.js": 244,
	"./mi": 245,
	"./mi.js": 245,
	"./mk": 246,
	"./mk.js": 246,
	"./ml": 247,
	"./ml.js": 247,
	"./mn": 248,
	"./mn.js": 248,
	"./mr": 249,
	"./mr.js": 249,
	"./ms": 250,
	"./ms-my": 251,
	"./ms-my.js": 251,
	"./ms.js": 250,
	"./mt": 252,
	"./mt.js": 252,
	"./my": 253,
	"./my.js": 253,
	"./nb": 254,
	"./nb.js": 254,
	"./ne": 255,
	"./ne.js": 255,
	"./nl": 256,
	"./nl-be": 257,
	"./nl-be.js": 257,
	"./nl.js": 256,
	"./nn": 258,
	"./nn.js": 258,
	"./pa-in": 259,
	"./pa-in.js": 259,
	"./pl": 260,
	"./pl.js": 260,
	"./pt": 261,
	"./pt-br": 262,
	"./pt-br.js": 262,
	"./pt.js": 261,
	"./ro": 263,
	"./ro.js": 263,
	"./ru": 264,
	"./ru.js": 264,
	"./sd": 265,
	"./sd.js": 265,
	"./se": 266,
	"./se.js": 266,
	"./si": 267,
	"./si.js": 267,
	"./sk": 268,
	"./sk.js": 268,
	"./sl": 269,
	"./sl.js": 269,
	"./sq": 270,
	"./sq.js": 270,
	"./sr": 271,
	"./sr-cyrl": 272,
	"./sr-cyrl.js": 272,
	"./sr.js": 271,
	"./ss": 273,
	"./ss.js": 273,
	"./sv": 274,
	"./sv.js": 274,
	"./sw": 275,
	"./sw.js": 275,
	"./ta": 276,
	"./ta.js": 276,
	"./te": 277,
	"./te.js": 277,
	"./tet": 278,
	"./tet.js": 278,
	"./tg": 279,
	"./tg.js": 279,
	"./th": 280,
	"./th.js": 280,
	"./tl-ph": 281,
	"./tl-ph.js": 281,
	"./tlh": 282,
	"./tlh.js": 282,
	"./tr": 283,
	"./tr.js": 283,
	"./tzl": 284,
	"./tzl.js": 284,
	"./tzm": 285,
	"./tzm-latn": 286,
	"./tzm-latn.js": 286,
	"./tzm.js": 285,
	"./ug-cn": 287,
	"./ug-cn.js": 287,
	"./uk": 288,
	"./uk.js": 288,
	"./ur": 289,
	"./ur.js": 289,
	"./uz": 290,
	"./uz-latn": 291,
	"./uz-latn.js": 291,
	"./uz.js": 290,
	"./vi": 292,
	"./vi.js": 292,
	"./x-pseudo": 293,
	"./x-pseudo.js": 293,
	"./yo": 294,
	"./yo.js": 294,
	"./zh-cn": 295,
	"./zh-cn.js": 295,
	"./zh-hk": 296,
	"./zh-hk.js": 296,
	"./zh-tw": 297,
	"./zh-tw.js": 297
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
webpackContext.id = 407;

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__ = __webpack_require__(345);
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
                    alert("failed: " + status);
                    _this.storage.get("subscription").then(function (data) {
                        if (data) {
                            var alert_1 = _this.alertCtrl.create({
                                title: 'Connection Failed',
                                subTitle: 'Failed to retreive Salat times from the server',
                                message: 'Please check your internet connection.',
                                buttons: ['Dismiss']
                            });
                            alert_1.present();
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
                setTimeout(function () {
                    if (_this.useNative) {
                        mqtt.connect();
                    }
                    else {
                        /*
                        this.client  = mqttJs.connect({
                            username:"wentity",
                            password:"wentity@1234",
                            host:'b-f4be5e8b-748c-4ac6-875f-56badddbf4c7-1.mq.ap-southeast-2.amazonaws.com',
                            port:8883,
                            protocol: 'wss'
                        });
                        */
                    }
                }, 3000);
            });
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
                //alert("An update to your Salat times or an announcement has been made.");    
                /*
                this.localNotifications.schedule({
                  id: 1,
                  title: 'Update Received',
                  text: 'An update to your Salat times or an announcement has been made.',
                  smallIcon: 'res://small_icon'
                });
                */
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 47:
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

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(174);
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
            if ((!_this.network.type || _this.network.type === "none") && _this.platform.is("cordova")) {
                _this.connectionStatus = false;
                _this.events.publish("app:offline");
                _this.startHeartbeat();
            }
        });
        console.log("settng up");
        this.network.onDisconnect().subscribe(function (data) {
            console.log('network was disconnected :-(');
            _this.connectionStatus = false;
            _this.events.publish("network:offline");
            _this.startHeartbeat();
        }, function (error) {
            //console.error(error)
        });
        this.network.onConnect().subscribe(function (data) {
            console.log('network connected!');
            _this.connectionStatus = true;
            setTimeout(function () {
                _this.events.publish("network:online");
            }, 3000);
        }, function (error) {
            //console.error(error)
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
                this.startHeartbeat();
            }
        }
    };
    ConnectionProvider.prototype.startHeartbeat = function () {
        var _this = this;
        if (this.heartbeatStarted) {
            return;
        }
        //this.events.publish("app:offline");
        this.heartbeatStarted = true;
        this.heartbeat = setInterval(function () {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/countries").subscribe(function (res) {
                _this.connectionStatus = true;
                _this.events.publish("network:online");
                clearInterval(_this.heartbeat);
                _this.heartbeatStarted = false;
            });
        }, 20000);
    };
    ConnectionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
    ], ConnectionProvider);
    return ConnectionProvider;
}());

//# sourceMappingURL=connection.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__ = __webpack_require__(48);
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
    ChannelProvider.prototype.getSubscriptions = function (userEmail) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/secured/subscribers/subscrictionlist/" + userEmail, { headers: headers }).subscribe(function (res) {
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__["a" /* ConnectionProvider */]])
    ], ChannelProvider);
    return ChannelProvider;
}());

//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prayer_prayer__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_events__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feedback_feedback__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(12);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\tabs\tabs.html"*/'<ion-tabs tabsPlacement="top" tabsLayout=\'title-hide\' color=\'secondary\' selectedIndex="2">\n  <ion-tab [root]="tab1Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Announcements" tabIcon="megaphone"></ion-tab>\n   <ion-tab [root]="tab3Root" tabTitle="Prayer Time" tabIcon="pulse"></ion-tab> \n  <ion-tab [root]="tab4Root" tabTitle="Community Post" tabIcon="star"></ion-tab>\n  <ion-tab tabTitle="Logout" tabIcon="exit" (ionSelect)="logout()"></ion-tab>\n</ion-tabs>\n\n\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connection_connection__ = __webpack_require__(48);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__providers_connection_connection__["a" /* ConnectionProvider */]])
    ], CountryProvider);
    return CountryProvider;
}());

//# sourceMappingURL=country.js.map

/***/ })

},[346]);
//# sourceMappingURL=main.js.map