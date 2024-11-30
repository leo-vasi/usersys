# CRUD de Usuários com Spring Boot (UserSys)
Este repositório contém um projeto acadêmico desenvolvido para criar um sistema CRUD de usuários utilizando Spring Boot no backend e uma interface frontend com HTML e CSS. Este projeto representa minha evolução no desenvolvimento de aplicações desacopladas, com comunicação entre o frontend e o backend via funções **async** e **await**.

## Propósito do Projeto
Este projeto foi proposto durante o quarto semestre da faculdade de Engenharia de Software, com o objetivo de consolidar os conhecimentos em desenvolvimento web completo, abordando tanto o backend quanto o frontend. Foi também uma oportunidade para explorar e aprimorar habilidades em **Java**, **Spring Boot** e a criação de interfaces visuais mais trabalhadas com **HTML** e **CSS**.

## Funcionamento do Projeto
O projeto é uma aplicação web desacoplada, na qual o backend e o frontend se comunicam utilizando funções async/await. A aplicação permite:

- **Cadastrar usuários**: Insira dados como Nome, Sobrenome, Data de Nascimento, CPF, Gênero, Número de Celular, E-mail e Senha.

- **Listar usuários cadastrados**: Visualize os usuários armazenados no banco de dados, seja todos de uma vez, ou por filtros de ID, CPF ou E-mail.

- **Atualizar usuários**: Edite as informações de um usuário existente.

- **Excluir usuários**: Remova um usuário do banco de dados.

O backend utiliza o framework Spring Boot para criar uma API que gerencia os dados no banco de dados MySQL, enquanto o frontend apresenta as funcionalidades de forma amigável ao usuário.

## Mapeamento de Endpoints
Aqui estão os endpoints disponíveis no projeto:

| Método HTTP | Endpoint                  | Descrição                                | Código de Status HTTP                   |
|-------------|---------------------------|------------------------------------------|-----------------------------------------|
| `GET`       | `/usersys/users`          | Obter todos os usuários                  | `200 OK` (se houver usuários) ou `204 No Content` |
| `GET`       | `/usersys/users/{id}`     | Obter um usuário pelo ID                 | `200 OK` ou `404 Not Found`            |
| `GET`       | `/usersys/users/cpf/{cpf}`| Obter um usuário pelo CPF                | `200 OK` ou `404 Not Found`            |
| `GET`       | `/usersys/users/email/{email}` | Obter um usuário pelo E-mail          | `200 OK` ou `404 Not Found`            |
| `POST`      | `/usersys/users`          | Cadastrar um novo usuário                | `201 Created`                          |
| `PUT`       | `/usersys/users/alter/{id}`| Atualizar informações de um usuário pelo ID | `200 OK` ou `404 Not Found`         |
| `DELETE`    | `/usersys/users/delete/{id}`| Deletar um usuário pelo ID             | `204 No Content` ou `404 Not Found`   |




## Tecnologias Utilizadas

- **Linguagem**: Java
- **IDE:** [IntelliJ IDEA](https://www.jetbrains.com/pt-br/idea/)
- **Framework:** [Spring Boot](https://spring.io/projects/spring-boot)
- **Gerenciador de Dependências:** [Maven](https://maven.apache.org/)
- **Dependências**: Definidas no arquivo pom.xml
- **Banco de Dados:** [MySQL Workbench](https://www.mysql.com/products/workbench/)
