angular
    .module('businessIntellegence')
    .factory('ContextService', ContextService);

ContextService.$inject = ['$log', 'localStorageService', 'UtilitiesService','$cacheFactory'];

/* @ngInject */
function ContextService($log, localStorageService, UtilitiesService,$cacheFactory) {

    var data = {
        currentUser: null,
        currentProperty: null,
        owner: undefined,
        properties: [],
        enterprise_identifier: "hotelbrand"
    };

    var currentContentAccess = null;

    var service = {
        isSuperUser: isSuperUser,
        isOwner: isOwner,
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser,
        setCurrentProperty: setCurrentProperty,
        getCurrentProperty: getCurrentProperty,
        persistToLocalStorage: persistToLocalStorage,
        restoreFromLocalStorage: restoreFromLocalStorage,
        destroyThisContext: destroyThisContext,
        getUserFullName: getUserFullName,
        getEnterpriseIdentifier: getEnterpriseIdentifier,
        setEnterpriseIdentifier: setEnterpriseIdentifier,
        checkConextHealth: checkConextHealth,
        getCurrency: getCurrency,
        setProperties: setProperties,
        getProperties: getProperties,
        resetCurrentProperties: resetCurrentProperties,
        clearCurrentProperty: clearCurrentProperty,
        setContentAccess: setContentAccess,
        getContentAccess: getContentAccess,
        clearContentAccess: clearContentAccess
    };

    return service;


    ////////////////
    function clearContentAccess() {
        currentContentAccess = null;
    }

    function setContentAccess(incoming) {
        currentContentAccess = incoming;
    }

    function getContentAccess() {
        return currentContentAccess;
    }

    function resetCurrentProperties() {
        data.properties = [];
        $cacheFactory.get('$http').removeAll();
    }

    function setProperties(list) {
        if (!UtilitiesService.isEmpty(list)) {
            data.properties = list;
        }

    }

    function getProperties() {
        return data.properties;
    }

    function getCurrency() {
        return (getCurrentProperty() || {currency: "USD"}).currency;
    }

    function checkConextHealth() {

        if (data.currentUser === null) {
            throw new Error("No User logged in for this session");
        }

        if (data.currentUser.device === null) {
            throw new Error("Object device not found on the login response, Cannot continue");
        }

        if (UtilitiesService.isEmpty(data.currentUser.device.access_token)) {
            throw new Error("Access Token appears to be empty, cannot continue without access_token");
        }
    }

    function setEnterpriseIdentifier(identifier) {
        data.enterprise_identifier = identifier;
    }

    function getEnterpriseIdentifier() {
        return data.enterprise_identifier || "hotelbrand";
    }

    function getUserFullName() {
        return data.currentUser.first_name + " " + data.currentUser.last_name;
    }

    function destroyThisContext() {
        data.currentUser = null;
        data.currentProperty = null;
        data.properties = [];
        data.enterprise_identifier = null;
        //persistToLocalStorage();
    }

    function isSuperUser() {

        if (angular.isDefined(data.currentUser) &&
            data.currentUser !== null &&
            data.currentUser.super_user === true) {

            return true;
        }

        return false;
    }

    function isOwner() {

        if (angular.isDefined(data.currentUser) && checkIfOwner() === true) {
            return true;
        }

        return false;
    }

    //check if user is owner in one of the properties
    function checkIfOwner() {

        if (angular.isUndefined(data.owner)) {

            var found = _.findWhere(data.currentUser.properties, {owner: true});

            if (angular.isDefined(found)) {
                data.owner = true;
            }
            else {
                data.owner = false;
            }
        }

        return data.owner;
    }

    function setCurrentUser(user) {
        if (angular.isDefined(user) && user !== null) {
            data.currentUser = user;
            //return $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.currentUser.device.access_token;
            //persistToLocalStorage();
        }
        else {
            throw Error("You cannot set an empty user in context");
        }
    }

    function getCurrentUser() {
        return data.currentUser;
    }

    function setCurrentProperty(property) {
        if (angular.isDefined(property) && property !== null) {
            data.currentProperty = property;
            //persistToLocalStorage();
        }
        else {
            throw Error("You cannot set an empty property in context");
        }
    }

    function clearCurrentProperty() {
        data.currentProperty = null;
        //persistToLocalStorage();
    }

    function getCurrentProperty() {
        return data.currentProperty;
    }

    function persistToLocalStorage() {
        //var result = localStorageService.set('admin', data);

        var build = JSON.stringify({
            currentUser: {
                username: data.currentUser && data.currentUser.username,
                first_name: data.currentUser && data.currentUser.first_name,
                last_name: data.currentUser && data.currentUser.last_name,
                language_code: data.currentUser && data.currentUser.language_code,
                super_user: data.currentUser && data.currentUser.super_user,
                email: data.currentUser && data.currentUser.email,
                tfa_status: data.currentUser && data.currentUser.tfa_status,
                device: data.currentUser && data.currentUser.device
            },
            currentProperty: data.currentProperty,
            owner: data.owner,
            enterprise_identifier: data.enterprise_identifier
        });

        $log.info("Persist: ", build);

        window.localStorage.setItem('hk.admin', build);
    }

    function restoreFromLocalStorage() {

        var restoredContext;

        try {

            //var restoredContext = localStorageService.get('admin');
            restoredContext = JSON.parse(window.localStorage.getItem('hk.admin'));

            if (restoredContext && restoredContext.currentUser) {

                data.currentProperty = restoredContext.currentProperty;
                data.currentUser = restoredContext.currentUser;
                data.enterprise_identifier = restoredContext.enterprise_identifier;

                //return $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.currentUser.device.access_token;
            }

        } catch (error) {
            $log.error("Localstorage: ", error);
        }

        return restoredContext;
    }


}
