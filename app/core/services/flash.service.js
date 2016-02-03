(function () {
'use strict';

/**
 * @ngdoc service
 * @name app.FlashService
 * @description
 * # FlashService
 * Factory in the app.
 */
angular.module('app').factory('FlashService', FlashService);

    /*@ngInject*/
    function FlashService($rootScope, $alert, toastr, toaster) {

/* TOASTER EXAMPLES **********
    $scope.pop = function(){
        toaster.success({title: "title", body:"text1"});
        toaster.error("title", "text2");
        toaster.pop({type: 'wait', title: "title", body:"text"});
        toaster.pop('success', "title", '<ul><li>Render html</li></ul>', 5000, 'trustedHtml');
        toaster.pop('error', "title", '<ul><li>Render html</li></ul>', null, 'trustedHtml');
        toaster.pop('wait', "title", null, null, 'template');
        toaster.pop('warning', "title", "myTemplate.html", null, 'template');
        toaster.pop('note', "title", "text");
        toaster.pop('success', "title", 'Its address is https://google.com.', 5000, 'trustedHtml', function(toaster) {
            var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
            if (match) $window.open(match[0]);
            return true;
        });
        toaster.pop('warning', "Hi ", "{template: 'myTemplateWithData.html', data: 'MyData'}", 15000, 'templateWithData');
    };
    
    $scope.goToLink = function(toaster) {
      var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
      if (match) $window.open(match[0]);
      return true;
    };
*/
        var service = {};

        service.Success = Success;
        service.Error = Error;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                toaster.clear();
/*             
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
*/
            }
        }

        function Success(message, alertDuration) {
            var alertTitle = 'Great!';
            //toastr.info(message, alertTitle);
            toaster.info(alertTitle, message);


/*            alertDuration = alertDuration || 3; 
            var mainAlert = $alert({title: alertTitle, content: message, placement: 'top', type: 'info', show: true, duration: alertDuration});
*/
            /*$rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };*/
        }

        function Error(message, alertDuration) {
            var alertTitle = 'Something weird happened!';
            //toastr.error(message, alertTitle);
            toaster.error(alertTitle, message);

/*            alertDuration = alertDuration || 3;
            alertDuration = alertDuration === true ? 3 : alertDuration;
            var mainAlert = $alert({title: alertTitle, content: message, placement: 'top', type: 'danger', show: true, duration: alertDuration});
*/
            /*$rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };*/
        }
    }
})();