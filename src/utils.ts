import { ZodError } from "zod";

import { TodoStatus } from "./db/schema.ts";

export const getStatusText = (status: TodoStatus): string => {
  switch (status) {
    case TodoStatus.IN_PROGRESS:
      return "In Progress";
    case TodoStatus.DONE:
      return "Done";
    default:
      return "Todo";
  }
};

export const getFormData = (data: URLSearchParams) => {
  const obj: { [key: string]: string | number | boolean | null } = {};

  for (const [key, value] of data.entries()) {
    obj[key] = value;
  }

  return obj;
};
