const EventEmitter = require('events').EventEmitter;
const util = require('util');

//  ThingHolder object holds a tagged set of things.  As each thing is
//  added to the ThingHolder, the ThingHolder emits an 'add' event with
//  the tag name and length of the added thing.  The ThingHolder ignores
//  attempts to add things with invalid tags.  The contructor takes
//  an array of tags (strings) which represent the valid tags of
//  interest; when a thing for every valid tag has been received, the
//  collection is complete and the ThingHolder emits a 'complete' event
//  with a string announcing that fact.

function ThingHolder(validTags) {
    EventEmitter.call(this);
    this.validTags = validTags;
    this.things = {};
    
    validTags.forEach((tag) => {
	this.things[tag] = null;
    });
}

util.inherits(ThingHolder, EventEmitter);

// Check if all sets have been collected
ThingHolder.prototype.isComplete = function isComplete() {
    resp = true;
    this.validTags.forEach(
	(tag) => {
	    if (this.things[tag] == null) {
		resp = false;
		return resp;
	    }
	}
    );
    return resp;
}

// Add to the ThingHolder a thing to associate with a tag
ThingHolder.prototype.add = function(tag, thing) {
    if (this.validTags.indexOf(tag) > -1) {
	this.things[tag] = thing;
	this.emit('add', "(" + thing.length + ") " + tag);
	if (this.isComplete()) {
	    this.emit('complete', 'ThingHolder has received all things');
	}
    } else {
	this.emit('invalidTag', "(" + thing.length + ") " + tag);
    }
};

// Returns the thing for particular tag
ThingHolder.prototype.thing = function(tag) {
    if (tag in this.things) {
	return this.things[tag];
    } else {
	return null;
    }
};

module.exports = ThingHolder;
