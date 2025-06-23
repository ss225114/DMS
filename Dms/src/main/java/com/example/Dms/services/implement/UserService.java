package com.example.Dms.services.implement;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Dms.dto.UserResponseDto;
import com.example.Dms.entity.User;
import com.example.Dms.repository.IUserRepository;
import com.example.Dms.services.IUserService;

@Service
public class UserService implements IUserService {

    @Autowired
    IUserRepository userRepository;

    @Autowired
    ModelMapper mapper;

    @Override
    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> mapper.map(user, UserResponseDto.class)).toList();
    }
    
}
