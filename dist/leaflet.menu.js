/*
 * Leaflet.menu v0.1 2016-10-25
 *
 * (c) 2016 Yanze.Dai
 * daiyanze@gmail.com
 * http://www.phpheartland.com
 *
 * Lisence: MIT
 * 
 */


L.Control.LeafletMenu = L.Control.extend({

	options: {
		mapObject: undefined,
		layerSelector: undefined,
		menuItems: [],
	},

	statics: {
		BASE_CLASS: 'leaflet-menu',
	},

	initialize: function (map , options) {
		L.setOptions(this, options);
		var map_div_element = L.DomUtil.get(this.options.mapObject);
		this.visible = false;
		this.container;
		this.createMenu(map_div_element, this.menuItems);

		L.DomEvent
			.on(this.container, 'click', this._onMouseClick, this)
			.on(this.container, 'mouseover', this._onMouseOver, this)
			.on(this.container, 'mouseout', this._onMouseOut, this)
			.on(this.container, 'mousewheel', L.DomEvent.stop)
			// .on(this.container, 'click', L.DomEvent.stop)
			.on(this.container, 'mousedown', L.DomEvent.stop)
			.on(this.container, 'dblclick', L.DomEvent.stop)
			.on(this.container, 'contextmenu', L.DomEvent.stop);
	},

	createMenu: function (map_div_element, menuItems) {
		// Create menu container		
		var container = this.container = L.DomUtil.create('div', ('leaflet-menu'), map_div_element);
			container.style.position = 'absolute';
			container.style.('overflow-y') = 'auto';
			container.style.('overflow-x') = 'hidden';
		for (var i = 0; i <= menuItems.length - 1; i++) {
			var menu_item = L.DomUtil.create('a', ('leaflet-menu') + '-item', this.container);
				// menu_item.href = "#" + menuItems[i];
				menu_item.text = menuItems[i];
		}
	},

	removeMenu: function(){
		var menu_div = document.getElementById('menu');
		while (menu_div.firstChild){
			menu_div.removeChild(menu_div.firstChild);
		}
	},

	show: function () {
		var button_div = L.DomUtil.get('styles-menu').parentNode;
		var menu_margin_top = button_div.offsetTop;
		var menu_margin_left = button_div.offsetWidth + button_div.offsetLeft*2;
		if (!this.visible) {
			this.container.style.display = "block";
			this.container.style.margin = menu_margin_top + "px" + " auto auto " + menu_margin_left + "px";
			this.visible = true;
		} else {
			console.log("error on showing menu");
		}
	},

	hide: function () {
		if (this.visible) {
			this.container.style.display = "none";
			this.visible = false;
		} else {
			console.log("error on hiding menu");
		}
	},

	_clickEvent: function (target) {

		for (var item in this.menuItems) {

		}

		switch (target) {
			case this.menuItems[0]:
				this._toGPSTrackStyle();
			break;
			case this.menuItems[1]:
				this._toSensorDensityStyle();
			break;
			default:
			break;
		}
	},

	_onMouseOver: function (e) {
		L.DomUtil.addClass(e.target || e.srcElement, 'over');
	},

	_onMouseOut: function (e) {
		L.DomUtil.removeClass(e.target || e.src.Element, 'over');
	},

	_onMouseClick: function (e) {
		this._clickEvent(e.target.text);
	},

});

L.control.leafletmenu = function (map, options) {
	return new L.Control.LeafletMenu(map, options);
}