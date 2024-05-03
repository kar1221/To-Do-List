type CallbackFunction<T> = (args: T) => void;
type TransformFunction<T> = (args:T) => T;
type EventCallback<T> = T | TransformFunction<T>;

const Subscriber = (function () {
  const events: Record<string, CallbackFunction<any>[]> = {};

  function Subscribe<T>(event: string, callback: CallbackFunction<EventCallback<T>>) {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(callback);
  };

  function Unsubscribe<T>(event: string, callback: CallbackFunction<T>) {
    if (!events[event]) {
      return;
    }
    events[event] = events[event].filter((cb) => cb !== callback);
  };

  function Emit<T>(event: string, eventCallback: EventCallback<T>) {
    if (!events[event]) {
      return;
    }

    events[event].forEach((cb) => cb(eventCallback));
  };

  return {
    Subscribe,
    Unsubscribe,
    Emit
  };
})();

export default Subscriber;