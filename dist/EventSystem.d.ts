export default class EventSystem {
    private static EMITTER;
    private static MAX_BUCKET_SIZE;
    private static events;
    static fireEvent(eventName: string, args?: Object): void;
    static registerEventListener(eventName: string, handler: Function, options?: EventListenerOptions): void;
    private static storeEvent(eventName, args);
    private static replayEvents(eventName, handler);
}
export interface EventListenerOptions {
    replay?: boolean;
    once?: boolean;
}
