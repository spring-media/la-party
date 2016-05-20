import {default as EventSystem} from "./EventSystem";

import {expect} from "chai";

describe("EventSystem", (): any => {

    function sendEvents(name: string): void {
        EventSystem.fireEvent(name, 1);
        EventSystem.fireEvent(name, 2);
        EventSystem.fireEvent(name, 3);
    }

    function receiveEvents(name: string, done: Function): void {
        let receivedEvents: number = 0;

        EventSystem.registerEventListener(name, (obj: number) => {
            receivedEvents++;

            expect(obj).to.equal(receivedEvents);

            if (receivedEvents === 3) {
                done();
            }
        });
    }

    it("should send events to listener", (done: Function) => {
        receiveEvents("test1", done);
        sendEvents("test1");
    });

    it("should replay events to late listener", (done: Function) => {
        sendEvents("test2");
        receiveEvents("test2", done);
    });

    it("should limit number of events to replay", (done: Function) => {
        for (let i: number = 1; i <= 101; i++) {
            EventSystem.fireEvent("test3", i);
        }

        let receivedEvents: number = 1;
        EventSystem.registerEventListener("test3", (obj: number) => {
            receivedEvents++;
            expect(obj).to.equal(receivedEvents);
            if (receivedEvents === 100) {
                done();
            }
        });
    });

});
