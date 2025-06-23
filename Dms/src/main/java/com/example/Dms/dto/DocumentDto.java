package com.example.Dms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDto {
    private long id;
    private long parent_id;
    private String document_type;
    private String mime_type;
	private String original_name;
	private int tag_id;
    private String path;
    private String extension;
    private String file_name;
    private UserDto user;
}
