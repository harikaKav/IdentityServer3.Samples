/// <reference path="../_references.ts"/>
var MvcAngularClientApp;
(function (MvcAngularClientApp) {
    "use strict";
    MvcAngularClientApp.NG_MODULE_NAME = "MvcAngularClientApp";
    MvcAngularClientApp.BASE_API_URL = "http://localhost:19806/";
    MvcAngularClientApp.ACCESS_TOKENS = {};
    angular.module(MvcAngularClientApp.NG_MODULE_NAME, ["ngRoute"]);
    function config($httpProvider, $routeProvider) {
        function intercept($q) {
            return {
                'request': function (config) {
                    if (config.url === "getaccesstoken")
                        return config;
                    else {
                        var token = MvcAngularClientApp.ACCESS_TOKENS[MvcAngularClientApp.BASE_API_URL]; //todo - how to get the correct host
                        if (token) {
                            config.headers['Authorization'] = 'Bearer ' + token;
                        }
                        return config;
                    }
                },
                'responseError': function (response) {
                    if (response.status === 401) {
                    }
                    if (response.status === 403) {
                    }
                    return $q.reject(response);
                }
            };
        }
        ;
        intercept.$inject = ["$q"];
        $httpProvider.interceptors.push(intercept);
        $routeProvider
            .when("/", {
            templateUrl: "/templates/_index.html",
            controller: "MyController",
            resolve: {
                "accessToken": function (TokenManager) {
                    return TokenManager.fetchAccessToken(MvcAngularClientApp.BASE_API_URL);
                }
            }
        });
    }
    ;
    config.$inject = ["$httpProvider", "$routeProvider"];
    angular.module(MvcAngularClientApp.NG_MODULE_NAME)
        .config(config);
})(MvcAngularClientApp || (MvcAngularClientApp = {}));
