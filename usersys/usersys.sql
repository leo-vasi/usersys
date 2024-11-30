CREATE DATABASE db_administration;
USE db_administration;

CREATE TABLE users (
user_id INT(15) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
user_name VARCHAR(50) NOT NULL,
user_surname VARCHAR(50) NOT NULL,
user_birth_date DATE NOT NULL,
user_cpf CHAR(11) NOT NULL UNIQUE,
user_gender ENUM('M', 'F', 'O'),
user_phone VARCHAR(15) NOT NULL,
user_email VARCHAR(50) NOT NULL UNIQUE,
user_password VARCHAR(255) NOT NULL,
user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
user_altered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);



INSERT INTO users (user_name, user_surname, user_birth_date, user_cpf, user_gender, user_phone, user_email, user_password) 
VALUES
('Carlos', 'Silva', '1990-05-20', '12345678901', 'M', '11912345678', 'carlos.silva@example.com', 'ZeComeia'), 
('Mariana', 'Oliveira', '1985-09-10', '10987654321', 'F', '21987654321', 'mariana.oliveira@example.com', 'TomEJerry'), 
('João', 'Pereira', '1995-12-15', '12312312312', 'M', '31912345678', 'joao.pereira@example.com', '123sete9'), 
('Renata', 'Santos', '1992-07-25', '32132132132', 'F', '41987654321', 'renata.santos@example.com', 'pizzaAbacaxi'), 
('Patricia', 'Almeida', '1998-03-30', '21321321321', 'O', '51998765432', 'patricia.almeida@example.com', 'cebolaAlhos'),
('Fernando', 'Costa', '1980-11-02', '43211234432', 'M', '11945678910', 'fernando.costa@example.com', 'estrelaDoMar'), 
('Ana', 'Lima', '1991-08-17', '87654321876', 'F', '21912349876', 'ana.lima@example.com', 'solENatureza'), 
('Luiz', 'Ferreira', '1988-02-09', '56789123456', 'M', '31999876543', 'luiz.ferreira@example.com', 'mangueira123'), 
('Beatriz', 'Melo', '2000-04-22', '76543217654', 'F', '51987654321', 'beatriz.melo@example.com', 'girassol22'), 
('Igor', 'Souza', '1997-06-11', '98765432987', 'M', '61912345678', 'igor.souza@example.com', 'luaNova1997');


SELECT * FROM users;

DROP DATABASE db_administration;


