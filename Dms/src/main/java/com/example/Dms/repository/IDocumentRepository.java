package com.example.Dms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Dms.entity.Document;
import com.example.Dms.entity.User;

public interface IDocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByUser(User user);
}
