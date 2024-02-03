app.controller('products-top-ctrl', function ($scope, $rootScope, $http) {

    // lấy sản phẩm từ dsSP có type là top
    $scope.dsSPTOPS = [];

    for (var i = 0; i < $scope.dsSP.length; i++) {
        if ($scope.dsSP[i].Type == 'Tops') {
            $scope.dsSPTOPS.push($scope.dsSP[i]);
            // console.log($scope.dsSPTOPS);
        }
    }
    console.log($scope.dsSPTOPS);
    // end lấy sản phẩm từ dsSP có type là top

    $scope.page = 1;
    $scope.limit = 8;
    //trang 1: start = 0
    //trang 2: start = 4
    //trang 3: start = 8
    //trang n: start = (n-1)*4
    $scope.start = ($scope.page - 1) * $scope.limit;
    $scope.tongTrang = Math.ceil($scope.dsSPTOPS.length / $scope.limit);
    // console.log($scope.tongTrang);

    $scope.danhSachTrang = [];
    for (var i = 1; i <= $scope.tongTrang; i++) {
        $scope.danhSachTrang.push(i);
    }


    $scope.chonTrang = function (trang) {
        $scope.page = trang;
        $scope.start = ($scope.page - 1) * $scope.limit;
    }
    $scope.luiTrang = function () {
        if ($scope.page > 1) {
            $scope.page--;
            console.log($scope.page);
            $scope.start = ($scope.page - 1) * $scope.limit;
        }
        else {
            $scope.page = $scope.tongTrang;
            console.log($scope.page);
            $scope.start = ($scope.page - 1) * $scope.limit;
        }

    }
    $scope.tangTrang = function () {
        if ($scope.page >= $scope.tongTrang) {
            $scope.page = 1;
            $scope.start = ($scope.page - 1) * $scope.limit;
        }
        else {
            $scope.page++;
            console.log($scope.page);
            $scope.start = ($scope.page - 1) * $scope.limit;
        }

    }



$scope.$watchGroup(['mau', 'keyword'], function(newValues) {
    var newMau = newValues[0];
    var newKeyword = newValues[1];

    // Lọc danh sách sản phẩm theo màu mới
    $scope.dsSPTOPSLocTheoMau = $scope.dsSPTOPS.filter(function(sp) {
        // Sử dụng biểu thức chính quy để kiểm tra xem màu có tồn tại trong tên không
        return new RegExp(newMau, 'i').test(sp.Name);
    });

    // Lọc danh sách sản phẩm theo từ khóa tìm kiếm (nếu có)
    if (newKeyword) {
        $scope.dsSPTOPSLocTheoMau = $scope.dsSPTOPSLocTheoMau.filter(function(sp) {
            // Sử dụng biểu thức chính quy để kiểm tra xem từ khóa tìm kiếm có tồn tại trong tên không
            return new RegExp(newKeyword, 'i').test(sp.Name);
        });
    }

    // Gán danh sách sản phẩm hiển thị bằng danh sách đã lọc theo màu và tên
    $scope.dsSPTOPSHienThi = $scope.dsSPTOPSLocTheoMau;

    // Lưu lại bản sao khi áp dụng bộ lọc màu và từ khóa
    $scope.dsSPTOPSHienThiGoc = angular.copy($scope.dsSPTOPSHienThi);

    // Reset lại trang về 1 khi thay đổi màu hoặc tên
    $scope.page = 1;
    $scope.start = 0;
    $scope.tongTrang = Math.ceil($scope.dsSPTOPSHienThi.length / $scope.limit);
    $scope.danhSachTrang = Array.from({ length: $scope.tongTrang }, (_, i) => i + 1);
});

$scope.$watch('sapxep', function(newSapXep) {
    // Xử lý lựa chọn sắp xếp tăng/giảm dần
    if (newSapXep === 'tangDan') {
        // Thực hiện công việc khi sắp xếp giá tăng dần
        $scope.dsSPTOPSHienThi = $scope.dsSPTOPSHienThi.sort(function(a, b) {
            return a.Price - b.Price;
        });
        console.log($scope.dsSPTOPSHienThi);
    } else if (newSapXep === 'giamDan') {
        // Thực hiện công việc khi sắp xếp giá giảm dần
        $scope.dsSPTOPSHienThi = $scope.dsSPTOPSHienThi.sort(function(a, b) {
            return b.Price - a.Price;
        });
        console.log($scope.dsSPTOPSHienThi);
    } else {
        // Nếu không có sắp xếp, trở về danh sách ban đầu
        $scope.dsSPTOPSHienThi = angular.copy($scope.dsSPTOPSHienThiGoc);
        console.log($scope.dsSPTOPSHienThi);
    }
});



})