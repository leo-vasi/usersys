package com.leo.management.controller;

import com.leo.management.entity.User;
import com.leo.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usersys/users")
@CrossOrigin
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // OBTER TODOS OS USUÁRIOS
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(users);
        }

    }
    // OBTER UM USUÁRIO PELA ID
    @GetMapping("/{id}")
   public ResponseEntity<User> getUserById(@PathVariable Long id) {
       Optional<User> user = userService.getUserById(id);
       if (user.isEmpty()) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
       } else {
           return ResponseEntity.ok(user.get());
       }
    }

    // OBTER UM USUÁRIO PELO CPF
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<User> getUserByCpf(@PathVariable String cpf) {
        Optional<User> user = userService.getUserByCpf(cpf);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(user.get());
        }
    }

    // OBTER UM USUÁRIO PELO EMAIL
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(user.get());
        }
    }

    // CADASTRAR UM NOVO USUÁRIO
    @PostMapping
    public ResponseEntity<User> createUser (@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // EDITAR DADOS DE UM USUÁRIO ATRAVÉS DA ID
    @PutMapping("/alter/{id}")
   public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        Optional<User> existingUser = userService.getUserById(id);
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } else {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        }
    }

    // DELETAR UM USUÁIO ATRAVÉS DA ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.getUserById(id).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        }
    }
}
