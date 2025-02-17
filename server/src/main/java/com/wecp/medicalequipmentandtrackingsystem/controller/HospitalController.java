package com.wecp.medicalequipmentandtrackingsystem.controller;

import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import com.wecp.medicalequipmentandtrackingsystem.service.EquipmentService;
import com.wecp.medicalequipmentandtrackingsystem.service.HospitalService;
import com.wecp.medicalequipmentandtrackingsystem.service.MaintenanceService;
import com.wecp.medicalequipmentandtrackingsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private MaintenanceService maintenanceService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/api/hospital/create")
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        // create hospital and return the created hospital with status code 201 =
        // CREATED;
        return ResponseEntity.status(201).body(hospitalService.createHospital(hospital));
    }

    @GetMapping("/api/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        // return all hospitals with response code = 200 ok
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return ResponseEntity.status(200).body(hospitals);
    }

    @PostMapping("/api/hospital/equipment")
    public ResponseEntity<Equipment> addEquipment(@RequestParam Long hospitalId, @RequestBody Equipment equipment) {
        Equipment addedEquipment = equipmentService.addEquipment(hospitalId, equipment);
        return new ResponseEntity<>(addedEquipment, HttpStatus.CREATED);
    }

    @GetMapping("/api/hospital/equipment/{hospitalId}")
    public ResponseEntity<List<Equipment>> getAllEquipmentOfHospital(@PathVariable Long hospitalId) {
        List<Equipment> equipmentList = equipmentService.getAllEquipmentOfHospital(hospitalId);
        return new ResponseEntity<>(equipmentList, HttpStatus.OK);
    }

    @PostMapping("/api/hospital/maintenance/schedule")
    public ResponseEntity<Maintenance> scheduleMaintenance(@RequestParam Long equipmentId,
            @RequestBody Maintenance maintenance) {
        // schedule maintenance for the equipment and return the scheduled maintenance
        // with status code 201 = CREATED;
        return ResponseEntity.status(201).body(maintenanceService.scheduleMaintenance(equipmentId, maintenance));
    }

    @PostMapping("/api/hospital/order")
    public ResponseEntity<Order> placeOrder(@RequestParam Long equipmentId, @RequestBody Order order) {
        Order placedOrder = orderService.placeOrder(equipmentId, order);
        return new ResponseEntity<>(placedOrder, HttpStatus.CREATED);
    }
}
