import { validateOrFail } from "./fp";

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
