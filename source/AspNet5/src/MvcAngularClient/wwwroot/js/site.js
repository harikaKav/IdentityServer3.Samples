/// <reference path="./_references.ts"/>
var MvcAngularClientApp;
(function (MvcAngularClientApp) {
    "use strict";
    MvcAngularClientApp.NG_MODULE_NAME = "MvcAngularClientApp";
    MvcAngularClientApp.BASE_API_URL = "http://localhost:19806/";
    //function config($httpProvider) {
    //    function intercept($q) {
    //        return {
    //            'request': function (config) {
    //                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJjbGllbnRfaWQiOiJtdmM2Iiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwiYXBpMSJdLCJzdWIiOiI4MTg3MjciLCJhbXIiOlsicGFzc3dvcmQiXSwiYXV0aF90aW1lIjoxNDQ5NTcyNTAwLCJpZHAiOiJpZHNydiIsInJvbGUiOlsiQWRtaW4iLCJHZWVrIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTg5NDIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjE4OTQyL3Jlc291cmNlcyIsImV4cCI6MTQ0OTU3NjEwMywibmJmIjoxNDQ5NTcyNTAzfQ.OSuUzFC0lKwZczI9SehQdwGhwnpwjbirG7m-PZQDZZRFkf7PQAhP3YwG6xJXCxDMhHKZyrQgZjFUP11PCdPXmJfanaGx52-SyhCqSmaMM7LBSCc5q6SdafF3iAVJJ1UxvIBXum1MwXxFuo_tot3Pd7S2qBjAkdbh2BrVenBjBddKK_UQePfyo8Nvmfez4AGMWJXWTfLX_EZ5ddU-1PLG8OhLkln9om6LF5pi9IzUGM6MLQlGle7KaUztfpfl6qI_wDuwzqzM559nFVLQbhDWzfZiBRuIJ_UwL-UAWT8nhdZNfcLFPFt6HRSH_EfM1h65Q-YVGJBi80J_CXwVM873Sw";
    //                if (token) {
    //                    config.headers['Authorization'] = 'Bearer ' + token;
    //                }
    //                return config;
    //            },
    //            'responseError': function (response) {
    //                if (response.status === 401) {
    //                    //idmTokenManager.removeToken();
    //                }
    //                if (response.status === 403) {
    //                    //idmTokenManager.removeToken();
    //                }
    //                return $q.reject(response);
    //            }
    //        };
    //    };
    //    intercept.$inject = ["$q"];
    //    $httpProvider.interceptors.push(intercept);
    //};
    //config.$inject = ["$httpProvider"];
    angular.module(MvcAngularClientApp.NG_MODULE_NAME, []);
})(MvcAngularClientApp || (MvcAngularClientApp = {}));
/// <reference path="./_references.ts"/>
/// <reference path="./_references.ts"/>
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
            this.$scope.testString = "this is a test value";
            this.myService.getAccessToken()
                .success(function (response) {
                _this.$scope.accessToken = response.Token;
                _this.myService.getIdentity(_this.$scope.accessToken)
                    .success(function (response2) {
                    _this.$scope.identity = response2;
                })
                    .error(function (response2) {
                    _this.$scope.identity = "error in getidentity";
                });
            })
                .error(function (response) {
                _this.$scope.accessToken = "error";
                _this.$scope.identity = "error in getaccesstoken";
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
/// <reference path="./_references.ts" />
var MvcAngularClientApp;
(function (MvcAngularClientApp) {
    "use strict";
    var MyService = (function () {
        function MyService($http) {
            this.$http = $http;
        }
        MyService.prototype.getIdentity = function (token) {
            return this.$http({
                url: "http://localhost:19806/identity",
                method: "get",
                data: null,
                headers: { 'Authorization': "Bearer " + token }
            });
        };
        ;
        MyService.prototype.getAccessToken = function () {
            return this.$http({
                url: "getaccesstoken",
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
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./app.ts"/>
/// <reference path="./IMyScope.ts"/>
/// <reference path="./MyController.ts"/>
/// <reference path="./MyService.ts"/> 
