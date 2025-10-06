import { renderHook } from "@testing-library/react";
import { usePersistence } from "./usePersistence.ts";
import { useState } from "react";
import { beforeEach } from "vitest";

describe("usePersistence()", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should persist data", () => {
    const setItemSpy = vi.spyOn(localStorage, "setItem");
    renderHook(() => {
      const [data, setData] = useState(true);

      usePersistence("test-key", data, setData);
    });
    expect(setItemSpy).toHaveBeenCalledWith("test-key", "true");
  });

  it("should rehydrate data", () => {
    localStorage.setItem("test-key", "true");
    const setData = vi.fn();
    renderHook(() => {
      usePersistence("test-key", false, setData);
    });
    expect(setData).toHaveBeenCalledWith(true);
  });
});
