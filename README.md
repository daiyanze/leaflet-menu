# leaflet-menu
Menu for leaflet map. Works well together with [Easy Button](https://github.com/CliffCloud/Leaflet.EasyButton).
This menu style is created and modified based on [Leaflet.contextmenu (by aratcliffe)](https://github.com/aratcliffe/Leaflet.contextmenu).(Thank you aratcliffe!)

## Demo ( [Click me to see demo](https://daiyanze.github.io/leaflet-menu/demo/index.html) )
![alt text](https://github.com/daiyanze/leaflet-menu/blob/master/demo/demo.png "Demo Screen Shot")

## How to download/install
#### Bower
```shell
bower install --save Leaflet.Menu
```
#### Copy Paste
[leaflet.menu.js](https://raw.githubusercontent.com/daiyanze/leaflet-menu/master/src/leaflet.menu.js)

[leaflet.menu.css](https://raw.githubusercontent.com/daiyanze/leaflet-menu/master/src/leaflet.menu.css)

## How to start

1. Add leaflet.menu.min.css and leaflet.menu.min.js (Load leaflet.js first)
	```html
	<link rel="stylesheet" href="../src/leaflet.menu.css"></link>

	<script src="some_path/leaflet.js"></script>
	<script src="some_path/leaflet.menu.js"></script>
	```html
2. Write code
    ```javascript
    var map = L.map('map').setView([35, 139.7]);
    var menu = L.leafletMenu(map, {
            items: {
                AlertCenterLocation: {
                    onClick: function () {
                        alert(map.getCenter().toString());
                    },
                },
            }
    });
    var menuButton = L.easyButton({
        states: [{
            stateName: 'show-menu',
            icon: 'fa fa-tasks',
            title: 'Show Menu',
            onClick: function (btn, map) {
                menu.options.button = btn;
                menu.show();
                btn.state('hide-menu');
            }
        },{
            stateName: 'hide-menu',
            icon: 'fa fa-tasks',
            title: 'Hide Menu',
            onClick: function (btn, map) {
                menu.hide();
                btn.state('show-menu');
            }
        }],
        id: 'styles-menu',
    });
    menuButton.addTo(map);
    ```

3. Have fun with it

## Methods
#### Initialize Menu Object
```javascript
// LeafletMap : The leaflet map object
// Options : The options for menu
var menu = L.leafletMenu(LeafletMap, Options)
```
#### Show Menu
```javascript
menu.show()
```
#### Hide Menu
```javascript
menu.hide()
```
#### Remove Menu Div Element
```javascript
menu.removeMenu()
```
## Options
| Property | Type | Description
| --- | --- | ---
| mapID | String | The Leaflet map element ID.
| items | Object | The items that you want to add to menu.
| button | Object | The [Easy Button](https://github.com/CliffCloud/Leaflet.EasyButton) object.

#### Options > items
| Property | Type | Description
| --- | --- | ---
| [Menu item] | Object | The Menu Item

Example:
(The property under your item should be either 'href' or 'Onclick'. It throws an error if you use both)
```javascript
items: {
    GoToGoogle: function(){
        href: 'http://www.google.com',
},
    AlertMeSomething: function(){
        Onclick: alert('Something');
}
}
```
