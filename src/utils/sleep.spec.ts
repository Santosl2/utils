import { delay } from "./sleep";

describe("delay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should resolve after the specified time", async () => {
    const startTime = Date.now();
    const delayPromise = delay(1000);

    jest.advanceTimersByTime(1000);
    await delayPromise;

    // Since we're using fake timers, we can't accurately measure real elapsed time
    // Instead, verify that the promise resolved after we advanced the timer
    expect(jest.getTimerCount()).toBe(0);
  });

  it("should not resolve before the specified time", async () => {
    const callback = jest.fn();
    delay(1000).then(callback);

    jest.advanceTimersByTime(500);
    await Promise.resolve(); // Allow any pending promises to resolve

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    await Promise.resolve(); // Allow any pending promises to resolve

    expect(callback).toHaveBeenCalled();
  });

  it("should handle zero milliseconds delay", async () => {
    const callback = jest.fn();
    delay(0).then(callback);

    jest.advanceTimersByTime(0);
    await Promise.resolve(); // Allow any pending promises to resolve

    expect(callback).toHaveBeenCalled();
  });

  it("should handle negative milliseconds as zero", async () => {
    const callback = jest.fn();
    delay(-100).then(callback);

    jest.advanceTimersByTime(0);
    await Promise.resolve(); // Allow any pending promises to resolve

    expect(callback).toHaveBeenCalled();
  });
});
