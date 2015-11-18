
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


//CONTROLADOR PARA LA VISTA PROMOCIONES
myApp.controller('promocionesCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    //CONEXIÓN A FIREBASE(PROMOCIONES)
    var misPromociones = new Firebase('https://redesutpl.firebaseio.com/promociones');
    //ADQUIRIR ARRAY DE DE LA BASE DE DATOS (promociones)
    $scope.promociones = $firebaseArray(misPromociones);

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
        $scope.tituloOferta = '';
        $scope.subTitulo = '';
        $scope.descripcion = '';
        $scope.tope = '';
        $scope.precio = '';
        $scope.imagen = '';
    }
    //FUNCIÓN PARA AGREGAR PROMOCION
    $scope.agregarSubmit = function  () {
        $scope.promociones.$add({
            tituloOferta: $scope.tituloOferta,
            subTitulo: $scope.subTitulo,
            descripcion: $scope.descripcion,
            tope: $scope.tope,
            precio: $scope.precio,
            imagen: 'img'
        });
        limpiarForm();
    }

    //FUNCIÓN PARA COPIAR DATOS DE LA promocion AL FORMULARIO DE EDICIÓN
    $scope.verPromocion = function  (promocion) {
        $scope.editFormShow = true;
        $scope.agregarFormShow = false;
        $scope.tituloOferta = promocion.tituloOferta;
        $scope.subTitulo = promocion.subTitulo;
        $scope.descripcion = promocion.descripcion;
        $scope.tope = promocion.tope;
        $scope.precio = promocion.precio;
        $scope.imagen = promocion.imagen;
        $scope.id = promocion.$id;
    }
    //FUNCIÓN PARA GUARDAR LOS CAMBIOS DE EDICIÓN
    $scope.editFormSubmit = function  () {
        var id = $scope.id;
        var record = $scope.promociones.$getRecord(id);

        record.tituloOferta = $scope.tituloOferta;
        record.subTitulo = $scope.subTitulo;
        record.descripcion = $scope.descripcion;
        record.tope = $scope.tope;
        record.precio  = $scope.precio ;
        record.imagen  = $scope.imagen ;

        $scope.promociones.$save(record);
        limpiarForm();
    }
    //FUNCIÓN PARA ELIMINAR PROMOCION DE LA BD 
    $scope.eliminarPromocion = function  (promocion) {
        $scope.promociones.$remove(promocion);
    }
}]);

myApp.controller('roomservCtrl', ['$scope', function($scope) {
    $scope.message = 'Hola, Mundo!';
}]);

//CONTROLADOR PARA LA VISTA DE PRODUCTOS
myApp.controller('productosCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    
    //CONEXIÓN A FIREBASE(PRODUCTOS)
    var misProductos = new Firebase('https://redesutpl.firebaseio.com/productos');
    
    //ADQUIRIR ARRAY DE DE LA BASE DE DATOS (PRODUCTOS)
    $scope.productos = $firebaseArray(misProductos);
    
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
        $scope.nombreProducto = '';
        $scope.codigoProducto = '';
        $scope.descripcion = '';
        $scope.disponibles = '';
        $scope.precio = '';
        $scope.imagen = '';
    }
    
    //FUNCIÓN PARA AGREGAR PRODUCTO
    $scope.agregarSubmit = function  () {
        $scope.productos.$add({
            nombreProducto: $scope.nombreProducto,
            codigoProducto: $scope.codigoProducto,
            descripcion: $scope.descripcion,
            disponibles: $scope.disponibles,
            precio: $scope.precio,
            imagen: 'file'
        });
        limpiarForm();
    }
    
    //FUNCIÓN PARA COPIAR DATOS DEL PRODUCTO AL FORMULARIO DE EDICIÓN
    $scope.verProducto = function  (producto) {
        $scope.editFormShow = true;
        $scope.agregarFormShow = false;
        $scope.nombreProducto = producto.nombreProducto;
        $scope.codigoProducto = producto.codigoProducto;
        $scope.descripcion = producto.descripcion;
        $scope.disponibles = producto.disponibles;
        $scope.imagen = producto.imagen;
        $scope.id = producto.$id;
    }
    
    //FUNCIÓN PARA GUARDAR LOS CAMBIOS DE EDICIÓN
    $scope.editFormSubmit = function  () {
        var id = $scope.id;
        var record = $scope.productos.$getRecord(id);

        record.nombreProducto = $scope.nombreProducto;
        record.codigoProducto = $scope.codigoProducto;
        record.descripcion = $scope.descripcion;
        record.disponibles = $scope.disponibles;
        record.precio = $scope.precio;
        record.imagen = $scope.imagen;

        $scope.productos.$save(record);
        limpiarForm();
    }
    //FUNCIÓN PARA ELIMINAR PRODUCTO DE LA BD 
    $scope.eliminarProducto = function  (producto) {
        $scope.productos.$remove(producto);
    }

}]);
