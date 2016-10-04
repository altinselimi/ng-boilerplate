angular
    .module('businessIntellegence')
    .factory('TimeUtility', TimeUtility);

TimeUtility.$inject = [];

/* @ngInject */
function TimeUtility() {
    var service = {
        convertFromMinutes: convertFromMinutes,
        convertToMinutes: convertToMinutes,

        parseTime: parseTime,
        incrementHour: incrementHour,
        decrementHour: decrementHour,
        incrementMin: incrementMin,
        decrementMin: decrementMin,
        changePeriod: changePeriod
    };

    return service;

    ////////////////

    function parseTime(time) {
        return {
            hour: time.substr(0, 2),
            min: time.substr(3, 2),
            period: time.substr(6, 2)
        }
    }

    function convertFromMinutes(min) {

        var hours = Math.floor(min / 60);
        var minutes = min % 60;

        var period = 'AM';

        if (hours >= 12) {
            period = 'PM';

            if (hours > 12) {
                hours = hours - 12;
            }
        }

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }


        return {
            hour: hours,
            min: minutes,
            period: period,
            toString: function () {
                return this.hour + ":" + this.min + " " + this.period;
            }
        };
    }

    function convertToMinutes(time) {

        var h = time.hour;
        var m = time.min;
        var z = time.period;

        if (parseInt(h, 10) === 12) {
            h = 0;
        }

        var pm = (z.toLowerCase() === 'pm') ? 12 : 0;

        return ((parseInt(h, 10) + pm) * 60) + parseInt(m, 10);

    }

    function decrementMin(m) {

        var min = parseInt(m, 10);

        min = min - 1;

        if (min < 0) {
            min = 59;
        }
        if (min < 10) {
            min = "0" + min;
        }


        return min;

    }

    function decrementHour(h) {

        var hour = parseInt(h, 10);

        hour = hour - 1;

        if (hour < 0) {
            hour = 12;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }


        return hour;
    }

    function incrementHour(h) {

        var hour = parseInt(h, 10);

        hour = hour + 1;

        if (hour > 12) {
            hour = 0;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }


        return hour;
    }

    function incrementMin(m) {

        var min = parseInt(m, 10);

        min = min + 1;

        if (min > 59) {
            min = 0;
        }
        if (min < 10) {
            min = "0" + min;
        }


        return min;

    }

    function changePeriod(p) {
        var period = p === "AM" ? "PM" : "AM";

        return period;
    }
}
