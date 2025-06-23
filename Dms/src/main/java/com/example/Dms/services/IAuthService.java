package com.example.Dms.services;

import org.springframework.security.core.Authentication;

import com.example.Dms.dto.ChangePasswordDto;
import com.example.Dms.dto.LoginDto;
import com.example.Dms.dto.LoginResponseDto;
import com.example.Dms.dto.OtpLoginDto;
import com.example.Dms.dto.UpdatePasswordDto;
import com.example.Dms.dto.UserRequestDto;
import com.example.Dms.dto.UserResponseDto;
import com.example.Dms.dto.VerifyUserDto;

public interface IAuthService {
    UserResponseDto registerUser(UserRequestDto userRequestDto);
    String verification(VerifyUserDto input);
    void resendVerificationCode(String email);
    LoginResponseDto checkLogin(LoginDto loginDto);
    LoginResponseDto refreshToken(Authentication authentication);
    void updatePassword(Authentication authentication, UpdatePasswordDto passwordDto);
    void sendOTP(String email);
    String changePassword(String email, ChangePasswordDto changePasswordDto);
    LoginResponseDto otpLogin(OtpLoginDto otpLoginDto);
}