package com.example.Dms.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column private String name;
    @Column (unique=true) private String email;
    @Column (unique=true) private String username;
    @Column private String password;
    private boolean active = false;
    private String otp;
    private LocalDateTime otpGeneratedTime;
    private String setPasswordVerification;
    private LocalDateTime VerificationGenerationTime;

}
