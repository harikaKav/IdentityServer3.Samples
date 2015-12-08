/// <reference path="./_references.ts"/>

module MvcAngularClientApp {
    export interface IMyScope extends ng.IScope {
        testString: string;
        accessToken: string;
        identity: string;
    }
}