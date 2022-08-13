var UrlProductos = 'http://20.216.41.245:90/G9_19/CONTROL/PRODUCTO.PHP?op=GET_PRODUCTOS';
var UrlInsertProducto = 'http://20.216.41.245:90/G9_19/CONTROL/PRODUCTO.PHP?op=INSERT_PRODUCTO';
var UrlGET_PRODUCTO = 'http://20.216.41.245:90/G9_19/CONTROL/PRODUCTO.PHP?op=GET_PRODUCTO';
var Urlupdateproducto ='http://20.216.41.245:90/G9_19/CONTROL/PRODUCTO.PHP?op=updateproducto';
var UrlDeleteProducto ='http://20.216.41.245:90/G9_19/CONTROL/PRODUCTO.PHP?op=DeleteProducto';

$(document).ready(function(){
    CargarProductos();

}); 

function CargarProductos(){
 $.ajax({
    url: UrlProductos,
    type: 'GET',
    datatype: 'JSON',
    success: function(reponse){
        var MiItems = reponse
        var Valores= '';
    

    for(i=0; i<MiItems.length; i++){
        Valores +=   '<tr>'+
        '<td>'+ MiItems[i].Numero_de_Pedido + '</td>'+
        '<td>'+ MiItems[i].Nombre_de_Articulo + '</td>'+
        '<td>'+ MiItems[i].Precio_Unitario + '</td>'+
        '<td>'+ MiItems[i].Fecha_de_Pedido + '</td>'+
        '<td>'+ MiItems[i].Cantidad_de_Articulo + '</td>'+
        '<td>'+ MiItems[i].Monto_Total + '</td>'+
        '<td>'+ MiItems[i].Aplicar_Impuesto + '</td>'+
        '<td>'+
        '<button class = "btn btn-info" onclick="CargaProducto(' + MiItems[i].Numero_de_Pedido + ' )">Editar</button>'+
        '</td>'+
        '<td>'+
        '<button class = "btn btn-danger" onclick="EliminarProducto(' + MiItems[i].Numero_de_Pedido + ' )">Eliminar</button>'+
        '</td>'+
        '</tr>';
        $('#DATAPRODUCTO').html(Valores);  

    }
            
    }
 });
}

function AgregarProductos(){
    var datosproducto = {
        Numero_de_Pedido :$('#Numero_de_Pedido').val(),
        Nombre_de_Articulo :$('#Nombre_de_Articulo').val(), 
        Precio_Unitario :$('#Precio_Unitario').val(), 
        Fecha_de_Pedido :$ ('#Fecha_de_Pedido').val(),
        Cantidad_de_Articulo :$('#Cantidad_de_Articulo').val(), 
        Monto_Total :$('#Monto_Total').val(),  
        Aplicar_Impuesto :$('#Aplicar_Impuesto').val()  
    };
    var datosproductosjson = JSON.stringify(datosproducto);

    $.ajax({
        url: UrlInsertProducto,
        type: 'POST',
        data: datosproductosjson,
        datatype: 'JSON', 
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Producto Agregado Correptamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar Producto' + textStatus + errorThrown); 
        }
    });
    alert('AVISO')
}


function CargaProducto(idProducto){
    var datosproducto = {
        Numero_de_Pedido: idProducto
    };
    var datosclientejson = JSON.stringify(datosproducto);
    $.ajax({
        url: UrlGET_PRODUCTO,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            var MiItems= response;
            $('#Numero_de_Pedido').val(MiItems[0].Numero_de_Pedido);
            $('#Nombre_de_Articulo').val(MiItems[0].Nombre_de_Articulo);
            $('#Precio_Unitario').val(MiItems[0].Precio_Unitario);
            $('#Fecha_de_Pedido').val(MiItems[0].Fecha_de_Pedido);
            $('#Cantidad_de_Articulo').val(MiItems[0].Cantidad_de_Articulo);
            $('#Monto_Total').val(MiItems[0].Monto_Total);
            $('#Aplicar_Impuesto').val(MiItems[0].Aplicar_Impuesto);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarProducto(' + MiItems[0].Numero_de_Pedido +')"'+
            'value="Actualizar Producto" class="btn btn-warning"></input>';
            $('#btnagregarproducto').html(btnactualizar);          
        }
    });
}

function ActualizarProducto(idProducto){
    var datosproducto = {
        Numero_de_Pedido : idProducto,
        Nombre_de_Articulo :$('#Nombre_de_Articulo').val(), 
        Precio_Unitario :$('#Precio_Unitario').val(), 
        Fecha_de_Pedido :$ ('#Fecha_de_Pedido').val(),
        Cantidad_de_Articulo :$('#Cantidad_de_Articulo').val(), 
        Monto_Total :$('#Monto_Total').val(),  
        Aplicar_Impuesto :$('#Aplicar_Impuesto').val()  
    };
    var datosproductojson = JSON.stringify(datosproducto);

    $.ajax({
        url: Urlupdateproducto,
        type: 'PUT',
        data: datosproductojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Producto Actualizado");
        },
        error: function(textStatus, errorThrown){
            alert('Error al Actualizar Producto'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarProducto(idProducto){
    var datosproducto = {
        Numero_de_Pedido: idProducto
    };
    var datosproductojson = JSON.stringify(datosproducto);

    $.ajax({
        url: UrlDeleteProducto,
        type: 'DELETE',
        data: datosproductojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Producto Eliminado");
    CargarProductos();
}
