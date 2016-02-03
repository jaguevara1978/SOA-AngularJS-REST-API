(function () {
    'use strict';

/**
 * @ngdoc function
 * @name app.controller:SignUp
 * @description
 * # SignUp
 * Controller of the app
 */
angular.module('app.signup').controller('SignUp', SignUp);

/*@ngInject*/
function SignUp(UserService, $location, $rootScope, FlashService, $scope) {
    var vm = this;

   //For testing purposes only
   /* vm.user = {
        firstName: 'Alex',
        lastName: 'Guevara',
        email: 'jaguevara1978@gmail.com',
    };*/
   //For testing purposes only

    vm.signup = signup;

    function signup() {
        vm.dataLoading = true;
        UserService.create(vm.user)
            .then(function (response) {
                if (response.success) {
                    //FlashService.Success('Registration successful', true);

                    $rootScope.globals.name = vm.user.firstName;
                    $rootScope.globals.email = vm.user.email;

                    $location.path('/suconf');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
    }
}
})();