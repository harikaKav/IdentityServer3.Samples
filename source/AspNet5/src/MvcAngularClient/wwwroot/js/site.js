/// <reference path="../_references.ts"/>
var MvcAngularClientApp;
(function (MvcAngularClientApp) {
    "use strict";
    MvcAngularClientApp.NG_MODULE_NAME = "MvcAngularClientApp";
    MvcAngularClientApp.BASE_API_URL = "http://localhost:19806/";
    MvcAngularClientApp.ACCESS_TOKENS = {};
    angular.module(MvcAngularClientApp.NG_MODULE_NAME, ["ngRoute"]);
    function config($httpProvider, $routeProvider) {
        function intercept($q) {
            return {
                'request': function (config) {
                    if (config.url === "getaccesstoken")
                        return config;
                    else {
                        var token = MvcAngularClientApp.ACCESS_TOKENS[MvcAngularClientApp.BASE_API_URL]; //todo - how to get the correct host
                        if (token) {
                            config.headers['Authorization'] = 'Bearer ' + token;
                        }
                        return config;
                    }
                },
                'responseError': function (response) {
                    if (response.status === 401) {
                    }
                    if (response.status === 403) {
                    }
                    return $q.reject(response);
                }
            };
        }
        ;
        intercept.$inject = ["$q"];
        $httpProvider.interceptors.push(intercept);
        $routeProvider
            .when("/", {
            templateUrl: "/templates/_index.html",
            controller: "MyController",
            resolve: {
                "accessToken": function (TokenManager) {
                    return TokenManager.fetchAccessToken(MvcAngularClientApp.BASE_API_URL);
                }
            }
        });
    }
    ;
    config.$inject = ["$httpProvider", "$routeProvider"];
    angular.module(MvcAngularClientApp.NG_MODULE_NAME)
        .config(config);
})(MvcAngularClientApp || (MvcAngularClientApp = {}));
/// <reference path="../../_references.ts"/>
/// <reference path="../../_references.ts"/>
var MvcAngularClientApp;
(function (MvcAngularClientApp) {
    "use strict";
    var MyController = (function () {
        function MyController($scope, myService) {
            this.$scope = $scope;
            this.myService = myService;
            this.activate();
        }
        MyController.prototype.activate = function () {
            var _this = this;
            this.myService.getIdentity()
                .success(function (response) {
                _this.$scope.identity = response;
            })
                .error(function (response) {
                _this.$scope.identity = "error in getidentity";
            });
        };
        MyController.$inject = [
            "$scope",
            "MyService"
        ];
        return MyController;
    })();
    MvcAngularClientApp.MyController = MyController;
    // self-register after declaration
    angular.module(MvcAngularClientApp.NG_MODULE_NAME)
        .controller("MyController", MyController);
})(MvcAngularClientApp || (MvcAngularClientApp = {}));
/// <reference path="../../_references.ts" />
var MvcAngularClientApp;
(function (MvcAngularClientApp) {
    "use strict";
    var MyService = (function () {
        function MyService($http) {
            this.$http = $http;
            this.activate();
        }
        MyService.prototype.activate = function () {
        };
        MyService.prototype.getIdentity = function () {
            return this.$http({
                url: MvcAngularClientApp.BASE_API_URL + "identity",
                method: "get",
                data: null
            });
        };
        ;
        MyService.$inject = [
            "$http"
        ];
        return MyService;
    })();
    MvcAngularClientApp.MyService = MyService;
    angular.module(MvcAngularClientApp.NG_MODULE_NAME).service("MyService", MyService);
})(MvcAngularClientApp || (MvcAngularClientApp = {}));
/// <reference path="../../_references.ts"/>
var MvcAngularClientApp;
(function (MvcAngularClientApp) {
    "use strict";
    var TokenManager = (function () {
        function TokenManager($rootScope, $http, $q) {
            this.$rootScope = $rootScope;
            this.$http = $http;
            this.$q = $q;
            this.activate();
        }
        TokenManager.prototype.activate = function () {
            //this.fetchAccessToken(BASE_API_URL);
        };
        TokenManager.prototype.fetchAccessToken = function (host) {
            var defer = this.$q.defer();
            var token = MvcAngularClientApp.ACCESS_TOKENS[host];
            if (token)
                defer.resolve();
            else {
                this.getAccessToken()
                    .success(function (response) {
                    MvcAngularClientApp.ACCESS_TOKENS[host] = response.Token;
                    token = response.Token;
                    defer.resolve();
                })
                    .error(function (response) {
                    console.log("there was an error");
                    defer.reject();
                });
            }
            return defer.promise;
        };
        TokenManager.prototype.getAccessToken = function () {
            return this.$http({
                url: "getaccesstoken",
                method: "get",
                data: null
            });
        };
        ;
        //tokens: { [host: string]: string; } = {};
        TokenManager.$inject = [
            "$rootScope",
            "$http",
            "$q"
        ];
        return TokenManager;
    })();
    MvcAngularClientApp.TokenManager = TokenManager;
    // self-register after declaration
    angular.module(MvcAngularClientApp.NG_MODULE_NAME)
        .service("TokenManager", TokenManager);
})(MvcAngularClientApp || (MvcAngularClientApp = {}));
/// <reference path="../../_references.ts" />
var MvcAngularClientApp;
(function (MvcAngularClientApp) {
    "use strict";
    var AccessToken = (function () {
        function AccessToken(Token) {
            this.Token = Token;
        }
        return AccessToken;
    })();
    MvcAngularClientApp.AccessToken = AccessToken;
})(MvcAngularClientApp || (MvcAngularClientApp = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./MvcAngularClientApp/app.ts"/>
/// <reference path="./MvcAngularClientApp/interfaces/IMyScope.ts"/>
/// <reference path="./MvcAngularClientApp/controllers/MyController.ts"/>
/// <reference path="./MvcAngularClientApp/services/MyService.ts"/>
/// <reference path="./MvcAngularClientApp/services/TokenManager.ts"/>
/// <reference path="./MvcAngularClientApp/models/AccessToken.ts"/>
