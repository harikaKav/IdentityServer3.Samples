/// <reference path="../../_references.ts"/>

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


            this.myService.getIdentity()
                .success(response => {
                    this.$scope.identity = response;

                })
                .error(response => {
                    this.$scope.identity = "error in getidentity";

                });


        }


    }

    // self-register after declaration
    angular.module(NG_MODULE_NAME)
        .controller("MyController", MyController);

}