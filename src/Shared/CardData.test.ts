import { CardData, Priority } from "./Card.types";
import { TaskTypes } from "./Task.types";
import { v4 as uuidv4 } from "uuid";

export const TestData: CardData[] = [
  {
    uuid: uuidv4(),
    title: "test1",
    priority: Priority.IMPORTANT,
    status: TaskTypes.ONGOING,
    createdDate: new Date(2023, 5, 3),
    DueDate: new Date(2024, 5, 3),
  },
  {
    uuid: uuidv4(),
    title: "test5",
    priority: Priority.CASUAL,
    status: TaskTypes.ONGOING,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
  {
    uuid: uuidv4(),
    title: "test4",
    priority: Priority.CASUAL,
    status: TaskTypes.ONGOING,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
  {
    uuid: uuidv4(),
    title: "test2",
    priority: Priority.CASUAL,
    status: TaskTypes.COMPLETED,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
  {
    uuid: uuidv4(),
    title: "test3",
    priority: Priority.URGENT,
    status: TaskTypes.TODO,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
];

