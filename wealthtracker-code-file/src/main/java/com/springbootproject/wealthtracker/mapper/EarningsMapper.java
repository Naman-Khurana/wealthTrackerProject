package com.springbootproject.wealthtracker.mapper;

import com.springbootproject.wealthtracker.dto.EarningsDTO;
import com.springbootproject.wealthtracker.entity.Earnings;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface EarningsMapper {
    EarningsDTO toDTO(Earnings earnings);
    Earnings toEntity(EarningsDTO earningsDTO);
    void updateEntityFromDto(EarningsDTO dto, @MappingTarget Earnings entity);
}
