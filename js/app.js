
// CREACION DEL MODULO
var myApp = angular.module('myApp', ['firebase', 'ngRoute']);

// CERACION DEL CONTROLADOR PARA VIEWS
myApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
      templateUrl: 'templates/clientes.html', 
      controller: 'homeCtrl'
   }).
   
   when('/clientes', {
      templateUrl: 'templates/clientes.html', 
      controller: 'clientesCtrl'
   }).
   when('/productos', {
      templateUrl: 'templates/productos.html', 
      controller: 'productosCtrl'
   }).
   when('/promociones', {
      templateUrl: 'templates/promociones.html', 
      controller: 'promocionesCtrl'
   }).
   when('/roomserv', {
      templateUrl: 'templates/roomservice.html', 
      controller: 'roomservCtrl'
   }).   
   otherwise({
      redirectTo: '/home'
   });
    
}]);


myApp.controller('homeCtrl',['$scope',function($scope) {
    $scope.message = 'Hola, Mundo!';
}]);

myApp.controller('clientesCtrl', ['$scope', function($scope) {
    $scope.message = 'Hola, Mundo!';
}]);



myApp.controller('promocionesCtrl', ['$scope', function($scope) {
    $scope.message = 'Hola, Mundo!';
}]);

myApp.controller('roomservCtrl', ['$scope', function($scope) {
    $scope.message = 'Hola, Mundo!';
}]);

myApp.controller('productosCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    var misProductos = new Firebase('https://redesutpl.firebaseio.com/productos');

    $scope.productos = $firebaseArray(misProductos);

    $scope.verForm = function  () {
        $scope.agregarFormShow = true;
        $scope.editFormShow = false;
        limpiarForm();
    }
    $scope.ocultarForm = function  () {
        $scope.agregarFormShow = false;
    }

    function limpiarForm () {
        $scope.nombreProducto = '';
        $scope.codigoProducto = '';
        $scope.descripcion = '';
        $scope.disponibles = '';
        $scope.precio = '';
    }

    $scope.agregarSubmit = function  () {
        $scope.productos.$add({
            nombreProducto: $scope.nombreProducto,
            codigoProducto: $scope.codigoProducto,
            descripcion: $scope.descripcion,
            disponibles: $scope.disponibles,
            precio: $scope.precio
        });
        limpiarForm();
    }

    $scope.verProducto = function  (producto) {
        $scope.editFormShow = true;
        $scope.agregarFormShow = false;
        $scope.nombreProducto = producto.nombreProducto;
        $scope.codigoProducto = producto.codigoProducto;
        $scope.descripcion = producto.descripcion;
        $scope.disponibles = producto.disponibles;
        $scope.precio = producto.precio;
        $scope.id = producto.$id;
    }

    $scope.editFormSubmit = function  () {
        var id = $scope.id;
        var record = $scope.productos.$getRecord(id);

        record.nombreProducto = $scope.nombreProducto;
        record.codigoProducto = $scope.codigoProducto;
        record.descripcion = $scope.descripcion;
        record.disponibles = $scope.disponibles;
        record.precio = $scope.precio;

        $scope.productos.$save(record);
        limpiarForm();
    }

    $scope.eliminarProducto = function  (producto) {
        $scope.productos.$remove(producto);
    }

}]);
