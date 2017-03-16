# GoogleMaps

## Example

```html
  <div id="gmap_canvas" style="height: 500px;"> </div>
```

```js
  $('#gmap_canvas').googleMaps({
    byAddress: true,
    lat: "-31.376869",
    long: "138.449499",
    markerIcon: '../img/icons/pointer-blue.png',
    draggable: true,
    zoom: 12,
    locations: [
      {
        lat: "-31.376869",
        long: "138.449499",
        title: "Ikara-Flinders Ranges National Park",
        address: "Blinman SA 5730, Australia"
      }
    ],
    zoom: 16
  });
```