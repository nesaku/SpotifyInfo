# SpotifyInfo

SpotifyInfo - Get Info On A Spotify Track

## Screenshots

|                         Dark Mode:                          |                          Light Mode                           |
| :---------------------------------------------------------: | :-----------------------------------------------------------: |
| ![Dark Mode - Homepage ](/public/readme/dark.png?raw=true)  |  ![Light Mode - Homepage](/public/readme/light.png?raw=true)  |
| ![Dark Mode - Results](/public/readme/dark-ui.png?raw=true) | ![Light Mode - Results](/public/readme/light-ui.png?raw=true) |

## Features

- No ads - Simple. We don't show ads.
- No tracking or data collection - No personal information is ever collected. Tracking cookies are not used.
- No sign up required - Use SpotifyInfo without signing up for an account and never deal with those annoying sign up popups.
- All requests are proxied - your requests are never directly made to Spotify
- Lightweight
- Modern Design - Responsive design with built-in light & dark mode support

---

## FAQ

### How Do I Use This?

There are two ways you can use SpotifyInfo:

1. Visit [spotifyinfo.netlify.app](spotifyinfo.netlify.app) and paste the Spotify track url into the input box.
2. Replace `https://open.spotify.com` of any url with `spotifyinfo.netlify.app`. Then click the "Fetch Data" button.
3. Append `https://open.spotify.com` of any url with `spotifyinfo.netlify.app`. Then click the "Fetch Data" button.

### How Does This Work? - Scraping

While the [Spotify developer Web API](https://developer.spotify.com/documentation/web-api/) could have been used for this project. I weighed the pros and cons and chose to go with scraping the required content off the track page instead.

Some of the pros of the Spotify Web API are that it is more stable than scraping, it is more quicker than scraping, good documentation, officially suported, the API has many features and etc. Some of the cons of the Web API are that all requests made are tied to a single developer token, their [Developer Terms of Service](https://developer.spotify.com/terms/) must be followed and that a developer account is required to use the Web API.

### Why Is This Slower Than Spotify?

When you make a request for a song on SpotifyInfo, your request needs to be first scraped by the scraper from Spotify before the result can be shown to you. This causes a delay from when you make the request to when the result is shown.

### What Do You Do With My Data?

Nothing. Since we don't collect any user data we can't use it

### Why Is This Missing Functionality?

SpotifyInfo, is still a work in progress and new functionality is continually being developed. If you have a certain feature that you would like to see, feel free to open an issue on GitHub

## Installation:

### Manual Installation

**Prerequisites:**

- [Node.js](https://nodejs.org/en/)
- [Git](https://github.com/git-guides/install-git)

1. Clone the Git Repository

```bash
git clone https://github.com/nesaku/SpotifyInfo.git
cd SpotifyInfo
cp .env.example .env.local
```

2. Edit the .env file if required

3. Install & Start The Project

```bash
npm install
npm run start
# or
yarn install
yarn start
```

---

## Development:

### Built Using

- Next.js
- Cheerio
- TailwindCSS

### Getting Started

To run the development server:

```bash
git clone https://github.com/nesaku/SpotifyInfo.git
cd SpotifyInfo
cp .env.example .env.local
# then
npm install
npm run dev
# or
yarn install
yarn dev
```

**ⓘ If you want use the API directly or run any kind of automation. Please host the API on your own server.**
