package com.urlshortner.urlshortner.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.urlshortner.urlshortner.entity.Url;
import com.urlshortner.urlshortner.service.UrlService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin("*")
public class Controller {

    @Autowired
    private UrlService urlService;

    /* =========================
       SHORTEN URL
    ========================= */

    @PostMapping("/api/url/shorten")
    public Url shortenUrl(@RequestBody Url request) {

        return urlService.shortenUrl(
                request.getOriginalUrl()
        );
    }

    /* =========================
       REDIRECT SHORT URL
    ========================= */

    @GetMapping("/{shortCode:[a-zA-Z0-9]+}")
    public void redirectUrl(
            @PathVariable String shortCode,
            HttpServletResponse response
    ) throws Exception {

        Optional<Url> url =
                urlService.getOriginalUrl(shortCode);

        if(url.isPresent()) {

            response.sendRedirect(
                    url.get().getOriginalUrl()
            );
        }

        else {

            response.sendError(404);
        }
    }

    /* =========================
       GET ALL URLS
    ========================= */

    @GetMapping("/api/url/all")
    public List<Url> getAllUrls() {

        return urlService.getAllUrls();
    }

    /* =========================
       DELETE URL
    ========================= */

    @DeleteMapping("/api/url/delete/{id}")
    public void deleteUrl(@PathVariable Long id) {

        urlService.deleteUrl(id);
    }
}