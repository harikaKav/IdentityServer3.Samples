
/// <reference path="./_references.ts" />

module MvcAngularClientApp {
    "use strict";

    export class MyService {

        public static $inject = [
            "$http"
        ];

        constructor(private $http: ng.IHttpService) {
        }

        getIdentity(token: string): ng.IHttpPromise<string> {
            return this.$http<string>({
                url: "http://localhost:19806/identity",
                method: "get",
                data: null,
                headers: {'Authorization': `Bearer ${token}`}
            });
        };

        getAccessToken(): ng.IHttpPromise<AccessToken> {
            return this.$http<AccessToken>({
                url: `getaccesstoken`,
                method: "get",
                data: null
                
            });
        };
    }

    angular.module(NG_MODULE_NAME).service("MyService", MyService);
}