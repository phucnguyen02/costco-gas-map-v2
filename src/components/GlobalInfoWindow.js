// Create a global variable to hold the currently open InfoWindow.
let currentInfoWindow = null;

export function setCurrentInfoWindow(infoWindow) {
    // Update this variable whenever a new InfoWindow is opened.
    if (currentInfoWindow) {
        // Close the previous InfoWindow before opening a new one.

        currentInfoWindow.close();
    }
    currentInfoWindow = infoWindow;
}