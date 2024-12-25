package com.example.project3.controller;

import com.example.project3.model.Newsfeed;
import com.example.project3.service.NewsfeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/newsfeed")
public class NewsfeedController {

    @Autowired
    private NewsfeedService newsfeedService;

    // Endpoint to display all news feed entries
    @GetMapping
    public List<Newsfeed> getAllNewsfeeds() {
        return newsfeedService.getAllNewsfeeds();
    }

    // Endpoint to display records of a specific school
    @GetMapping("/{school}")
    public List<Newsfeed> getNewsfeedsBySchool(@PathVariable String school) {
        return newsfeedService.getNewsfeedsBySchool(school);
    }

    // Endpoint to add a new entry to the news feed
    @PostMapping
    public String addNewsfeed(@RequestBody Newsfeed newsfeed) {
        int rowsInserted = newsfeedService.addNewsfeed(newsfeed);
        if (rowsInserted > 0) {
            return "Newsfeed entry added successfully!";
        } else {
            return "Failed to add newsfeed entry.";
        }
    }
}
