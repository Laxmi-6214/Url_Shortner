package com.urlshortner.urlshortner.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.urlshortner.urlshortner.entity.Url;

public interface UrlRepository
        extends JpaRepository<Url, Long> {

    Optional<Url> findByShortCode(String shortCode);

}