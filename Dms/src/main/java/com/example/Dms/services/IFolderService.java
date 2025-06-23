package com.example.Dms.services;

import java.util.List;
import java.util.Optional;

import com.example.Dms.entity.Folder;

public interface IFolderService {
    public Folder addToFolder(Folder folder);
	public List<Folder> getAll();
	public String delete(Long id);
	public Optional<Folder> getFolderById(Long id);
	public List<Folder> getFileByFolderId(Long id);
}
