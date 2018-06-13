//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasPendentes;

//Busca os plantas pendentes cadastrados na base de dados
function consultaplantasPendente() {

    $.get('includes/getPlantasProfessor.php', function (data) {

        plantasPendentes = data;

        //$("tbody tr").remove();
        $(data).each(function (i, planta) {
            console.log(data);
            inserePlantasPendente(i, planta.Descricao.toLowerCase(), planta.nome_cientifico, planta.nome_user);
        });

    });
}

//Insere as plantas que retornaram da consulta na tabela
function inserePlantasPendente(id_planta, desc, nome_c, user) {

    var corpoTabela = $(".table").find("tbody");
    var linha = novaLinhaPlantaPendente(id_planta, desc, nome_c, user);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela
function novaLinhaPlantaPendente(id_planta, desc, nome_c, user) {

    var linha = $("<tr>").attr('id', id_planta).attr('onclick', 'carregaModalPlanta(this.id)');
    var colunaStatus = $("<th>").text(desc).attr("scope", "row").attr("width", '20%');
    var colunaNome = $("<td>").text(nome_c).attr("width", '20%');
    var colunaUsuario = $("<td>").text(user).attr("width", '30%');
    var colunaEdit = $("<td>").attr("width", '10%');
    var colunaAprova = $("<td>").attr("width", '10%');
    var colunaRevisa = $("<td>").attr("width", '10%');

    var edit = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.ver-planta');
    var iEdit = $("<i>").addClass("fas fa-edit fa-2x editar");

    var aprova = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.bd-example-modal-sm');
    var iAprova = $("<i>").addClass("fas fa-check-circle fa-2x ativo");

    var revisa = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '#exampleModal');
    var Irevisa = $("<i>").addClass("fas fa-window-close fa-2x pendente");

    /*<a href="#" class="edit-user btn-sm p-1 opc" data-toggle="modal" data-target=".ver-planta">
    <i class="fas fa-edit fa-2x editar"></i>
    </a>
    <a href="#" class="edit-user btn-sm p-1 opc" data-toggle="modal" data-target=".bd-example-modal-sm">
        <i class="fas fa-check-circle fa-2x ativo"></i>
    </a>
    <a href="#" class="edit-user btn-sm p-1 opc" data-toggle="modal" data-target="#exampleModal">
        <i class="fas fa-window-close fa-2x pendente"></i>
    </a>*/

    edit.append(iEdit);
    aprova.append(iAprova);
    revisa.append(Irevisa);

    colunaEdit.append(edit);
    colunaAprova.append(aprova);
    colunaRevisa.append(revisa);

    linha.append(colunaStatus);
    linha.append(colunaNome);
    linha.append(colunaUsuario);
    linha.append(colunaEdit);
    linha.append(colunaAprova);
    linha.append(colunaRevisa);

    return linha;
}
