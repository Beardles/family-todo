import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  username: text().notNull(),
  // TODO: Figure out the crypto package and properly secure password
  password: text().notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export enum TodoStatus {
  TODO,
  IN_PROGRESS,
  DONE,
}

export const todosTable = sqliteTable("todos", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  assigned_to: int("user_id")
    .$type<number | null>()
    .references(() => usersTable.id)
    .default(null),
  status: int().$type<TodoStatus>(),
});

export type InsertTodo = typeof todosTable.$inferInsert;
export type SelectTodo = typeof todosTable.$inferSelect;
