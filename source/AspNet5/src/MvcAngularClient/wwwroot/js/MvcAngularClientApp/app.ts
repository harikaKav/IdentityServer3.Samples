/// <reference path="../_references.ts"/>

module MvcAngularClientApp {
    "use strict";
    export var NG_MODULE_NAME = "MvcAngularClientApp";
    export var BASE_API_URL = "http://localhost:19806/";
    export var ACCESS_TOKENS: { [host: string]: string; } = {};

    angular.module(NG_MODULE_NAME, ["ngRoute"]);

    function config($httpProvider, $routeProvider) {
        function intercept($q) {
            return {
                'request': function (config) {
                    if (config.url === "getaccesstoken") return config;
                    else {
                        var token = ACCESS_TOKENS[BASE_API_URL]; //todo - how to get the correct host
                        if (token) {
                            config.headers['Authorization'] = 'Bearer ' + token;
                        }
                        return config;
                    }
                },
                'responseError': function (response) {
                    if (response.status === 401) {
                        //idmTokenManager.removeToken();
                    }
                    if (response.status === 403) {
                        //idmTokenManager.removeToken();
                    }
                    return $q.reject(response);
                }
            };
        };
        intercept.$inject = ["$q"];
        $httpProvider.interceptors.push(intercept);

        $routeProvider
            .when("/", {
                templateUrl: "/templates/_index.html",
                controller: "MyController",
                resolve: {
                    "accessToken": function (TokenManager) {
                        return TokenManager.fetchAccessToken(BASE_API_URL);
                    }
                }
            })
            //.otherwise({
            //    templateUrl: "/templates/angular-index.html",
            //    controller: "MyController",
            //    resolve: {
            //        "accessToken": function (TokenManager) {
            //            return TokenManager.fetchAccessToken(BASE_API_URL);
            //        }
            //    }
            //})
            ;
    };
    config.$inject = ["$httpProvider", "$routeProvider"];
    angular.module(NG_MODULE_NAME)
        .config(config);
}