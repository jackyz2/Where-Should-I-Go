package com.example.project3.dao;

import com.example.project3.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int saveUser(User user) {
        String sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        return jdbcTemplate.update(sql, user.getEmail(), user.getPassword());
    }

    public int save(User user) {
        if (user.getId() == null) {
            String sql = "INSERT INTO users (email, password, schools) VALUES (?, ?, ?)";
            return jdbcTemplate.update(sql, user.getEmail(), user.getPassword(), user.getSchools());
        } else {
            String sql = "UPDATE users SET email = ?, password = ?, schools = ? WHERE id = ?";
            return jdbcTemplate.update(sql, user.getEmail(), user.getPassword(), user.getSchools(), user.getId());
        }
    }

    public User findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        List<User> users = jdbcTemplate.query(sql, new Object[]{email}, (rs, rowNum) -> {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            return user;
        });

        return users.isEmpty() ? null : users.get(0);
    }

    public User findById(Long userId) {
        String sql = "SELECT * FROM users WHERE id = ?";
        List<User> users = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) -> {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            return user;
        });

        return users.isEmpty() ? null : users.get(0);
    }

    public boolean userExists(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{email}, Integer.class);
        return count != null && count > 0;
    }
}
