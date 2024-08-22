import { jwtDecode } from 'jwt-decode';

// Define the AuthToken interface for the token object
export interface AuthToken {
  accessToken: string;
  tokenType: string;
}

// Define the DecodedToken interface based on the new claims
export interface DecodedToken {
  sub: string; // User ID
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
  role: string; // User role
  username: string; // Username
  firstName: string; // First name
  lastName: string; // Last name
  email: string; // Email
  phoneNumber: string; // Phone number
}

// Extract the access token from a token object
export function extractAccessToken(tokenObject: string): string | null {
  try {
    const { accessToken } = JSON.parse(tokenObject) as AuthToken;
    return accessToken;
  } catch (error) {
    console.error('Failed to parse token object:', error);
    return null;
  }
}

// Decode the token and return the decoded claims
export function decodeToken(token: string): DecodedToken | null {
  if (!token) return null;

  try {
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    return jwtDecode<DecodedToken>(cleanToken);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

// Check if the user is authenticated based on the token object
export function isAuthenticated(tokenObject: string | null): boolean {
  const accessToken = extractAccessToken(tokenObject ?? '');
  return !!accessToken;
}

// Get user information from the token object
export function getUserInfo(tokenObject: string | null): DecodedToken | null {
  const accessToken = extractAccessToken(tokenObject ?? '');
  if (!accessToken) return null;

  return decodeToken(accessToken);
}

// Get the user ID from the token object
export function getSub(tokenObject: string | null): string | null {
  const decodedToken = getUserInfo(tokenObject);
  return decodedToken ? decodedToken.sub : null;
}

// Get the user role from the token object
export function getRole(tokenObject: string | null): string | null {
  const decodedToken = getUserInfo(tokenObject);
  return decodedToken ? decodedToken.role : null;
}

// Get the username from the token object
export function getUsername(tokenObject: string | null): string | null {
  const decodedToken = getUserInfo(tokenObject);
  return decodedToken ? decodedToken.username : null;
}

// Get the first name from the token object
export function getFirstName(tokenObject: string | null): string | null {
  const decodedToken = getUserInfo(tokenObject);
  return decodedToken ? decodedToken.firstName : null;
}

// Get the last name from the token object
export function getLastName(tokenObject: string | null): string | null {
  const decodedToken = getUserInfo(tokenObject);
  return decodedToken ? decodedToken.lastName : null;
}

// Get the email from the token object
export function getEmail(tokenObject: string | null): string | null {
  const decodedToken = getUserInfo(tokenObject);
  return decodedToken ? decodedToken.email : null;
}

// Get the phone number from the token object
export function getPhoneNumber(tokenObject: string | null): string | null {
  const decodedToken = getUserInfo(tokenObject);
  return decodedToken ? decodedToken.phoneNumber : null;
}

// Role hierarchy for permission checking
const roleHierarchy = ['USER', 'SELLER', 'ADMIN'];

// Check if the user has the required permissions based on their role
export function hasPermission(userRole: string | null, requiredRole: string): boolean {
  if (!userRole) return false;
  return roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole);
}
