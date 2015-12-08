/// <reference path="./_references.ts"/>

module MvcAngularClientApp {
    "use strict";
    export var NG_MODULE_NAME = "MvcAngularClientApp";
    export var BASE_API_URL = "http://localhost:19806/";

    //function config($httpProvider) {
    //    function intercept($q) {
    //        return {
    //            'request': function (config) {

    //                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJjbGllbnRfaWQiOiJtdmM2Iiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwiYXBpMSJdLCJzdWIiOiI4MTg3MjciLCJhbXIiOlsicGFzc3dvcmQiXSwiYXV0aF90aW1lIjoxNDQ5NTcyNTAwLCJpZHAiOiJpZHNydiIsInJvbGUiOlsiQWRtaW4iLCJHZWVrIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTg5NDIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjE4OTQyL3Jlc291cmNlcyIsImV4cCI6MTQ0OTU3NjEwMywibmJmIjoxNDQ5NTcyNTAzfQ.OSuUzFC0lKwZczI9SehQdwGhwnpwjbirG7m-PZQDZZRFkf7PQAhP3YwG6xJXCxDMhHKZyrQgZjFUP11PCdPXmJfanaGx52-SyhCqSmaMM7LBSCc5q6SdafF3iAVJJ1UxvIBXum1MwXxFuo_tot3Pd7S2qBjAkdbh2BrVenBjBddKK_UQePfyo8Nvmfez4AGMWJXWTfLX_EZ5ddU-1PLG8OhLkln9om6LF5pi9IzUGM6MLQlGle7KaUztfpfl6qI_wDuwzqzM559nFVLQbhDWzfZiBRuIJ_UwL-UAWT8nhdZNfcLFPFt6HRSH_EfM1h65Q-YVGJBi80J_CXwVM873Sw";
    //                if (token) {
    //                    config.headers['Authorization'] = 'Bearer ' + token;
    //                }
    //                return config;
    //            },
    //            'responseError': function (response) {
    //                if (response.status === 401) {
    //                    //idmTokenManager.removeToken();
    //                }
    //                if (response.status === 403) {
    //                    //idmTokenManager.removeToken();
    //                }
    //                return $q.reject(response);
    //            }
    //        };
    //    };
    //    intercept.$inject = ["$q"];
    //    $httpProvider.interceptors.push(intercept);
    //};
    //config.$inject = ["$httpProvider"];


    angular.module(NG_MODULE_NAME, []);
    //.config(config);

}