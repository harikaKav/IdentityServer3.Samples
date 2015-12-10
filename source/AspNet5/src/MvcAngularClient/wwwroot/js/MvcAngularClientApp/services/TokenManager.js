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
