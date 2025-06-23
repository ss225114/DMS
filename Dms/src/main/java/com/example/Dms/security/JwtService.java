package com.example.Dms.security;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JwtService {
    SecretKey key = Jwts.SIG.HS256.key().build();

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public  <T> T extractClaim(String token, Function<Claims, T> ClaimResolver) {
        Claims claim = extractAllClaims(token);
        return ClaimResolver.apply(claim);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token,  UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);    
    }

    public boolean validateToken2(String token, String name) {
		final String username = extractUsername(token);
		return (username.equals(name) && !isTokenExpired(token));
	}

    public boolean isTokenExpired(String token) {
        return extractExp(token).before(new Date());
    }

    public Date extractExp(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    public String generateToken(String username) {
        return  Jwts.builder()
                    .subject(username)
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + 1000*10*10*10))
                    .signWith(key)
                    .compact();
    }

    public String generateRefreshToken(String username) {
        return  Jwts.builder()
                    .subject(username)
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + 1000*60*60*60))
                    .signWith(key)
                    .compact();
    }
}
