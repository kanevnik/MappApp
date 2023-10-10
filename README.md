# React Native Map App

A simple React Native application that displays a map with pins, providing detailed information upon tapping.

## 🚀 Getting Started

### Prerequisites

- Node.js
- React Native CLI
- Android Studio / Xcode
- Google Maps API Key

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/kanevnik/MappApp.git
   cd MappApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. **Important**: Search for `[API KEY]` throughout the project and replace it with your actual Google Maps API Key.

### Running the App

- For Android:
  ```sh
  npx react-native run-android
  ```
- For iOS:
  ```sh
  npx react-native run-ios
  ```

- In case of IOS run issue

   ```sh
   cd ios
   rm Podfile.lock
   pod deintegrate && pod install
   run react-native run-ios
   ```

## 🗺️ Usage

- **Explore**: Navigate the map to discover pins.
- **Details**: Tap a pin to view its detailed information.
- **Center**: Use the "Center" button in the details view to focus the map on the selected pin.

## 🛠️ Components

### MapComponent

Renders the map and manages pin visibility and interactions.

### PinDetails

Displays a detailed view of the selected pin.

## 🔄 Redux Store

### mapSlice

Manages the state of pins, grid, visible pins, and the selected pin.

## 📚 Utilities

### createGrid & getVisiblePins

Used for efficient pin management and retrieval based on geographical location and visibility.

## 🤝 Contribution

Feel free to open issues and pull requests!

## 📜 License

MIT License. See [LICENSE](LICENSE) for more information.
