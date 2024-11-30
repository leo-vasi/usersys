package com.leo.management.service;

import com.leo.management.entity.User;
import com.leo.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByCpf(String cpf) {
        return userRepository.findByUserCpf(cpf);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByUserEmail(email);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }


    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setUserName(user.getUserName());
        existingUser.setUserSurname(user.getUserSurname());
        existingUser.setUserBirthDate(user.getUserBirthDate());
        existingUser.setUserCpf(user.getUserCpf());
        existingUser.setUserGender(user.getUserGender());
        existingUser.setUserPhone(user.getUserPhone());
        existingUser.setUserEmail(user.getUserEmail());
        existingUser.setUserPassword(user.getUserPassword());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
