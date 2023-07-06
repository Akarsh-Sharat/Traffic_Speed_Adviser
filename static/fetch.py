import requests
import random

def fetch_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {str(e)}")
        return None

# List of microservice URLs
microservice_urls = [
    "https://microservice1.example.com",
    "https://microservice2.example.com",
    "https://microservice3.example.com",
    "https://api.example.com/data",
    "https://test.example.com",
    "https://service.example.com/endpoint",
    "https://app.example.com/api",
    "https://random.example.com",
    "https://api.example.com/v1",
]

# Fetch data from random microservices
random.shuffle(microservice_urls)
for url in microservice_urls:
    data = fetch_data(url)
    if data:
        # Process the fetched data
        print(f"Data fetched from {url}: {data}")
