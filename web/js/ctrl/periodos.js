/* global _ */
(function (window, JSON, _) {
    var periodoCtrl = {
        formulario: null,
        inicio: function () {
            this.formulario = _.getID('frmCrearPeriodo').noSubmit().get();
        },
        crear: function () {
            var self = this,
                obj = {
                        datos: new FormData(self.formulario),
                        url: 'SPeriodoCrear',
                        callback: self.ejecutado
                    };
            _.ejecutar(obj);
        },
        ejecutado: function (datos) {
            var data = JSON.parse(datos);

            periodoCtrl.divMensaje.delClass('no-mostrar').text(data.mensaje);
            switch (data.tipo) {
                case _.MSG_CORRECTO:
                    periodoCtrl.formulario.reset();
                    break;
                case _.MSG_NO_AUTENTICADO:
                    window.location.href = 'index.html';
                    break;
            }
        }
    };

    _.controlador('periodo', periodoCtrl);
})(window, JSON, _);