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
