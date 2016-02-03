(function () {
'use strict';

/**
 * @ngdoc service
 * @name app.UserService
 * @description
 * # UserService
 * Factory in the app.
 */
angular.module('app').factory('UserService', UserService);

    /*@ngInject*/
    function UserService($http, config) {
        var service = {};

        service.GetAll = GetAll;
        service.get = get;
        service.GetByUsername = GetByUsername;
        service.getByEmail = getByEmail;
        service.create = create;
        service.update = update;
        service.Delete = Delete;
        service.login = login;
        service.expressEntry = expressEntry;
        service.retrievePassword = retrievePassword;

        return service;

        function GetAll() {
            return $http.get(config.apiUrl + 'getAll').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function getByEmail(email) {
            return $http.get('/api/users/' + email).then(handleSuccess, handleError('Error getting user by email'));
        }
/**********************************/
        function get(id) {
            return $http.get(config.apiUrl + 'getMember/?id=' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function create(user) {
            return $http.post(config.apiUrl + 'memberCreate', user).then(handleSuccess, handleErrorResponse);
        }

        function login(user) {
            return $http.post(config.apiUrl + 'memberSignIn', user).then(handleSuccess, handleErrorResponse);
        }

        function update(user) {
            return $http.post(config.apiUrl + 'memberUpdate', user).then(handleSuccess, handleErrorResponse);
        }
        
        function expressEntry(user) {
            return $http.post(config.apiUrl + 'expressEntry', user).then(handleSuccess, handleErrorResponse);
        }
        
        function retrievePassword( user ) {
            return $http.post(config.apiUrl + 'memberRetrievePassword', user).then(handleSuccess, handleErrorResponse);
        }
/**********************************/
    

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(data) {
            data.success = true;
            return data;
        }

        function handleErrorResponse(data) {
            //console.log(data);
            return { success: false, message: data.data.msg };
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();