import { createUser, findUserByEmail, findUserByUsername } from "@db/models";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import * as userService from "../userService";

jest.mock("@db/models/userModel");

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a user if email and username are unique", async () => {
    (findUserByEmail as any).mockResolvedValue(null);
    (findUserByUsername as any).mockResolvedValue(null);
    (createUser as any).mockResolvedValue({
      id: 1,
      email: "test@example.com",
    });

    const token = await userService.registerUser({
      email: "test@example.com",
      username: "tester",
      password: "pass",
      firstName: "Test",
      lastName: "User",
      choir: "KK",
      voice: "A1",
    });

    expect(token);
  });
});
