/**
 * Created by visaruruqi on 09/04/16.
 */
angular
    .module('businessIntellegence')
    .factory('SecurityManagerService', SecurityManagerService);

SecurityManagerService.$inject = ['$log', 'ContextService'];

/* @ngInject */
function SecurityManagerService($log, ContextService) {

    var localStorage = window.localStorage;

    var SecurityManager = {
        username: null,
        key: null,
        app_id: "ADMIN",
        app_version: "0.9.1",
        geography: null,
        country: null,
        state: null,
        city: null,
        ip: null
    };


    var service = {

        setCredentials: function (username, password) {
            SecurityManager.username = username;
            SecurityManager.key = CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(password));
            //localStorage['SecurityManager.username'] = SecurityManager.username;
            //localStorage['SecurityManager.key'] = SecurityManager.key;

        },
        generate: function () {

            // Set the username.
            var token, hash, timestamp, message, info, plain;

            //SecurityManager.username = SecurityManager.username || localStorage['SecurityManager.username'];

            // Set the client IP address.
            //SecurityManager.ip = SecurityManager.ip || SecurityManager.getIp();

            // Set the key.
            //SecurityManager.key = SecurityManager.key || localStorage['SecurityManager.key'];

            if (!SecurityManager.key) {
                service.logout();
            }
            //Get Current timestamp
            timestamp = moment().valueOf();

            // Construct the hash body by concatenating the userAgent, username, app_id, app_version.
            message = [
                navigator.userAgent,
                SecurityManager.app_id,
                SecurityManager.app_version,
                SecurityManager.username,
                timestamp].join(':');

            // Hash the message, using the key.
            hash = CryptoJS.HmacSHA256(message, SecurityManager.key);

            // Base64-encode the hash to get the resulting token.
            token = CryptoJS.enc.Base64.stringify(hash);

            /* var geography = "US";
             var country = "Texas";
             var state = "Texas";
             var city = "Dallas";*/

            /*SecurityManager.geography = SecurityManager.geography || "";
            SecurityManager.country = SecurityManager.country || "";
            SecurityManager.state = SecurityManager.state || "";
            SecurityManager.city = SecurityManager.city || "";*/

            plain = [
                navigator.userAgent,
                SecurityManager.app_id,
                SecurityManager.app_version,
                SecurityManager.username,
                timestamp,
                SecurityManager.geography,
                SecurityManager.country,
                SecurityManager.state,
                SecurityManager.city
            ].join(':');

            info = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(plain));

            return {
                token: token,
                info: info,
                message: message,
                plain: plain,
                hashed_password: SecurityManager.key
            };
        },

        logout: function () {

            localStorage.removeItem('SecurityManager.username');
            SecurityManager.username = null;

            localStorage.removeItem('SecurityManager.key');
            SecurityManager.key = null;

            ContextService.destroyThisContext();
        },

        getGeoInfo: function () {


            $.ajax({
                url: 'http://ip-api.com/json',
                method: 'GET',
                async: true,
                timeout: 2000,
                success: function (data) {
                    SecurityManager.geography = data.regionName;
                    SecurityManager.country = data.country;
                    SecurityManager.state = data.regionName;
                    SecurityManager.city = data.city;
                    SecurityManager.ip = data.ip;
                },
                error: function (error) {

                    /*************** BACKUP SERVICE ******************************/

                    $.ajax({
                        url: 'freegeoip.net/json/',
                        method: 'GET',
                        async: true,
                        timeout: 2000,
                        success: function (data) {
                            SecurityManager.geography = data.region_name;
                            SecurityManager.country = data.country_name;
                            SecurityManager.state = data.region_name;
                            SecurityManager.city = data.city;
                            SecurityManager.ip = data.ip;
                        }
                    });

                    /*************** END OF BACKUP SERVICE **********************/
                }
            });

        }
    };

    return service;

}
