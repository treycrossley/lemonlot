#!/bin/bash

# Define the API endpoint
API_URL="http://localhost:8080/api/users/register"

# Define the JSON file containing all payloads
JSON_FILE="./all_users.json"

# Read the JSON file and parse it
USERS=$(jq -c '.[]' "$JSON_FILE")

# Loop through each JSON object and send the request
for user in $USERS; do
  echo "Sending request with payload: $user"
  
  # Use curl to send the POST request
  curl -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$user"
  
  echo "Request sent for: $user"
  echo ""
done
