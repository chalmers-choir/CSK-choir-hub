import * as userModel from "@db/models/userModel";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import * as userService from "../usersService";

jest.mock("@db/models/userModel");

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a user if email and username are unique", async () => {
    (userModel.findByEmail as any).mockResolvedValue(null);
    (userModel.findByUsername as any).mockResolvedValue(null);

    const token = await userService.registerUser({
      email: "test@example.com",
      username: "tester",
      password: "pass",
      firstName: "Test",
      lastName: "User"
    });

    expect(token).toBeDefined();
  });
});
