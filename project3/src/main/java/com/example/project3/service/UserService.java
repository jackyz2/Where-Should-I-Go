package com.example.project3.service;

import com.example.project3.dao.UserDAO;
import com.example.project3.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private ObjectMapper objectMapper;

    public int updateSchools(Long userId, List<String> schools) {
        try {
            User user = userDAO.findById(userId);
            // Convert the schools list to JSON string
            String schoolsJson = objectMapper.writeValueAsString(schools);
            user.setSchools(schoolsJson);
            return userDAO.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update schools", e);
        }
    }

    public List<String> getSchools(Long userId) {
        try {
            User user = userDAO.findById(userId);
            // Parse the JSON string to a List
            return objectMapper.readValue(user.getSchools(), List.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve schools", e);
        }
    }

    public String registerUser(User user) {
        if (userDAO.userExists(user.getEmail())) {
            return "User already exists!";
        }
        // Directly save the plain text password (not recommended for production)
        userDAO.saveUser(user);
        return "User registered successfully!";
    }

    public User getUserByEmail(String email) {
        return userDAO.findByEmail(email);
    }

    public User getUserById(Long id) {
        return userDAO.findById(id);
    }

    public int save(User user) {
        return userDAO.save(user);
    }
}
