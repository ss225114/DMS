package com.example.Dms.entity;

import java.util.Date;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="documents")
public class Document {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
	@Nullable
	private Long parent_id;
	@Nullable
    private Date created_at;
	@Nullable
	private Date updated_at;
	private String document_type;
	private String extension;
    @Nullable
    private String file_name;
	private String mime_type;
	private String original_name;
	private String path;
    @ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
}

