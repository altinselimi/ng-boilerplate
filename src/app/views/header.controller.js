angular
    .module('app.dashboard')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$state', '$log', '$timeout'];

/* @ngInject */
function HeaderCtrl($state, $log, $timeout) {
    /* jshint validthis: true */
    var vm = this;
    vm.headertext = "Nice to meet you Sidebar, my name is Header."
}
