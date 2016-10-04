angular
    .module('app.dashboard')
    .controller('Page1', Page1);

Page1.$inject = ['$scope', '$rootScope', '$state', '$log'];

/* @ngInject */
function Page1($scope, $rootScope, $state, $log) {
    /* jshint validthis: true */
    var vm = this;
    vm.page1Text = "THIS IS PAGE 1.";
}
