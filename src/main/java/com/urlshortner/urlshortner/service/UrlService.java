package com.urlshortner.urlshortner.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urlshortner.urlshortner.entity.Url;
import com.urlshortner.urlshortner.repository.UrlRepository;

@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    private final String characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public Url shortenUrl(String originalUrl) {

        String shortCode = generateShortCode();

        Url url = new Url();

        url.setOriginalUrl(originalUrl);

        url.setShortCode(shortCode);

        url.setClicks(0);

        return urlRepository.save(url);
    }

    private String generateShortCode() {

        Random random = new Random();

        String shortCode = "";

        while(true) {

            StringBuilder sb = new StringBuilder();

            for(int i = 0; i < 5; i++) {

                int index =
                        random.nextInt(characters.length());

                sb.append(characters.charAt(index));
            }

            shortCode = sb.toString();

            Optional<Url> existing =
                    urlRepository.findByShortCode(shortCode);

            if(existing.isEmpty()) {

                break;
            }
        }

        return shortCode;
    }

    public Optional<Url> getOriginalUrl(String shortCode) {

        Optional<Url> url =
                urlRepository.findByShortCode(shortCode);

        if(url.isPresent()) {

            Url existingUrl = url.get();

            existingUrl.setClicks(
                    existingUrl.getClicks() + 1
            );

            urlRepository.save(existingUrl);
        }

        return url;
    }

    public List<Url> getAllUrls() {

        return urlRepository.findAll();
    }
    
    public void deleteUrl(Long id) {

        urlRepository.deleteById(id);
    }
}

