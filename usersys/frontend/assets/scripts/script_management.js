// Exibe os usuários na tabela com base nos dados recebidos do backend
function showUsers(users) {
    let tab = `
    <thead class="table-header">
        <tr>
            <th class="table-cell">ID</th>
            <th class="table-cell">Nome</th>
            <th class="table-cell">Sobrenome</th>
            <th class="table-cell">Data de Nascimento</th>
            <th class="table-cell">CPF</th>
            <th class="table-cell">Gênero</th>
            <th class="table-cell">Número de Celular</th>
            <th class="table-cell">E-mail</th>
            <th class="table-cell">Senha</th>
            <th class="table-cell">Data de Criação</th>
            <th class="table-cell">Data de Alteração</th>
            <th class="table-cell">Editar</th>
            <th class="table-cell">Remover</th>
        </tr>
    </thead>
    <tbody class="table-body">
    `;

    for (let user of users) {
        tab += `
        <tr class="table-row">
            <td class="table-cell">${user.userId}</td>
            <td class="table-cell">${user.userName}</td>
            <td class="table-cell">${user.userSurname}</td>
            <td class="table-cell">${user.userBirthDate}</td>
            <td class="table-cell">${user.userCpf}</td>
            <td class="table-cell">${user.userGender}</td>
            <td class="table-cell">${user.userPhone}</td>
            <td class="table-cell">${user.userEmail}</td>
            <td>
                <span id="password-${user.userId}">************</span>
                <button class="show-password-btn" onclick="togglePassword(${user.userId})">
                    <img src="assets/img/eye-icon.png" alt="Mostrar Senha" style="width: 40px;">
                </button>
            </td>
            <td class="table-cell">${user.createdAt}</td>
            <td class="table-cell">${user.alteredAt}</td>
            <td class="table-cell"><img src="assets/img/edit-img.png" width="38" height="33" class="edit-button" onclick="editUser(${user.userId})"></td>
            <td class="table-cell"><img src="assets/img/trash-img.png" width="38" height="33" class="delete-button" onclick="deleteUser(${user.userId})"></td>
        </tr>
        `;
    }

    tab += `</tbody>`;

    document.getElementById("users").innerHTML = tab;
}

// Lista todos os usuários do sistema através de uma requisição GET e exibe eles
async function listAllUsers(){
    const url = "http://localhost:8080/usersys/users";
    const dados = await fetch(url, {method: "GET"});
    if(dados.status === 200){
        const users = await dados.json();
        showUsers(users);
    }
}

// Dá função ao botão de esconder ou mostrar a senha do usuário, seja na tabela ou formulários de cadastro/edição
async function togglePassword(userId) {
    const passwordSpan = document.getElementById(`password-${userId}`);

    if (passwordSpan.dataset.visible === "true") {
        // Esconder a senha
        passwordSpan.textContent = "************";
        passwordSpan.dataset.visible = "false";
    } else {
        // Mostrar a senha
        const response = await fetch(`http://localhost:8080/usersys/users/${userId}`);
        if (response.ok) {
            const user = await response.json();
            passwordSpan.textContent = user.userPassword;
            passwordSpan.dataset.visible = "true";
        } else {
            alert("Erro ao obter a senha");
        }
    }
}



//Função de procurar usuário por id/cpf/email
async function searchUser() {
    const searchOption = document.getElementById("search-option").value; // Pega a opção de busca (id, cpf ou email)
    const searchInput = document.getElementById("search-input").value; // Pega o valor de busca (ID, CPF, ou E-mail)
    const searchResultDiv = document.getElementById("search-result");

    // Limpa o conteúdo anterior
    searchResultDiv.innerHTML = "";

    if (!searchInput) {
        alert("Por favor, insira um valor de busca válido!");
        return;
    }

    let url = "";
    if (searchOption === "id") {
        url = `http://localhost:8080/usersys/users/${searchInput}`;  // URL para buscar o usuário por ID
    } else if (searchOption === "cpf") {
        url = `http://localhost:8080/usersys/users/cpf/${searchInput}`;  // URL para buscar por CPF
    } else if (searchOption === "email") {
        url = `http://localhost:8080/usersys/users/email/${searchInput}`;  // URL para buscar por email
    }

    const response = await fetch(url, { method: "GET" });

    if (response.status === 200) {
        const user = await response.json();  // Exibe os dados do usuário
        displaySearchResult(user);
    } else {
        searchResultDiv.innerHTML = `<p>Nenhum usuário encontrado com o valor informado</p>`; // Caso não encontre
    }
}


