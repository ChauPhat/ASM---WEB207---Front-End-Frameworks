app.controller('cartctrl', function ($scope, $rootScope) {

    $scope.increaseQuantity = function (product) {
        product.quantity++;
        $rootScope.soLuongTrongCart +=1;
        console.log(product);
    }

    $scope.decreaseQuantity = function (product) {
        if (product.quantity > 1) {
            product.quantity--;
            $rootScope.soLuongTrongCart -=1;
            console.log(product);
        }
    }




    $scope.tongTien = function () {
        var tong = 0;
        for (var i = 0; i < $rootScope.cart.length; i++) {
            tong += $rootScope.cart[i].quantity * $rootScope.cart[i].Price;

        }
        return tong;
    }


    // ảo chỉ nhận vào id nhưng có thể phân biệt size và xóa :)))
    $scope.xoa = function (id, selectedSize) {

        for (var i = 0; i < $rootScope.cart.length; i++) {

            if (id == $rootScope.cart[i].Id && selectedSize == $rootScope.cart[i].selectedSize) {
                console.log($rootScope.cart[i]);
                $rootScope.soLuongTrongCart -=$rootScope.cart[i].quantity;
                $rootScope.cart.splice(i, 1);
                break;

            }

        }
    }


    console.log($rootScope.cart);
    


})