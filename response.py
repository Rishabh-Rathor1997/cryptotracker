import requests

url = "https://pro-api.coingecko.com/api/v3/ping"

headers = {"accept": "application/json"}

response = requests.get(url, headers=headers)

print(response.text)