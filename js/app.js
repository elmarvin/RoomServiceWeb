
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
  when('/roomserv/:codigo', {
    templateUrl: 'templates/roomservice.html',
    controller: 'roomservCtrl'
  })
  .
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
myApp.controller('clientesCtrl', ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location) {
    //CONEXIÓN A FIREBASE(CLIENTES)
    var misClientes = new Firebase('https://redesutpl.firebaseio.com/clientes');
    //ADQUIRIR ARRAY DE DE LA BASE DE DATOS (CLIENTES)
    $scope.clientes = $firebaseArray(misClientes);
    $scope.auxiliar2 = $scope.clientes2;
    //$scope.auxiliar22 = JSON.stringify($scope.auxiliar);

    $scope.verRoomService = function(cliente) {
      $location.url('/roomserv/' + cliente);
    };


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
    $scope.flag = true;
    $scope.flagh = true;
    $scope.cedulaClienten ="si disponible";
    $scope.habitacionClienten ="si disponible";
    $scope.agregarSubmit = function  () {
        $scope.clientes.forEach(function(item, index) {
          if (item.cedula == $scope.cedulaCliente) {
            $scope.flag = false;
            $scope.buscador = $scope.cedulaCliente;
          }

          item.uidspedidos.forEach(function (it, idx){
            if (it.estado == "activo") {
              if (it.habitacion==$scope.habitacionCliente) {
                $scope.flagh=false;
              }
            }
          });

        })
        if ($scope.flag == false) {
            $scope.cedulaClienten ="Cedula ya Registrada";
        }else{
          $scope.cedulaClienten ="";
          $scope.buscador = "";
        }
        if ($scope.flagh == false) {
            $scope.habitacionClienten ="Habitación Ocupada";
        }else{
          $scope.habitacionClienten ="";
        }



        if ($scope.flag==true && $scope.flagh==true) {

          var long = parseInt(5);
          var caracteres = "ABCDEFGHIJKLMNPQRTUVWXYZ123467890";
          var contrasenia = "";
          for(i=0; i<long; i++) {
            contrasenia=contrasenia+caracteres.charAt(Math.floor(Math.random()*33));
            console.log(contrasenia);
          }

          misClientes.child($scope.cedulaCliente).set({
              nombres : $scope.nombreCliente,
              apellidos : $scope.apellidoCliente,
              cedula : $scope.cedulaCliente,
              uidspedidos: [
                {
                  estado: "activo",
                  habitacion: $scope.habitacionCliente,
                  uid: contrasenia
                }
              ]
          });
          limpiarForm();
        }
        $scope.flag = true;
        $scope.flagh = true;

    }

    $scope.desactivar = function(cliente) {
      misClientes.child(cliente.cedulaCliente).set({
          nombres : cliente.nombres,
          apellidos : cliente.apellidos,
          cedula : cliente.cedula,
          uidspedidos: [
            {
              estado: "inactivo",
              habitacion: "",
              uid: ""
            }
          ]
      });
    }

    $scope.activar = function(cliente) {


        var long = parseInt(5);
        var caracteres = "ABCDEFGHIJKLMNPQRTUVWXYZ123467890";
        var contrasenia = "";
        for(i=0; i<long; i++) {
          contrasenia=contrasenia+caracteres.charAt(Math.floor(Math.random()*33));
          console.log(contrasenia);
        }
        misClientes.child(cliente.cedula).set({
            nombres : cliente.nombres,
            apellidos : cliente.apellidos,
            cedula : cliente.cedula,
            uidspedidos: [
              {
                estado: "activo",
                habitacion: "-",
                uid: contrasenia
              }
            ]
        });

    }

    //FUNCIÓN PARA COPIAR DATOS DEL CLIENTE AL FORMULARIO DE EDICIÓN
    $scope.verCliente = function  (cliente) {
        $scope.editFormShow = true;
        $scope.agregarFormShow = false;
        $scope.nombreCliente = cliente.nombres;
        $scope.apellidoCliente = cliente.apellidos;
        $scope.cedulaCliente = cliente.cedula;
        cliente.uidspedidos.forEach(function(it, idx){
          if (it.estado == "activo") {
              $scope.habitacionCliente = it.habitacion;
          }
        });


        $scope.id = cliente.$id;
    }
    //FUNCIÓN PARA GUARDAR LOS CAMBIOS DE EDICIÓN
    $scope.editFormSubmit = function  () {

      $scope.clientes.forEach(function(item, index) {
        if (item.cedula == $scope.cedulaCliente) {
          $scope.flag = false;
          $scope.buscador = $scope.cedulaCliente;
        }

        item.uidspedidos.forEach(function (it, idx){
          if (it.estado == "activo") {
            if (it.habitacion==$scope.habitacionCliente) {
              $scope.flagh=false;
            }
          }
        });

      })
      if ($scope.flag == false) {
          $scope.cedulaClienten ="Cedula ya Registrada";
      }else{
        $scope.cedulaClienten ="";
        $scope.buscador = "";
      }
      if ($scope.flagh == false) {
          $scope.habitacionClienten ="Habitación Ocupada";
      }else{
        $scope.habitacionClienten ="";
      }

      //$scope.flag==true &&
      if ($scope.flagh==true) {
        var id = $scope.id;
        var record = $scope.clientes.$getRecord($scope.cedulaCliente);

        record.nombres = $scope.nombreCliente;
        record.apellidos = $scope.apellidoCliente;
        record.cedulaCliente = $scope.cedulaCliente;
        record.habitacionCliente = $scope.habitacionCliente;
        record.uidspedidos[0].habitacion  = $scope.habitacionCliente;;

        $scope.clientes.$save(record);
        limpiarForm();
      }
      $scope.flag = true;
      $scope.flagh = true;

    }
    //FUNCIÓN PARA ELIMINAR CLIENTE DE LA BD
    $scope.eliminarCliente = function  (cliente) {
        $scope.clientes.$remove(cliente);
    }
}]);
// Fin Clientes

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
myApp.controller('roomservCtrl', ['$scope', '$firebaseArray',"$firebaseObject","$routeParams", function($scope, $firebaseArray, $firebaseObject, $routeParams) {

    if (typeof($routeParams.codigo) == "undefined"){
      var misPedidos = new Firebase('https://redesutpl.firebaseio.com/pedidos/13258');
    }else{
      var misPedidos = new Firebase('https://redesutpl.firebaseio.com/pedidos/'+$routeParams.codigo);
    }
    //CONEXIÓN A FIREBASE(PEDIDOS)

    //var query = misPedidos.orderByChild("disponibles").equalTo(4);
    //var varpruebas = new Array();
    var pedidoslista  = $firebaseArray(misPedidos);
    $scope.pedidos = pedidoslista;
    pedidoslista.$loaded().then(function(x) {
        pedidoslista.forEach(function(item, index) {
          $scope.aux = $scope.aux + item.total;
        })
    })
    .catch(function(error) {
      console.log("Error:", error);
    });
    misPedidos.on('child_changed', function(data) {
      //addCommentElement(postElement, data.key, data.val().text, data.val().author);
      $scope.varpruebass = data.key;
    });
    //$scope.varpruebass = varpruebas;
    //$scope.pedidos = $scope.pedidoslista.$getRecord("13258");

    //$scope.pedidosl = "hola";
    //$scope.pedidoslista.forEach(function(element, index){
    $scope.aux = 0;


//
  //  });
    //ADQUIRIR ARRAY DE DE LA BASE DE DATOS (PEDIDOS)
    //FUNCIONES PARA MANEJO DE FORMULARIOS
    $scope.verForm = function  () {
        $scope.agregarFormShow = true;
        $scope.editFormShow = false;
        limpiarForm();
    }
    $scope.ocultarForm = function  () {
        $scope.agregarFormShow = false;
    }

    $scope.filtro = function (){
      var newmisPedidos = new Firebase('https://redesutpl.firebaseio.com/pedidos/'+$scope.id);
      //var newmisPedidos = new Firebase('https://redesutpl.firebaseio.com/pedidos');

      $scope.pedidos  = $firebaseArray(newmisPedidos);
      //$scope.varprueba = $scope.pedidos.$indexFor("13258");
      $scope.varprueba2 = $scope.id;
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
    var misProductos = new Firebase('https://redesutpl.firebaseio.com/productos')
    //ADQUIRIR ARRAY DE DE LA BASE DE DATOS (PRODUCTOS)
    var query = misProductos.orderByChild("disponibles").equalTo(2);

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
