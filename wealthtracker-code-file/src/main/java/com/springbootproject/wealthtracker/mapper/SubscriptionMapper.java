package com.springbootproject.wealthtracker.mapper;

import com.springbootproject.wealthtracker.dto.entities.SubscriptionDTO;
import com.springbootproject.wealthtracker.entity.Subscription;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SubscriptionMapper {

    @Mapping(target = "planName", source = "plan.name")
    @Mapping(target = "active", expression = "java(subscription.getEndDate() != null && !subscription.getEndDate().isBefore(java.time.LocalDate.now()))")
    SubscriptionDTO toDTO(Subscription subscription);

    @Mapping(target = "accountHolder", ignore = true)
    @Mapping(target = "plan", ignore = true)
    Subscription toEntity(SubscriptionDTO dto);

    void updateEntityFromDto(SubscriptionDTO dto, @MappingTarget Subscription subscription);
}
