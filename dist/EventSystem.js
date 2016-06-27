"use strict";
var eventemitter2_1 = require("eventemitter2");
var EventSystem = (function () {
    function EventSystem() {
    }
    EventSystem.fireEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.storeEvent.apply(this, [eventName].concat(args));
        (_a = this.EMITTER).emit.apply(_a, [eventName].concat(args));
        var _a;
    };
    EventSystem.registerEventListener = function (eventName, handler, options) {
        if (options === void 0) { options = { replay: true, once: false }; }
        if (options.once) {
            this.EMITTER.once(eventName, handler);
        }
        else {
            this.EMITTER.on(eventName, handler);
        }
        if (options.replay) {
            this.replayEvents(eventName, handler);
        }
    };
    EventSystem.storeEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
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
        events.forEach(function (args) { return handler.apply(void 0, args); });
    };
    EventSystem.EMITTER = new eventemitter2_1.EventEmitter2();
    EventSystem.MAX_BUCKET_SIZE = 100;
    EventSystem.events = {};
    return EventSystem;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventSystem;
//# sourceMappingURL=EventSystem.js.map