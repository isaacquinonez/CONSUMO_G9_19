var UrlPagos = 'http://20.216.41.245:90/G9_19/CONTROL/PAGO.php?op=GetPagos';
var UrlGetPago = 'http://20.216.41.245:90/G9_19/CONTROL/PAGO.php?op=GetPago'
var UrlInsertPago = 'http://20.216.41.245:90/G9_19/CONTROL/PAGO.php?op=InsertPago'
var UrlUpdatePago = 'http://20.216.41.245:90/G9_19/CONTROL/PAGO.php?op=UpdatePago'
var UrlDeletePago = 'http://20.216.41.245:90/G9_19/CONTROL/PAGO.php?op=DeletePago'


$(document).ready(function(){
    CargarPagos();
});

function CargarPagos(){
    $.ajax({
        url: UrlPagos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>' + MiItems[i].NUMERO_DE_PAGO +'</td>'+
                '<td>' + MiItems[i].FECHA_DE_PAGO +'</td>'+
                '<td>' + MiItems[i].MONTO_DE_PAGO +'</td>'+
                '<td>' + MiItems[i].TIPO_DE_PAGO +'</td>'+
                '<td>' + MiItems[i].NUMERO_DE_PEDIDO +'</td>'+
                '<td>' + MiItems[i].EMPRESA +'</td>'+
                '<td>' +
                '<button class="btn btn-info" onclick="CargarPago('+ MiItems[i].NUMERO_DE_PAGO +')">Editar</button>'+                
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick="EliminarPago('+ MiItems[i].NUMERO_DE_PAGO +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataPagos').html(Valores);
            }
        }
    });
}


function AgregarPago(){
    var DatosPagos = {
    NUMERO_DE_PAGO :$('#NUMERO_DE_PAGO').val(),
    FECHA_DE_PAGO :$('#FECHA_DE_PAGO').val(),
    MONTO_DE_PAGO :$('#MONTO_DE_PAGO').val(),
    TIPO_DE_PAGO :$('#TIPO_DE_PAGO').val(),
    NUMERO_DE_PEDIDO :$('#NUMERO_DE_PEDIDO').val(),
    EMPRESA :$('#EMPRESA').val()
    };
    var datospagosjson = JSON.stringify(DatosPagos);

    $.ajax({
        url: UrlInsertPago,
        type: 'POST',
        data: datospagosjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('El pago fue agregado con Éxito');
        },
        Error: function(textStatus, ErrorThrow){
            alert('ERROR, el Pago no pudo ser Agregado'+ textStatus + ErrorThrow);
        }
    });
    alert('Aviso');
}


function CargarPago(idpago){
    var datospago = {
        NUMERO_DE_PAGO: idpago
    }
    var datospagojson = JSON.stringify(datospago);

    $.ajax({
        url:UrlGetPago,
        type:'POST',
        data: datospagojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success:function(response){
           var MiItems=response;
           $('#NUMERO_DE_PAGO').val(MiItems[0].NUMERO_DE_PAGO);
           $('#FECHA_DE_PAGO').val(MiItems[0].FECHA_DE_PAGO);
           $('#MONTO_DE_PAGO').val(MiItems[0].MONTO_DE_PAGO);
           $('#TIPO_DE_PAGO').val(MiItems[0].TIPO_DE_PAGO);
           $('#NUMERO_DE_PEDIDO').val(MiItems[0].NUMERO_DE_PEDIDO);
           $('#EMPRESA').val(MiItems[0].EMPRESA);
           var btnactulizar = '<input type="submit" id = "btn_actualizar" onclick="ActualizarPago(' + MiItems[0].NUMERO_DE_PAGO + ')"'+
           'value="Actualizar Pago" class="btn btn-primary"></input>';
           $('#btnagregarpago').html(btnactulizar);
        }
    });

}


function ActualizarPago(idpago){
    var datospago = {
        NUMERO_DE_PAGO: idpago,
        FECHA_DE_PAGO :$('#FECHA_DE_PAGO').val(),
        MONTO_DE_PAGO :$('#MONTO_DE_PAGO').val(),
        TIPO_DE_PAGO :$('#TIPO_DE_PAGO').val(),
        NUMERO_DE_PEDIDO :$('#NUMERO_DE_PEDIDO').val(),
        EMPRESA :$('#EMPRESA').val()
    };
    var datospagojson = JSON.stringify(datospago);

    $.ajax({
        url: UrlUpdatePago,
        type: 'PUT',
        data: datospagojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('El pago fue Actualizado con Éxito');
        },
        Error: function(textStatus, ErrorThrow){
            alert('ERROR, el Pago no pudo ser Actualizado'+ textStatus + ErrorThrow);
        }
    });
    alert('Aviso');

}


function EliminarPago(idpago){
    var datospago = {
        NUMERO_DE_PAGO: idpago
    };
    var datospagojson = JSON.stringify(datospago);

    $.ajax({
        url: UrlDeletePago,
        type: 'DELETE',
        data: datospagojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('El pago fue Eliminado con Éxito');
            CargarPagos()
        },
        Error: function(textStatus, ErrorThrow){
            alert('ERROR, el Pago no pudo ser Eliminado'+ textStatus + ErrorThrow);
        }
    });
    alert('Aviso');

}


