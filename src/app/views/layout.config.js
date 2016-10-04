angular.module('app.dashboard', [
    'ui.router'
]).config(function($stateProvider) {
    $stateProvider.state('app.dashboard', {
        url: "/home",
        views: {
            "@": {
                templateUrl: 'app/views/layout.html'
            },
            "header@app.dashboard": {
                templateUrl: 'app/views/header.html',
                controller: 'HeaderCtrl',
                controllerAs: 'header'
            },
            "sidebar@app.dashboard": {
                templateUrl: 'app/views/Sidebar/sidebar.html',
                controller: 'SidebarCtrl',
                controllerAs: 'sidebar'
            }
        }
    }).state('app.dashboard.page1', {
        url: "/page1",
        views: {
            "content@app.dashboard": {
                templateUrl: 'app/views/Pages/page1.html',
                controller: 'Page1',
                controllerAs: 'vm'
            }
        }
    }).state('app.dashboard.page2', {
        url: "/page2",
        views: {
            "content@app.dashboard": {
                templateUrl: 'app/views/Pages/page2.html',
                controller: 'Page2',
                controllerAs: 'vm'
            }
        }
    });
});
