
/// <reference path="../../_references.ts" />

module MvcAngularClientApp {
    "use strict";

    export class MyService {

        public static $inject = [
            "$http"
        ];

        constructor(private $http: ng.IHttpService)
        {

            this.activate();
        }

        activate(): void {

        }

        getIdentity(): ng.IHttpPromise<string> {

            return this.$http<string>({
                url: BASE_API_URL + "identity",
                method: "get",
                data: null
            });
        };

    }

    angular.module(NG_MODULE_NAME).service("MyService", MyService);
}