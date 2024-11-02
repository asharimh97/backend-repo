import { ServiceResponse } from "@/common/models/serviceResponse";
import type { User } from "@/entities/user";
import { userRepository } from "@/repositories/userCollection";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";

// Create service functions
const findAll = async (): Promise<ServiceResponse<User[] | null>> => {
  try {
    const users = await userRepository.findAllAsync();
    if (!users || users.length === 0) {
      return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND);
    }
    return ServiceResponse.success<User[]>("Users found", users);
  } catch (ex) {
    const errorMessage = `Error finding all users: $${(ex as Error).message}`;
    logger.error(errorMessage);
    return ServiceResponse.failure(
      "An error occurred while retrieving users.",
      null,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

const findById = async (id: number): Promise<ServiceResponse<User | null>> => {
  try {
    const user = await userRepository.findByIdAsync(id);
    if (!user) {
      return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
    }
    return ServiceResponse.success<User>("User found", user);
  } catch (ex) {
    const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
    logger.error(errorMessage);
    return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const update = async (id: number, data: User): Promise<ServiceResponse<User | null>> => {
  try {
    const user = await userRepository.updateAsync(id, data);
    if (!user) {
      return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
    }
    return ServiceResponse.success<User>("User updated", user);
  } catch (ex) {
    const errorMessage = `Error updating user with id ${id}:, ${(ex as Error).message}`;
    logger.error(errorMessage);
    return ServiceResponse.failure("An error occurred while updating user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// Export the service object
export const userService = {
  findAll,
  findById,
  update
};