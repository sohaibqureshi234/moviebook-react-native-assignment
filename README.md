# MovieBook — React Native Assignment

A React Native movie application built as part of the TenTwenty React Native development assignment.

The application uses **The Movie Database (TMDB) API** to display upcoming movies and provides movie details, trailer playback, search, and a movie ticket booking UI.

## Features

* Upcoming movies listing
* Movie details
* Movie posters and images
* Watch trailer with full-screen playback
* Automatic trailer completion handling
* Movie search
* Movie ticket booking flow
* Date and showtime selection
* Interactive seat mapping UI
* Booking summary
* Responsive and reusable UI components

## Tech Stack

* React Native
* Expo
* TypeScript
* Expo Router
* TMDB API
* React Hooks
* Clean Architecture-inspired structure

## Architecture

The project follows a layered architecture to keep UI, business logic, data handling, and infrastructure concerns separated.

```text
src/
├── app/                # Expo Router screens and navigation
├── core/               # Network, errors, theme, utilities
├── data/               # API, models, mappers, repositories
├── domain/             # Entities, repository contracts, use cases
├── presentation/       # Feature UI, components and hooks
└── store/              # Application UI state
```

### Data Flow

```text
Presentation
     ↓
Domain / Use Cases
     ↓
Repository
     ↓
Remote Data Source
     ↓
TMDB API
```

## TMDB API

The application uses the following TMDB functionality:

* Upcoming Movies
* Movie Details
* Movie Images
* Movie Videos
* Movie Search

## Environment Setup

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

The API key is intentionally excluded from version control.

An `.env.example` file is included as a reference.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sohaibqureshi234/moviebook-react-native-assignment.git
cd moviebook-react-native-assignment
npm install
```

Start the application:

```bash
npx expo start
```

## Testing

The project was validated with:

```bash
npx tsc --noEmit
npm run lint
git diff --check
```

The application was also tested on an iOS simulator.

## Booking

The ticket booking and seat mapping functionality is implemented as a UI-only flow according to the assignment requirements. No real payment or booking backend is connected.

## Environment Variables

Do not commit the actual `.env` file or API credentials.

Use:

```text
.env.example
```

as the configuration reference.

## Assignment Deliverables

* GitHub source code
* Application demo recording
* Android APK
* Code structure / architecture walkthrough

## Author

**Sohaib Qureshi**
