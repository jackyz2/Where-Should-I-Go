package com.example.project3.controller;

import com.example.project3.model.User;
import com.example.project3.service.UserService;
import com.example.project3.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User storedUser = userService.getUserByEmail(user.getEmail());
        if (storedUser == null || !storedUser.getPassword().equals(user.getPassword())) {
            // Return 401 Unauthorized with an error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!");
        }

        // Return 200 OK with the JWT token
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(token);
    }

    @PutMapping("/{id}/schools")
    public ResponseEntity<?> updateSchools(@PathVariable Long id, @RequestBody List<String> schools) {
        userService.updateSchools(id, schools); // Save the updated user
        return ResponseEntity.ok("Schools updated successfully!");
    }
}
