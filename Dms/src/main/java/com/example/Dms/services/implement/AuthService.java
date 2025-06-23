package com.example.Dms.services.implement;

import java.time.Duration;
import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Dms.dto.ChangePasswordDto;
import com.example.Dms.dto.DocumentFolderDto;
import com.example.Dms.dto.LoginDto;
import com.example.Dms.dto.LoginResponseDto;
import com.example.Dms.dto.OtpLoginDto;
import com.example.Dms.dto.UpdatePasswordDto;
import com.example.Dms.dto.UserRequestDto;
import com.example.Dms.dto.UserResponseDto;
import com.example.Dms.dto.VerifyUserDto;
import com.example.Dms.entity.User;
import com.example.Dms.repository.IUserRepository;
import com.example.Dms.security.AuthUserDetailsService;
import com.example.Dms.security.JwtService;
import com.example.Dms.services.IAuthService;
import com.example.Dms.services.IDocumentService;
import com.example.Dms.utils.EmailUtil;
import com.example.Dms.utils.OtpUtil;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService implements IAuthService {

    @Autowired
    private OtpUtil otpUtil;

    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    ModelMapper mapper;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    LoginResponseDto loginResponseDto;

    @Autowired
    IDocumentService docService;

    @Autowired
    private AuthUserDetailsService userDetailsService;

    @Override
    public UserResponseDto registerUser(UserRequestDto userRequestDto) {
        userRequestDto.setPassword(bCryptPasswordEncoder.encode(userRequestDto.getPassword()));
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(userRequestDto.getEmail(), otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        User user = mapper.map(userRequestDto, User.class);
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        userRepository.save(user);
        return mapper.map(user, UserResponseDto.class);
    }

    @Override
    public LoginResponseDto checkLogin(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername());

        if (!user.isActive()) {
            throw new RuntimeException("Account not verified. Please verify your account.");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
        );
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(loginDto.getUsername());
            String refreshToken = jwtService.generateRefreshToken(loginDto.getUsername());
            loginResponseDto.setToken(token);
            loginResponseDto.setRefreshToken(refreshToken);
            loginResponseDto.setData(mapper.map(user, UserResponseDto.class));
            return loginResponseDto;
        }
        throw new UsernameNotFoundException("user not found");
    }

    @Override
    public LoginResponseDto otpLogin(OtpLoginDto otpLoginDto) {
        User user = userRepository.findByEmail(otpLoginDto.getEmail());
        if (user.getSetPasswordVerification().equals(otpLoginDto.getOtp()) && Duration.between(user.getVerificationGenerationTime(),
                LocalDateTime.now()).getSeconds() < (1 * 60)) {
            System.out.print("hello");
            String token = jwtService.generateToken(user.getUsername());
            String refreshToken = jwtService.generateRefreshToken(user.getUsername());
            loginResponseDto.setToken(token);
            loginResponseDto.setRefreshToken(refreshToken);
            // User user = userRepository.findByUsername(loginDto.getUsername());
            loginResponseDto.setData(mapper.map(user, UserResponseDto.class));
            user.setSetPasswordVerification(null);
            user.setVerificationGenerationTime(null);
            userRepository.save(user);
            return loginResponseDto;
        }
        return null;
    }

    @Override
    public void updatePassword(Authentication authentication, UpdatePasswordDto passwordDto) {
        String username = authentication.getName();

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        User user = userRepository.findByUsername(username);

        if (!bCryptPasswordEncoder.matches(passwordDto.getOldPassword(), userDetails.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect.");
        }

        user.setPassword(bCryptPasswordEncoder.encode(passwordDto.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public String verification(VerifyUserDto input) {

        User user = userRepository.findByEmail(input.getEmail());

        if (user.getOtp().equals(input.getOtp()) && Duration.between(user.getOtpGeneratedTime(),
                LocalDateTime.now()).getSeconds() < (1 * 60)) {
            user.setActive(true);
            user.setOtpGeneratedTime(null);
            user.setOtp(null);
            userRepository.save(user);
            System.out.println("user saved");
            DocumentFolderDto folder = new DocumentFolderDto();
            folder.setFile_name(user.getUsername());
            folder.setOriginal_name(user.getUsername());
            folder.setUserId(user.getId());
            System.out.println("root folder created" + folder);
            docService.createFolder(folder, (Long) null);
            return "OTP verified you can login";
        }
        return "OTP expired! Please regenerate another OTP in order to verify the acoount.";
    }

    @Override
    public void resendVerificationCode(String email) {
        String otp = otpUtil.generateOtp();
        User user = userRepository.findByEmail(email);
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        try {
            emailUtil.sendOtpEmail(email, otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
    }

    @Override
    public void sendOTP(String email) {
        User user = userRepository.findByEmail(email);
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendSetPasswordEmail(email, otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        System.out.println(otp);
        user.setSetPasswordVerification(otp);
        user.setVerificationGenerationTime(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    public String changePassword(String email, ChangePasswordDto changePasswordDto) {
        User user = userRepository.findByEmail(email);
        if (user.getSetPasswordVerification().equals(changePasswordDto.getOtp()) && Duration.between(user.getVerificationGenerationTime(),
                LocalDateTime.now()).getSeconds() < (1 * 60)) {
            user.setPassword(bCryptPasswordEncoder.encode(changePasswordDto.getPassword()));
            user.setSetPasswordVerification(null);
            user.setVerificationGenerationTime(null);
            userRepository.save(user);
            return "Password for your account has been successfully updated";
        }
        return "OTP has expired! Please resend the OTP in order to update the password of your account.";
    }
    

    @Override
    public LoginResponseDto refreshToken(Authentication authentication) {
        
        String username = authentication.getName();
		var user=userRepository.findByUsername(username);
		if(jwtService.validateToken2(getRefreshToken(), username))
		{
			String token=jwtService.generateToken(username);
			String refreshToken=jwtService.generateRefreshToken(user.getUsername());
			loginResponseDto.setRefreshToken(refreshToken);
			loginResponseDto.setToken(token);
			return loginResponseDto;
		}
		return null;
    }


    @Autowired
    private HttpServletRequest request;

    private String getRefreshToken() {
        String authHeader =  request.getHeader("Authorization");

        if(authHeader != null && authHeader.contains("Bearer ")) {
            return authHeader.substring(7);
            
        }
        return null;
    }

}

// User user = userRepository.findByEmail(email);
//         if (user.getOtp().equals(otp) && Duration.between(user.getOtpGeneratedTime(),
//                 LocalDateTime.now()).getSeconds() < (1 * 60)) {
//             user.setActive(true);
//             userRepository.save(user);
//             return "OTP verified you can login";
//         }

// User user = userRepository.findByUsername(loginDto.getUsername());
