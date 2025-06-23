package com.example.Dms.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class EmailUtil {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendOtpEmail(String email, String otp) throws MessagingException {
      MimeMessage mimeMessage = javaMailSender.createMimeMessage();
      MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
      mimeMessageHelper.setTo(email);
      mimeMessageHelper.setSubject("Verify OTP");
      mimeMessageHelper.setText("<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + otp + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>".formatted(email, otp), true);
  
      javaMailSender.send(mimeMessage);
    }

    public void sendSetPasswordEmail(String email, String otp)  throws MessagingException {
      MimeMessage mimeMessage = javaMailSender.createMimeMessage();
      MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
      mimeMessageHelper.setTo(email);
      mimeMessageHelper.setSubject("Set Password");
      mimeMessageHelper.setText("<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please use the OTP given below, to set the password:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">OTP:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + otp + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>".formatted(email, otp), true);
  
      javaMailSender.send(mimeMessage);
    }
}
// http://localhost:8080/verify-account?email=%s&otp=%s
// <a href="http://localhost:8080/verify-account?email=%s&otp=%s" target="_blank">click link to verify</a>