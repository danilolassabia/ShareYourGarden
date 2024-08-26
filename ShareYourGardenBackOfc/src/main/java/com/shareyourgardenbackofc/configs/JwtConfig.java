package com.shareyourgardenbackofc.configs;

import io.jsonwebtoken.SignatureAlgorithm;

public class JwtConfig {

    public static final String SECRET_KEY = "SHAREYOURGARDEN12345SHAREYOURGARDEN12345SHAREYOURGARDEN12345SHAREYOURGARDEN12345";
    public static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;
    public static final int EXPIRATION = 5;

}
