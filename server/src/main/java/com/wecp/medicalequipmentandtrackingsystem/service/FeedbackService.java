package com.wecp.medicalequipmentandtrackingsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Feedback;
import com.wecp.medicalequipmentandtrackingsystem.repository.FeedbackRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.MaintenanceRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.OrderRepository;

@Service
public class FeedbackService {
    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    MaintenanceRepository maintenanceRepository;

    @Autowired
    OrderRepository orderRepository;

    public Feedback createFeedback(Feedback feedback) 
    {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks()
    {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getAllFeedbacksByMaintenanceId(Long maintenanceId) 
    {
        return feedbackRepository.findByTechnician(maintenanceId);
    }

    public List<Feedback> getAllFeedbacksByOrderId(Long orderId) 
    {
        return feedbackRepository.findByTechnician(orderId);
    }

   


    // public List<Feedback> getFeedbacksBy(Long userId) 
    // {
    //     List<Feedback> exists = feedbackRepository.findByUser(userId);
    //     return feedbackRepository.findByUser(userId);
    // }

    public Feedback updateFeedback(Long feedbackId,Feedback feedback)
    {
        Feedback oldFeedback=feedbackRepository.findById(feedbackId).orElse(null);
        if(oldFeedback!=null)
        {
            feedback.setId(oldFeedback.getId());
            feedbackRepository.save(feedback);
        }
        return null;
    }
}