// Exibe o resultado de busca
function displaySearchResult(user) {
    const searchResultDiv = document.getElementById("search-result");
    searchResultDiv.innerHTML = `
        <h3>Resultado da Busca</h3>
        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Data de Nascimento</th>
                <th>CPF</th>
                <th>Gênero</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Senha</th>
                <th class="table-cell">Data de Criação</th>
                <th class="table-cell">Data de Alteração</th>
                <th>Editar</th>
                <th>Deletar</th>
            </tr>
            <tr>
                <td>${user.userId}</td>
                <td>${user.userName}</td>
                <td>${user.userSurname}</td>
                <td>${user.userBirthDate}</td>
                <td>${user.userCpf}</td>
                <td>${user.userGender}</td>
                <td>${user.userPhone}</td>
                <td>${user.userEmail}</td>
                <td>
                <span id="password-${user.userId}">************</span>
                <button class="show-password-btn" onclick="togglePassword(${user.userId})">
                    <img src="assets/img/eye-icon.png" alt="Mostrar Senha" style="width: 40px;">
                </button>
            </td>
            <td class="table-cell">${user.createdAt}</td>
            <td class="table-cell">${user.alteredAt}</td>
            <td class="table-cell"><img src="assets/img/edit-img.png" width="38" height="33" class="edit-button" onclick="editUser(${user.userId})"></td>
            <td class="table-cell"><img src="assets/img/trash-img.png" width="38" height="33" class="delete-button" onclick="deleteUser(${user.userId})"></td>
            </tr>
        </table>
    `;
}




// Abre o formulário de edição
async function editUser(id) {
    const confirmation = confirm("Você deseja mesmo editar este usuário?");
    if (!confirmation) {
        return;
    }

    // Aqui ele tenta procurar dados do usuário com base na id fornecida
    const url = `http://localhost:8080/usersys/users/${id}`;
    const response = await fetch(url, { method: "GET" });

    if (response.status === 200) {
        const user = await response.json();
        console.log("Dados do usuário:", user);
        // Aqui ele tá enchendo os campos do formulário com informações do usuário
        document.getElementById("edit-id").value = user.userId;
        document.getElementById("edit-name").value = user.userName;
        document.getElementById("edit-surname").value = user.userSurname;
        document.getElementById("edit-birth-date").value = user.userBirthDate;
        document.getElementById("edit-cpf").value = user.userCpf;
        document.getElementById("edit-email").value = user.userEmail;
        document.getElementById("edit-gender").value = user.userGender;
        document.getElementById("edit-phone").value = user.userPhone;
        document.getElementById("edit-password").value = user.userPassword;

        // Exibe o formulário de edição
        document.getElementById("editFormContainer").style.display = "block";
    } else {
        alert("Erro ao carregar os dados do usuário para edição.");
    }
}

// Essa função serve pra fechar o formulário de edição da página
function closeEditForm() {
    document.getElementById("editFormContainer").style.display = "none";
}



// Essa função pega os dados e os envia para o backend para assim fazer a atualização
async function updateUser() {
    const id = document.getElementById("edit-id").value.trim();
    const name = document.getElementById("edit-name").value.trim();
    const surname = document.getElementById("edit-surname").value.trim();
    const birthDate = document.getElementById("edit-birth-date").value.trim();
    const cpf = document.getElementById("edit-cpf").value.trim();
    const gender = document.getElementById("edit-gender").value.trim();
    const phone = document.getElementById("edit-phone").value.trim();
    const email = document.getElementById("edit-email").value.trim();
    const password = document.getElementById("edit-password").value.trim();


    // Variáveis Regex para fazer sanitização
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'´\s]+$/;
    const surnameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'´\s]+$/;
    const cpfRegex = /^\d{11}$/;
    const phoneRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Nome deve conter apenas letras e espaços, sem números ou caracteres especiais");
        return;
    }

    if (!surnameRegex.test(surname)) {
        alert("Sobrenome deve conter apenas letras e espaços, nada de caracteres especiais");
        return;
    }

    if (!cpfRegex.test(cpf)) {
        alert("CPF deve conter exatamente 11 números e nada de letras ou caracteres especiais");
        return;
    }

    if (!phoneRegex.test(phone)) {
        alert("Número de telefone deve conter apenas os 11 números");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("O formato do email deve ser: teste@algo.com");
        return;
    }

    if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres e no máximo 16");
        return;
    }



    // Aqui ele cria um oobjeto user para enviar na requisição
    const user = {
        userName: name,
        userSurname: surname,
        userBirthDate: birthDate,
        userCpf: cpf,
        userGender: gender,
        userPhone: phone,
        userEmail: email,
        userPassword: password
    };

    console.log("Dados enviados para atualização:", user);

    const url = `http://localhost:8080/usersys/users/alter/${id}`;
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    const response = await fetch(url, options);
    if (response.status === 200) {
        alert("Usuário atualizado com sucesso!");
        document.getElementById("editFormContainer").style.display = "none";
        listAllUsers();
    } else {
        const error = await response.json();
        console.error("Erro na atualização:", error);
        alert("Erro ao atualizar o usuário.");
    }
}


// deletar usuário com base na id
async function deleteUser(id) {
    const confirmation = confirm("Você deseja mesmo deletar este usuário?");
    if (!confirmation) {
        return;
    }

    const url = `http://localhost:8080/usersys/users/delete/${id}`;
    const response = await fetch(url, { method: "DELETE" });

    if (response.status === 204) {
        alert("Usuário deletado com sucesso!");
        listAllUsers();
    } else {
        alert("Erro ao deletar o usuário.");
    }
}

function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// Serve pra redirecionar o usuário pra página de cadastro
function redirectToRegistration() {
    window.location.href = "registration.html";
}



listAllUsers();
