from bs4 import BeautifulSoup
from splinter import Browser
import pandas as pd 

executable_path = {"executable_path": "./chrome_driver/chromedriver"}
browser = Browser("chrome", **executable_path, headless=False)

def scrape():
    final_data = {}
    mars_news_output = scrape_mars_news()
    final_data["mars_news"] = mars_news_output[0]
    final_data["mars_paragraph"] = mars_news_output[1]
    final_data["mars_image"] = scrape_mars_image()
    final_data["mars_weather"] = scrape_mars_weather()
    final_data["mars_facts"] = scrape_mars_facts()
    final_data["mars_hemisphere"] = scrape_mars_hemispheres()

    return final_data

# NASA MARS NEWS
def scrape_mars_news():
    news_url = "https://mars.nasa.gov/news/"
    browser.visit(news_url)
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")
    article = soup.find("div", class_='list_text')
    news_title = article.find("div", class_="content_title").text
    news_p = article.find("div", class_ ="article_teaser_body").text

    mars_news_output = [news_title, news_p]
    return mars_news_output

# FEATURED IMAGE
def scrape_mars_image():
    image_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(image_url)
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")
    
    image = soup.find("img", class_="thumb")["src"]
    featured_image_url = "https://www.jpl.nasa.gov" + image
    return featured_image_url

# Mars Weather 
def scrape_mars_weather():
    weather_url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(weather_url)

    html_weather = browser.html
    soup = BeautifulSoup(html_weather, 'html.parser')
    latest_tweets = soup.find_all('div', class_='js-tweet-text-container')
    for tweet in latest_tweets: 
        weather_tweet = tweet.find('p').text
        if 'Sol' and 'pressure' in weather_tweet:
            print(weather_tweet)
            break

    # Dictionary entry from WEATHER TWEET
    return weather_tweet


# Mars Facts
def scrape_mars_facts():

    facts_url = 'http://space-facts.com/mars/'
    mars_facts = pd.read_html(facts_url)
    mars_df = mars_facts[0]
    mars_df.columns = ['Description','Value']
    mars_df.set_index('Description', inplace=True)
    data = mars_df.to_html()
    return data

# MARS HEMISPHERES

def scrape_mars_hemispheres():
    hemispheres_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(hemispheres_url)

    html_hemispheres = browser.html
    soup = BeautifulSoup(html_hemispheres, 'html.parser')
    # Retreive all items that contain mars hemispheres information
    items = soup.find_all('div', class_='item')
    hiu = []
    hemispheres_main_url = 'https://astrogeology.usgs.gov'
    for i in items:
        title = i.find('h3').text
        partial_img_url = i.find('a', class_='itemLink product-item')['href']
        browser.visit(hemispheres_main_url + partial_img_url)
        partial_img_html = browser.html
        soup = BeautifulSoup( partial_img_html, 'html.parser')
        img_url = hemispheres_main_url + soup.find('img', class_='wide-image')['src']
        hiu.append({"title" : title, "img_url" : img_url})

    return hiu