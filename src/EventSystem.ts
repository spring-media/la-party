import { EventEmitter2 as EventEmitter } from "eventemitter2";

export default class EventSystem {

    private static EMITTER: EventEmitter = new EventEmitter();

    private static MAX_BUCKET_SIZE: number = 100;

    private static events: {[index: string]: Object[]} = {};

    public static fireEvent(eventName: string, args?: Object): void {
        this.storeEvent(eventName, args);
        this.EMITTER.emit(eventName, args);
    }

    public static registerEventListener(eventName: string, handler: Function,
                                        options: EventListenerOptions = { replay: true, once: false }): void {
        if (options.once) {
            this.EMITTER.once(eventName, handler);
        } else {
            this.EMITTER.on(eventName, handler);
        }

        if (options.replay) {
            this.replayEvents(eventName, handler);
        }
    }

    private static storeEvent(eventName: string, args: Object): void {
        let events: Object[] = this.events[eventName];

        if (!events) {
            events = [];
            this.events[eventName] = events;
        }

        // limit size of each bucket to prevent problems
        if (events.length >= this.MAX_BUCKET_SIZE) {
            events.shift();
        }

        events.push(args);
    }

    private static replayEvents(eventName: string, handler: Function): void {
        const events: Object[] = this.events[eventName];
        if (!events) {
            return;
        }
        events.forEach((args: Object) => handler(args));
    }

}

export interface EventListenerOptions {

    replay?: boolean;
    once?: boolean;

}
