var app = angular.module('myapp', ['ngRoute']);
app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    })
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.loading = false;
        }, 500)

    })
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.loading = false;
        alert('Lỗi');
    })
})
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/home.html',
            controller: 'homectrl'
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'loginctrl'
        })
        .when('/products', {
            templateUrl: '../views/products.html',
            controller: 'productsctrl'
        })
        .when('/products/tops', {
            templateUrl: '../views/products-top.html',
            controller: 'products-top-ctrl'
        })
        .when('/products/bottoms', {
            templateUrl: '../views/products-bottoms.html',
            controller: 'products-bottoms-ctrl'
        })
        .when('/products/bags', {
            templateUrl: '../views/products-bags.html',
            controller: 'products-bags-ctrl'
        })
        .when('/products/accessories', {
            templateUrl: '../views/products-accessories.html',
            controller: 'products-accessories-ctrl'
        })
        .when('/detail/:id', {
            templateUrl: '../views/detail.html',
            controller: 'detailctrl'
        })
        .when('/cart', {
            templateUrl: '../views/cart.html',
            controller: 'cartctrl'
        })
        .when('/about', {
            templateUrl: '../views/about.html',
            controller: 'aboutctrl'
        })
        .when('/contact', {
            templateUrl: '../views/contact.html',
            controller: 'contactctrl'
        })
        .when('/account', {
            templateUrl: '../views/account.html',
            controller: 'accountctrl'
        })
        .otherwise({
            redirectTo: '/'
        })
})
app.controller('appctrl', function ($scope, $rootScope, $http) {


    $scope.dsSP = [];
    $http.get('../data/data.json').then
        (
            function (res) {
                $scope.dsSP = res.data[0].Shop;// Truy cập vào mảng "Shop" của đối tượng đầu tiên trong mảng JSON.

            },
            function (res) {
                alert('Lỗi');
            }
        )


    $rootScope.cart = [];
    $rootScope.soLuongTrongCart = 0;
    // $rootScope.soLuongTrongCartFunction = function () {
    //     for (var i = 0; i < $rootScope.cart.length; i++) {
    //         $rootScope.soLuongTrongCart += $rootScope.cart[i].quantity;
    //     }
    // }

    $rootScope.addToCart = function (sp) {
        var selectedSize = $rootScope.sizeChooseinDetail;
        var spInDetail = $rootScope.productInDetail;
        // console.log(spInDetail);

        // Kiểm tra xem có size được chọn hay không
        if (!selectedSize && spInDetail.Size != null) {
            // Hiển thị cảnh báo nếu không có size được chọn
            alert("Vui lòng chọn size trước khi thêm vào giỏ hàng.");
            return;
        }

        var inCart = false;

        // Đã có trong cart -> tăng số lượng hoặc thêm size mới
        for (var i = 0; i < $rootScope.cart.length; i++) {
            if ($rootScope.cart[i].Id == sp.Id && $rootScope.cart[i].selectedSize == selectedSize) {
                inCart = true;
                $rootScope.cart[i].quantity++;
                $rootScope.soLuongTrongCart += 1;
                break;
            }
        }

        // SP chưa có trong cart hoặc có nhưng size khác -> thêm mới
        if (!inCart) {
            var newCartItem = angular.copy(sp);
            newCartItem.quantity = 1;
            $rootScope.soLuongTrongCart += 1;
            newCartItem.selectedSize = selectedSize;
            $rootScope.cart.push(newCartItem);
        }

        console.log($rootScope.cart);

    }

    $rootScope.dsUser = [];
    $http.get('../data/datauser.json').then
        (
            function (res) {
                $rootScope.dsUser = res.data;
            },
            function (res) {
                alert('Lỗi');
            }
        )












})