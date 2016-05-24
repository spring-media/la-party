"use strict";
var EventSystem_1 = require("./EventSystem");
var chai_1 = require("chai");
describe("EventSystem", function () {
    function sendEvents(name) {
        EventSystem_1.default.fireEvent(name, 1);
        EventSystem_1.default.fireEvent(name, 2);
        EventSystem_1.default.fireEvent(name, 3);
    }
    function receiveEvents(name, done) {
        var receivedEvents = 0;
        EventSystem_1.default.registerEventListener(name, function (obj) {
            receivedEvents++;
            chai_1.expect(obj).to.equal(receivedEvents);
            if (receivedEvents === 3) {
                done();
            }
        });
    }
    it("should send events to listener", function (done) {
        receiveEvents("test1", done);
        sendEvents("test1");
    });
    it("should replay events to late listener", function (done) {
        sendEvents("test2");
        receiveEvents("test2", done);
    });
    it("should limit number of events to replay", function (done) {
        for (var i = 1; i <= 101; i++) {
            EventSystem_1.default.fireEvent("test3", i);
        }
        var receivedEvents = 1;
        EventSystem_1.default.registerEventListener("test3", function (obj) {
            receivedEvents++;
            chai_1.expect(obj).to.equal(receivedEvents);
            if (receivedEvents === 100) {
                done();
            }
        });
    });
    it("should listen to event only once when 'once' option is set", function (done) {
        EventSystem_1.default.registerEventListener("test4", function () {
            done(); // if this is called multiple times than Jasmine throws error
        }, { once: true });
        EventSystem_1.default.fireEvent("test4");
        EventSystem_1.default.fireEvent("test4");
    });
    it("should not replay events when 'replay' option is not set", function (done) {
        EventSystem_1.default.fireEvent("test5");
        EventSystem_1.default.registerEventListener("test5", function () {
            done(); // if this is called multiple times than Jasmine throws error
        }, { replay: false });
        EventSystem_1.default.fireEvent("test5");
    });
});
//# sourceMappingURL=EventSystem.spec.js.map