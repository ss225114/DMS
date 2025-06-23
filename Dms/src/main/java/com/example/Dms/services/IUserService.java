package com.example.Dms.services;

import java.util.List;

import com.example.Dms.dto.UserResponseDto;

public interface IUserService {
    List<UserResponseDto> getAllUsers();
}
