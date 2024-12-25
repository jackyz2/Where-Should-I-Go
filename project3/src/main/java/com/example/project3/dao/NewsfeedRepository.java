package com.example.project3.dao;

import com.example.project3.model.Newsfeed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NewsfeedRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    /*
        To display all news feed on the news page:
        SELECT school, academic, tuition, location, comment
        FROM newsfeed;
     */
    public List<Newsfeed> findAllNewsfeeds() {
        String sql = "SELECT school, academic, tuition, location, comment FROM newsfeed";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Newsfeed newsfeed = new Newsfeed();
            newsfeed.setSchool(rs.getString("school"));
            newsfeed.setAcademic(rs.getInt("academic"));
            newsfeed.setTuition(rs.getInt("tuition"));
            newsfeed.setLocation(rs.getInt("location"));
            newsfeed.setComment(rs.getString("comment"));
            return newsfeed;
        });
    }

    /*
        To display records of specific school on the news page:
        SELECT school, academic, tuition, location, comment
        WHERE school = ?
        FROM newsfeed;
     */
    public List<Newsfeed> findNewsfeedsBySchool(String school) {
        String sql = "SELECT school, academic, tuition, location, comment FROM newsfeed WHERE school = ?";
        return jdbcTemplate.query(sql, new Object[]{school}, (rs, rowNum) -> {
            Newsfeed newsfeed = new Newsfeed();
            newsfeed.setSchool(rs.getString("school"));
            newsfeed.setAcademic(rs.getInt("academic"));
            newsfeed.setTuition(rs.getInt("tuition"));
            newsfeed.setLocation(rs.getInt("location"));
            newsfeed.setComment(rs.getString("comment"));
            return newsfeed;
        });
    }

    /*
        To insert entries to the news feed table:
        INSERT INTO newsfeed (email, school, academic, tuition, location, comment)
        VALUES (?, ?, ?, ?, ?, ?);
     */
    public int insertNewsfeed(Newsfeed newsfeed) {
        String sql = "INSERT INTO newsfeed (email, school, academic, tuition, location, comment) VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                newsfeed.getEmail(),
                newsfeed.getSchool(),
                newsfeed.getAcademic(),
                newsfeed.getTuition(),
                newsfeed.getLocation(),
                newsfeed.getComment());
    }
}