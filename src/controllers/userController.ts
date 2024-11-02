import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { userService } from "@/services/userService";
import type { RequestHandler } from "express";

const getUsers: RequestHandler = async (_req, res) => {
  const serviceResponse = await userService.findAll();

  return handleServiceResponse(serviceResponse, res);
};

const getUser: RequestHandler = async (req, res) => {
  const id = Number.parseInt(req.params.id as string, 10);
  const serviceResponse = await userService.findById(id);

  return handleServiceResponse(serviceResponse, res);
};

const updateUser: RequestHandler = async (req, res) => {
  const id = Number.parseInt(req.params.id as string, 10);
  const data = req.body;
  const serviceResponse = await userService.update(id, data);

  return handleServiceResponse(serviceResponse, res);
};

export const userController = {
  getUsers,
  getUser,
  updateUser,
};
