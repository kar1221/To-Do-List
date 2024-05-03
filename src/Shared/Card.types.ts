import { TaskTypes } from "./Task.types";

export type CardData = {
  title: string;
  createdDate: Date;
  DueDate: Date;
  priority: Priority;
  status: TaskTypes;
};

export enum Priority {
  CASUAL = "CASUAL",
  IMPORTANT = "IMPORTANT",
  URGENT = "URGENT",
}
