package com.example.Dms.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Dms.dto.DocumentDto;
import com.example.Dms.dto.DocumentFolderDto;
import com.example.Dms.dto.DocumentResponseDto;
import com.example.Dms.entity.Document;
import com.example.Dms.services.IDocumentService;

import io.jsonwebtoken.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/doc")
public class DocumentController {

    @Autowired
    IDocumentService docService;

    @PostMapping("/upload/{folderId}")
    public Document fileUpload(@ModelAttribute DocumentResponseDto documentDto, @PathVariable long  folderId) {
        // long id1 = Long.parseLong(folderId);
        return docService.create(documentDto, folderId);
    }

    @GetMapping("/files")
    public List<Document> get() {
        try {
            List<Document> files = docService.getAll();
            return files;
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id) {
        try {
            long id1 = Long.parseLong(id);
            return docService.delete(id1);

        } catch (IOException e) {
            e.printStackTrace();
            return "Error";
        }

    }

    @GetMapping("/get/{id}")
    public Optional<Document> getById(@PathVariable String id) {
        long id1 = Long.parseLong(id);
        return docService.getFileById(id1);
    }

    @GetMapping("/get/user/{id}")
    public List<Document> getByUserId(@PathVariable String id) {
        long id1 = Long.parseLong(id);
        return docService.getFileByUserId(id1);
    }

    @GetMapping("/get/file/{id}")
    public List<DocumentDto> getFilesByUser(@PathVariable String id) {
        long id1 = Long.parseLong(id);
        return docService.getFilesByUser(id1);
    }

    @PostMapping("/folder/{folderId}")
    public String folderCreate(@RequestBody DocumentFolderDto documentDto, @PathVariable long folderId) {
        // long id1 = Long.parseLong(folderId);
        try {
            docService.createFolder(documentDto, folderId);
            return "Uploaded Successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error Found";
        }
    }
}
