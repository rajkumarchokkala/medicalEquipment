package com.wecp.medicalequipmentandtrackingsystem.entitiy;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="feedbacks")
    public class Feedback {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String feedbackText;
        private int rating;
        private String recommend;

        @ManyToOne
        @JoinColumn(name = "hospital_Id")
        private Hospital hospital;

        @ManyToOne
        @JoinColumn(name = "order_Id")
        private Order order;

        @ManyToOne
        @JoinColumn(name = "maintenance_Id")
        private Maintenance maintenance;

        @ManyToOne
        @JoinColumn(name = "user_Id")
        private User user;

        public Feedback() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getFeedbackText() {
            return feedbackText;
        }

        public void setFeedbackText(String feedbackText) {
            this.feedbackText = feedbackText;
        }

        public int getRating() {
            return rating;
        }

        public void setRating(int rating) {
            this.rating = rating;
        }

        public String getRecommend() {
            return recommend;
        }

        public void setRecommend(String recommend) {
            this.recommend = recommend;
        }

        public Hospital getHospital() {
            return hospital;
        }

        public void setHospital(Hospital hospital) {
            this.hospital = hospital;
        }

        public Order getOrder() {
            return order;
        }

        public void setOrder(Order order) {
            this.order = order;
        }

        public Maintenance getMaintenance() {
            return maintenance;
        }

        public void setMaintenance(Maintenance maintenance) {
            this.maintenance = maintenance;
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }

        





    }