
// CREACION DEL MODULO
var myApp = angular.module('myApp', ['firebase', 'ngRoute']);

// CONFIGURACIÓN DE LAS RUTAS PARA REDIRIGIR A LAS VISTAS
myApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
      templateUrl: 'templates/home.html', 
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

// CONTROLADOR PARA LA VISTA HOME
myApp.controller('homeCtrl',['$scope', '$location',function($scope, $location) {

    // FUNCIONES PARA REDIRIGIR A LAS VISTAS DESDE LOS BOTONES DEL MENU HOME
    $scope.toClientes = function(){
        $location.url("/clientes");
    }
    $scope.toProductos = function(){
        $location.url("/productos");
    }
    $scope.toPromociones = function(){
        $location.url("/promociones");
    }
    $scope.toRoom = function(){
        $location.url("/roomserv");
    }
}]);

//CONTROLADOR PARA LA VISTA CLIENTES
myApp.controller('clientesCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    //CONEXIÓN A FIREBASE(CLIENTES)
    var misClientes = new Firebase('https://redesutpl.firebaseio.com/clientes');
    //ADQUIRIR ARRAY DE DE LA BASE DE DATOS (CLIENTES)
    $scope.clientes = $firebaseArray(misClientes);

    //FUNCIONES PARA MANEJO DE FORMULARIOS
    $scope.verForm = function  () {
        $scope.agregarFormShow = true;
        $scope.editFormShow = false;
        limpiarForm();
    }
    $scope.ocultarForm = function  () {
        $scope.agregarFormShow = false;
    }

    function limpiarForm () {
        $scope.nombreCliente = '';
        $scope.apellidoCliente = '';
        $scope.cedulaCliente = '';
        $scope.habitacionCliente = '';
        $scope.codigoCliente = '';
    }
    //FUNCIÓN PARA AGREGAR CLIENTE
    $scope.agregarSubmit = function  () {
        $scope.clientes.$add({
            nombreCliente : $scope.nombreCliente,
            apellidoCliente : $scope.apellidoCliente,
            cedulaCliente : $scope.cedulaCliente,
            habitacionCliente : $scope.habitacionCliente,
            codigoCliente : $scope.codigoCliente
        });
        limpiarForm();
    }

    //FUNCIÓN PARA COPIAR DATOS DEL CLIENTE AL FORMULARIO DE EDICIÓN
    $scope.verCliente = function  (cliente) {
        $scope.editFormShow = true;
        $scope.agregarFormShow = false;
        $scope.nombreCliente = cliente.nombreCliente;
        $scope.apellidoCliente = cliente.apellidoCliente;
        $scope.cedulaCliente = cliente.cedulaCliente;
        $scope.habitacionCliente = cliente.habitacionCliente;
        $scope.codigoCliente = cliente.codigoCliente;
        $scope.id = cliente.$id;
    }
    //FUNCIÓN PARA GUARDAR LOS CAMBIOS DE EDICIÓN
    $scope.editFormSubmit = function  () {
        var id = $scope.id;
        var record = $scope.clientes.$getRecord(id);

        record.nombreCliente = $scope.nombreCliente;
        record.apellidoCliente = $scope.apellidoCliente;
        record.cedulaCliente = $scope.cedulaCliente;
        record.habitacionCliente = $scope.habitacionCliente;
        record.codigoCliente  = $scope.codigoCliente ;

        $scope.clientes.$save(record);
        limpiarForm();
    }
    //FUNCIÓN PARA ELIMINAR CLIENTE DE LA BD 
    $scope.eliminarCliente = function  (cliente) {
        $scope.clientes.$remove(cliente);
    }
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
