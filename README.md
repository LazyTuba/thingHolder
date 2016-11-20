# ThingHolder

## Description

ThingHolder object holds a tagged set of things.  As each thing is
added to the ThingHolder, the ThingHolder emits an 'add' event with
the tag name and length of the added thing.  The ThingHolder ignores
attempts to add things with invalid tags.  The contructor takes
an array of tags (strings) which represent the valid tags of
interest; when a thing for every valid tag has been received, the
collection is complete and the ThingHolder emits a 'complete' event
with a string announcing that fact.

## Usage


     var ThingHolder = require('./thingHolder');
     
     var tags = ['a', 'b', 'c'];
     var collector = new ThingHolder(tags);
     
     collector.on('add', function onAdd(ev) {
         console.log('Added something %s', ev);
     })
     
     collector.on('invalidTag', function onInvalidTag(ev) {
         console.log('Ignored attempt to add thing for invalid tag %s', ev);
     })
     
     collector.on('complete', function onComplete(ev) {
         console.log('Complete: %s', ev);
         console.log(JSON.stringify(collector.things, null, 2));
     })
     
     collector.add('a', "This is an A");
     collector.add('b', "This is an B");
     collector.add('d', "This is an D");
     collector.add('c', "This is an C");

