import { DateParser } from ".";

describe("DateParser.getPreviousMonthName", () => {
  let originalDate: DateConstructor;

  beforeEach(() => {
    originalDate = global.Date;
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  test("should return previous month name in Portuguese", () => {
    // Mock date to May 2023
    const mockDate = new Date(2023, 4, 15);
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    } as DateConstructor;

    const result = DateParser.getPreviousMonthName();
    expect(result).toBe("abr");
  });

  test("should handle year boundary (January -> December)", () => {
    // Mock date to January 2023
    const mockDate = new Date(2023, 0, 15);
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    } as DateConstructor;

    const result = DateParser.getPreviousMonthName();
    expect(result).toBe("dez");
  });

  test("should handle standard month transition (December -> November)", () => {
    // Mock date to December 2023
    const mockDate = new Date(2023, 11, 15);
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    } as DateConstructor;

    const result = DateParser.getPreviousMonthName();
    expect(result).toBe("nov");
  });
});
