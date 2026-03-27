package com.springbootproject.wealthtracker.mapper;

import com.springbootproject.wealthtracker.dto.EarningsDTO;
import com.springbootproject.wealthtracker.dto.entities.UserDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Earnings;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AccountHolderMapper {
    UserDTO toDTO(AccountHolder accountHolder);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "earnings", ignore = true)
    @Mapping(target = "expenses", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "budgets", ignore = true)
    @Mapping(target = "userSettings", ignore = true)
    @Mapping(target = "subscriptions", ignore = true)
    AccountHolder toEntity(UserDTO userDTO);
    void updateEntityFromDto(UserDTO dto, @MappingTarget AccountHolder accountHolder);
}

