
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
        $scope.descripcion = '';
        $scope.tope = '';
        $scope.precio = '';
        $scope.imagen = '';
    }
    //FUNCIÓN PARA AGREGAR PROMOCION
    $scope.agregarSubmit = function  () {
        $scope.promociones.$add({
            tituloOferta: $scope.tituloOferta,
            descripcion: $scope.descripcion,
            tope: $scope.tope,
            precio: $scope.precio,
            imagen: $scope.imagen
        });
        limpiarForm();
    }

    //FUNCIÓN PARA COPIAR DATOS DE LA promocion AL FORMULARIO DE EDICIÓN
    $scope.verPromocion = function  (promocion) {
        $scope.editFormShow = true;
        $scope.agregarFormShow = false;
        $scope.tituloOferta = promocion.tituloOferta;
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

//CONTROLADOR PARA LA VISTA DE ROOMSERVICE
myApp.controller('roomservCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    
    //CONEXIÓN A FIREBASE(PEDIDOS)
    var misPedidos = new Firebase('https://redesutpl.firebaseio.com/pedidos');
    
    //ADQUIRIR ARRAY DE DE LA BASE DE DATOS (PEDIDOS)
    $scope.pedidos = $firebaseArray(misPedidos);
    
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
        $scope.fechaPedido ='';
        $scope.horaPedido = '';
        $scope.nombreCliente = '';
        $scope.apellidoCliente = '';
        $scope.habitacionCliente = '';
        $scope.codigoProducto = '';
        $scope.nombreProducto = '';
        $scope.cantidad = '';
        $scope.productosPedidos = '';
        $scope.subTotal = '';
        $scope.total = '';
    }
    
    //FUNCIÓN PARA AGREGAR PEDIDO
    $scope.agregarSubmit = function  () {
        $scope.pedidos.$add({
            fechaPedido : $scope.pedido.fechaPedido,
            horaPedido : $scope.pedido.horaPedido,
            nombreCliente : $scope.pedido.nombreCliente,
            apellidoCliente : $scope.pedido.apellidoCliente,
            habitacionCliente : $scope.pedido.habitacionCliente,
            codigoProducto : $scope.pedido.codigoProducto,
            nombreProducto : $scope.pedido.nombreProducto,
            cantidad : $scope.pedido.cantidad,
            productosPedidos : $scope.pedido.productosPedidos,
            subTotal :$scope.pedido.subTotal
        });
        limpiarForm();
    }
    
    //FUNCIÓN PARA COPIAR DATOS DEL PEDIDO AL FORMULARIO DE EDICIÓN
    $scope.verPedido = function  (pedido) {
        $scope.editFormShow = true;
        $scope.agregarFormShow = false;
        $scope.fechaPedido = pedido.fechaPedido,
        $scope.horaPedido = pedido.horaPedido,
        $scope.nombreCliente = pedido.nombreCliente,
        $scope.apellidoCliente = pedido.apellidoCliente,
        $scope.habitacionCliente = pedido.habitacionCliente,
        $scope.codigoProducto = pedido.codigoProducto,
        $scope.nombreProducto = pedido.nombreProducto,
        $scope.cantidad = pedido.cantidad,
        $scope.productosPedidos = pedido.productosPedidos,
        $scope.subTotal = pedido.subTotal,
        $scope.total = pedido.total,
        $scope.id = pedido.$id;
    }
    
    //FUNCIÓN PARA GUARDAR LOS CAMBIOS DE EDICIÓN
    $scope.editFormSubmit = function  () {
        var id = $scope.id;
        var record = $scope.pedidos.$getRecord(id);

        record.fechaPedido =  $scope.fechaPedido;
        record.horaPedido =  $scope.horaPedido;
        record.nombreCliente =  $scope.nombreCliente;
        record.apellidoCliente =  $scope.apellidoCliente;
        record.habitacionCliente =  $scope.habitacionCliente;
        record.codigoProducto =  $scope.codigoProducto;
        record.nombreProducto =  $scope.nombreProducto;
        record.cantidad =  $scope.cantidad;
        record.productosPedidos =  $scope.productosPedidos;
        record.subTotal = $scope.subTotal;
        record.total = $scope.total;

        $scope.pedidos.$save(record);
        limpiarForm();
    }
    //FUNCIÓN PARA ELIMINAR PEDIDOS DE LA BD 
    $scope.eliminarPedido = function  (pedido) {
        $scope.pedidos.$remove(pedido);
    }

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
            imagen: $scope.imagen
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
        $scope.precio = producto.precio;
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
