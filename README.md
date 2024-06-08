# Costco Gas Price Tracker - Orange County

## Overview
Costco Gas Price Tracker is a web application designed to help users find the latest gas prices at Costco gas stations within the Orange County area. The application leverages Google Maps API to provide a map view with markers indicating the locations of Costco gas warehouses. Each marker contains detailed information about the gas prices and other relevant data. Users can toggle between regular and premium gas prices. The application also features an AI assistant, powered by ChatGPT, that can answer queries about gas prices using advanced Retrieval Augmented Generation and LlamaIndex.

## Features
- **Google Maps Integration**: Interactive map displaying Costco gas stations in Orange County with markers.
- **Gas Price Information**: Markers show the address, regular and premium gas prices, and timestamps for when the prices were last scraped and updated.
- **Price Toggle**: Users can switch between viewing regular and premium gas prices.
- **Daily Updates**: Gas prices are scraped daily from the Costco website using a Python script scheduled by Google Cloud Scheduler.
- **AI Assistant**: Users can ask the AI assistant questions related to gas prices, and it will respond using up-to-date information from the database.

## Technology Stack
- **Frontend**: React
- **Backend**: Node.js/Express
- **Database**: Firestore
- **Scraping Script**: Python
- **Scheduler**: Google Cloud Scheduler
- **Maps**: Google Maps API
- **AI Assistant**: ChatGPT with Retrieval Augmented Generation and LlamaIndex

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)
- Python
- Google Cloud account
- Firestore database
- API keys for Google Maps and ChatGPT

### Setup
- Clone the frontend repository https://github.com/phucnguyen02/costco-gas-map-v2. You can run it with ```npm start```.

### Usage
- Access the application through the frontend URL.
- Use the map to view gas stations and their prices.
- Toggle between regular and premium gas prices using the provided switch.
- Ask the AI assistant questions about gas prices through the chat interface.
