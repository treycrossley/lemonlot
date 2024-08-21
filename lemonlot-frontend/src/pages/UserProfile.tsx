
import React, { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  sub: string;
  role: string;
  // Add other fields based on your token structure
}

const Profile: React.FC = () => {
  const [tokenData, setTokenData] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Adjust if you store the token differently
    if (token) {
      try {
        // Remove the "Bearer " prefix if it exists
        const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;

        const decodedToken: DecodedToken = jwtDecode(cleanToken);
        setTokenData(decodedToken);
      } catch (error) {
        setError("Failed to decode token.");
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {tokenData ? (
        <div>
          <h2>Token Information</h2>
          <pre>{JSON.stringify(tokenData, null, 2)}</pre>
        </div>
      ) : (
        <p>No token data available</p>
      )}

    </div>
  );
};

export default Profile;
