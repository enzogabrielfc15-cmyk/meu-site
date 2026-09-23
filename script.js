const loginForm = document.getElementById("loginForm");
const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");

const mostrarSenha = document.getElementById("mostrarSenha");

const abrirPainel = document.getElementById("abrirPainel");
const fecharPainel = document.getElementById("fecharPainel");

const painel = document.getElementById("painel");
const listaRegistros = document.getElementById("listaRegistros");

const limparRegistros = document.getElementById("limparRegistros");

const mensagem = document.getElementById("mensagem");


// ==========================================
// MOSTRAR / ESCONDER SENHA
// ==========================================

mostrarSenha.addEventListener("click", function () {

    if (senha.type === "password") {

        senha.type = "text";
        mostrarSenha.textContent = "Ocultar";

    } else {

        senha.type = "password";
        mostrarSenha.textContent = "Mostrar";

    }

});


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagem(texto) {

    mensagem.textContent = texto;
    mensagem.classList.add("mostrar");

    setTimeout(function () {

        mensagem.classList.remove("mostrar");

    }, 3000);

}


// ==========================================
// PEGAR REGISTROS
// ==========================================

function pegarRegistros() {

    const dados = localStorage.getItem("registros_demo");

    if (!dados) {
        return [];
    }

    return JSON.parse(dados);
}


// ==========================================
// SALVAR REGISTRO
// ==========================================

function salvarRegistro(nomeUsuario) {

    const registros = pegarRegistros();

    const novoRegistro = {

        usuario: nomeUsuario,

        data: new Date().toLocaleString("pt-BR")

    };

    registros.push(novoRegistro);

    localStorage.setItem(
        "registros_demo",
        JSON.stringify(registros)
    );
}


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = usuario.value.trim();

    if (nome === "") {

        mostrarMensagem("Digite um nome de usuário.");

        return;

    salvarRegistro(nome);

    );

    senha.value = "";

});


// ==========================================
// MOSTRAR REGISTROS
// ==========================================

function mostrarRegistros() {

    const registros = pegarRegistros();

    listaRegistros.innerHTML = "";

    if (registros.length === 0) {

        listaRegistros.innerHTML = `
            <div class="sem-registros">
                Nenhum registro encontrado.
            </div>
        `;

        return;
    }

    registros.forEach(function (registro) {

        const div = document.createElement("div");

        div.className = "registro";

        div.innerHTML = `
            <strong>${escaparHTML(registro.usuario)}</strong>
            <span>${registro.data}</span>
        `;

        listaRegistros.appendChild(div);

    });

}


// ==========================================
//
// ==========================================

function escaparHTML(texto) {

    const elemento = document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;

}


// ==========================================
// ABRIR PAINEL
// ==========================================

abrirPainel.addEventListener("click", function () {

    mostrarRegistros();

    painel.classList.add("ativo");

});


// ==========================================
// FECHAR PAINEL
// ==========================================

fecharPainel.addEventListener("click", function () {

    painel.classList.remove("ativo");

});


// ==========================================
// CLICAR FORA DO PAINEL
// ==========================================

painel.addEventListener("click", function (evento) {

    if (evento.target === painel) {

        painel.classList.remove("ativo");

    }

});


// ==========================================
// LIMPAR REGISTROS
// ==========================================

limparRegistros.addEventListener("click", function () {

    const confirmar = confirm(
        "Deseja realmente apagar todos os registros?"
    );

    if (!confirmar) {
        return;
    }

    localStorage.removeItem("registros_demo");

    mostrarRegistros();

    mostrarMensagem("Registros apagados.");

});