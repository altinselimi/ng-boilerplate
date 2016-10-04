angular
    .module('app.dashboard')
    .controller('SidebarCtrl', SidebarCtrl);

SidebarCtrl.$inject = ['$scope'];

/* @ngInject */
function SidebarCtrl($scope) {
    /* jshint validthis: true */
    var vm = this;
    vm.sidebarText = "Hello, my name is Sidebar."
}
