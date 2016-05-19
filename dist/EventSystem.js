"use strict";
var eventemitter2_1 = require("eventemitter2");
var EventSystem = (function () {
    function EventSystem() {
    }
    EventSystem.fireEvent = function (eventName, args) {
        this.storeEvent(eventName, args);
        this.EMITTER.emit(eventName, args);
    };
    EventSystem.registerEventListener = function (eventName, handler) {
        this.EMITTER.on(eventName, handler);
        this.replayEvents(eventName, handler);
    };
    EventSystem.storeEvent = function (eventName, args) {
        var events = this.events[eventName];
        if (!events) {
            events = [];
            this.events[eventName] = events;
        }
        // limit size of each bucket to prevent problems
        if (events.length >= this.MAX_BUCKET_SIZE) {
            events.shift();
        }
        events.push(args);
    };
    EventSystem.replayEvents = function (eventName, handler) {
        var events = this.events[eventName];
        if (!events) {
            return;
        }
        events.forEach(function (args) { return handler(args); });
    };
    EventSystem.EMITTER = new eventemitter2_1.EventEmitter2();
    EventSystem.MAX_BUCKET_SIZE = 100;
    EventSystem.events = {};
    return EventSystem;
}());
exports.EventSystem = EventSystem;
//# sourceMappingURL=EventSystem.js.map