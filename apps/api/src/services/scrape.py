import requests


def scrape(url: str) -> str:
    '''
    Outputs the HTML in `str` of the `url` by performing a get request.
    '''
    response = requests.get(url)
    return response.text
