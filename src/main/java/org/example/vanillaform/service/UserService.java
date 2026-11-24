package org.example.vanillaform.service;

import org.example.vanillaform.Entity.User;
import org.example.vanillaform.dto.UserRequest;
import org.example.vanillaform.dto.UserResponse;
import org.example.vanillaform.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserResponse createUser(UserRequest request){
        if(userRepository.existsByEmail(request.email())){
            throw new RuntimeException("A user with email already exists" );
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());

        User savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id){
        User user = findUserOrThrow(id);
        return mapToResponse(user);

    }

    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers(){
        return userRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    @Transactional
    public UserResponse updateUser(Long id,UserRequest request){
        User user = findUserOrThrow(id);

        boolean emailUsedByAnotherUser = userRepository.existsByEmailAndIdNot(request.email(), id);
        if(emailUsedByAnotherUser){
            throw new RuntimeException("Email is already in use");
        }

        user.setName(request.name());
        user.setEmail(request.email());

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }

    @Transactional
    public void deleteUser(Long id){
        User user = findUserOrThrow(id);
        userRepository.delete(user);
    }

    private User findUserOrThrow(long id){
        return userRepository.findById(id). orElseThrow(() -> new RuntimeException("User with ID: " + id + " not found"));
    }

    private UserResponse mapToResponse(User user){
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
