

function registerUser() {
    const name = document.getElementById("reg-name").value.trim();
    const surname = document.getElementById("reg-surname").value.trim();
    const birthDate = document.getElementById("reg-birth-date").value.trim();
    const cpf = document.getElementById("reg-cpf").value.trim();
    const gender = document.getElementById("reg-gender").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    // Váriaveis Regex servem para sanitizar os dados do formulário
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


    const newUser = {
        userName: name,
        userSurname: surname,
        userBirthDate: birthDate,
        userCpf: cpf,
        userGender: gender,
        userPhone: phone,
        userEmail: email,
        userPassword: password
    };

    fetch("http://localhost:8080/usersys/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "management.html";
        } else {
            throw new Error("Erro ao cadastrar usuário.");
        }
    })
    .catch(error => {
        alert(error.message);
    });
}
// Serve pra retornar o usuário para a página management
function cancelRegistration() {
    window.location.href = "management.html";
}
