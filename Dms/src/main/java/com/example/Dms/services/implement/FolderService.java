package com.example.Dms.services.implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Dms.entity.Document;
import com.example.Dms.entity.Folder;
import com.example.Dms.repository.IDocumentRepository;
import com.example.Dms.repository.IFolderRepository;
import com.example.Dms.services.IFolderService;

import jakarta.transaction.Transactional;

@Service
public class FolderService implements IFolderService {
    
    @Autowired
    IFolderRepository folderRepository;

    @Autowired
    IDocumentRepository documentRepository;

    @Override
    @Transactional
    public Folder addToFolder(Folder folder) {
        Folder fold=new Folder();
        Document doc = documentRepository.findById(folder.getDocument_id()).get();
        doc.setParent_id(folder.getFolderId());
        documentRepository.save(doc);
		fold.setDocument_id(folder.getDocument_id());
		fold.setFolderId(folder.getFolderId());
		fold.setUser_id(folder.getUser_id());
		folderRepository.save(fold);
		return fold;
    }

    @Override
    public List<Folder> getAll() {
        return folderRepository.findAll();
    }

    @Override
    public String delete(Long id) {
        folderRepository.deleteById(id);
        documentRepository.deleteById(id);
        List<Folder> folders=folderRepository.findByFolderId(id);
        for(Folder folder : folders) {
            folderRepository.deleteById(folder.getId());
            documentRepository.deleteById(folder.getDocument_id());
        }
        return "Deleted successfully";
    }

    @Override
    public Optional<Folder> getFolderById(Long id) {
        return folderRepository.findById(id);
    }

    @Override
    public List<Folder> getFileByFolderId(Long id) {
        Document doc=documentRepository.findById(id).orElseThrow();
		List<Folder> folders=folderRepository.findByFolderId(doc.getId());
		return folders;
    }
    
}
