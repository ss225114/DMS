package com.example.Dms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Dms.entity.Folder;

public interface IFolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByFolderId(Long folderId);
}
