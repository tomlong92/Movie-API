/*
	StorableData Constructor
*/

function StorableData(localStorageName) {
	this.data = [];
	this.storageName = localStorageName;
	this.load();
}

// _____________________________________________________________________________
// StorableData Array Methods 

StorableData.prototype.getLength = function(index) {
	return this.data.length;
};

StorableData.prototype.get = function(index) {
	return this.data[index];
};

StorableData.prototype.delete = function(index) {
	this.data.splice(index, 1);
	this.save();
};

StorableData.prototype.add = function(movieObject) {
	this.data.push(movieObject);
	this.save();
};

// _____________________________________________________________________________
// Local Storage Methods

StorableData.prototype.load = function() {
	var item = localStorage.getItem(this.storageName);
	if (item !== null) {
		this.data = JSON.parse(item);
	}
};

StorableData.prototype.save = function() {
	var stringModel = JSON.stringify(this.data);
	localStorage.setItem(this.storageName, stringModel);
};

StorableData.prototype.clear = function() {
	localStorage.clear();
	this.data = [];
};
