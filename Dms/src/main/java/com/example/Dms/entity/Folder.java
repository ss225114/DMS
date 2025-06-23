package com.example.Dms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "folders")
public class Folder {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private long document_id;
	@Column(name="folder_id")
	private Long folderId;
	private long user_id;
}
