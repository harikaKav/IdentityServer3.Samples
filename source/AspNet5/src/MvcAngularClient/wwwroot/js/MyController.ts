/// <reference path="./_references.ts"/>

module MvcAngularClientApp {
    "use strict";

    export class MyController {


        public static $inject = [
            "$scope",
            "MyService"
        ];


        constructor(
            private $scope: IMyScope,
            private myService: MyService
        ) {

            this.activate();
        }

        activate(): void {
            this.$scope.testString = "this is a test value";

            this.myService.getAccessToken()
                .success(response => {
                    this.$scope.accessToken = response.Token;

                    this.myService.getIdentity(this.$scope.accessToken)
                        .success(response2 => {
                            this.$scope.identity = response2;

                        })
                        .error(response2 => {
                            this.$scope.identity = "error in getidentity";

                        });
                   
                })
                .error(response => {
                    this.$scope.accessToken = "error";
                    this.$scope.identity = "error in getaccesstoken";
                });

           
        }


    }

    // self-register after declaration
    angular.module(NG_MODULE_NAME)
        .controller("MyController", MyController);

}