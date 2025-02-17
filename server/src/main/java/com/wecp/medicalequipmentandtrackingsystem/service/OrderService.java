package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService 
{
    @Autowired 
    private OrderRepository orderRepository;

    @Autowired 
    private EquipmentRepository equipmentRepository;

    public List<Order> getAllOrders() 
    {
        return orderRepository.findAll();
    }
 
    public Order updateOrderStatus(Long orderId, String newStatus) 
    {
        Order orderOptional = orderRepository.findById(orderId).orElse(null);
        if(orderOptional!=null)
        {
          orderOptional.setStatus(newStatus);
          return orderRepository.save(orderOptional); 
        }
        return null;
    }

    public Order placeOrder(Long equipmentId, Order order) 
    {
        Equipment equipment=equipmentRepository.findById(equipmentId).orElse(null);
        order.setEquipment(equipment);
        return orderRepository.save(order);
    }
}

