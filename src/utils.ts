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
