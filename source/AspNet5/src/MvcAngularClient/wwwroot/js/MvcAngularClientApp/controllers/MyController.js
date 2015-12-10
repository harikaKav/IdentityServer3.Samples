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
