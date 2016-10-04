/**
 * Created by visaruruqi on 10/04/16.
 */

angular
    .module('businessIntellegence')
    .factory('hkSecurityInterceptor', hkSecurityInterceptor);

hkSecurityInterceptor.$inject = ['$q', '$log', 'SecurityManagerService', 'APP_CONFIG'];

function hkSecurityInterceptor($q, $log, SecurityManagerService, APP_CONFIG) {
    var interceptor = {
        'request': function (config) {
            /* Successful request method */

            if (config.url.indexOf(APP_CONFIG.API_URL) > -1) {

                var digest = SecurityManagerService.generate();

                config.headers['hk-token'] = digest.token;
                config.headers['hk-info'] = digest.info;

                /*$log.debug("Digest: ", digest);
                 $log.debug("hk-info: ", digest.plain);*/
            }

            return config;
            /* or $q.when(config); */
        },
        'response': function (response) {
            /* successful response */

            return response;
            /* or $q.when(config); */
        },
        'requestError': function (rejection) {
            /* an error happened on the request if we can recover
             from the error we can return a new requestor promise */

            //$log.debug("Global requestError: ", rejection);

            return $q.reject(rejection);
            /* or new promise Otherwise,
             we can reject the next by returning a rejection return $q.reject(rejection); */
        },
        'responseError': function (rejection) {
            // an error happened on the request
            // if we can recover from the error
            // we can return a new response
            // or promise

            if (rejection.status === 401){
                $log.debug("401: ",rejection);
/*                swal({
                    title: "Unauthorized!",
                    text: "You don't have enough permissions on <span class=\"text-primary\">" + rejection.config.url + "</span> Contact the administrator of the system to fix your permissions",
                    type: "error",
                    html: "true"
                });*/
            }

            if (rejection.status === 450 || rejection.status === 451) {

                $log.debug("Global responseError: ", rejection);

                if (rejection.config.url.indexOf('account/signin') === -1) {
                    window.location = window.location.pathname;
                    //AuthenticationService.ClearCredentials();
                    //$state.go('app.login');
                }
            }

            return $q.reject(rejection);
            /* or new promise Otherwise, we can reject the next by
             returning a rejection return $q.reject(rejection); */
        }
    };
    return interceptor;
}