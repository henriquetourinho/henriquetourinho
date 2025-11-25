<?php
// Exibe uma mensagem simples
echo "Olá, mundo! Este é um arquivo PHP funcionando.";

// Você também pode usar variáveis
$nome = "Maria";
$idade = 28;

echo "<br>Nome: $nome";
echo "<br>Idade: $idade";

// Exemplo de função
function saudacao($nome) {
    return "Bem-vindo(a), $nome!";
}

echo "<br>" . saudacao($nome);
?>
