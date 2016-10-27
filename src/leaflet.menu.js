/*
 * Leaflet.menu v0.3 2016-10-26
 *
 * (c) 2016 Yanze.Dai
 * daiyanze@gmail.com
 * Facebook : https://www.facebook.com/yanze.dai
 * Lisence: MIT
 * 
 */


L.Control.LeafletMenu = L.Control.extend({

	options: {
		mapId: 'map',
		items: [],
		button: undefined,
	},

	statics: {
		CLASS : 'leaflet-menu',
		OverFlow_Y: 'overflow-y',
		OverFlow_X: 'overflow-x',
	},

	initialize: function (map , options) {
		L.setOptions(this, options);
		this.map = map;
		this.menuItem = [];
		this.menu_div = L.DomUtil.create('div','menu',document.getElementById(this.options.mapId));
		this.container();

		L.DomEvent
			.on(this.container, 'click', this._onMouseClick, this)
			.on(this.container, 'mouseover', this._onMouseOver, this)
			.on(this.container, 'mouseout', this._onMouseOut, this)
			.on(this.container, 'mousewheel', L.DomEvent.stop)
			.on(this.container, 'mousedown', L.DomEvent.stop)
			.on(this.container, 'dblclick', L.DomEvent.stop)
			.on(this.container, 'contextmenu', L.DomEvent.stop)
			.on(window, 'click', this.hide, this);
	},

	container: function () {
		this.container = L.DomUtil.create('div', L.Control.LeafletMenu.CLASS, this.menu_div);
		this.container.style.position = 'absolute';
		this.container.style.OverFlow_Y = 'auto';
		this.container.style.OverFlow_X = 'hidden';
		return this;
	},

	createMenu: function () {
		var button_div = L.DomUtil.get('styles-menu').parentNode;
		var menu_margin_top = button_div.offsetTop;
		var menu_margin_left = button_div.offsetWidth + button_div.offsetLeft*2;
		this.container.style.margin = menu_margin_top + "px" + " auto auto " + menu_margin_left + "px";
		this._removeItems()._createItems();
		return this;
	},

	removeMenu: function(){
		while (this.menu_div.firstChild){
			this.menu_div.removeChild(this.menu_div.firstChild);
		}
	},

	_createItems: function () {
		var itemObj = this.options.items;
		var items = Object.keys(itemObj);
		for (var i = 0; i <= items.length - 1; i++) {
			this.menuItem[i] = L.DomUtil.create('a', 'leaflet-menu-item', this.container);
			this.menuItem[i].text = items[i];
			if (!itemObj[items[i]].onClick) {
				this.menuItem[i].href = itemObj[items[i]].href;
			} else if (itemObj[items[i]].onClick && itemObj[items[i]].href) {
				throw 'Menu item could not be clickable and redirectable at the same time';
			} 
		}
		return this;
	},

	_removeItems: function () {
		while (this.container.firstChild){
			this.container.removeChild(this.container.firstChild);
		}
		return this;
	},

	show: function () {
		try {
			this.createMenu();
			this.container.style.display = "block";
			if (this.options.button) {
				this.options.button.state('hide-menu');
			}
		} 
		catch (e) {
			console.log('Error(show-menu): \n' + e);
		}
	},

	hide: function () {
		try {
			this.container.style.display = "none";
			if (this.options.button) {
				this.options.button.state('show-menu');
			}
		} 
		catch (e) {
			console.log('Error(hide-menu): \n' + e);
		}
	},

	_itemFunc: function (target) {
		if (!this.options.items[target].href) {
			if (!this.target) {
				this.target = this.options.items[target].onClick(arguments);
			} else if (this.target && this.target._map) {
				try {
					this.map.removeLayer(this.target);
					this.target = undefined;
				}
				catch (e) {
					console.log("Error(Removing target): \n" + e);
				}
			} else {
				throw "Sorry, there could be some error with your function";
			}
		} else {
			return this;
		}
	},

	_onMouseOver: function (e) {
		L.DomUtil.addClass(e.target || e.srcElement, 'over');
	},

	_onMouseOut: function (e) {
		L.DomUtil.removeClass(e.target || e.src.Element, 'over');
	},

	_onMouseClick: function (e) {
		this._itemFunc(e.target.text);
	},

});

L.leafletMenu = function (map, options) {
	return new L.Control.LeafletMenu(map, options);
}