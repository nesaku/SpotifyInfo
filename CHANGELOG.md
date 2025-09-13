# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.1] - Sep 13, 2026

### Changed

- Remove the cheerio dependency
- Remove references to scraping
- Unify link colors

## [4.0.0] - Sep 7, 2026

### Changed

- Change the access token fetching flow by adding TOTP
- Centralize fetching data for all routes
- Update the ResultData component to work with the new API data format
- Update the default user agent
- Deprecate the scraper

### Fixed

- Fix the playlist and track routes not working

## [3.2.0] - Dec 28, 2024

### Added

- Add support for albums

### Fixed

- Fix playlist hero layout on medium sized screens

## [3.1.0] - Dec 7, 2024

### Added

- Add album url and uri for track results - [Issue](https://github.com/nesaku/SpotifyInfo/issues/4)
- Add a loading skeleton for the track cover image

### Changed

- Improve home page styling

## [3.0.1] - Apr 29, 2024

### Fixed

- Fix playlist results not working

## [3.0.0] - Jan 6, 2023

**Started using the [Spotify Web API](https://developer.spotify.com/documentation/web-api) for certain routes**

### Added

- Add support for playlists
- Add proxy support for the Spotify Web API and access token requests
- Add a check to only accept valid Spotify URLs/URIs

### Changed

- Update privacy policy to include local storage being used
- Update contact page to include the Codeberg link to create issues
- Update the README and FAQ section on how SpotifyInfo works
- Remove album art opening in new tab when clicked

### Fixed

- Fix only the lowest quality album art being shown on iOS
- Fix audio showing up as a "Live Broadcast" in Safari
- Fix hero text not overflow being hidden instead of word wrapping

## [2.1.0] - Dec 27, 2023

### Added

- Add a new audio proxy api route

### Changed

- Use an audio proxy api route instead of Next.js rewrites

### Fixed

- Fix the header logo src not being relative

## [2.0.0] - Dec 27, 2023

**Upgrade to Next.js 14**

### Added

- Add a general component for unsupported routes
- Add a link to the changelog in the footer

### Changed

- Move from Next.js 12.3.1 to 14.0.4
- Make necessary changes required for the upgrade from Next.js 12 to Next.js 14
- Use Next/Link for more links
- Use import aliases `@/`
- Use a global layout including the header and footer components
- Update robots.txt to only allow the contact,privacy and home pages
- Improve FAQ section visibility in light mode
- Remove index.js for unsupported routes
