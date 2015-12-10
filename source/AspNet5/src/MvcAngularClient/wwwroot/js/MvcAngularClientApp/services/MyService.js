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
