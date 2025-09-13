<div align="center">
<img src="./public/android-chrome-192x192.png?raw=true" width="192" height="192" alt="">
</div>
<h1 align="center">SpotifyInfo</h1>
<div align="center">

SpotifyInfo - Get Info On A Spotify Track

[GitHub](https://github.com/nesaku/SpotifyInfo) | [Codeberg](https://codeberg.org/nesaku/SpotifyInfo)

</div>

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

## Instances

| Instance URL                                               | Country | Provider | Notes                                  |
| ---------------------------------------------------------- | :-----: | -------- | -------------------------------------- |
| [spotifyinfo.netlify.app](https://spotifyinfo.netlify.app) |  :us:   | Netlify  | Run by [me](https://github.com/nesaku) |
| [spotifyinfo.vercel.app](https://spotifyinfo.vercel.app)   |  :us:   | Vercel   | Run by [me](https://github.com/nesaku) |

---

## FAQ

### How Do I Use This?

There are two ways you can use SpotifyInfo:

1. Visit [spotifyinfo.netlify.app](spotifyinfo.netlify.app) and paste the Spotify track URL/URI into the input box.
2. Replace `https://open.spotify.com` of any URL/URI with `spotifyinfo.netlify.app`. Then click the "Fetch Data" button.

### How Does This Work? The Spotify Web API

SpotifyInfo uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to get the required data.

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
- TailwindCSS
- OTPAuth

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
