import { liftP, validateOrFail } from "./fp";

describe("liftP", () => {
  describe("addP", () => {
    let addP: (x: Promise<number>, y: Promise<number>) => Promise<number>;
    beforeEach(() => {
      const add = (x: number, y: number) => x + y;
      addP = liftP(add);
    });

    it("should add 2 promises", async () => {
      const actual = await addP(Promise.resolve(2), Promise.resolve(3));
      const expected = 5;
      expect(actual).toEqual(expected);
    });
  });
});

describe("validateOrFail", () => {
  describe("validateBoolean", () => {
    let validateBoolean: (x: boolean) => void;
    beforeEach(() => {
      validateBoolean = validateOrFail(Boolean, () => new Error("Oops!"));
    });

    it("should not throw on success", async () => {
      validateBoolean(true);
    });

    it("should throw on failure", async () => {
      expect(() => validateBoolean(false)).toThrowError(new Error("Oops!"));
    });
  });
});
