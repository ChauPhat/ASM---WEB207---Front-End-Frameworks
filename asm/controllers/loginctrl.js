app.controller('loginctrl', function ($scope, $rootScope, $http,$timeout,$location) {

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    //////////////////////////////////////////////

    $scope.email = '';
    $scope.password = '';
    $scope.alertLogin = '';


    // Hàm kiểm tra đăng nhập
    console.log($rootScope.dsUser);
    $scope.checkLogin = function () {
        console.log("Hàm login được gọi");

        // Lặp qua danh sách người dùng
        for (var i = 0; i < $rootScope.dsUser.length; i++) {

            // Kiểm tra xem email và password có trùng khớp không
            if ($scope.email == $rootScope.dsUser[i].Email && $scope.password == $rootScope.dsUser[i].Pass) {
                console.log("Đăng nhập thành công!");
                $scope.alertLogin = 'Đăng nhập thành công!';
                $rootScope.usernameLogin = $rootScope.dsUser[i].FirstName;
                $rootScope.emailLogin = $rootScope.dsUser[i].Email;
                console.log($scope.email);
                console.log($scope.password);
                $timeout(function () {
                    $location.path('/');
                }, 2000);

                return;
            } else {
                console.log("Đăng nhập k thành công!");
                console.log($scope.email);
                console.log($scope.password);
                $scope.alertLogin = 'Đăng nhập k thành công!';
            }
        }
    };



    $scope.emailRegis = '';
    $scope.passwordRegis = '';
    $scope.confirmPasswordRegis = '';
    $scope.firstNameRegis = '';
    $scope.lastNameRegis = '';
    $scope.phoneRegis = '';
    $scope.alertEmailRegis = '';
    $scope.alertPhoneRegis = '';
    $scope.alertRegis = '';

    $scope.checkRegister = function () {
        // Lặp qua danh sách người dùng
        for (let i = 0; i < $rootScope.dsUser.length; i++) {
            // Kiểm tra xem email và password có trùng khớp không
            if ($scope.emailRegis === $rootScope.dsUser[i].Email) {
                $scope.alertEmailRegis = 'Email đã tồn tại vui lòng nhập lại';

                // Thực hiện hành động khi đăng nhập thành công
                return;
            } else {
                $scope.alertEmailRegis = '';
            }
            if ($scope.phoneRegis === $rootScope.dsUser[i].PhoneNumber) {
                $scope.alertPhoneRegis = 'SĐT đã tồn tại vui lòng nhập lại';

                // Thực hiện hành động khi đăng nhập thành công
                return;
            } else {
                $scope.alertPhoneRegis = '';
            }
            // Thêm thông tin người dùng mới vào danh sách
        }
        if ($scope.emailRegis && $scope.passwordRegis && $scope.confirmPasswordRegis && $scope.firstNameRegis && $scope.lastNameRegis && $scope.phoneRegis &&
            $scope.passwordRegis == $scope.confirmPasswordRegis) {
            const newUser = {
                "Id": $rootScope.dsUser.length + 1,
                "FirstName": $scope.firstNameRegis,
                "LastName": $scope.lastNameRegis,
                "PhoneNumber": $scope.phoneRegis,
                "Email": $scope.emailRegis,
                "Pass": $scope.passwordRegis
            };
            $rootScope.dsUser.push(newUser);
            $scope.alertRegis = 'Tạo tài khoản thành công';
        }

        console.log($rootScope.dsUser);
    };







})