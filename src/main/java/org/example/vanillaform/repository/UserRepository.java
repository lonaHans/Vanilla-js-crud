package org.example.vanillaform.repository;

import org.example.vanillaform.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
