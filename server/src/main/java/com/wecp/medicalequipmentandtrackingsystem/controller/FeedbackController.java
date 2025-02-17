package com.wecp.medicalequipmentandtrackingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Feedback;
import com.wecp.medicalequipmentandtrackingsystem.service.FeedbackService;

@RestController
@RequestMapping
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @PostMapping("/api/feedback/create")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        Feedback saved = feedbackService.createFeedback(feedback);
        return ResponseEntity.status(201).body(saved);
    }

    @GetMapping("/api/feedback")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return ResponseEntity.status(200).body(feedbackService.getAllFeedbacks());
    }

    @GetMapping("/api/feedback/maintenance/{maintenanceId}")
    public ResponseEntity<List<Feedback>> getAllFeedbacksByMaintenanceId(@PathVariable Long maintenanceId) {
        List<Feedback> saved = feedbackService.getAllFeedbacksByMaintenanceId(maintenanceId);
        return ResponseEntity.status(200).body(saved);
    }

    @GetMapping("/api/feedback/order/{orderId}")
    public ResponseEntity<List<Feedback>> getAllFeedbacksByOrderId(@PathVariable Long orderId) {
        List<Feedback> saved = feedbackService.getAllFeedbacksByOrderId(orderId);
        return ResponseEntity.status(200).body(saved);
    }

}
