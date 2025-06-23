package com.example.Dms.services;

import java.util.List;
import java.util.Optional;

import com.example.Dms.dto.DocumentDto;
import com.example.Dms.dto.DocumentFolderDto;
import com.example.Dms.dto.DocumentResponseDto;
import com.example.Dms.entity.Document;

public interface IDocumentService{
    public String delete(Long id);
	public List<Document> getAll();
	public Optional<Document> getFileById(Long id);
	public List<Document> getFileByUserId(Long id);
	public List<DocumentDto> getFilesByUser(Long userId);
	public Document create(DocumentResponseDto documentDto, long folderId);
	public Document createFolder(DocumentFolderDto documentDto, Long folderId);
}
