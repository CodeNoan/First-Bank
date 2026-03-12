// Definição da classe ContaBancaria (o molde para criar contas)
class ContaBancaria {
    // Método construtor que inicializa os dados ao criar uma nova conta
    constructor(novo_saldo, novo_cliente, nova_agencia, nova_conta) {
        this.saldo = novo_saldo; // Define o saldo inicial
        this.cliente = novo_cliente; // Define o nome ou ID do cliente
        this.agencia = nova_agencia; // Define o número da agência
        this.conta = nova_conta; // Define o número da conta
    }

    // Método para imprimir o saldo atual no console do navegador
    verSaldo() {
        console.log("O saldo de " + this.cliente + " é " + this.saldo); // Exibe mensagem no console
    }

    // Método para adicionar dinheiro à conta
    depositar(valor) {
        if (valor < 0) { // Verifica se o valor informado é negativo
            console.log("Não pode depositar valor negativo"); // Mensagem de erro no console
            return false; // Retorna falso indicando que a operação falhou
        } else { // Caso o valor seja positivo
            this.saldo = this.saldo + valor; // Soma o valor ao saldo atual
            console.log("Depósito realizado"); // Mensagem de sucesso no console
            return true; // Retorna verdadeiro indicando sucesso
        }
    }

    // Método para retirar dinheiro da conta
    sacar(valor) {
        if (valor < 0) { // Verifica se o valor para saque é negativo
            console.log("Não pode sacar valor negativo"); // Erro no console
            return 0; // Retorna zero (nenhum dinheiro retirado)
        }
        if (valor > this.saldo) { // Verifica se o valor solicitado é maior que o saldo
            console.log("Saldo insuficiente"); // Erro no console
            return 0; // Retorna zero (nenhum dinheiro retirado)
        }
        this.saldo = this.saldo - valor; // Subtrai o valor do saldo atual
        console.log("Saque realizado"); // Sucesso no console
        return valor; // Retorna o valor que foi sacado
    }

    // Método para enviar dinheiro para outra instância de conta
    transferir(valor, conta_destino) {
        if (valor < 0) { // Impede transferência de valores negativos
            console.log("Não pode transferir valor negativo"); // Erro no console
            return false; // Falha na operação
        } else { // Se o valor for válido
            let dinheiro = this.sacar(valor); // Tenta realizar o saque na conta atual
            if (dinheiro > 0) { // Se o saque retornou um valor válido (maior que zero)
                conta_destino.depositar(dinheiro); // Deposita esse valor na conta de destino
                console.log("Transferência feita"); // Sucesso no console
                return true; // Operação concluída com sucesso
            } else { // Se o saque retornou 0 (falta de saldo)
                console.log("Transferência não foi possível"); // Erro no console
                return false; // Falha na operação
            }
        }
    }
}

// Criando o objeto da Conta A com saldo de 200.000
let conta_a = new ContaBancaria(200000.0, "Emanuel", "0001", "1");
// Criando o objeto da Conta B com saldo de 20
let conta_b = new ContaBancaria(20.0, "Noan", "0001", "2");

// Função responsável por atualizar as informações visuais no HTML
function atualizarInterface() {
    // Insere o nome do cliente e o saldo formatado na div da Conta A
    document.getElementById('statusContaA').innerHTML =
        `<strong>Cliente: ${conta_a.cliente}</strong><br>Saldo: R$ ${conta_a.saldo.toFixed(2)}`;

    // Insere o nome do cliente e o saldo formatado na div da Conta B
    document.getElementById('statusContaB').innerHTML =
        `<strong>Cliente: ${conta_b.cliente}</strong><br>Saldo: R$ ${conta_b.saldo.toFixed(2)}`;

    // Limpa o campo de entrada de valor para a próxima operação
    document.getElementById('inputValor').value = "";
}

// Função que processa os cliques nos botões do HTML
function gerenciarOperacao(acao) {
    const input = document.getElementById('inputValor'); // Pega o elemento do input
    const valor = parseFloat(input.value); // Converte o texto digitado para número decimal
    const erroDiv = document.getElementById('mensagemErro'); // Pega a div de mensagens de erro

    erroDiv.innerText = ""; // Reseta qualquer mensagem de erro anterior

    if (isNaN(valor) || valor <= 0) { // Valida se o campo está vazio ou com valor inválido
        erroDiv.innerText = "Informe um valor válido!"; // Mostra erro na tela
        return;
    }

    // Verifica qual ação foi solicitada pelo botão
    if (acao === 'sacar') { // Se o botão for Sacar
        if (conta_a.sacar(valor) === 0) erroDiv.innerText = "Saldo insuficiente!"; // Tenta sacar e avisa se falhar
    }
    else if (acao === 'depositar') { // Se o botão for Depositar
        conta_a.depositar(valor); // Realiza o depósito na Conta A
    }
    else if (acao === 'transferir') { // Se o botão for Transferir
        if (!conta_a.transferir(valor, conta_b)) erroDiv.innerText = "Erro na transferência!"; // Tenta transferir e avisa se falhar
    }

    atualizarInterface(); // Chama a função para atualizar os saldos na tela
}

// Executa a atualização da interface assim que o script é carregado
atualizarInterface();