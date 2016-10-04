(function(angular) {
    "use strict";
    // Declare app level module which depends on views, and components

    angular.module('businessIntellegence', [
            'app.dashboard',
            'ui.router',
            'toastr',
            'ngSanitize',
            'LocalStorageModule'
        ]).config(['toastrConfig', function(toastrConfig) {
            angular.extend(toastrConfig, {
                allowHtml: false,
                autoDismiss: false,
                closeButton: false,
                closeHtml: '<button>&times;</button>',
                containerId: 'toast-container',
                extendedTimeOut: 1000,
                iconClasses: {
                    error: 'toast-error',
                    info: 'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                maxOpened: 0,
                messageClass: 'toast-message',
                newestOnTop: true,
                onHidden: null,
                onShown: null,
                onTap: null,
                positionClass: 'toast-bottom-right',
                preventDuplicates: false,
                preventOpenDuplicates: true,
                progressBar: false,
                tapToDismiss: true,
                target: 'body',
                templates: {
                    toast: 'directives/toast/toast.html',
                    progressbar: 'directives/progressbar/progressbar.html'
                },
                timeOut: 5000,
                titleClass: 'toast-title',
                toastClass: 'toast'
            });
        }]).constant('APP_CONFIG', {
/*          
            APP CONFIG URL  
            'API_URL': "http://dev1.hotelkeyapp.com",
            // 'API_URL': "http://10.0.1.13:8090",
            'API_VERSION': 'v2',
            'API_REPORTS_VERSION': 'v2-reports',
            'API_BASE_URL': ''*/
        }).config(['localStorageServiceProvider', function(localStorageServiceProvider) {
            //localStorageServiceProvider.setPrefix('hk');
            localStorageServiceProvider
                .setPrefix('app')
                .setStorageType('localStorage')
                .setNotify(true, true);
        }]).config(['$urlRouterProvider', function($urlRouterProvider) {
            $urlRouterProvider.otherwise('/app/home');
        }])
        .config(['$logProvider', function($logProvider) {
            $logProvider.debugEnabled(true);
        }]).config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('app', {
                url: '/app',
                abstract: true,
                template: '<ui-view/>'
            });
        }])
        .run(function($rootScope, $log, $state, $stateParams, $filter, $timeout, APP_CONFIG) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            //$rootScope.enterFunction = function($event, list, searchFunction, enterFunction) {};

            // register listener to watch route changes


            /*  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
             console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
             });*/

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
                // $log.debug('$stateChangeError - fired when an error occurs during transition.');
                // $log.debug(arguments);
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                //set Content buttons to unavailable if getContentRights === "READ"
            });

            $rootScope.$on('$viewContentLoaded', function(event) {
                //SCOPE CHANGED
            });

            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
                // $log.debug('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
                // $log.debug(unfoundState, fromState, fromParams);
            });
        });

})(angular);
