            angular.module('myApp', [])
                .controller('controller', function($scope, $http) {
                    
                    $scope.muestras = {}
                    $scope.examenes = {}
                    $scope.resultados = {}


                    $http.get("/muestras")
                        .then(function (response) {
                            $scope.muestras = response.data;
                        }
                    );

                    $scope.cargarExamenes = function(id) {
                        //var id = $event.currentTarget.siblings('.id_muestra');
                        //console.log(id);
                        var url =  "/muestra/" + id + "/examenes";
                        $http.get(url)
                            .then(function (response) {
                                $scope.examenes = response.data;
                            }
                        );
                    }

                    $scope.cargarResultados = function(_id) {

                        //var resultados = {};

                        $http.get("/examen/" + _id + "/resultados")
                            .then(function (response) {
                                //resultados.push( response.data );
                                $scope.resultados = response.data;
                            }
                        );
                        //return resultados;
                    }




                });

$(document).ready(function() {

    //FUNCION que al hacer click en la casilla de llego en una muestra, cambia a true
    $('body').on('click', '.llego', function () {
        var elemento = $(this);
        var id_muestra = $(this).siblings('.id_muestra').text();
        var url = "/muestra/" + id_muestra;
        var llego = Boolean($(this).siblings('.llego').text());
        
        $.ajax({
            type:'PATCH',
            url: url,
            data: {
                recibido: !llego
             },
            success:function(data){
            }
        });
    });


    $('body').on('click', '.editar', function () {
        var elemento = $(this);
        var id_examen = elemento.siblings('.id_examen').text();

        $("#titulo_form").text( "Examen de tipo " + elemento.siblings('.parametro').text() );
        $("input#unidades.form-control").val( elemento.siblings('.unidades').text() );
        $("input#resultado.form-control").val( elemento.siblings('.resultado').text() );
        $("input#valores_referencia.form-control").val( elemento.siblings('.valores_referencia').text() );

        $("#formEditarExamen").submit(function(event){
            var formData= $("#formEditarExamen").serialize();
            var url = "/examen/" + id_examen + "?flag=resultados";
            $.ajax({
                type: "PATCH",
                url: url,
                data: formData,
                success:function(data){
                    elemento.siblings('.unidades').text(data.unidades);
                    elemento.siblings('.resultado').text(data.resultado);
                    elemento.siblings('.valores_referencia').text(data.valores_referencia);
                    
                }
            });
            //console.log(url);
            id_examen = ""
            return false;
        });
    });   });