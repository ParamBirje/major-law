import requests
from bs4 import BeautifulSoup


def scrape(url: str) -> str:
    '''
    Outputs the HTML in `str` of the `url` by performing a get request.
    '''
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    body = soup.body
    body_text = body.get_text(separator="\n")

    return body_text