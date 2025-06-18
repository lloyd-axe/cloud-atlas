# Cloud Atlas - Singapore

## Overview

Cloud Atlas is a responsive Singapore weather station monitoring application built with Angular.

## ⭐ Features

- Interactive weather station mapping of Singapore
- Weather dashboard for each location
- Mobile-responsive design
- Dynamic data updates
- Cross-platform support

## 🛠️ Tech Stack

- Angular 18.2.0
- TypeScript 5.5.2
- Leaflet 1.9.4
- Chart.js 4.5.0
- RxJS 7.8.0
- SCSS

## 🚀 Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/lloyd-axe/cloudatlas.git

# Install dependencies
npm install

# Start development server
npm start
```

### Mobile Setup

#### Physical Device Testing

1. Connect device to same network as development machine
2. Find development machine's IP:

```bash
ipconfig
```

3. Start with host parameter:

```bash
ng serve --host 0.0.0.0
```

4. Access on mobile: `http://[your-ip-address]:4200`

## 🧪 Testing

```bash
# Unit tests
npm test
```

## 📁 Project Structure

```
cloudatlas-sg/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── pipes/
│   │   ├── home/
└── └── └── app.component.*

```
