import { TaskTypes } from "./Task.types"

export type CardData = {
  title: string,
  priority: Priority
  status: TaskTypes;
}

export enum Priority {
  CASUAL = "CASUAL",
  IMPORTANT = "IMPORTANT",
  URGENT = "URGENT"
}