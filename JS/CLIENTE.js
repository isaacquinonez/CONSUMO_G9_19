var UrlClientes = 'http://20.216.41.245:90/G9_19/CONTROL/CLIENTE.PHP?op=GetClientes';
var Urlisertcliente = 'http://20.216.41.245:90/G9_19/CONTROL/CLIENTE.PHP?op=InsertCliente';
var UrlGetCliente = 'http://20.216.41.245:90/G9_19/CONTROL/CLIENTE.PHP?op=GetCliente';
var UrlUpdateCliente = 'http://20.216.41.245:90/G9_19/CONTROL/CLIENTE.PHP?op=UpdateCliente';
var UrlDeleteCliente = 'http://20.216.41.245:90/G9_19/CONTROL/CLIENTE.PHP?op=DeleteCliente';

$(document).ready(function(){
    CargarClientes();
});

function CargarClientes(){
    $.ajax({
        url: UrlClientes,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>' + MiItems[i].NUMERO_CLIENTE +'</td>'+
                '<td>' + MiItems[i].NOMBRE +'</td>'+
                '<td>' + MiItems[i].APELLIDOS +'</td>'+
                '<td>' + MiItems[i].FECHA_REGISTRO +'</td>'+
                '<td>' + MiItems[i].DIRECCION_CLIENTE +'</td>'+
                '<td>' + MiItems[i].RTN +'</td>'+
                '<td>' + MiItems[i].EMAIL +'</td>'+
                '<td>' +
                '<button class="btn btn-warning" onclick="CargarCliente('+ MiItems[i].NUMERO_CLIENTE +')">Editar</button>'+
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick="EliminarCliente('+ MiItems[i].NUMERO_CLIENTE +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataClientes').html(Valores);
            }
        }
    });
}

function AgregarCliente(){
    var datosClientes = {
        NUMERO_CLIENTE :$('#NUMERO_CLIENTE').val(),
        NOMBRE :$('#NOMBRE').val(),
        APELLIDOS :$('#APELLIDOS').val(),
        FECHA_REGISTRO :$('#FECHA_REGISTRO').val(),
        DIRECCION_CLIENTE :$('#DIRECCION_CLIENTE').val(),
        RTN : $('#RTN').val(),
        EMAIL :$('#EMAIL').val()
    };
    var datosclientesjson = JSON.stringify(datosClientes);

    $.ajax({
        url: Urlisertcliente,
        type: 'POST',
        data: datosclientesjson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Cliente agregado correctamente');
        },
        error:function(textStatus, errorThrown){
            alert('Error al agregar cliente'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarCliente(idcliente){
    var datoscliente = {
        NUMERO_CLIENTE: idcliente
    };
    var datosclientejson = JSON.stringify(datoscliente);
    $.ajax({
        url: UrlGetCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            var MiItems= response;
            $('#NUMERO_CLIENTE').val(MiItems[0].NUMERO_CLIENTE);
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#APELLIDOS').val(MiItems[0].APELLIDOS);
            $('#FECHA_REGISTRO').val(MiItems[0].FECHA_REGISTRO);
            $('#DIRECCION_CLIENTE').val(MiItems[0].DIRECCION_CLIENTE);
            $('#RTN').val(MiItems[0].RTN);
            $('#EMAIL').val(MiItems[0].EMAIL);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarCliente(' + MiItems[0].NUMERO_CLIENTE +')"'+
            'value="Actualizar Cliente" class="btn btn-success"></input>';
            $('#btnagregarcliente').html(btnactualizar);          
        }
    });
}

function ActualizarCliente(idcliente){
    var datoscliente = {
        NUMERO_CLIENTE : idcliente,
        NOMBRE :$('#NOMBRE').val(),
        APELLIDOS :$('#APELLIDOS').val(),
        FECHA_REGISTRO :$('#FECHA_REGISTRO').val(),
        DIRECCION_CLIENTE :$('#DIRECCION_CLIENTE').val(),
        RTN :$('#RTN').val(),
        EMAIL :$('#EMAIL').val()
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlUpdateCliente,
        type: 'PUT',
        data: datosclientejson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Cliente Actualizado");
        },
        error: function(textStatus, errorThrown){
            alert('Error al Actualizar Cliente'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarCliente(idcliente){
    var datoscliente = {
        NUMERO_CLIENTE: idcliente
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlDeleteCliente,
        type: 'DELETE',
        data: datosclientejson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Cliente Eliminado");
    CargarClientes();
}