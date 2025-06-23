package com.example.Dms.services.implement;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Dms.ExceptionHandler.NoResourceFoundException;
import com.example.Dms.dto.DocumentDto;
import com.example.Dms.dto.DocumentFolderDto;
import com.example.Dms.dto.DocumentResponseDto;
import com.example.Dms.entity.Document;
import com.example.Dms.entity.Folder;
import com.example.Dms.entity.User;
import com.example.Dms.repository.IDocumentRepository;
import com.example.Dms.repository.IUserRepository;
import com.example.Dms.services.IDocumentService;
import com.example.Dms.services.IFolderService;

import net.coobird.thumbnailator.Thumbnails;

@Service
public class DocumentService implements IDocumentService {

    private long rootId;

    @Autowired
    IFolderService folderService;

    @Autowired
    IDocumentRepository docRepository;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    ModelMapper mapper;

    @Override
    public String delete(Long id) {
        docRepository.deleteById(id);
        return "Deleted Successfully";
    }

    @Override
    public List<Document> getAll() {
        return docRepository.findAll();
    }

    @Override
    public Optional<Document> getFileById(Long id) {
        return docRepository.findById(id);
    }

    @Override
    public List<Document> getFileByUserId(Long id) {
        // Check if the user exists, throw NoResourceFoundException if not
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoResourceFoundException("User with ID " + id + " not found"));

        // Fetch documents for the user, handle the case where no documents are found
        List<Document> documents = docRepository.findByUser(user);
        if (documents.isEmpty()) {
            throw new NoResourceFoundException("No documents found for user with ID " + id);
        }

        return documents;
    }

    @Override
    public List<DocumentDto> getFilesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoResourceFoundException("User with ID " + userId + " not found"));
        System.out.print(user);
        List<Document> documents = docRepository.findByUser(user);
        List<DocumentDto> documentDTOs = documents.stream()
                .map(document -> mapper.map(document, DocumentDto.class))
                .collect(Collectors.toList());
        return documentDTOs;
    }

    @Override
    public Document create(DocumentResponseDto documentDto, long folderId) {
        MultipartFile file = documentDto.getFile();

        if (file.isEmpty()) {
            System.out.println("file is emtpy");
            return null;
        }
        try {
            String path1 = "src/main/resources/static/documents/";
            String path2 = "src/main/resources/static/thumbnails/";
            String time = String.valueOf(System.currentTimeMillis());
            String fileName = time + file.getOriginalFilename();

            User user = userRepository.findById(documentDto.getUserId()).orElse(null);
            List<Document> docs = docRepository.findByUser(user);

            Document doc = new Document();
            doc.setCreated_at(new Date(System.currentTimeMillis()));
            doc.setOriginal_name(documentDto.getFile().getOriginalFilename());
            doc.setPath("/thumbnails/" + fileName);
            doc.setUser(user);
            String extension = documentDto.getFile()
                    .getOriginalFilename()
                    .substring(documentDto.getFile()
                            .getOriginalFilename()
                            .lastIndexOf(".") + 1);
            doc.setExtension(extension);
            doc.setFile_name(time + file.getOriginalFilename());
            doc.setUpdated_at(new Date(System.currentTimeMillis()));
            doc.setMime_type(file.getContentType());
            if (extension.equals("jpg")
                    || extension.equals("jpeg")
                    || extension.equals("png")) {
                doc.setDocument_type("image");

                // Paths for saving original and resized images
                Path originalPath = Paths.get(path1 + fileName);
                Path resizedPath = Paths.get(path2 + fileName);

                // Ensure directories exist
                Files.createDirectories(originalPath.getParent());
                Files.createDirectories(resizedPath.getParent());

                // Save the original image to path2
                Files.copy(file.getInputStream(), originalPath, StandardCopyOption.REPLACE_EXISTING);

                // Resize and save the image to path1
                File originalFile = originalPath.toFile();
                File resizedFile = resizedPath.toFile();

                Thumbnails.of(originalFile)
                        .size(200, 200) // Set desired dimensions
                        .outputQuality(0.4) // Adjust quality (0.0 to 1.0)
                        .toFile(resizedFile);
            } else {
                doc.setDocument_type("doc");

                Path originalPath = Paths.get(path1 + fileName);
                Files.createDirectories(originalPath.getParent());
                Files.copy(file.getInputStream(), originalPath, StandardCopyOption.REPLACE_EXISTING);

                // Set the public path
                doc.setPath("/documents/" + fileName);
            }
            docRepository.save(doc);
            Folder folder = new Folder();
            folder.setDocument_id(doc.getId());
            folder.setFolderId(folderId);
            folder.setUser_id(user.getId());
            folderService.addToFolder(folder);
            return doc;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Document createFolder(DocumentFolderDto documentDto, Long folderId) {
        System.out.println("folder creation started");
        String path = "src/main/resources/static/documents/";
        User user = userRepository.findById(documentDto.getUserId()).orElseThrow();
        System.out.println(user);
        List<Document> docs = docRepository.findByUser(user);
        for (Document doc : docs) {
            if (doc.getParent_id() == null) {
                rootId = doc.getId();
                break;
            }
        }
        Document doc = new Document();
        doc.setCreated_at(new Date(System.currentTimeMillis()));
        doc.setExtension("folder");
        doc.setDocument_type("folder");
        doc.setMime_type("folder");
        path = path.concat("/");
        doc.setPath(path.concat(documentDto.getFile_name()));
        String randomId = UUID.randomUUID().toString();
        String name = randomId
                .concat(documentDto.getFile_name());
        doc.setFile_name(name);
        doc.setOriginal_name(documentDto.getOriginal_name());
        doc.setUser(user);
        doc.setParent_id(folderId);
        doc.setUpdated_at(new Date(System.currentTimeMillis()));
        System.out.println("doc created : " + doc);
        docRepository.save(doc);
        Folder folder = new Folder();
        folder.setDocument_id(doc.getId());
        folder.setFolderId(folderId);
        folder.setUser_id(user.getId());
        System.out.println(folder);
        folderService.addToFolder(folder);
        System.out.print("folder created");
        return doc;
    }

}

// Compress the file and store it in path1
// try (InputStream inputStream = Files.newInputStream(path); OutputStream outputStream = Files.newOutputStream(path01); GZIPOutputStream gzipOutputStream = new GZIPOutputStream(outputStream)) {
//     byte[] buffer = new byte[1024];
//     int bytesRead;
//     while ((bytesRead = inputStream.read(buffer)) != -1) {
//         gzipOutputStream.write(buffer, 0, bytesRead);
//     }
// }
// for(Document doc : docs){
// 	if(doc.getParent_id() == null){
// 		rootId = doc.getId();
// 		break;
// 	}
            // }         
