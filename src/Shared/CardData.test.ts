import { CardData, Priority } from "./Card.types";
import { TaskTypes } from "./Task.types";

export const TestData: CardData[] = [
  {
    title: "test1",
    priority: Priority.IMPORTANT,
    status: TaskTypes.ONGOING,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
  {
    title: "test5",
    priority: Priority.CASUAL,
    status: TaskTypes.ONGOING,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
  {
    title: "test4",
    priority: Priority.CASUAL,
    status: TaskTypes.ONGOING,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
  {
    title: "test2",
    priority: Priority.CASUAL,
    status: TaskTypes.COMPLETED,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
  {
    title: "test3",
    priority: Priority.URGENT,
    status: TaskTypes.TODO,
    createdDate: new Date(Date.now()),
    DueDate: new Date(2024, 5, 3),
  },
];

export const dataForStyling: CardData = {
  title: "test1",
  priority: Priority.IMPORTANT,
  status: TaskTypes.ONGOING,  
  createdDate: new Date(Date.now()),
  DueDate: new Date(2024, 5, 3),
}
