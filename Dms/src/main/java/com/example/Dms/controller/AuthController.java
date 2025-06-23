package com.example.Dms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Dms.dto.ChangePasswordDto;
import com.example.Dms.dto.LoginDto;
import com.example.Dms.dto.LoginResponseDto;
import com.example.Dms.dto.OtpLoginDto;
import com.example.Dms.dto.UpdatePasswordDto;
import com.example.Dms.dto.UserRequestDto;
import com.example.Dms.dto.UserResponseDto;
import com.example.Dms.dto.VerifyUserDto;
import com.example.Dms.services.IAuthService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    IAuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody UserRequestDto userRequestDto) {
        UserResponseDto responseDto = authService.registerUser(userRequestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto) {
        LoginResponseDto loginResponseDto = authService.checkLogin(loginDto);
        return new ResponseEntity<>(loginResponseDto,HttpStatus.OK);
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordDto passwordDto, Authentication authentication) {
        authService.updatePassword(authentication, passwordDto);
        return ResponseEntity.ok("Password updated successfully.");
    }

    @PutMapping("/verify-account")
    public ResponseEntity<String> verifyAccount(@RequestBody VerifyUserDto input) {
        authService.verification(input);
        return new ResponseEntity<>("Account has been verified", HttpStatus.OK);
    }

    @PutMapping("/resend-otp")
    public ResponseEntity<String> resendVerificationCode(@RequestParam String email) {
        authService.resendVerificationCode(email);
        return new ResponseEntity<>("New OTP has been resend. Please check your email.", HttpStatus.OK);
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        authService.sendOTP(email);
        return new ResponseEntity<>("OTP has been sent to your mail. Use that OTP to set the password.", HttpStatus.OK);
    }

    @PostMapping("/forgot-password/login")
    public ResponseEntity<LoginResponseDto> loginWithOtp(@RequestBody OtpLoginDto otpLoginDto) {
        LoginResponseDto loginResponseDto = authService.otpLogin(otpLoginDto);
        return new ResponseEntity<>(loginResponseDto,HttpStatus.OK);
    }

    @PutMapping("/forgot-password/set-password")
    public ResponseEntity<String> setPassword(@RequestParam String email, @RequestBody ChangePasswordDto changePasswordDto) {
        return new ResponseEntity<>(authService.changePassword(email, changePasswordDto), HttpStatus.OK);
    }

    @PostMapping("/refresh")
	public ResponseEntity<LoginResponseDto> refresh(Authentication authentication){
		LoginResponseDto loginResponseDto = authService.refreshToken(authentication);
		return new ResponseEntity<>(loginResponseDto,HttpStatus.OK);
	}
}
