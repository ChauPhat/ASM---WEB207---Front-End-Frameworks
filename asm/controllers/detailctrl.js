app.controller('detailctrl', function ($scope, $routeParams, $rootScope) {

    $scope.id = $routeParams.id;
    $scope.sp = {};
    // console.log($scope.id);
    // console.log($scope.$parent.dsSP);
    for (var sp of $scope.$parent.dsSP) { //tìm sản phẩm dựa vào id 
        if (sp.Id == $scope.id) {
            $scope.sp = sp;
            break;
        }
    }

    ////////////////////////////////////
    // Khai báo biến selectedImage để lưu đường dẫn ảnh chính
    $scope.selectedImage = "";


    // Hàm để chọn ảnh phụ và cập nhật ảnh chính
    $scope.selectImage = function (imgPhu) {
        $scope.selectedImage = imgPhu;
    };

    //////////////////////////////

    $rootScope.sizeChooseinDetail = "";
    $rootScope.productInDetail = $scope.sp;
    $scope.selectSize = function (selectedSize) {
        // Xử lý khi size được chọn
        console.log("Selected size:", selectedSize);
        $rootScope.sizeChooseinDetail = selectedSize;

        // Gọi các hành động cần thiết khi size được chọn
    }



    





})