<?php

    //header("Content-type: text/html; charset=utf-8");
    header("Content-type: application/json; charset=utf-8");

    session_start();
    require_once('conexao.php');

    $id_usuario = $_SESSION['id'];
    $id_modal = (isset($_POST['id_planta'])) ? $_POST['id_planta'] : '' ;  
    $nome_p = (isset($_POST['nome_popular'])) ? $_POST['nome_popular'] : '' ; 
    $nome_c = (isset($_POST['nome_cientifico'])) ? $_POST['nome_cientifico'] : '' ;   
    $parte_planta = (isset($_POST['parte_planta'])) ? $_POST['parte_planta'] : '' ;  
    $regiao = (isset($_POST['regiao'])) ? $_POST['regiao'] : '' ;  
    $principio_ativo = (isset($_POST['principio_ativo'])) ? $_POST['principio_ativo'] : '' ;  
    $cuidados = (isset($_POST['cuidados'])) ? $_POST['cuidados'] : '' ;  
    $efeitos = (isset($_POST['efeitos'])) ? $_POST['efeitos'] : '' ;  
    $modo_preparo = (isset($_POST['modo_preparo'])) ? $_POST['modo_preparo'] : '' ;  
    $bibliografia = (isset($_POST['bibliografia'])) ? $_POST['bibliografia'] : '' ;   
    $sintomas = (isset($_POST['duallistbox_demo2'])) ? $_POST['duallistbox_demo2'] : '0' ;

    $conexao = new db();
    $link = $conexao->conn_mysql();

    if(!is_uploaded_file($_FILES['arquivo']['tmp_name'])){
        
        $targetPath = '5';

    }else{

        $sourcePath = $_FILES['arquivo']['tmp_name'];
        $targetPath = "../img/plantas/".$_FILES['arquivo']['name'];
        move_uploaded_file($sourcePath,$targetPath);
    }
    
    $usuario = array('nome_c' => $nome_c, 'nome_p' => $nome_p, 'parte_planta' => $parte_planta, 'regiao' => $regiao, 'principio_ativo' => $principio_ativo, 'cuidados' => $cuidados, 'efeitos' => $efeitos, 'preparo' => $modo_preparo, 'bibliografia' => $bibliografia, 'img' => $targetPath, 'Sintomas' => $sintomas);

    if($sintomas != 0){

        $associar = array_chunk($sintomas, ceil(count($sintomas) / 2));       

    }else{

        $retorno = array('codigo' => 0, 'Usuário' => "",'mensagem' => 'Selecione algum sintoma.', 'dados' => $usuario);
        echo json_encode($retorno);
        exit();
    }
    
    $procedure_planta = "CALL update_planta($id_modal, '$nome_c', '$nome_p', '$modo_preparo', '$targetPath', '$cuidados', '$efeitos','$principio_ativo', '$bibliografia', $parte_planta, $id_usuario, '$regiao')";

    $result_id = mysqli_query($link, $procedure_planta);
        
    while ($row = mysqli_fetch_array($result_id)) {
        $id_planta = $row[0];

        if($id_planta == 0){

            $retorno = array('codigo' => 1, 'Usuário' => "",'mensagem' => 'Preencha todos os campos obrigaórios.', 'dados' => $usuario);
            echo json_encode($retorno);
            exit();
        }

        $id_planta = $row[0]; 
    }

    $apaga_sintomas = "CALL delete_associar('$id_modal')";
    $link = $conexao->conn_mysql();
    $apaga = mysqli_query($link, $apaga_sintomas);    
    $cod_apaga = mysqli_fetch_array($apaga);

    if($cod_apaga[0] == 0){
        foreach($sintomas as $id_sintoma){

            $sql = "INSERT INTO tb_plantas_sintomas (id_plantas, id_sintomas) VALUES ('$id_modal', '$id_sintoma')";
    
            $link = $conexao->conn_mysql();
            $associa = mysqli_query($link, $sql);
        }
    }else{

    }

    $retorno = array('codigo' => 2, 'Usuário' => "",'mensagem' => 'Planta '. $nome_c .' atualizada.', 'user' => $usuario, 'associa' => $associar[0], 'Apaga' => $cod_apaga);
    echo json_encode($retorno);
    exit();
?>