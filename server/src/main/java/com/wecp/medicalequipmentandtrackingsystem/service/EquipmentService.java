package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EquipmentService 
{
    @Autowired 
    private EquipmentRepository equipmentRepository;

    @Autowired 
    private HospitalRepository hospitalRepository;

    public Equipment addEquipment(Long hospitalId, Equipment equipment) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new RuntimeException("Hospital not found"));
        equipment.setHospital(hospital);
        return equipmentRepository.save(equipment);
    }

    public List<Equipment> getAllEquipmentOfHospital(Long hospitalId) {
        return equipmentRepository.findByHospitalId(hospitalId);
    }
}

