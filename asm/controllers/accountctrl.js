app.controller('accountctrl', function ($scope, $rootScope, $http,$timeout,$location) {

    $scope.logout = function () {
        $rootScope.usernameLogin = '';
        $timeout(function () {
            $location.path('/login');
        }, 1000);
    }

    $scope.passwordChange = '';
    $scope.confirmpasswordChange = '';
    $scope.alertPasswordChange = '';
    $scope.checkChangePassword = function () {
        for (var i = 0; i < $rootScope.dsUser.length; i++) {
            if ($rootScope.emailLogin === $rootScope.dsUser[i].Email) {
                var currentPassword = $rootScope.dsUser[i].Pass;

                if ($scope.passwordChange === currentPassword) {
                    $scope.alertPasswordChange = 'Mật khẩu mới không được trùng với mật khẩu cũ.';
                    return;
                } else {
                    $scope.alertPasswordChange = '';
                    $rootScope.dsUser[i].Pass = $scope.passwordChange;
                    console.log($rootScope.dsUser);
                    // Nếu bạn muốn đóng modal sau khi thay đổi mật khẩu thành công
                    // $('#exampleModal').modal('hide');
                }
            }
        }
    }




})