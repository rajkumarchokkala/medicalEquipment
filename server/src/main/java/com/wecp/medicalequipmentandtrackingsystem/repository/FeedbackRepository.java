package com.wecp.medicalequipmentandtrackingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Long>
{
    @Query("SELECT f FROM Feedback f WHERE f.hospital.id =?1")
    List<Feedback> findByHospital(Long hospitalId);

    @Query("SELECT f FROM Feedback f WHERE f.order.id =?1")
    List<Feedback> findBySupplier(Long orderId);

    @Query("SELECT f FROM Feedback f WHERE f.maintenance.id =?1")
    List<Feedback> findByTechnician(Long maintenanceId);
}
