package com.leo.management.repository;

import com.leo.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserCpf(String userCpf);
    Optional<User> findByUserEmail(String userEmail);
}
