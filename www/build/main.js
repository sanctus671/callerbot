webpackJsonp([0],{

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
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
var SchedulerProvider = /** @class */ (function () {
    function SchedulerProvider(storage, platform, localNotifications) {
        var _this = this;
        this.storage = storage;
        this.platform = platform;
        this.localNotifications = localNotifications;
        this.properties = { isSettingNotifcations: false };
        this.settings = { sound: "sound" };
        this.storage.get("settings").then(function (data) {
            if (data) {
                _this.settings = data;
            }
        });
    }
    SchedulerProvider.prototype.generateNotifications = function (prayerTimes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.properties.isSettingNotifications) {
                resolve();
                return;
            }
            if (!_this.platform.is("cordova")) {
                resolve();
                return;
            }
            _this.properties.isSettingNotifications = true;
            _this.localNotifications.getScheduledIds().then(function (ids) {
                var notPrayerTime = ids.indexOf(1);
                if (notPrayerTime > -1) {
                    ids.splice(notPrayerTime, 1);
                }
                notPrayerTime = ids.indexOf(2);
                if (notPrayerTime > -1) {
                    ids.splice(notPrayerTime, 1);
                }
                var timeoutTime = ids.length * 50;
                if (timeoutTime < 5000) {
                    timeoutTime = 5000;
                }
                else if (timeoutTime > 15000) {
                    timeoutTime = 15000;
                }
                _this.localNotifications.cancel(ids).then(function () {
                    _this.scheduleNotifications(prayerTimes, timeoutTime);
                    resolve();
                }).catch(function () {
                    _this.scheduleNotifications(prayerTimes, timeoutTime);
                    resolve();
                });
            }).catch(function () {
                _this.scheduleNotifications(prayerTimes, 5000);
                resolve();
            });
            /*
            this.localNotifications.cancelAll().then(() => {
                this.scheduleNotifications(prayerTimes);
                resolve();
            }).catch(() => {
                this.scheduleNotifications(prayerTimes);
                resolve();
            })
            */
        });
    };
    SchedulerProvider.prototype.scheduleNotifications = function (prayerTimes, timeoutTime) {
        var _this = this;
        setTimeout(function () {
            var id = 3;
            for (var _i = 0, prayerTimes_1 = prayerTimes; _i < prayerTimes_1.length; _i++) {
                var prayer = prayerTimes_1[_i];
                var prayerTime = __WEBPACK_IMPORTED_MODULE_4_moment__((prayer.activateDateTime + " " + prayer.adzanTime), 'DD-MM-YYYY hh:mm A');
                var prayerTime2 = __WEBPACK_IMPORTED_MODULE_4_moment__((prayer.activateDateTime + " " + prayer.ikhamaTime), 'DD-MM-YYYY hh:mm A');
                if (prayer.autoTimeUp && prayer.autoTimeUp > 0) {
                    prayerTime.add(prayer.autoTimeUp, 'minutes');
                    prayerTime2.add(prayer.autoTimeUp, 'minutes');
                }
                var prayerExpiry = __WEBPACK_IMPORTED_MODULE_4_moment__((prayer.expireDateTime + " " + prayer.adzanTime), 'DD-MM-YYYY hh:mm A');
                var days = prayerExpiry.diff(prayerTime, 'days') + 1;
                if (days > 7) {
                    days = 7;
                }
                else if (days < 2) {
                    days = 2;
                }
                var today = __WEBPACK_IMPORTED_MODULE_4_moment__().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
                ;
                var sound = "";
                //set sounds
                if (prayer.prayerName === "Fajar" && (_this.settings && _this.settings.sound !== "default")) {
                    sound = 'file://assets/audio/Azan-S.mp3';
                }
                else if (prayer.prayerName === "Day" && (_this.settings && _this.settings.sound !== "default")) {
                    sound = '';
                }
                else if (prayer.prayerName !== "Tahajjud" && prayer.prayerName !== "Chasht" && (_this.settings && _this.settings.sound !== "default")) {
                    sound = 'file://assets/audio/Azan-A.mp3';
                }
                var prayerType1 = "Adzan";
                var prayerType2 = "Ikhama";
                //set prayer names 
                if (prayer.prayerName === "Day") {
                    prayerType1 = "Sunrise";
                    prayerType2 = "Sunset";
                }
                else if (prayer.prayerName === "Tahajjud") {
                    prayerType1 = "Start";
                    prayerType2 = "End";
                }
                var channel = ((prayer && prayer.prayerName) ? prayer.prayerName.toLowerCase().split(' ').join('') : "prayer");
                for (var i = 0; i < days; i++) {
                    var prayerTimeYear = prayerTime.year();
                    var prayerTimeMonth = prayerTime.month();
                    var prayerTimeDay = prayerTime.date();
                    var prayerTimeHour = prayerTime.hour();
                    var prayerTimeMinutes = prayerTime.minutes();
                    var prayerTimeDayOfWeek = prayerTime.isoWeekday();
                    var shouldSchedule = prayer.prayerName !== "Day" && ((prayerTimeDayOfWeek === 5 && prayer.fridayPrayer) || (prayerTimeDayOfWeek !== 5 && !prayer.fridayOnly));
                    if (prayerTime.isAfter(today) && shouldSchedule) {
                        cordova.plugins.notification.local.schedule({
                            id: id,
                            title: prayer.prayerName + " prayer (" + prayerType1 + ")",
                            text: "Starts at " + prayer.adzanTime.trim(),
                            smallIcon: 'res://small_icon',
                            sound: sound,
                            foreground: true,
                            vibrate: true,
                            channel: channel + "adzan",
                            trigger: { at: new Date(prayerTimeYear, prayerTimeMonth, prayerTimeDay, prayerTimeHour, prayerTimeMinutes) }
                        });
                        id++;
                    }
                    var prayerTime2Year = prayerTime2.year();
                    var prayerTime2Month = prayerTime2.month();
                    var prayerTime2Day = prayerTime2.date();
                    var prayerTime2Hour = prayerTime2.hour();
                    var prayerTime2Minutes = prayerTime2.minutes();
                    var prayerTime2DayOfWeek = prayerTime2.isoWeekday();
                    var shouldSchedule2 = prayer.prayerName !== "Day" && ((prayerTime2DayOfWeek === 5 && prayer.fridayPrayer) || (prayerTimeDayOfWeek !== 5 && !prayer.fridayOnly));
                    if (prayerTime2.isAfter(today) && shouldSchedule2) {
                        cordova.plugins.notification.local.schedule({
                            id: id,
                            title: prayer.prayerName + " prayer (" + prayerType2 + ")",
                            text: "Starts at " + prayer.ikhamaTime.trim(),
                            smallIcon: 'res://small_icon',
                            sound: '',
                            foreground: true,
                            vibrate: true,
                            channel: "ikhama",
                            trigger: { at: new Date(prayerTime2Year, prayerTime2Month, prayerTime2Day, prayerTime2Hour, prayerTime2Minutes) }
                        });
                        id++;
                    }
                    prayerTime.add(1, 'days');
                    prayerTime2.add(1, 'days');
                }
            }
            _this.properties.isSettingNotifications = false;
        }, timeoutTime);
    };
    SchedulerProvider.prototype.dailyNotifications = function () {
        cordova.plugins.notification.local.schedule({
            id: 2,
            title: 'Check your Salat times',
            text: 'Open the app to ensure you have the most up to date Salat times',
            smallIcon: 'res://small_icon',
            channel: "channel1",
            vibrate: true,
            trigger: { every: { hour: 17, minute: 0 } }
        });
    };
    SchedulerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], SchedulerProvider);
    return SchedulerProvider;
}());

//# sourceMappingURL=scheduler.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddChannelModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_country_country__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
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
            _this.regions = data[0].regionsList;
            if (_this.region) {
                _this.getCities();
            }
            if (_this.subscription.cityId) {
                _this.getChannels();
            }
        }).catch(function () {
        });
    };
    AddChannelModal.prototype.getCities = function () {
        for (var _i = 0, _a = this.regions; _i < _a.length; _i++) {
            var region = _a[_i];
            if (parseInt(region.regionId) === parseInt(this.region)) {
                this.cities = region.citiesList;
            }
        }
    };
    AddChannelModal.prototype.getChannels = function () {
        var _this = this;
        this.channels = [];
        this.channelProvider.getChannels(this.subscription.cityId).then(function (data) {
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
            selector: 'add-channel',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\modals\add-channel\add-channel.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Add Channel\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content padding>\n    \n    \n    <div class="subscribe-form">\n        <div class="login-top-section signup-top-section">\n            <h2>Please choose your location</h2>\n        </div>    \n\n        <ion-list class="login-form" ion-card>\n            \n            <ion-item>\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    Region\n                </ion-label>\n                <ion-select [(ngModel)]="region" (ionChange)="getCities()">\n                    <ion-option value="{{region.regionId}}" *ngFor="let region of regions">{{region.regionName}}</ion-option>\n                </ion-select>\n            </ion-item>        \n            \n\n            <ion-item *ngIf="region">\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    City\n                </ion-label>\n                <ion-select [(ngModel)]="subscription.cityId" (ionChange)="getChannels()">\n                    <ion-option value="{{city.cityId}}" *ngFor="let city of cities">{{city.cityName}}</ion-option>\n                </ion-select>\n            </ion-item>\n           \n\n        </ion-list>\n    \n        <div class="choose-channel" *ngIf="subscription.cityId">\n            <h2>Please choose your channel</h2>\n\n            <div class="channels">\n                <button ion-button  *ngFor="let channel of channels" [disabled]="isSubscribed(channel)" [outline]="subscription.hubId !== channel.hubId" color=\'light\' round class="subscribe-button" (click)="selectChannel(channel)">\n                    <ion-icon name="heart"></ion-icon> \n                    {{channel.channelName}}\n                </button>                    \n            </div>\n        \n        </div>\n         \n    </div>\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\modals\add-channel\add-channel.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_country_country__["a" /* CountryProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], AddChannelModal);
    return AddChannelModal;
}());

//# sourceMappingURL=add-channel.js.map

/***/ }),

