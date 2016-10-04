angular
    .module('businessIntellegence')
    .factory('UtilitiesService', UtilitiesService);

UtilitiesService.$inject = ['$log'];

/* @ngInject */
function UtilitiesService($log) {
    var service = {
        isEmailValid: isEmailValid,
        isUrlValid: isUrlValid,
        hasValueGreaterThanZero: hasValueGreaterThanZero,
        isDateInRange: isDateInRange,
        isRangeInRange: isRangeInRange,
        isValidDate: isValidDate,
        isEmpty: isEmpty,
        isNotEmpty: isNotEmpty,
        isDateEarlierThan: isDateEarlierThan,
        generateUUID: generateUUID,
        normalizeDate: normalizeDate,
        isUnique: isUnique,
        prepareDateForServer: prepareDateForServer,
        normalizeDateAsMoment: normalizeDateAsMoment,
        getDeviceDateTime: getDeviceDateTime,
        getDeviceDateTimeForServe: getDeviceDateTimeForServe,
        getDefaultClientDateFormat: getDefaultClientDateFormat,
        isDateBetweenPeriods: isDateBetweenPeriods,
        isStartDateGreaterThanEndDate: isStartDateGreaterThanEndDate,
        qitjaPresjet: qitjaPresjet
    };

    return service;
    ////////////////

    //is start date greater than end date (raise error if)
    //is end date lower than start date (raise error if)
    //is start date between a period
    //is end date between a period

    //on each event is start date lower than period start_date and end date grater than period end_date
    //end date can be null and needs to be take into consideration while checking

    function qitjaPresjet(input) {
        var parts = input.split('.');
        parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return parts[0] + "." + parts[1];
    }

    function isRangeEncapsulatingRange(start_date, end_date, list, name_of_start_date, name_of_end_date) {

        if (isEmpty(name_of_start_date)) {
            name_of_start_date = 'start_date';
        }

        if (isEmpty(name_of_end_date)) {
            name_of_end_date = 'end_date';
        }

        if (isEmpty(start_date)) {
            return false;
        }

        if (isEmpty(end_date)) {
            return false;
        }

        if (isEmpty(list)) {
            return false;
        }

        if (list.length === 0) {
            return false;
        }

        var i;
        var period;
        var result = false;
        var period_end_date, period_start_date;

        var p_start_date = normalizeDate(start_date);
        var p_end_date = normalizeDate(end_date);

        if (isValidDate(p_start_date) && isValidDate(p_end_date)) {

            for (i = 0; i < list.length; i++) {
                period = list[i];

                period_start_date = normalizeDate(period[name_of_start_date]);
                period_end_date = normalizeDate(period[name_of_end_date]);

                if (moment(date_to_check).isBetween(start_date, end_date, 'days', '[]')) {
                    return true;
                }
            }
        }

        return result;

    }

    function isDateBetweenPeriods(dateToCheck, list, name_of_start_date, name_of_end_date) {

        if (isEmpty(name_of_start_date)) {
            name_of_start_date = 'start_date';
        }

        if (isEmpty(name_of_end_date)) {
            name_of_end_date = 'end_date';
        }

        if (isEmpty(dateToCheck)) {
            return false;
        }

        if (isEmpty(list)) {
            return false;
        }

        if (list.length === 0) {
            return false;
        }

        var i;
        var period;
        var result = false;
        var end_date;
        var start_date;

        var date_to_check = normalizeDate(dateToCheck);

        if (isValidDate(date_to_check)) {

            for (i = 0; i < list.length; i++) {
                period = list[i];

                start_date = normalizeDate(period[name_of_start_date]);
                end_date = normalizeDate(period[name_of_end_date]);

                if (moment(date_to_check).isBetween(start_date, end_date, 'days', '[]')) {
                    return true;
                }
            }
        }

        return result;
    }

    function isStartDateGreaterThanEndDate(start_date, end_date) {

        if (isEmpty(start_date)) {
            return false;
        }

        if (isEmpty(end_date)) {
            return false;
        }

        var start_date = normalizeDate(start_date);
        var end_date = normalizeDate(end_date);

        return start_date > end_date;
    }

    function getDefaultClientDateFormat(date, format) {
        if (isEmpty(date)) {
            return null;
        } else {
            return normalizeDate(date, format).format("mediumDate");
        }
        return null;
    }

    function getDeviceDateTime() {
        return moment().format("YYYY-MM-DD hh:mm:ss A");
    }

    function getDeviceDateTimeForServe() {
        return moment().format("YYYY-MM-DDThh:mm:ss.SSSz").concat("Z");
    }


    function isUnique(code, list, fieldName, id_of_entity) {

        if (isEmpty(code)) {
            throw new Error('Code passed to isUnique function is empty, Cannot not check empty against other values');
        }

        if (isEmpty(list)) {
            throw new Error('List passed to isUnique function is empty, List should be an array with zero or more elements');
        }

        if (isEmpty(fieldName)) {
            throw new Error('FieldName passed to isUnique function is empty, FieldName should not be empty');
        }

        var answer = true;

        _.forEach(list, function(item) {

            if (_.isObject(item) && _.has(item, fieldName)) {
                if ((code.toUpperCase() === (item[fieldName]).toUpperCase()) && (id_of_entity !== item.id)) {
                    answer = false;
                }
            }
        });

        return answer;
    }

    function normalizeDate(crazyDate, format) {

        if (isEmpty(format)) {
            format = "MMM DD, YYYY";
        }

        if (isEmpty(crazyDate)) {
            return null;
        }

        if (angular.isDate(crazyDate)) {
            return crazyDate;
        }

        if (angular.isString(crazyDate)) {
            //return moment("Feb 7,2016","MMM DD,YYYY").toDate();

            if ((crazyDate.includes("T") && crazyDate.includes("-")) || crazyDate.includes("Z")) {
                format = "YYYY-MM-DDThh:mm:ss.SSSz";
            } else if (crazyDate.includes("-")) {
                format = "YYYY-MM-DD";
            }

            return moment(crazyDate, format).toDate();
        }

        throw new Error("first parameter in normalizeDate function was not a Date nor a String");
    }

    function normalizeDateAsMoment(crazyDate, format) {

        if (isEmpty(format)) {
            format = "MMM DD, YYYY";
        }

        if (isEmpty(crazyDate)) {
            return null;
        }

        if (angular.isDate(crazyDate)) {
            return moment(crazyDate);
        }

        if (angular.isString(crazyDate)) {
            //return moment("Feb 7,2016","MMM DD,YYYY").toDate();

            if (crazyDate.includes("T") || crazyDate.includes("-") || crazyDate.includes("Z")) {
                format = "YYYY-MM-DDThh:mm:ss.SSSz";
            }

            return moment(crazyDate, format);
        }

        throw new Error("first parameter in normalizeDate function was not a Date nor a String");
    }

    function prepareDateForServer(crazyDate) {
        if (!isEmpty(crazyDate)) {

            if (moment.isMoment(crazyDate)) {
                return crazyDate.format("YYYY-MM-DD").concat("T00:00:00.000Z");
            }

            return (normalizeDateAsMoment(crazyDate) && normalizeDateAsMoment(crazyDate).format("YYYY-MM-DD").concat("T00:00:00.000Z"));
        }

        return crazyDate;
    }

    function isEmailValid(email) {

        var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        return regExp.test(email);
    }

    //(http|https|ftp)\://
    function isUrlValid(url) {
        var regExp = new RegExp(
            "^([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
        return regExp.test(url);
    }

    function isEmpty(o) {
        return (_.isNull(o) || _.isUndefined(o) || (typeof o === 'string' && o.trim().length === 0) || o === "null");
    }

    function isNotEmpty(o) {
        return (angular.isDefined(o) && o !== null);
    }

    function hasValueGreaterThanZero(value) {

        if (isEmpty(value)) {
            return false;
        }

        try {
            //TODO: refactor this piece of code because toFixed returns a string
            if (parseFloat(value).toFixed(2) > 0) {
                return true;
            }
        } catch (Error) {
            return false;
        }

    }

    function isDateInRange(value, startdateBoundary, enddateBoundary) {

        if (isEmpty(enddateBoundary)) {
            return value >= startdateBoundary;
        }

        return value >= startdateBoundary && value <= enddateBoundary;
    }

    function isRangeInRange(startD, endD, startdateBoundary, enddateBoundary) {
        return startD >= startdateBoundary && endD <= enddateBoundary;
    }

    function isDateEarlierThan(earlier, later) {
        return earlier < later;
    }

    function isValidDate(value) {

        return moment.isDate(value);
    }

    function generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();; //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

}
