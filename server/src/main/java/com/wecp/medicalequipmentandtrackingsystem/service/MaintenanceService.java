package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MaintenanceService 
{
    @Autowired 
    private MaintenanceRepository maintenanceRepository;

    @Autowired 
    private EquipmentRepository equipmentRepository;

    public Maintenance scheduleMaintenance(Long equipmentId,Maintenance maintenance)
    {
        Equipment equipment=equipmentRepository.findById(equipmentId).orElse(null);
        if(equipment!=null)
        {
            maintenance.setEquipment(equipment);
            return maintenanceRepository.save(maintenance);
        }
        return null;
    }
 
    public List<Maintenance> getAllMaintenance()
    {
        return maintenanceRepository.findAll();
    }
 
    public Maintenance updateMaintenance(Long maintenanceId, Maintenance updatedMaintenance)
    {
        Maintenance maintenance=maintenanceRepository.findById(maintenanceId).orElse(null);
        if(maintenance!=null)
        {
           updatedMaintenance.setId(maintenance.getId());
           return maintenanceRepository.save(updatedMaintenance);    
        }
        return null;
    }  

    public void deleteMaintenance(Long maintenanceId)
    {
        this.maintenanceRepository.deleteById(maintenanceId);
    }
}
