package com.example.project3.service;

import com.example.project3.model.Newsfeed;
import com.example.project3.dao.NewsfeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsfeedService {

    @Autowired
    private NewsfeedRepository newsfeedRepository;

    public List<Newsfeed> getAllNewsfeeds() {
        return newsfeedRepository.findAllNewsfeeds();
    }

    public List<Newsfeed> getNewsfeedsBySchool(String school) {
        return newsfeedRepository.findNewsfeedsBySchool(school);
    }

    public int addNewsfeed(Newsfeed newsfeed) {
        return newsfeedRepository.insertNewsfeed(newsfeed);
    }
}
