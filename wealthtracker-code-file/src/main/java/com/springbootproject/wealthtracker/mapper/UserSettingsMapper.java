package com.springbootproject.wealthtracker.mapper;

import com.springbootproject.wealthtracker.dto.entities.UserSettingsDTO;
import com.springbootproject.wealthtracker.entity.UserSettings;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserSettingsMapper {

    UserSettingsDTO toDTO(UserSettings userSettings);

    @Mapping(target = "accountHolder", ignore = true)
    UserSettings toEntity(UserSettingsDTO dto);

    void updateEntityFromDto(UserSettingsDTO dto, @MappingTarget UserSettings userSettings);
}
