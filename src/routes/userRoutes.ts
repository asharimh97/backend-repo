import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { userController } from "@/controllers/userController";
import { UserSchema } from "@/entities/user";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRouter.get("/", userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  responses: createApiResponse(UserSchema, "Success"),
});

userRouter.get("/:id", userController.getUser);

userRegistry.registerPath({
  method: "put",
  path: "/users/{id}",
  tags: ["User"],
  responses: createApiResponse(UserSchema, "Success"),
});

userRouter.put("/:id", userController.updateUser);