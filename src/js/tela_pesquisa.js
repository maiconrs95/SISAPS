//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasPendentes;

//Busca os plantas pendentes cadastrados na base de dados
function plantasAtivas() {

    $.get('includes/getPlantasAtivas.php', function (data) {

        plantasPendentes = data;
        //$("#tb-planta tbody tr").remove();
        console.log(data);
        if (data.length == 0) {
            $('.plantas-pendentes').show();
        } else {
            $(data.Planta).each(function (i, planta) {

                img = planta.foto_planta.split('../');
                tabelaPlantas(i, img[1], planta.nome_cientifico, planta.nome_popular, planta.Sintomas);
            });
        }
    });
}

//Insere as plantas que retornaram da consulta na tabela planta
function tabelaPlantas(i, imagem, nome_p, nome_c, sintomas) {

    var corpoTabela = $("#resultados-pesquisa").find("tbody");
    var linha = listaPlantas(i, imagem, nome_p, nome_c, sintomas);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela planta
function listaPlantas(i, imagem, nome_c, nome_p, sintomas) {

    var linha = $("<tr>").attr('id', i);
    var colunaEditar = $("<th>").attr("width", '30%').append('<div class="text-left" style="width: 100%; height: 100px;"><img id="previewing" src=' + imagem + ' class="rounded" alt="..." style="max-width: 100%; max-height: 100%"></div>');

    var colunaPlanta = $("<td>").attr("width", '30%').append('<p class="m-0">' + nome_p + '</p><p class="m-0">' + nome_c + '</p>');
    var colunaSintomas = $("<td>").attr("width", '30%').attr('class', 'd-none').append(listaSintomas(sintomas));

    var colunaVer = $("<td>").attr("width", '10%');

    var btn = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar_sintomas');
    var icone = $("<i>").addClass("fas fa-search");

    colunaVer.append('<button type="button" class="btn btn-outline-success btn-block" data-toggle="modal" data-target=".ver-registro">Ver</button>');

    linha.append(colunaEditar);
    linha.append(colunaPlanta);
    linha.append(colunaSintomas);
    linha.append(colunaVer);

    return linha;
}

function listaSintomas(list){

    var novaUL = document.createElement('ul');

    $(list).each(function (i, sintoma) {

        novaUL.append(sintoma.nome_cientifico + ' ' + sintoma.nome_popular + ' ' + sintoma.causas + ' ' + sintoma.tratamentos);
    });

    return novaUL;
    //console.log('======');
}

function carregaPlantaPend(id) {

    //Busca a planta do ID passado
    $.get('includes/getPlantasSintomas.php?id_planta=' + plantasPendentes[id].id_plantas, function (data) {

        var img = data[0].foto_planta.split('../');

        $('.titulo-planta').text(data[0].nome_cientifico);
        $('#id_planta').text(plantasPendentes[id].id_plantas);
        $('.foto-planta').attr('src', img[1]);
        $('.nome-plantac').text(data[0].nome_cientifico);
        $('.nome-plantap').text(data[0].nome_popular);
        $('.parte-planta').text(data[0].nome_popular);
        $('.regiao-planta').text(data[0].nome_popular);
        $('.principio-planta').text(data[0].nome_popular);
        $('.contra-indicacao').text(data[0].nome_popular);
        $('.efeitos-colaterais').text(data[0].nome_popular);
        $('.modo-preparo').text(data[0].nome_popular);
        $('.bibliografia').text(data[0].bibliografia);

        //Busca os sintomas associados e preenche a lista da direita (selected)
        $.get('includes/getSintomasAssociados.php?id_planta=' + plantasPendentes[id].id_plantas, function (data) {

            $('.sintomas-associados li').remove();

            $(data).each(function (i, sintoma) {

                $('.sintomas-associados').append($('<li>').text(data[i].nome_cientifico));
            });
        });

    });
}

function filtraRegistro(value) {

    $("#lista-resultado tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}