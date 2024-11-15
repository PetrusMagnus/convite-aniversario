document.getElementById("confirmForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário para demonstrar o alerta

    const nome = document.getElementById("nome").value;
    const presenca = document.getElementById("presenca").value;
    const mensagem = document.getElementById("mensagem").value;

    if (presenca === "") {
        alert("Por favor, selecione se você vai comparecer à festa.");
    } else {
        alert(`Obrigado, ${nome}!\nVocê confirmou sua presença: ${presenca === "sim" ? "Sim" : "Não"}.\nMensagem: ${mensagem}`);
    }
});
