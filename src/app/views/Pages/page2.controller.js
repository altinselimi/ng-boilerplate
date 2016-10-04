angular
    .module('app.dashboard')
    .controller('Page2', Page2);

Page2.$inject = ['$scope', '$rootScope', '$state', '$log'];

/* @ngInject */
function Page2($scope, $rootScope, $state, $log) {
    /* jshint validthis: true */
    var vm = this;
    vm.page2text = "THIS IS PAGE 2.";
}
