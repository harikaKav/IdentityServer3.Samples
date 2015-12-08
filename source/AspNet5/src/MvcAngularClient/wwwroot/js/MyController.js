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
