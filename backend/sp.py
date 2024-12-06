import secrets

# Generate a 256-bit (32-byte) secret key
secret_key = secrets.token_urlsafe(32)

# Print the key so you can copy it to your .env file
print(f"Generated Secret Key: {secret_key}")
