package com.example.Dms.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class LoginResponseDto {
    private UserResponseDto data;
    private String token;
    private String refreshToken;
}