/***/ 129:
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
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 171:
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
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_country_country__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_connection_connection__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_scheduler_scheduler__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_add_channel_add_channel__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_geocoder__ = __webpack_require__(116);
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
    function PrayerPage(navCtrl, geolocation, nativeGeocoder, platform, modalCtrl, countryProvider, channelProvider, alertCtrl, storage, events, localNotifications, ngZone, connectionProvider, schedulerProvider) {
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
        this.schedulerProvider = schedulerProvider;
        this.connectionStatus = true;
        this.dayPrayer = {};
        this.tahajjudPrayer = {};
        this.loading = true;
        this.channelLoading = true;
        this.subscription = { cityId: "", hubId: "" };
        this.cities = [];
        this.regions = [];
        this.region = "";
        this.cityName = "";
        this.regionName = "";
        this.channels = [];
        this.prayerTimes = {};
        this.dayPrayer = {};
        this.tahajjudPrayer = {};
        this.subscriptions = [];
        this.settings = { sound: "sound" };
        this.alerts = [];
        this.getCountries();
        this.currentPosition = { latitude: false, longitude: false };
        this.storage.get("settings").then(function (data) {
            if (data) {
                _this.settings = data;
            }
        });
        this.storage.get("subscribedChannel").then(function (data) {
            _this.channelLoading = false;
            if (data) {
                _this.subscribedChannel = data;
                _this.openSubscribedChannel();
                _this.getSalatTimes(false, _this.subscribedChannel.hubId);
            }
            else {
                _this.loading = false;
            }
        });
        this.storage.get("subscription").then(function (data) {
            if (data) {
                _this.subscription = data;
            }
        });
        this.storage.get("subscriptions").then(function (data) {
            if (data) {
                _this.subscriptions = data;
                _this.openSubscribedChannel();
            }
            else {
                _this.subscriptions = [];
            }
        });
        this.user = { appUserName: "", email: "", mobile: "", password: "" };
        this.storage.get("user").then(function (data) {
            if (data) {
                _this.user.userId = data.userId;
                _this.user.appUserName = data.appUserName;
                _this.user.email = data.email;
                _this.user.mobile = data.mobile;
                _this.user.password = "";
                _this.getSubscriptions();
            }
        });
        this.events.subscribe("mqtt:message", function () {
            for (var _i = 0, _a = _this.subscription; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.getSalatTimes(true, item.hub.hubId);
            }
        });
        this.connectionStatus = this.connectionProvider.getConnectionStatus();
        this.events.subscribe("network:online", function () {
            for (var _i = 0, _a = _this.subscription; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.getSalatTimes(true, item.hub.hubId);
            }
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
        this.events.subscribe("notification:received", function () {
            for (var _i = 0, _a = _this.subscription; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.getSalatTimes(true, item.hub.hubId);
            }
        });
        this.platform.resume.subscribe(function () {
            _this.ngZone.run(function () {
                _this.connectionStatus = _this.connectionProvider.getConnectionStatus();
            });
        });
        this.setupDailyNotification();
    }
    PrayerPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.subscribedChannel) {
            this.getSalatTimes(false, this.subscribedChannel.hubId);
        }
        this.ngZone.run(function () {
            _this.connectionStatus = _this.connectionProvider.getConnectionStatus();
        });
        this.storage.get("subscriptions").then(function (data) {
            if (data) {
                _this.subscriptions = data;
                _this.openSubscribedChannel();
            }
            else {
                _this.subscriptions = [];
            }
        });
        this.channelLoading = true;
        this.loading = true;
        this.subscribedChannel = null;
        this.storage.get("subscribedChannel").then(function (data) {
            _this.channelLoading = false;
            if (data) {
                _this.subscribedChannel = data;
                _this.openSubscribedChannel();
                _this.getSalatTimes(false, _this.subscribedChannel.hubId);
            }
            else {
                _this.loading = false;
            }
        });
    };
    PrayerPage.prototype.openSubscribedChannel = function () {
        var _this = this;
        if (!this.subscribedChannel) {
            return;
        }
        for (var index in this.subscriptions) {
            if (this.subscriptions[index]["hub"]["hubId"] === this.subscribedChannel.hubId) {
                this.ngZone.run(function () {
                    _this.subscriptions[index].opened = true;
                    _this.getSalatTimes(false, _this.subscriptions[index].hub.hubId);
                });
            }
        }
    };
    PrayerPage.prototype.setupDailyNotification = function () {
        if (this.platform.is("cordova")) {
            cordova.plugins.notification.local.schedule({
                id: 2,
                title: 'Check your Salat times',
                text: 'Open the app to ensure you have the most up to date Salat times',
                smallIcon: 'res://small_icon',
                channel: "channel1",
                vibrate: true,
                trigger: { every: { hour: 17, minute: 0 } }
            });
        }
    };
    PrayerPage.prototype.setLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.currentPosition.latitude = resp.coords.latitude;
            _this.currentPosition.longitude = resp.coords.longitude;
            _this.nativeGeocoder.reverseGeocode(_this.currentPosition.latitude, _this.currentPosition.longitude, { useLocale: true, maxResults: 1 })
                .then(function (result) {
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
        });
    };
    PrayerPage.prototype.getSubscriptions = function () {
        var _this = this;
        this.channelProvider.getSubscriptions(this.user.email).then(function (channels) {
            //check for duplicates
            var duplicates = [];
            var seenIds = [];
            for (var index in channels) {
                if (channels[index].hub) {
                    if (seenIds.indexOf(channels[index].hub.hubId) > -1) {
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
            _this.openSubscribedChannel();
            _this.storage.set("subscriptions", channels);
            if (!_this.subscribedChannel && channels && channels.length > 0 && channels.length < 2) {
                _this.subscribedChannel = channels[0].hub;
                _this.subscription = { hubId: channels[0].hub.hubId, subscriberId: channels[0].subscriberId };
                _this.storage.set("subscription", _this.subscription);
                _this.storage.set("subscribedChannel", _this.subscribedChannel);
                _this.events.publish("channel:subscribed", channels[0].hub.hubId);
                _this.openSubscribedChannel();
                _this.getSalatTimes(false, _this.subscribedChannel.hubId);
            }
            else if (!_this.subscribedChannel && channels && channels.length > 1) {
                //notify user to subscribe to channel
                var alert_1 = _this.alertCtrl.create({
                    title: 'Activate Channel',
                    message: 'You are subscribed to multiple channels. Ensure you choose a channel to make active to receive notifications on prayer times.',
                    buttons: ['Dismiss']
                });
                _this.alerts.push(alert_1);
                alert_1.present();
            }
        });
    };
    PrayerPage.prototype.getSalatTimes = function (isMqtt, hubId) {
        var _this = this;
        if (hubId) {
            this.channelProvider.getSalatTimes(hubId).then(function (times) {
                _this.loading = false;
                _this.ngZone.run(function () {
                    _this.prayerTimes[hubId] = _this.filterPrayers(times, hubId);
                });
                if (hubId !== _this.subscribedChannel.hubId) {
                    return;
                }
                _this.generateNotifications();
                var latestSalatTimeId = 0;
                if (times && times.length > 0) {
                    latestSalatTimeId = times[0].salatTimeId;
                }
                if (isMqtt) {
                    _this.generateMqttNotification(latestSalatTimeId, times);
                }
                else {
                    _this.storage.set("salatTimes", times);
                    _this.storage.set("latestSalatTimeId", latestSalatTimeId);
                }
            }).catch(function () {
                _this.loading = false;
                _this.storage.get("salatTimes").then(function (data) {
                    if (data) {
                        _this.ngZone.run(function () {
                            _this.prayerTimes[hubId] = _this.filterPrayers(data, hubId);
                        });
                        if (hubId !== _this.subscribedChannel.hubId) {
                            return;
                        }
                        _this.generateNotifications();
                    }
                });
            });
        }
    };
    PrayerPage.prototype.filterPrayers = function (prayerTimes, hubId) {
        var filteredPrayers = [];
        for (var _i = 0, prayerTimes_1 = prayerTimes; _i < prayerTimes_1.length; _i++) {
            var prayer = prayerTimes_1[_i];
            var prayerExpiry = __WEBPACK_IMPORTED_MODULE_5_moment__(prayer.expireDateTime, 'DD-MM-YYYY');
            var prayerStart = __WEBPACK_IMPORTED_MODULE_5_moment__(prayer.activateDateTime, 'DD-MM-YYYY');
            var today = __WEBPACK_IMPORTED_MODULE_5_moment__().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            var tomorrow = __WEBPACK_IMPORTED_MODULE_5_moment__().add(1, 'days').set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            if (prayer.adzanTime && prayer.prayerName !== "Tahajjud") {
                var prayerCompareTime = __WEBPACK_IMPORTED_MODULE_5_moment__(prayer.adzanTime, ['h:m a', 'H:m']).toDate();
                prayer["compareTime"] = prayerCompareTime;
            }
            else if (prayer.ikhamaTime && prayer.prayerName === "Tahajjud") {
                var prayerCompareTime = __WEBPACK_IMPORTED_MODULE_5_moment__(prayer.ikhamaTime, ['h:m a', 'H:m']).toDate();
                prayer["compareTime"] = prayerCompareTime;
            }
            else {
                var prayerCompareTime = __WEBPACK_IMPORTED_MODULE_5_moment__().toDate();
                prayer["compareTime"] = prayerCompareTime;
            }
            var prayerTimeDayOfWeek = today.isoWeekday();
            //if it is friday, show only prayers with fridayPrayer as true
            var shouldShow = (prayerTimeDayOfWeek === 5 && prayer.fridayPrayer) || (prayerTimeDayOfWeek !== 5 && !prayer.fridayOnly);
            if (prayerExpiry.isSameOrAfter(today) && prayerStart.isSameOrBefore(tomorrow) && shouldShow) {
                filteredPrayers.push(prayer);
            }
            if (prayer.prayerName === "Day") {
                this.dayPrayer[hubId] = prayer;
            }
            else if (prayer.prayerName === "Tahajjud") {
                this.tahajjudPrayer[hubId] = prayer;
            }
        }
        filteredPrayers.sort(function (a, b) {
            if (a["compareTime"] > b["compareTime"]) {
                return 1;
            }
            else if (a["compareTime"] < b["compareTime"]) {
                return -1;
            }
            return 0;
        });
        return filteredPrayers;
    };
    PrayerPage.prototype.generateMqttNotification = function (latestSalatTimeId, newTimes) {
        var _this = this;
        this.storage.get("latestSalatTimeId").then(function (id) {
            if (id !== latestSalatTimeId) {
                //is an update salat time
                _this.doSalatTimesChangedAlert();
                _this.storage.set("latestSalatTimeId", latestSalatTimeId);
                _this.storage.set("salatTimes", newTimes);
            }
            else {
                //check to see if any salat times have changes
                _this.storage.get("salatTimes").then(function (oldTimes) {
                    oldTimes = oldTimes ? oldTimes : [];
                    newTimes = newTimes ? newTimes : [];
                    var timesChanged = false;
                    for (var _i = 0, newTimes_1 = newTimes; _i < newTimes_1.length; _i++) {
                        var newTime = newTimes_1[_i];
                        for (var _a = 0, oldTimes_1 = oldTimes; _a < oldTimes_1.length; _a++) {
                            var oldTime = oldTimes_1[_a];
                            if (newTime.salatTimeId === oldTime.salatTimeId) {
                                for (var index in oldTime) {
                                    if (index !== "compareTime" && oldTime[index] !== newTime[index]) {
                                        timesChanged = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (timesChanged) {
                        _this.doSalatTimesChangedAlert();
                    }
                    else {
                        //is an announcement
                        _this.doAnnouncementAddedEvent();
                    }
                    _this.storage.set("salatTimes", newTimes);
                });
                _this.storage.set("latestSalatTimeId", latestSalatTimeId);
            }
        });
    };
    PrayerPage.prototype.getPrayer = function (prayerName, prayerTimes) {
        for (var _i = 0, prayerTimes_2 = prayerTimes; _i < prayerTimes_2.length; _i++) {
            var prayer = prayerTimes_2[_i];
            if (prayer.prayerName === prayerName) {
                return prayer;
            }
        }
        return false;
    };
    PrayerPage.prototype.doSalatTimesChangedAlert = function () {
        var _this = this;
        /*
        this.localNotifications.schedule({
          id: 1,
          title: 'Update Received',
          text: 'An update to your Salat times has been made.',
          smallIcon: 'res://small_icon',
          channel:"channel1",
          vibrate:true
        });
        */
        this.dismissAlerts();
        setTimeout(function () {
            //alert("An update to your Salat times has been made.")
            var alert = _this.alertCtrl.create({
                title: 'Update Received',
                message: 'An update to your Salat times has been made.',
                buttons: ['Dismiss']
            });
            _this.alerts.push(alert);
            alert.present();
        }, 500);
    };
    PrayerPage.prototype.doAnnouncementAddedEvent = function () {
        var _this = this;
        /*
        this.localNotifications.schedule({
          id: 1,
          title: 'Update Received',
          text: 'A new announcement has been made.',
          smallIcon: 'res://small_icon',
          channel:"channel1",
          vibrate:true
        });
        */
        this.dismissAlerts();
        setTimeout(function () {
            //alert("A new announcement has been made.")
            var alert = _this.alertCtrl.create({
                title: 'Update Received',
                message: 'A new announcement has been made.',
                buttons: ['Dismiss']
            });
            _this.alerts.push(alert);
            alert.present();
        }, 500);
    };
    PrayerPage.prototype.dismissAlerts = function () {
        if (this.alerts.length > 0) {
            for (var _i = 0, _a = this.alerts; _i < _a.length; _i++) {
                var alert_2 = _a[_i];
                alert_2.dismiss();
            }
        }
        this.alerts = [];
    };
    PrayerPage.prototype.generateNotifications = function () {
        this.schedulerProvider.generateNotifications(this.prayerTimes[this.subscribedChannel.hubId]);
    };
    PrayerPage.prototype.prayerTimeHasPassed = function (prayerTime) {
        if (prayerTime.compareTime) {
            var now = new Date();
            if (prayerTime.compareTime < now) {
                return true;
            }
        }
        return false;
    };
    PrayerPage.prototype.getCountries = function () {
        var _this = this;
        this.countryProvider.getCountries().then(function (data) {
            _this.regions = data[0].regionsList;
            _this.setLocation();
        }).catch(function () {
        });
    };
    PrayerPage.prototype.getCities = function () {
        for (var _i = 0, _a = this.regions; _i < _a.length; _i++) {
            var region = _a[_i];
            if (parseInt(region.regionId) === parseInt(this.region)) {
                this.cities = region.citiesList;
            }
        }
    };
    PrayerPage.prototype.getChannels = function () {
        var _this = this;
        this.channels = [];
        this.channelProvider.getChannels(this.subscription.cityId).then(function (data) {
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
                    role: 'cancel',
                    handler: function () {
                        _this.subscription.hubId = null;
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        /*
                        this.storage.set("subscription", this.subscription);
                        console.log(channel);
                        this.storage.set("subscribedChannel", channel);
                        
                        setTimeout(() => {
                          this.subscribedChannel = channel;
                        },200);
                        
                        */
                        var subscription = { subscriberId: 0, hub: channel };
                        _this.subscriptions.push(subscription);
                        _this.channelProvider.subscribe(_this.user.email, channel.hubId).then(function (data) {
                            var id = data["subscriberId"];
                            _this.subscription.subscriberId = id;
                            subscription.subscriberId = id;
                            _this.storage.set("subscriptions", _this.subscriptions);
                            //this.storage.set("subscription", this.subscription);
                            //this.events.publish("channel:subscribed", channel.hubId);
                            _this.getSalatTimes(false, channel.hubId);
                        }).catch(function () {
                        });
                        //make sure app can run in the background
                        if (_this.platform.is("cordova")) {
                            cordova.plugins.DozeOptimize.IsIgnoringBatteryOptimizations(function (response) {
                                if (response == "false") {
                                    cordova.plugins.DozeOptimize.RequestOptimizations(function (response) {
                                    }, function (error) {
                                    });
                                }
                                else {
                                }
                            }, function (error) {
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    PrayerPage.prototype.changeSubscribedChannel = function (subscription) {
        if (this.subscription && this.subscription.hubId) {
            //unsubscribe is subscribed to a channel
            this.events.publish("channel:unsubscribed", this.subscription.hubId);
        }
        var channel = subscription.hub;
        this.subscription.hubId = channel.hubId;
        this.subscription.subscriberId = subscription.subscriberId;
        this.subscription.hub = channel;
        this.subscribedChannel = channel;
        this.storage.set("subscribedChannel", channel);
        this.storage.set("subscription", this.subscription);
        this.prayerTimes[this.subscription.hubId] = [];
        this.getSalatTimes(false, this.subscribedChannel.hubId);
        this.events.publish("channel:subscribed", channel.hubId);
    };
    PrayerPage.prototype.openChannel = function (item) {
        item.opened = !item.opened;
        if (item.opened) {
            this.getSalatTimes(false, item.hub.hubId);
        }
    };
    PrayerPage.prototype.openAddChannel = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__modals_add_channel_add_channel__["a" /* AddChannelModal */], { subscriptions: this.subscriptions, region: this.region, city: this.subscription.cityId });
        modal.onDidDismiss(function (data) {
            if (data) {
                var channel_1 = data;
                _this.channelProvider.subscribe(_this.user.email, channel_1.hubId).then(function (data) {
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
                        _this.loading = true;
                        _this.storage.remove("subscription");
                        _this.storage.remove("subscribedChannel");
                        _this.subscribedChannel = null;
                        var id = _this.subscription["subscriberId"];
                        var hubId = _this.subscription["hubId"];
                        _this.channelProvider.unsubscribe(id).then(function (data) {
                            _this.events.publish("channel:unsubscribed", hubId);
                            _this.subscription = { cityId: "", hubId: "" };
                            _this.getSubscriptions();
                            _this.loading = false;
                        }).catch(function () {
                            _this.getSubscriptions();
                            _this.loading = false;
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    PrayerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-prayer',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\prayer\prayer.html"*/'\n\n<ion-content padding>\n    \n    <h1 class="screen-title">Prayer Times</h1>\n    \n    <div class="offline-status" *ngIf="!connectionStatus">\n        <ion-spinner></ion-spinner>\n        Checking for internet connection...    \n    </div>    \n    \n    <div class="subscribe-form" *ngIf="!subscribedChannel && !loading && subscriptions.length < 1">\n        <div class="login-top-section signup-top-section">\n\n            <img class="logo" src="assets/imgs/logo-light.png" />\n            <h2>Please choose your location</h2>\n        </div>    \n\n        <ion-list class="login-form" ion-card>\n            \n            <ion-item>\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    Region\n                </ion-label>\n                <ion-select [(ngModel)]="region" (ionChange)="getCities()">\n                    <ion-option value="{{region.regionId}}" *ngFor="let region of regions">{{region.regionName}}</ion-option>\n                </ion-select>\n            </ion-item>        \n            \n\n            <ion-item *ngIf="region">\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    City\n                </ion-label>\n                <ion-select [(ngModel)]="subscription.cityId" (ionChange)="getChannels()">\n                    <ion-option value="{{city.cityId}}" *ngFor="let city of cities">{{city.cityName}}</ion-option>\n                </ion-select>\n            </ion-item>\n           \n\n        </ion-list>\n    \n        <div class="choose-channel" *ngIf="subscription.cityId">\n            <h2>Please choose your channel</h2>\n\n            <div class="channels">\n                <button ion-button  *ngFor="let channel of channels" [outline]="subscription.hubId !== channel.hubId" color=\'light\' round class="subscribe-button" (click)="selectChannel(channel)">\n                    <ion-icon name="heart"></ion-icon> \n                    {{channel.channelName}}\n                </button>                    \n            </div>\n        \n        </div>\n        \n    </div>\n    \n    <div *ngIf="!channelLoading" class="channel-subscriptions">\n\n        <div *ngFor="let item of subscriptions">\n            \n            <ion-item class="channel-name-multiple" *ngIf="subscriptions.length > 1" (click)="openChannel(item)">\n                {{item.hub.channelName}}\n                <span *ngIf="subscribedChannel && item.hub && subscribedChannel.hubId === item.hub.hubId"> (active)</span>\n                <ion-icon [name]="item.opened ? \'remove\' : \'add\'" item-end></ion-icon>\n            </ion-item>\n            \n            \n            <div class="channel-feed" *ngIf="item.opened" [ngClass]="{\'many-channels\':subscriptions.length > 1}">\n\n\n                <div class="channel-header">\n                    <h2>{{item.hub.channelName}}</h2>\n                </div>\n                 \n                <div class="channel-unsubscribe active-button">\n                <button ion-button color=\'light\' outline round class="unsubscribe-button"  (click)="changeSubscribedChannel(item)" [disabled]="subscribedChannel && item.hub && subscribedChannel.hubId === item.hub.hubId">\n                    <ion-icon name="notifications"></ion-icon> \n                    \n                    \n                    <span *ngIf="!subscribedChannel || (subscribedChannel && item.hub && subscribedChannel.hubId !== item.hub.hubId)">Make Active</span> \n                    <span *ngIf="subscribedChannel && item.hub && subscribedChannel.hubId === item.hub.hubId">Channel Active</span>\n                </button>            \n                </div>                 \n\n                <div class="channel-items">\n\n                    <ion-row class="channel-item channel-headers">\n                        <ion-col>Prayer</ion-col>\n                        <ion-col>Adzan Time</ion-col>\n                        <ion-col>Ikhama Time</ion-col>\n                    </ion-row>    \n                    \n                    <div class="content-loading" *ngIf="loading">\n                        <ion-spinner></ion-spinner>\n                    </div>\n                    \n                    <div  *ngFor="let prayerTime of prayerTimes[item.hub.hubId]">\n                        <ion-row class="channel-item" [ngClass]="{\'has-passed\':prayerTimeHasPassed(prayerTime)}" *ngIf="prayerTime.prayerName !== \'Day\' && prayerTime.prayerName !== \'Tahajjud\'">\n                            <ion-col>{{prayerTime.prayerName}}</ion-col>\n                            <ion-col>{{prayerTime.adzanTime}}</ion-col>\n                            <ion-col>{{prayerTime.ikhamaTime}}</ion-col>\n                            <div class="channel-remark" *ngIf="prayerTime.remark">{{prayerTime.remark}}</div>\n                        </ion-row>\n                    </div>\n\n                    <div *ngIf="!loading && tahajjudPrayer[item.hub.hubId] && tahajjudPrayer[item.hub.hubId].prayerName">\n                        <ion-row class="channel-item channel-headers">\n                            <ion-col>Prayer</ion-col>\n                            <ion-col>Start</ion-col>\n                            <ion-col>End</ion-col>\n                        </ion-row>   \n                        \n                        <ion-row class="channel-item"  [ngClass]="{\'has-passed\':prayerTimeHasPassed(tahajjudPrayer[item.hub.hubId])}">\n                            <ion-col>{{tahajjudPrayer[item.hub.hubId].prayerName}}</ion-col>\n                            <ion-col>{{tahajjudPrayer[item.hub.hubId].adzanTime}}</ion-col>\n                            <ion-col>{{tahajjudPrayer[item.hub.hubId].ikhamaTime}}</ion-col>\n                            <div class="channel-remark" *ngIf="tahajjudPrayer[item.hub.hubId].remark">{{tahajjudPrayer[item.hub.hubId].remark}}</div>\n                        </ion-row>                        \n                        \n                    </div>\n\n                    \n                    \n                    <div *ngIf="!loading && dayPrayer[item.hub.hubId] && dayPrayer[item.hub.hubId].prayerName">\n                        <ion-row class="channel-item channel-headers">\n                            <ion-col></ion-col>\n                            <ion-col>Sunrise</ion-col>\n                            <ion-col>Sunset</ion-col>\n                        </ion-row>   \n                        \n                        <ion-row class="channel-item">\n                            <ion-col>{{dayPrayer[item.hub.hubId].prayerName}}</ion-col>\n                            <ion-col>{{dayPrayer[item.hub.hubId].adzanTime}}</ion-col>\n                            <ion-col>{{dayPrayer[item.hub.hubId].ikhamaTime}}</ion-col>\n                            <div class="channel-remark" *ngIf="dayPrayer[item.hub.hubId].remark">{{dayPrayer[item.hub.hubId].remark}}</div>\n                        </ion-row>                        \n                        \n                    </div>\n                    \n                    \n                    \n                    \n                    \n                    \n                </div>\n\n\n            </div>\n\n        </div>\n        \n    </div>\n    \n    <ion-fab right bottom *ngIf="subscribedChannel && subscribedChannel.hubId">\n      <button ion-fab (click)="openAddChannel()"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\prayer\prayer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_country_country__["a" /* CountryProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_7__providers_connection_connection__["a" /* ConnectionProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_scheduler_scheduler__["a" /* SchedulerProvider */]])
    ], PrayerPage);
    return PrayerPage;
}());

//# sourceMappingURL=prayer.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(215);
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
        this.network.onDisconnect().subscribe(function (data) {
            _this.connectionStatus = false;
            _this.events.publish("network:offline");
            _this.startHeartbeat();
        }, function (error) {
            //console.error(error)
        });
        this.network.onConnect().subscribe(function (data) {
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
    ], ConnectionProvider);
    return ConnectionProvider;
}());

//# sourceMappingURL=connection.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_announcement_announcement__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__ = __webpack_require__(34);
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
        this.announcements = {};
        this.loading = true;
        this.channelLoading = true;
        this.events.subscribe("mqtt:message", function (message) {
            _this.getAnnouncements();
        });
        this.events.subscribe("network:online", function () {
            _this.getAnnouncements();
        });
        this.events.subscribe("notification:received", function () {
            _this.getAnnouncements();
        });
    }
    EventsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.channelLoading = true;
        this.loading = true;
        this.subscribedChannel = null;
        this.subscriptions = [];
        this.storage.get("subscriptions").then(function (data) {
            if (data) {
                _this.channelLoading = false;
                _this.subscriptions = data;
                _this.getAnnouncements();
                _this.openSubscribedChannel();
            }
            else {
                _this.loading = false;
                _this.subscriptions = [];
            }
        });
        this.storage.get("subscribedChannel").then(function (data) {
            if (data) {
                _this.subscribedChannel = data;
                _this.openSubscribedChannel();
            }
            else {
            }
        });
    };
    EventsPage.prototype.openSubscribedChannel = function () {
        var _this = this;
        if (!this.subscribedChannel) {
            return;
        }
        for (var index in this.subscriptions) {
            if (this.subscriptions[index]["hub"]["hubId"] === this.subscribedChannel.hubId) {
                this.ngZone.run(function () {
                    _this.subscriptions[index].opened = true;
                });
            }
        }
    };
    EventsPage.prototype.openChannel = function (item) {
        item.opened = !item.opened;
    };
    EventsPage.prototype.getAnnouncements = function () {
        var _this = this;
        var _loop_1 = function (subscription) {
            this_1.channelProvider.getAnnouncements(subscription.hub.hubId).then(function (announcements) {
                _this.loading = false;
                _this.ngZone.run(function () {
                    _this.announcements[subscription.hub.hubId] = _this.filterAnnouncements(announcements);
                });
                _this.storage.set("announcements", _this.announcements);
            }).catch(function () {
                _this.loading = false;
                _this.storage.get("announcements").then(function (data) {
                    if (data) {
                        _this.ngZone.run(function () {
                            _this.announcements = _this.filterAnnouncements(data);
                        });
                    }
                });
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var subscription = _a[_i];
            _loop_1(subscription);
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
    EventsPage.prototype.formatDate = function (date) {
        if (date) {
            return __WEBPACK_IMPORTED_MODULE_5_moment__(date).format("DD-MM-YYYY hh:mm A");
        }
        return "";
    };
    EventsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-events',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\events\events.html"*/'\n\n\n<ion-content padding>\n    \n    <div class="subscribe-form" *ngIf="subscriptions && subscriptions.length < 1 && !loading">\n        <div class="login-top-section signup-top-section">\n\n            <img class="logo" src="assets/imgs/logo-light.png" />\n            <h2>You are not subscribed to a channel</h2>\n        </div>  \n    </div>\n        \n    <div class="channel-feed" *ngIf="subscriptions && subscriptions.length > 0 && !channelLoading">\n        \n        \n        <h1 class="screen-title">Announcements</h1>\n        \n        <div class="content-loading" *ngIf="loading">\n            <ion-spinner></ion-spinner>\n        </div>    \n        \n        \n        <div *ngFor="let item of subscriptions">\n            \n            <ion-item class="channel-name-multiple" *ngIf="subscriptions.length > 1" (click)="openChannel(item)">\n                {{item.hub.channelName}} ({{announcements[item.hub.hubId] ? announcements[item.hub.hubId].length : ""}})\n                <ion-icon [name]="item.opened ? \'remove\' : \'add\'" item-end></ion-icon>\n            </ion-item>   \n            \n            <div  *ngIf="announcements[item.hub.hubId] && item.opened">\n                <ion-row class="channel-item channel-headers events-headers">\n                    <ion-col col-5>Title</ion-col>\n                    <ion-col col-3>Start</ion-col>\n                    <ion-col col-3>End</ion-col>\n                    <ion-col col-1></ion-col>                    \n                </ion-row>              \n\n                <div class="channel-items events-items" *ngIf="!loading">\n                    <ion-row class="channel-item" *ngFor="let announcement of announcements[item.hub.hubId]" (click)="openAnnouncement(announcement)">\n                        <ion-col col-5>{{announcement.title}}</ion-col>\n                        <ion-col col-3>{{announcement.eventStart}}</ion-col>\n                        <ion-col col-3>{{announcement.eventEnd}}</ion-col>\n                        <ion-col col-1>\n\n                            <ion-icon ios=\'ios-arrow-forward\' md=\'ios-arrow-forward\'></ion-icon>                    \n\n                        </ion-col>\n                    </ion-row>\n                </div>\n\n                \n            </div>\n            \n        </div>\n        \n    </div>        \n        \n        \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\events\events.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], EventsPage);
    return EventsPage;
}());

//# sourceMappingURL=events.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(117);
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
            selector: 'announcement',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\modals\announcement\announcement.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            {{announcement ? announcement.title : "Announcement"}}\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content class=\'standard-background\' padding>\n    \n    <div class="event-start">Start: {{announcement.eventStart}}</div>\n    <div class="event-end">End: {{announcement.eventEnd}}</div>\n\n    <div [innerHtml]="announcement.message"></div>\n    \n    <div class="attachment" *ngIf="announcement.attachementData">\n        \n        <button ion-button color=\'primary\' round class="subscribe-button" (click)="openAttachment(announcement.attachementData)">\n            <ion-icon name="attach"></ion-icon> \n            View Attachment\n        </button>          \n        \n    </div>\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\modals\announcement\announcement.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], AnnouncementModal);
    return AnnouncementModal;
}());

//# sourceMappingURL=announcement.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_country_country__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_local_notifications__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_connection_connection__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_scheduler_scheduler__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modals_add_channel_add_channel__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_geocoder__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ChannelsPage = /** @class */ (function () {
    function ChannelsPage(navCtrl, geolocation, nativeGeocoder, platform, modalCtrl, countryProvider, channelProvider, alertCtrl, storage, events, localNotifications, ngZone, connectionProvider, schedulerProvider) {
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
        this.schedulerProvider = schedulerProvider;
        this.connectionStatus = true;
        this.loading = true;
        this.channelLoading = true;
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
        this.alerts = [];
        this.getCountries();
        this.currentPosition = { latitude: false, longitude: false };
        this.storage.get("settings").then(function (data) {
            if (data) {
                _this.settings = data;
            }
        });
        this.storage.get("subscribedChannel").then(function (data) {
            _this.channelLoading = false;
            if (data) {
                _this.subscribedChannel = data;
            }
            else {
                _this.loading = false;
            }
        });
        this.storage.get("subscription").then(function (data) {
            if (data) {
                _this.subscription = data;
            }
        });
        this.storage.get("subscriptions").then(function (data) {
            if (data) {
                _this.subscriptions = data;
            }
            else {
                _this.subscriptions = [];
            }
        });
        this.user = { appUserName: "", email: "", mobile: "", password: "" };
        this.storage.get("user").then(function (data) {
            if (data) {
                _this.user.userId = data.userId;
                _this.user.appUserName = data.appUserName;
                _this.user.email = data.email;
                _this.user.mobile = data.mobile;
                _this.user.password = "";
                _this.getSubscriptions();
            }
        });
        this.events.subscribe("mqtt:message", function () {
        });
        this.connectionStatus = this.connectionProvider.getConnectionStatus();
        this.events.subscribe("network:online", function () {
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
        this.events.subscribe("notification:received", function () {
        });
        this.platform.resume.subscribe(function () {
            _this.ngZone.run(function () {
                _this.connectionStatus = _this.connectionProvider.getConnectionStatus();
            });
        });
    }
    ChannelsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.connectionStatus = _this.connectionProvider.getConnectionStatus();
        });
        this.storage.get("subscriptions").then(function (data) {
            if (data) {
                _this.subscriptions = data;
            }
            else {
                _this.subscriptions = [];
            }
        });
        this.channelLoading = true;
        this.loading = true;
        this.subscribedChannel = null;
        this.storage.get("subscribedChannel").then(function (data) {
            _this.channelLoading = false;
            if (data) {
                _this.subscribedChannel = data;
            }
            else {
                _this.loading = false;
            }
        });
    };
    ChannelsPage.prototype.setLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.currentPosition.latitude = resp.coords.latitude;
            _this.currentPosition.longitude = resp.coords.longitude;
            _this.nativeGeocoder.reverseGeocode(_this.currentPosition.latitude, _this.currentPosition.longitude, { useLocale: true, maxResults: 1 })
                .then(function (result) {
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
        });
    };
    ChannelsPage.prototype.getSubscriptions = function () {
        var _this = this;
        this.channelProvider.getSubscriptions(this.user.email).then(function (channels) {
            //check for duplicates
            var duplicates = [];
            var seenIds = [];
            for (var index in channels) {
                if (channels[index].hub) {
                    if (seenIds.indexOf(channels[index].hub.hubId) > -1) {
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
                _this.storage.set("subscription", _this.subscription);
                _this.storage.set("subscribedChannel", _this.subscribedChannel);
                _this.events.publish("channel:subscribed", channels[0].hub.hubId);
            }
        });
    };
    ChannelsPage.prototype.getCountries = function () {
        var _this = this;
        this.countryProvider.getCountries().then(function (data) {
            _this.regions = data[0].regionsList;
            _this.setLocation();
        }).catch(function () {
        });
    };
    ChannelsPage.prototype.getCities = function () {
        for (var _i = 0, _a = this.regions; _i < _a.length; _i++) {
            var region = _a[_i];
            if (parseInt(region.regionId) === parseInt(this.region)) {
                this.cities = region.citiesList;
            }
        }
    };
    ChannelsPage.prototype.getChannels = function () {
        var _this = this;
        this.channels = [];
        this.channelProvider.getChannels(this.subscription.cityId).then(function (data) {
            _this.channels = data;
        }).catch(function () {
        });
    };
    ChannelsPage.prototype.selectChannel = function (channel) {
        var _this = this;
        this.subscription.hubId = channel.hubId;
        var alert = this.alertCtrl.create({
            title: 'Subscribe',
            message: 'Are you sure you want to subscribe to this channel?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        _this.subscription.hubId = null;
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.storage.set("subscription", _this.subscription);
                        _this.storage.set("subscribedChannel", channel);
                        setTimeout(function () {
                            _this.subscribedChannel = channel;
                        }, 200);
                        var subscription = { subscriberId: 0, hub: channel };
                        _this.subscriptions.push(subscription);
                        _this.channelProvider.subscribe(_this.user.email, channel.hubId).then(function (data) {
                            var id = data["subscriberId"];
                            _this.subscription.subscriberId = id;
                            subscription.subscriberId = id;
                            _this.storage.set("subscriptions", _this.subscriptions);
                            _this.storage.set("subscription", _this.subscription);
                            _this.events.publish("channel:subscribed", channel.hubId);
                        }).catch(function () {
                        });
                        //make sure app can run in the background
                        if (_this.platform.is("cordova")) {
                            cordova.plugins.DozeOptimize.IsIgnoringBatteryOptimizations(function (response) {
                                if (response == "false") {
                                    cordova.plugins.DozeOptimize.RequestOptimizations(function (response) {
                                    }, function (error) {
                                    });
                                }
                                else {
                                }
                            }, function (error) {
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    ChannelsPage.prototype.changeSubscribedChannel = function (subscription) {
        this.events.publish("channel:unsubscribed", this.subscription.hubId);
        var channel = subscription.hub;
        this.subscription.hubId = channel.hubId;
        this.subscription.subscriberId = subscription.subscriberId;
        this.subscription.hub = channel;
        this.subscribedChannel = channel;
        this.storage.set("subscribedChannel", channel);
        this.storage.set("subscription", this.subscription);
        this.prayerTimes = [];
        this.events.publish("channel:subscribed", channel.hubId);
    };
    ChannelsPage.prototype.openAddChannel = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__modals_add_channel_add_channel__["a" /* AddChannelModal */], { subscriptions: this.subscriptions, region: this.region, city: this.subscription.cityId });
        modal.onDidDismiss(function (data) {
            if (data) {
                var channel_1 = data;
                _this.channelProvider.subscribe(_this.user.email, channel_1.hubId).then(function (data) {
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
    ChannelsPage.prototype.unsubscribe = function (item) {
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
                        _this.loading = true;
                        _this.storage.remove("subscription");
                        _this.storage.remove("subscribedChannel");
                        _this.subscribedChannel = null;
                        var id = item["subscriberId"];
                        var hubId = item["hubId"];
                        _this.channelProvider.unsubscribe(id).then(function (data) {
                            _this.events.publish("channel:unsubscribed", hubId);
                            _this.subscription = { cityId: "", hubId: "" };
                            _this.getSubscriptions();
                            _this.loading = false;
                        }).catch(function () {
                            _this.getSubscriptions();
                            _this.loading = false;
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ChannelsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-channels',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\channels\channels.html"*/'\n\n<ion-content padding>\n    \n    <h1 class="screen-title">Channels</h1>\n    \n    <div class="offline-status" *ngIf="!connectionStatus">\n        <ion-spinner></ion-spinner>\n        Checking for internet connection...    \n    </div>    \n    \n    <div class="subscribe-form" *ngIf="!subscribedChannel && !loading && subscriptions.length < 1">\n        <div class="login-top-section signup-top-section">\n\n            <img class="logo" src="assets/imgs/logo-light.png" />\n            <h2>Please choose your location</h2>\n        </div>    \n\n        <ion-list class="login-form" ion-card>\n            \n            <ion-item>\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    Region\n                </ion-label>\n                <ion-select [(ngModel)]="region" (ionChange)="getCities()">\n                    <ion-option value="{{region.regionId}}" *ngFor="let region of regions">{{region.regionName}}</ion-option>\n                </ion-select>\n            </ion-item>        \n            \n\n            <ion-item *ngIf="region">\n                <ion-label floating color="light">\n                    <ion-icon name="pin"></ion-icon> \n                    City\n                </ion-label>\n                <ion-select [(ngModel)]="subscription.cityId" (ionChange)="getChannels()">\n                    <ion-option value="{{city.cityId}}" *ngFor="let city of cities">{{city.cityName}}</ion-option>\n                </ion-select>\n            </ion-item>\n           \n\n        </ion-list>\n    \n        <div class="choose-channel" *ngIf="subscription.cityId">\n            <h2>Please choose your channel</h2>\n\n            <div class="channels">\n                <button ion-button  *ngFor="let channel of channels" [outline]="subscription.hubId !== channel.hubId" color=\'light\' round class="subscribe-button" (click)="selectChannel(channel)">\n                    <ion-icon name="heart"></ion-icon> \n                    {{channel.channelName}}\n                </button>                    \n            </div>\n        \n        </div>\n        \n    </div>\n    \n    <div *ngIf="!channelLoading" class="channel-subscriptions">\n\n        <div *ngFor="let item of subscriptions">\n            \n            <ion-item class="channel-name-multiple"  (click)="changeSubscribedChannel(item)">\n                {{item.hub.channelName}}\n                <button color=\'light\' ion-button outline item-end (click)="unsubscribe(item)">Remove</button>\n            </ion-item>\n            \n\n            <div class="channel-feed many-channels" *ngIf="subscribedChannel && item.hub && subscribedChannel.hubId === item.hub.hubId && false">\n\n                <div class="channel-unsubscribe channels-tab">\n                <button ion-button color=\'light\' outline round class="unsubscribe-button" (click)="unsubscribe(item)">\n                    <ion-icon name="notifications-off"></ion-icon> Unsubscribe\n                </button>            \n                </div>\n\n            </div>\n\n        </div>\n        \n    </div>\n    \n    <ion-fab right bottom *ngIf="subscribedChannel && subscribedChannel.hubId">\n      <button ion-fab (click)="openAddChannel()"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\channels\channels.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_country_country__["a" /* CountryProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_channel_channel__["a" /* ChannelProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_6__providers_connection_connection__["a" /* ConnectionProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_scheduler_scheduler__["a" /* SchedulerProvider */]])
    ], ChannelsPage);
    return ChannelsPage;
}());

//# sourceMappingURL=channels.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__ = __webpack_require__(34);
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
        this.storage.get("settings").then(function (data) {
            if (data) {
                _this.settings = data;
            }
        });
        this.properties = { loading: false, error: "", confirm_password: "" };
        this.storage.get("user").then(function (data) {
            if (data) {
                //this.user.userId = data.userId;
                _this.user.appUserName = data.appUserName;
                _this.user.email = data.email;
                _this.user.mobile = data.mobile;
                _this.user.password = "";
            }
        });
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
    };
    SettingsPage.prototype.save = function () {
        var _this = this;
        this.properties.loading = true;
        var user = JSON.parse(JSON.stringify(this.user));
        if (!user.password) {
            delete user.password;
        }
        else {
            if (user.password !== this.properties.confirm_password) {
                var alert_1 = this.alertCtrl.create({
                    title: 'Error',
                    message: 'Passwords do not match.',
                    buttons: [
                        {
                            text: 'OK',
                            role: 'cancel'
                        }
                    ]
                });
                alert_1.present();
                return;
            }
        }
        this.storage.set("settings", this.settings);
        this.events.publish("settings:updated", this.settings);
        this.authProvider.updateUser(user).then(function (data) {
            _this.properties.loading = false;
            _this.user.password = "";
            _this.properties.confirm_password = "";
            _this.storage.get("user").then(function (sUser) {
                if (sUser) {
                    sUser.appUserName = user.appUserName;
                    sUser.email = user.email;
                    sUser.mobile = user.mobile;
                    _this.storage.set("user", sUser);
                }
            });
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
            _this.properties.error = e.error.message;
        });
    };
    SettingsPage.prototype.testNotificationsNoChannel = function () {
        var notification = {
            id: 1,
            title: "Test notification",
            text: "This is a test",
            smallIcon: 'res://small_icon',
            foreground: true,
            vibrate: true,
            sound: 'file://assets/audio/Azan-S.mp3'
        };
        cordova.plugins.notification.local.schedule(notification);
    };
    SettingsPage.prototype.testNotifications = function (notificationType) {
        var sound = "";
        var channel = "channel1";
        if (notificationType === "Azan A") {
            sound = 'file://assets/audio/Azan-A.mp3';
            channel = "channel2";
        }
        else if (notificationType === "Azan S") {
            sound = 'file://assets/audio/Azan-S.mp3';
            channel = "channel3";
        }
        var notification = {
            id: 1,
            title: "Test notification",
            text: "This is a test",
            smallIcon: 'res://small_icon',
            foreground: true,
            channel: channel,
            vibrate: true,
            sound: sound
        };
        this.localNotifications.schedule(notification);
        //cordova.plugins.notification.local.schedule(notification);             
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\settings\settings.html"*/'<ion-content>\n    \n    \n    <ion-list class="login-form" ion-card>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="person"></ion-icon> \n                Name\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.appUserName"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="mail"></ion-icon> \n                Email\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="call"></ion-icon> \n                Phone Number\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.mobile"></ion-input>\n        </ion-item>    \n        \n        <ion-item>\n          <ion-label>Play Sound At Prayer Time</ion-label>\n          <ion-select [(ngModel)]="settings.sound">\n            <ion-option value="sound">Play Sounds</ion-option>\n            <ion-option value="default">Play Default Notification</ion-option>\n          </ion-select>\n        </ion-item>     \n        \n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="save()" [disabled]="properties.loading">\n            Save\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>        \n        \n        <div class="test-notifications">\n            <p>To update your password, enter a new password below.</p>\n            \n            \n            <ion-item>\n                <ion-label floating color="light"> \n                    <ion-icon name="key"></ion-icon> \n                    New Password\n                </ion-label>\n                <ion-input clearInput type="password" [(ngModel)]="user.password"></ion-input>\n            </ion-item> \n\n            <ion-item>\n                <ion-label floating color="light"> \n                    <ion-icon name="key"></ion-icon> \n                    Confirm New Password\n                </ion-label>\n                <ion-input clearInput type="password" [(ngModel)]="properties.confirm_password"></ion-input>\n            </ion-item>         \n\n            <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="save()" [disabled]="properties.loading">\n                Update Password\n                <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n            </button>\n\n\n        \n        </div>\n\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n        <div class="test-notifications">\n            <p>Use the buttons below to check notifications are working correctly.</p>\n            \n        \n            <button ion-button (click)="testNotifications(\'Azan A\')">Azan A Notification</button>\n            <button ion-button (click)="testNotifications(\'Azan S\')">Azan S Notification</button>\n            <button ion-button (click)="testNotifications(\'None\')">Standard Notification</button>            \n            \n            \n        </div>   \n        \n        \n    </ion-list>    \n    \n    \n    \n\n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_directory_directory__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(117);
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
var DirectoryPage = /** @class */ (function () {
    function DirectoryPage(navCtrl, navParams, directoryProvider, alertCtrl, storage, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.directoryProvider = directoryProvider;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.iab = iab;
        this.properties = { loading: false, error: "", regionId: "", cityId: "", directoryTypeId: "" };
        this.regions = [];
        this.cities = [];
        this.directoryTypes = [];
        this.directory = [];
        this.directoryProvider.getRegions().then(function (data) {
            _this.regions = data;
        });
        this.directoryProvider.getDirectoryTypes().then(function (data) {
            _this.directoryTypes = data;
        });
        this.storage.get("user").then(function (data) {
            if (data) {
            }
        });
    }
    DirectoryPage.prototype.setCityList = function (regionId) {
        for (var _i = 0, _a = this.regions; _i < _a.length; _i++) {
            var region = _a[_i];
            if (region.regionId === regionId) {
                this.cities = region.citiesList;
            }
        }
    };
    DirectoryPage.prototype.updateDirectory = function () {
        var _this = this;
        if (this.properties.cityId && this.properties.directoryTypeId) {
            this.directoryProvider.getDirectory(this.properties.cityId, this.properties.directoryTypeId).then(function (data) {
                if (data["message"]) {
                    _this.directory = [];
                    return;
                }
                _this.directory = data.sort(function (a, b) {
                    if (a.featured && !b.featured) {
                        return -1;
                    }
                    if (!a.featured && b.featured) {
                        return 1;
                    }
                    return 0;
                });
            });
        }
    };
    DirectoryPage.prototype.openItem = function (item) {
        var prefix = 'http://';
        var url = item.web;
        if (url.substr(0, prefix.length) !== prefix) {
            url = prefix + url;
        }
        this.iab.create(url, "_system");
    };
    DirectoryPage.prototype.ionViewDidLoad = function () {
    };
    DirectoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-directory',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\directory\directory.html"*/'<ion-content padding>\n\n    <h1 class="screen-title">Halal Directory</h1>\n    \n    <ion-list class="directory-filter-form" ion-card>\n\n\n\n        <ion-item>\n          <ion-label>Region</ion-label>\n          <ion-select [(ngModel)]="properties.regionId" (ionChange)="setCityList($event)">\n            <ion-option *ngFor="let region of regions" [value]="region.regionId">{{region.regionName}}</ion-option>\n          </ion-select>\n        </ion-item>\n        \n        <ion-item *ngIf="properties.regionId">\n          <ion-label>City</ion-label>\n          <ion-select [(ngModel)]="properties.cityId" (ionChange)="updateDirectory()">\n            <ion-option *ngFor="let city of cities" [value]="city.cityId">{{city.cityName}}</ion-option>\n          </ion-select>\n        </ion-item>        \n        \n      \n        <ion-item>\n          <ion-label>Directory Type</ion-label>\n          <ion-select [(ngModel)]="properties.directoryTypeId" (ionChange)="updateDirectory()">\n            <ion-option *ngFor="let directoryType of directoryTypes" [value]="directoryType.dirTypeId">{{directoryType.dirTypeName}}</ion-option>\n          </ion-select>\n        </ion-item>   \n        \n        \n    </ion-list>     \n    \n    <div class="directory-empty" *ngIf="properties.cityId && properties.directoryTypeId && directory.length < 1">\n        No items in directory\n    </div>\n    \n    <ion-list class="directory">\n        <ion-item *ngFor="let item of directory" [ngClass]="{\'featured\':item.featured}" (click)="openItem(item)">\n            <ion-avatar item-start>\n              <img [src]="item.image">\n            </ion-avatar>\n            <h2>{{item.companyName}}</h2>\n            <p>{{item.addressLine1}} {{item.addressLine2}}</p>\n            <p>Phone: {{item.phone}}</p>\n            <p class="directory-link">{{item.web}}</p>\n            <p>{{item.businessDescription}}</p>\n        </ion-item>\n    </ion-list>    \n    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\directory\directory.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_directory_directory__["a" /* DirectoryProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], DirectoryPage);
    return DirectoryPage;
}());

//# sourceMappingURL=directory.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__ = __webpack_require__(33);
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
var DirectoryProvider = /** @class */ (function () {
    function DirectoryProvider(http, storage, connectionProvider) {
        this.http = http;
        this.storage = storage;
        this.connectionProvider = connectionProvider;
    }
    DirectoryProvider.prototype.getRegions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/regions", { headers: headers }).subscribe(function (res) {
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
    DirectoryProvider.prototype.getDirectoryTypes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/directorytypes", { headers: headers }).subscribe(function (res) {
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
    DirectoryProvider.prototype.getDirectory = function (cityId, directoryTypeId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get("user").then(function (user) {
                if (user) {
                    var token = btoa(user["email"] + ":" + user["password"]);
                    var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', token);
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/halaldirectories/findBy/" + directoryTypeId + "/" + cityId, { headers: headers }).subscribe(function (res) {
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
    DirectoryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__["a" /* ConnectionProvider */]])
    ], DirectoryProvider);
    return DirectoryProvider;
}());

//# sourceMappingURL=directory.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_terms_conditions_terms_conditions__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__ = __webpack_require__(63);
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
    function SignUpPage(navCtrl, navParams, authProvider, modalCtrl, oneSignal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.modalCtrl = modalCtrl;
        this.oneSignal = oneSignal;
        this.user = { appUserName: "", email: "", password: "", verifyPassword: "", mobile: "", deviceToken: "" };
        this.properties = { loading: false, error: "" };
    }
    SignUpPage.prototype.savePushId = function () {
        var _this = this;
        this.oneSignal.getIds().then(function (data) {
            if (data.userId) {
                _this.user.deviceToken = data.userId;
            }
        }).catch(function (e) {
            //console.log(e);
        });
    };
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
    };
    SignUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sign-up',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\sign-up\sign-up.html"*/'<ion-content>\n    \n    \n    <div class="signup-back">\n        <button ion-button clear navPop color="light">\n            <span ion-text showWhen="ios">Cancel</span>\n            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </div>   \n    \n    \n    <div class="login-top-section signup-top-section">\n\n        <img class="logo" src="assets/imgs/logo-light.png" />\n        <h2>Sign Up</h2>\n    </div>\n\n\n\n    \n    \n    <ion-list class="login-form" ion-card>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="person"></ion-icon> \n                Name\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.appUserName"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="mail"></ion-icon> \n                Email\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="call"></ion-icon> \n                Phone Number\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.mobile"></ion-input>\n        </ion-item>        \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="key"></ion-icon> \n                Password\n            </ion-label>\n            <ion-input clearInput type="password" [(ngModel)]="user.password"></ion-input>\n        </ion-item>        \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="key"></ion-icon> \n                Verify Password\n            </ion-label>\n            <ion-input clearInput type="password" [(ngModel)]="user.verifyPassword"></ion-input>\n        </ion-item>\n        \n        <p class="forgot-password sign-up-tos">By proceeding, you agree to our <a (click)="openTos()">Terms & Conditions</a></p>\n        \n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="signup()" [disabled]="properties.loading">\n            Continue \n            <ion-icon *ngIf="!properties.loading" name="arrow-round-forward"></ion-icon>\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n   \n        \n        \n    </ion-list>\n    \n\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\sign-up\sign-up.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__["a" /* OneSignal */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsConditionsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
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
            selector: 'terms-conditions',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\modals\terms-conditions\terms-conditions.html"*/'<ion-header>\n    <ion-toolbar color="primary">\n        <ion-title>\n            Terms & Conditions\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content class=\'standard-background\' padding>\n    <p>Please read these terms and conditions carefully before using CallerBot Live app operated by wEntity System Limited.</p>\n\n<h3>Copyright</h3>\n\n<p>Content published on this app (digital downloads, images, texts, graphics, logos) is the property of wEntity System Limited and/or its content creators and protected by international copyright laws. The entire compilation of the content found on this website is the exclusive property of wEntity System Limited, with copyright authorship for this compilation by wEntity System Limited.</p>\n\n<h3>Communications</h3>\n\n<p>The entire communication with us is electronic. Every time you use our app, you are going to be communicating with us. You hereby consent to receive communications from us. If you subscribe to the channel on our app, you are going to receive regular post from us. We will continue to communicate with you by posting announcement and notices on our app.</p>\n\n<h3>Applicable Law</h3>\n\n<p>By visiting this website, you agree that the laws of the New Zealand, without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between wEntity System Limited and you, or its business partners and associates.</p>\n\n<h3>User Account</h3>\n\n<p>If you are an owner of an account on this app, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password.</p>\n\n<p>We reserve all rights to terminate accounts in their sole discretion.</p>\n\n\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\modals\terms-conditions\terms-conditions.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], TermsConditionsModal);
    return TermsConditionsModal;
}());

//# sourceMappingURL=terms-conditions.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(50);
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
            _this.properties.error = e.error;
        });
    };
    ForgotPasswordPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ForgotPasswordPage.prototype.ionViewDidLoad = function () {
    };
    ForgotPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forgot-password',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\forgot-password\forgot-password.html"*/'<ion-content>\n    \n    <div class="signup-back">\n        <button ion-button clear navPop color="light">\n            <span ion-text showWhen="ios">Cancel</span>\n            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </div>\n    \n    <div class="login-top-section signup-top-section">\n\n        <img class="logo" src="assets/imgs/logo-light.png" />\n        <h2>Reset Password</h2>\n    </div>\n\n\n\n    \n    \n    <ion-list class="login-form" ion-card>\n\n\n        <ion-item>\n            <ion-label floating color="light">\n                <ion-icon name="mail"></ion-icon> \n                Email\n            </ion-label>\n            <ion-input clearInput type="text" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="reset()" [disabled]="properties.loading">\n            Reset \n            <ion-icon *ngIf="!properties.loading" name="arrow-round-forward"></ion-icon>\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n   \n        \n        \n    </ion-list>\n    \n\n</ion-content>'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\forgot-password\forgot-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_authentication_authentication__["a" /* AuthenticationProvider */]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__ = __webpack_require__(33);
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

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(11);
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
    function AuthenticationProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
    }
    AuthenticationProvider.prototype.login = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/users/appsignin", data).subscribe(function (res) {
                res["password"] = data["password"];
                _this.storage.set("user", res).then(function () {
                    _this.events.publish("user:loggedin");
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
                    _this.http.patch(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/users/secured/changeappprofile", data, { headers: headers }).subscribe(function (res) {
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Events */]])
    ], AuthenticationProvider);
    return AuthenticationProvider;
}());

//# sourceMappingURL=authentication.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(370);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_prayer_prayer__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_channels_channels__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_events_events__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_feedback_feedback__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_directory_directory__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modals_terms_conditions_terms_conditions__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__modals_announcement_announcement__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modals_add_channel_add_channel__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_authentication_authentication__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_country_country__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_channel_channel__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_feedback_feedback__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_connection_connection__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_scheduler_scheduler__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_directory_directory__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_native_geocoder__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_local_notifications__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_background_mode__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_in_app_browser__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_network__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_onesignal__ = __webpack_require__(63);
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
                __WEBPACK_IMPORTED_MODULE_11__pages_events_events__["a" /* EventsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_channels_channels__["a" /* ChannelsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_directory_directory__["a" /* DirectoryPage */],
                __WEBPACK_IMPORTED_MODULE_16__modals_terms_conditions_terms_conditions__["a" /* TermsConditionsModal */],
                __WEBPACK_IMPORTED_MODULE_17__modals_announcement_announcement__["a" /* AnnouncementModal */],
                __WEBPACK_IMPORTED_MODULE_18__modals_add_channel_add_channel__["a" /* AddChannelModal */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_prayer_prayer__["a" /* PrayerPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_events_events__["a" /* EventsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_channels_channels__["a" /* ChannelsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_directory_directory__["a" /* DirectoryPage */],
                __WEBPACK_IMPORTED_MODULE_16__modals_terms_conditions_terms_conditions__["a" /* TermsConditionsModal */],
                __WEBPACK_IMPORTED_MODULE_17__modals_announcement_announcement__["a" /* AnnouncementModal */],
                __WEBPACK_IMPORTED_MODULE_18__modals_add_channel_add_channel__["a" /* AddChannelModal */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_21__providers_authentication_authentication__["a" /* AuthenticationProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_country_country__["a" /* CountryProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_channel_channel__["a" /* ChannelProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_feedback_feedback__["a" /* FeedbackProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_connection_connection__["a" /* ConnectionProvider */],
                __WEBPACK_IMPORTED_MODULE_26__providers_scheduler_scheduler__["a" /* SchedulerProvider */],
                __WEBPACK_IMPORTED_MODULE_27__providers_directory_directory__["a" /* DirectoryProvider */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_onesignal__["a" /* OneSignal */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 40:
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

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_onesignal__ = __webpack_require__(63);
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
    function MyApp(app, platform, geolocation, statusBar, splashScreen, authProvider, storage, events, backgroundMode, localNotifications, alertCtrl, oneSignal) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.geolocation = geolocation;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.authProvider = authProvider;
        this.storage = storage;
        this.events = events;
        this.backgroundMode = backgroundMode;
        this.localNotifications = localNotifications;
        this.alertCtrl = alertCtrl;
        this.oneSignal = oneSignal;
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
                if (token) {
                    _this.user = token;
                    _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */]);
                    _this.app.getRootNav().popToRoot();
                    _this.savePushId();
                }
                setTimeout(function () { _this.splashScreen.hide(); }, 500);
            }).catch(function () {
                _this.splashScreen.hide();
            });
            _this.events.subscribe("user:loggedin", function () {
                _this.storage.get("user").then(function (token) {
                    if (token) {
                        _this.user = token;
                        _this.savePushId();
                    }
                });
            });
            if (platform.is("cordova")) {
                cordova.plugins.DozeOptimize.IsIgnoringBatteryOptimizations(function (response) {
                    if (response == "false") {
                        setTimeout(function () {
                            cordova.plugins.DozeOptimize.RequestOptimizations(function (response) {
                            }, function (error) {
                            });
                        }, 3000);
                    }
                    else {
                    }
                }, function (error) {
                });
                _this.oneSignal.startInit("81102899-2cf7-491c-b936-5c5c300269d2", "420587777749");
                _this.oneSignal.inFocusDisplaying(2);
                _this.oneSignal.handleNotificationReceived().subscribe(function (data) {
                    _this.events.publish("notification:received");
                });
                _this.oneSignal.handleNotificationOpened().subscribe(function (data) {
                    if (!data.notification.isAppInFocus) {
                        var pushData = data.notification.payload.additionalData;
                    }
                });
                _this.oneSignal.endInit();
            }
            if (platform.is("cordova") && (platform.is("android") || platform.is("ios"))) {
                _this.useNative = true;
            }
            if (_this.useNative) {
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
                    _this.storage.get("subscription").then(function (data) {
                        if (data) {
                            _this.mqttSubscribe(data.hubId);
                        }
                    });
                }, function (status) {
                    //alert("failed: " + status);
                    _this.storage.get("subscription").then(function (data) {
                        if (data) {
                            /*
                            let alert = this.alertCtrl.create({
                              title: 'Connection Failed',
                              subTitle: 'Failed to retreive Salat times from the server',
                              message: 'Please check your internet connection.',
                              buttons: ['Dismiss']
                            });
                            alert.present();
                            */
                        }
                    });
                });
                /*
                mqtt.on("disconnect", () => {
                    mqtt.connect();
                }, () => {
                    mqtt.connect();
                });
                mqtt.on("reconnect", () => {
                    mqtt.connect();
                }, () => {
                    mqtt.connect();
                });
                */
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
                _this.mqttSubscribe(hubId);
            });
            _this.events.subscribe('channel:unsubscribed', function (hubId) {
                _this.mqttUnsubscribe(hubId);
            });
            //this.backgroundMode.setDefaults({silent:true/*, title:"Monitoring Updates", text:"Checking for updates to your Salat times in the background..."*/});
            //this.backgroundMode.enable();
            /*
            if( this.platform.is("android")){
                
                window.powerManagement.dim(function() {
                        console.log('Wakelock acquired');
                    }, function() {
                        console.log('Failed to acquire wakelock');
                    });
                window.powerManagement.setReleaseOnPause(false, function() {
                        console.log('setReleaseOnPause successfully');
                    }, function() {
                        console.log('Failed to set');
                    });
                    
    
                    
                this.platform.pause.subscribe(() => {
                    this.backgroundTimeout = setTimeout(() => {
                        //this.backgroundMode.moveToBackground();
                        
                        if (!this.backgroundMode.isActive()){
                            this.backgroundMode.moveToBackground();
                        }
                        
                    },30000);
                });
                this.platform.resume.subscribe(() => {
                    if (this.backgroundTimeout){
                        clearTimeout(this.backgroundTimeout);
                        this.backgroundTimeout = null;
                    }
                });
                    
            }
            
            */
            /*
            if (this.platform.is("cordova")){
                cordova.plugins.notification.local.hasPermission((granted) => {
                    console.log(granted);
                    if (!granted){
                        cordova.plugins.notification.local.requestPermission();
                    }
                })
            }
            */
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
                }, 5000);
            });
        });
        platform.resume.subscribe(function () {
            setTimeout(function () {
                mqtt.connect();
            }, 5000);
        });
    }
    MyApp.prototype.savePushId = function () {
        var _this = this;
        this.oneSignal.getIds().then(function (data) {
            if (data.userId) {
                //save
                //this.auth.savePushId(data.userId);
                var user = {
                    appUserName: _this.user.appUserName,
                    email: _this.user.email,
                    mobile: _this.user.mobile,
                    deviceToken: data.userId
                };
                _this.authProvider.updateUser(user);
            }
        }).catch(function (e) {
        });
    };
    MyApp.prototype.mqttSubscribe = function (hubId) {
        var _this = this;
        if (this.useNative) {
            mqtt.subscribe({
                topic: hubId,
                qos: 2
            });
            mqtt.on("subscribe", function (subscription) {
                _this.mqttListen(hubId);
            }, function (e) {
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
            }, function (e) {
            });
        }
        else if (this.client) {
            this.client.unsubscribe(hubId, {});
        }
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_onesignal__["a" /* OneSignal */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 216,
	"./af.js": 216,
	"./ar": 217,
	"./ar-dz": 218,
	"./ar-dz.js": 218,
	"./ar-kw": 219,
	"./ar-kw.js": 219,
	"./ar-ly": 220,
	"./ar-ly.js": 220,
	"./ar-ma": 221,
	"./ar-ma.js": 221,
	"./ar-sa": 222,
	"./ar-sa.js": 222,
	"./ar-tn": 223,
	"./ar-tn.js": 223,
	"./ar.js": 217,
	"./az": 224,
	"./az.js": 224,
	"./be": 225,
	"./be.js": 225,
	"./bg": 226,
	"./bg.js": 226,
	"./bm": 227,
	"./bm.js": 227,
	"./bn": 228,
	"./bn.js": 228,
	"./bo": 229,
	"./bo.js": 229,
	"./br": 230,
	"./br.js": 230,
	"./bs": 231,
	"./bs.js": 231,
	"./ca": 232,
	"./ca.js": 232,
	"./cs": 233,
	"./cs.js": 233,
	"./cv": 234,
	"./cv.js": 234,
	"./cy": 235,
	"./cy.js": 235,
	"./da": 236,
	"./da.js": 236,
	"./de": 237,
	"./de-at": 238,
	"./de-at.js": 238,
	"./de-ch": 239,
	"./de-ch.js": 239,
	"./de.js": 237,
	"./dv": 240,
	"./dv.js": 240,
	"./el": 241,
	"./el.js": 241,
	"./en-au": 242,
	"./en-au.js": 242,
	"./en-ca": 243,
	"./en-ca.js": 243,
	"./en-gb": 244,
	"./en-gb.js": 244,
	"./en-ie": 245,
	"./en-ie.js": 245,
	"./en-il": 246,
	"./en-il.js": 246,
	"./en-nz": 247,
	"./en-nz.js": 247,
	"./eo": 248,
	"./eo.js": 248,
	"./es": 249,
	"./es-do": 250,
	"./es-do.js": 250,
	"./es-us": 251,
	"./es-us.js": 251,
	"./es.js": 249,
	"./et": 252,
	"./et.js": 252,
	"./eu": 253,
	"./eu.js": 253,
	"./fa": 254,
	"./fa.js": 254,
	"./fi": 255,
	"./fi.js": 255,
	"./fo": 256,
	"./fo.js": 256,
	"./fr": 257,
	"./fr-ca": 258,
	"./fr-ca.js": 258,
	"./fr-ch": 259,
	"./fr-ch.js": 259,
	"./fr.js": 257,
	"./fy": 260,
	"./fy.js": 260,
	"./gd": 261,
	"./gd.js": 261,
	"./gl": 262,
	"./gl.js": 262,
	"./gom-latn": 263,
	"./gom-latn.js": 263,
	"./gu": 264,
	"./gu.js": 264,
	"./he": 265,
	"./he.js": 265,
	"./hi": 266,
	"./hi.js": 266,
	"./hr": 267,
	"./hr.js": 267,
	"./hu": 268,
	"./hu.js": 268,
	"./hy-am": 269,
	"./hy-am.js": 269,
	"./id": 270,
	"./id.js": 270,
	"./is": 271,
	"./is.js": 271,
	"./it": 272,
	"./it.js": 272,
	"./ja": 273,
	"./ja.js": 273,
	"./jv": 274,
	"./jv.js": 274,
	"./ka": 275,
	"./ka.js": 275,
	"./kk": 276,
	"./kk.js": 276,
	"./km": 277,
	"./km.js": 277,
	"./kn": 278,
	"./kn.js": 278,
	"./ko": 279,
	"./ko.js": 279,
	"./ky": 280,
	"./ky.js": 280,
	"./lb": 281,
	"./lb.js": 281,
	"./lo": 282,
	"./lo.js": 282,
	"./lt": 283,
	"./lt.js": 283,
	"./lv": 284,
	"./lv.js": 284,
	"./me": 285,
	"./me.js": 285,
	"./mi": 286,
	"./mi.js": 286,
	"./mk": 287,
	"./mk.js": 287,
	"./ml": 288,
	"./ml.js": 288,
	"./mn": 289,
	"./mn.js": 289,
	"./mr": 290,
	"./mr.js": 290,
	"./ms": 291,
	"./ms-my": 292,
	"./ms-my.js": 292,
	"./ms.js": 291,
	"./mt": 293,
	"./mt.js": 293,
	"./my": 294,
	"./my.js": 294,
	"./nb": 295,
	"./nb.js": 295,
	"./ne": 296,
	"./ne.js": 296,
	"./nl": 297,
	"./nl-be": 298,
	"./nl-be.js": 298,
	"./nl.js": 297,
	"./nn": 299,
	"./nn.js": 299,
	"./pa-in": 300,
	"./pa-in.js": 300,
	"./pl": 301,
	"./pl.js": 301,
	"./pt": 302,
	"./pt-br": 303,
	"./pt-br.js": 303,
	"./pt.js": 302,
	"./ro": 304,
	"./ro.js": 304,
	"./ru": 305,
	"./ru.js": 305,
	"./sd": 306,
	"./sd.js": 306,
	"./se": 307,
	"./se.js": 307,
	"./si": 308,
	"./si.js": 308,
	"./sk": 309,
	"./sk.js": 309,
	"./sl": 310,
	"./sl.js": 310,
	"./sq": 311,
	"./sq.js": 311,
	"./sr": 312,
	"./sr-cyrl": 313,
	"./sr-cyrl.js": 313,
	"./sr.js": 312,
	"./ss": 314,
	"./ss.js": 314,
	"./sv": 315,
	"./sv.js": 315,
	"./sw": 316,
	"./sw.js": 316,
	"./ta": 317,
	"./ta.js": 317,
	"./te": 318,
	"./te.js": 318,
	"./tet": 319,
	"./tet.js": 319,
	"./tg": 320,
	"./tg.js": 320,
	"./th": 321,
	"./th.js": 321,
	"./tl-ph": 322,
	"./tl-ph.js": 322,
	"./tlh": 323,
	"./tlh.js": 323,
	"./tr": 324,
	"./tr.js": 324,
	"./tzl": 325,
	"./tzl.js": 325,
	"./tzm": 326,
	"./tzm-latn": 327,
	"./tzm-latn.js": 327,
	"./tzm.js": 326,
	"./ug-cn": 328,
	"./ug-cn.js": 328,
	"./uk": 329,
	"./uk.js": 329,
	"./ur": 330,
	"./ur.js": 330,
	"./uz": 331,
	"./uz-latn": 332,
	"./uz-latn.js": 332,
	"./uz.js": 331,
	"./vi": 333,
	"./vi.js": 333,
	"./x-pseudo": 334,
	"./x-pseudo.js": 334,
	"./yo": 335,
	"./yo.js": 335,
	"./zh-cn": 336,
	"./zh-cn.js": 336,
	"./zh-hk": 337,
	"./zh-hk.js": 337,
	"./zh-tw": 338,
	"./zh-tw.js": 338
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
webpackContext.id = 429;

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
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
                _this.feedback.userEmail = data.email;
            }
        });
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
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
            _this.properties.error = e.error;
        });
    };
    FeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feedback',template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\feedback\feedback.html"*/'<ion-content padding>\n    \n    <p class="module-description">You can submit a post for your community.</p>\n    \n    <ion-list class="login-form" ion-card>\n\n      \n        \n        <ion-item>\n            <ion-label floating color="light"> \n                <ion-icon name="thumbs-up"></ion-icon> \n                Community Post\n            </ion-label>\n            <ion-textarea [(ngModel)]="feedback.message"></ion-textarea>\n        </ion-item> \n        \n        <button ion-button outline color=\'light\' round class="login-button signup-button" (click)="send()" [disabled]="properties.loading">\n            Send\n            <ion-spinner *ngIf="properties.loading" color=\'light\' diamter=\'10\'></ion-spinner>\n        </button>\n        \n        <p class="login-error" *ngIf="properties.error">{{properties.error}}</p>\n         \n        \n   \n        \n        \n    </ion-list>      \n    \n    \n    \n</ion-content>\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\feedback\feedback.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_feedback_feedback__["a" /* FeedbackProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], FeedbackPage);
    return FeedbackPage;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__ = __webpack_require__(33);
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
                        resolve(res);
                    }, function (e) {
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_connection_connection__["a" /* ConnectionProvider */]])
    ], ChannelProvider);
    return ChannelProvider;
}());

