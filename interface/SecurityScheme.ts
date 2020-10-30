export enum SecuritySchemeScheme {
  NOSEC = "nosec",
  BASIC = "basic",
  DIGEST = "digest",
  BEARER = "bearer",
  PSK = "psk",
  OAUTH2 = "oauth2",
  APIKEY = "apikey",
}

export enum SecuritySchemeIn {
  HEADER = "header",
  QUERY = "query",
  BODY = "body",
  COOKIE = "cookie",
}

export enum DigestSecuritySchemeQop {
  AUTH = "auth",
  AUTH_INT = "auth-int",
}

export default interface SecurityScheme {
  "@type"?: string | string[];
  scheme: SecuritySchemeScheme;
  description?: string;
  desctiptions?: string;
  proxy?: string;
}

export interface NoSecurityScheme extends SecurityScheme {
  scheme: SecuritySchemeScheme.NOSEC;
}

export interface BasicSecurityScheme extends SecurityScheme {
  scheme: SecuritySchemeScheme.BASIC;
  in?: SecuritySchemeIn;
  name?: string;
}

export interface DigestSecurityScheme extends SecurityScheme {
  scheme: SecuritySchemeScheme.DIGEST;
  qop?: DigestSecuritySchemeQop;
  in?: SecuritySchemeIn;
  name?: string;
}

export interface APIKeySecurityScheme extends SecurityScheme {
  scheme: SecuritySchemeScheme.APIKEY;
  in?: SecuritySchemeIn;
  name?: string;
}

export interface BearerSecurityScheme extends SecurityScheme {
  scheme: SecuritySchemeScheme.BEARER;
  authorization?: string;
  alg?: string;
  format?: string;
  in?: SecuritySchemeIn,
  name?: string;
}

export interface PSKSecurityScheme extends SecurityScheme {
  scheme: SecuritySchemeScheme.PSK;
  identity?: string;
}

export interface OAuth2SecurityScheme extends SecurityScheme {
  scheme: SecuritySchemeScheme.OAUTH2;
  authorization?: string;
  token?: string;
  refresh?: string;
  scopes?: string|string[];
  flow: string;
}
