package com.example.Dms.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Dms.entity.Folder;
import com.example.Dms.services.IFolderService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/folder")
@CrossOrigin(origins = "http://localhost:5173")
public class FolderController {
    
    @Autowired
	IFolderService folderService;
	
	@GetMapping("/files")
	public List<Folder> get() {
		try {
			List<Folder> files = folderService.getAll();
			return files;
		} catch (IOException e) {
			e.printStackTrace();
			return new ArrayList<>();
		}
	}
	
	@PostMapping("/create")
	public String createFolder(@RequestBody Folder folder)
	{
		try
		{
			folderService.addToFolder(folder);
			return "Uploaded Successfully";
		}
		catch(IOException e)
		{
			e.printStackTrace();
			return "Error Found";
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable String id) {
		try {
			long id1 = Long.parseLong(id);
			return folderService.delete(id1);

		} catch (IOException e) {
			e.printStackTrace();
			return "Error";
		}

	}

	@GetMapping("/get/{id}")
	public Optional<Folder> getById(@PathVariable String id) {
		long id1 = Long.parseLong(id);
		return folderService.getFolderById(id1);
	}
	
	@GetMapping("/get/file/{id}")
	public List<Folder> getFileByFolderId(@PathVariable String id)
	{
		long id1 = Long.parseLong(id);
		return folderService.getFileByFolderId(id1);
	}
}
