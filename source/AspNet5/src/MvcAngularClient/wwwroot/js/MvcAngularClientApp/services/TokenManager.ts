/// <reference path="../../_references.ts"/>

module MvcAngularClientApp {
    "use strict";

    export class TokenManager {
        //tokens: { [host: string]: string; } = {};

        public static $inject = [
            "$rootScope",
            "$http",
            "$q"
        ];


        constructor(
            private $rootScope: ng.IScope,
            private $http: ng.IHttpService,
            private $q: ng.IQService
        ) {

            this.activate();
        }

        activate(): void {
           //this.fetchAccessToken(BASE_API_URL);
        }

        public fetchAccessToken(host: string): ng.IPromise<any> {
            var defer = this.$q.defer();
            var token = ACCESS_TOKENS[host];
            if (token) defer.resolve();
            else {
                this.getAccessToken()
                    .success(response => {
                        ACCESS_TOKENS[host] = response.Token;
                        token = response.Token;
                        defer.resolve();
                    })
                    .error(response => {
                        console.log("there was an error");
                        defer.reject();
                    });
                
            }
            return defer.promise;
        }

        private getAccessToken(): ng.IHttpPromise<AccessToken> {
            return this.$http<AccessToken>({
                url: "getaccesstoken",
                method: "get",
                data: null
            });
        };

    }

    // self-register after declaration
    angular.module(NG_MODULE_NAME)
        .service("TokenManager", TokenManager);


}