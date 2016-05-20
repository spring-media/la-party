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
});
//# sourceMappingURL=EventSystem.spec.js.map