(function () {
    'use strict';
    
    /**
     * @ngdoc overview
     * @name app
     * @description
     * # app
     *
     * Main module of the application.
     */
    angular.module('app', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         * and then when app.dashboard tries to use app.data,
         * it's components are available.
         */

        'ngAnimate',
        'ngFx',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngBusy',
        /*'mgcrea.ngStrap.helpers.dimensions',
        'mgcrea.ngStrap.tooltip',
        'mgcrea.ngStrap.popover',*/
        'mgcrea.ngStrap.alert',
        'mgcrea.ngStrap.aside',
        'mgcrea.ngStrap.modal',
        'mgcrea.ngStrap.popover',
        'ngPasswordStrength',
        'toaster'

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */ 
        ,'app.core'
        ,'app.widgets'
        /*
         * Feature areas
         */
        ,'app.layout'
        ,'app.signin'
        ,'app.signup'
        ,'app.welcome'
        ,'app.rewards'
        ,'app.suconf'
        ,'app.profile'
        ,'app.trivia'
        ,'app.contests'
        ,'app.tradings'
      ])
    .config(config)
    .run(run);

    angular.module('app').constant('config', {
        appName: 'app',
        appVersion: 0.1,
        apiUrl: 'http://api.matoot.com/',
        //apiUrl: 'http://api.checkpointchallenge.com/',
        //apiUrl: 'http://localhost/matoot/api/api_ori/',
        cookieName: 'globalsCKPTMembers'
    });

    /*@ngInject*/
    function config( $routeProvider ) {
        $routeProvider
          .otherwise({
            redirectTo: '/signin'
          })
          ;
    }
    
    /*@ngInject*/
    function run($rootScope, $location, $cookieStore, $http, config) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get(config.cookieName) || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray( $location.path( ), [ '/signin', '/signup', '/suconf', '/activate' ] ) === -1;

            //When url includes userId and pwd
            if ( restrictedPage ) {
                restrictedPage = $location.path( ).indexOf( '/signin' ) < 0;
            }

            if ( ! $rootScope.loggedIn ) {
                if ( $rootScope.globals.currentUser ) {
                    $rootScope.loggedIn = true;
                }
            }

            if ( restrictedPage && !$rootScope.loggedIn ) {
                $location.path('/signin');
            }
            

            $rootScope.showMainNavBar = $location.path( ) !== "/trivia";

        });
    }
    
/*    (function () { 
        var root = $(document.getElementsByTagName('body'));
        var watchers = [];
    
        var f = function (element) {
            if (element.data().hasOwnProperty('$scope')) {
                angular.forEach(element.data().$scope.$$watchers, function (watcher) {
                    watchers.push(watcher);
                });
            }
    
            angular.forEach(element.children(), function (childElement) {
                f($(childElement));
            });
        };
    
        f(root);
    
        console.log("How many watchers?: " + watchers.length);
    })();
*/ 
} )( );