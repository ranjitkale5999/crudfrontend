package com.example.mapStruct.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginatedResponse<T> {
    private List<T> content;
    private int currentPage;
    private int pageSize;
    private long totalElements;
    private int totalPages;

}