//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sign_up_sign_up__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forgot_password_forgot_password__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__ = __webpack_require__(63);
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
    function LoginPage(navCtrl, navParams, authProvider, oneSignal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.oneSignal = oneSignal;
        this.user = { appUserName: "", email: "", password: "", mobile: "", deviceToken: "" };
        this.properties = { loading: false, error: "" };
        this.savePushId();
    }
    LoginPage.prototype.savePushId = function () {
        var _this = this;
        this.oneSignal.getIds().then(function (data) {
            if (data.userId) {
                _this.user.deviceToken = data.userId;
            }
        }).catch(function (e) {
            //console.log(e);
        });
    };
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
            _this.properties.error = e.error ? e.error.message : JSON.stringify(e);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__["a" /* OneSignal */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prayer_prayer__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_events__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__channels_channels__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directory_directory__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_authentication_authentication__ = __webpack_require__(35);
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
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__settings_settings__["a" /* SettingsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__events_events__["a" /* EventsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__prayer_prayer__["a" /* PrayerPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__directory_directory__["a" /* DirectoryPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_3__channels_channels__["a" /* ChannelsPage */];
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
                            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                            _this.app.getRootNav().popToRoot();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Taylor\Documents\Websites\callerbot\src\pages\tabs\tabs.html"*/'<ion-tabs tabsPlacement="top" tabsLayout=\'title-hide\' color=\'secondary\' selectedIndex="2">\n  <ion-tab [root]="tab1Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Announcements" tabIcon="megaphone"></ion-tab>\n   <ion-tab [root]="tab3Root" tabTitle="Prayer Time" tabIcon="pulse"></ion-tab> \n   <ion-tab [root]="tab5Root" tabTitle="Channels" tabIcon="desktop"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Directory" tabIcon="book"></ion-tab>\n  <ion-tab tabTitle="Logout" tabIcon="exit" (ionSelect)="logout()"></ion-tab>\n</ion-tabs>\n\n\n'/*ion-inline-end:"D:\Taylor\Documents\Websites\callerbot\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["c" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_settings__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connection_connection__ = __webpack_require__(33);
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
    }
    CountryProvider.prototype.getCountries = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_app_settings__["a" /* AppSettings */].apiUrl + "/countries").subscribe(function (res) {
                _this.connectionProvider.setConnectionStatus(true);
                resolve(res);
            }, function (e) {
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

},[350]);
//# sourceMappingURL=main.js.map