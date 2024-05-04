import { IComponent } from "./Component.interface";
import { TaskTypes } from "@/Shared/Task.types";
import { CardData } from "@/Shared/Card.types";
import Subscriber from "@/Helpers/Subscriber";
import { StorageEvent } from "@/Shared/SubscribersEvents.Enum";
import MyStorageManager from "@/Helpers/StorageManager";
import "./TaskAmount.css";

class TaskAmount implements IComponent {
  private TaskType: TaskTypes;
  private DOMReference: Record<string, HTMLElement> = {};

  constructor(taskType: TaskTypes) {
    this.TaskType = taskType;

    this.setupSubscription();
  }

  private setupSubscription() {
    Subscriber.Subscribe<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, (data) => {
      if (typeof data === "function") return;
      this.UpdateElement(data);
    });
  }

  ComputedElement(): HTMLElement {
    const iconString = TaskContainerInfo[this.TaskType].icon;
    const titleString = TaskContainerInfo[this.TaskType].title;
    const backgroundColor = TaskContainerInfo[this.TaskType].backgroundColor;

    const taskAmountContainer = document.createElement<"div">("div");
    taskAmountContainer.classList.add("task-amount-container");
    taskAmountContainer.style.background = `var(--${backgroundColor}-600)`;

    /* Title Container */
    const titleContainer = document.createElement<"div">("div");
    titleContainer.classList.add("title-container");

    const icon = document.createElement("iconify-icon");
    icon.setAttribute("icon", iconString);
    const title = document.createElement<"h2">("h2");
    title.textContent = titleString;

    titleContainer.appendChild(icon);
    titleContainer.appendChild(title);

    taskAmountContainer.appendChild(titleContainer);

    /* Tasks Amount Container */
    const itemsContainer = document.createElement<"div">("div");
    itemsContainer.classList.add("items-container");

    const tasksAmount = document.createElement<"p">("p");
    tasksAmount.innerHTML = "0"

    const details = document.createElement<"span">("span");
    details.textContent = "items";
    details.classList.add("details");
    details.style.color = `var(--${backgroundColor}-400)`;

    itemsContainer.appendChild(tasksAmount);
    itemsContainer.appendChild(details);

    taskAmountContainer.appendChild(itemsContainer);

    this.DOMReference = {
      ...this.DOMReference,
      tasksAmount,
    };

    this.UpdateElement(MyStorageManager.GetItems());

    return taskAmountContainer;
  }

  private CalculateTasksAmount(cardData: CardData[]): number {
    return cardData.filter((card) => card.status === this.TaskType).length;
  }

  UpdateElement(cardData: CardData[]): void {
    if (!this.DOMReference) return;

    const TaskAmount = this.CalculateTasksAmount(cardData);

    const tasksAmount = this.DOMReference.tasksAmount;
    tasksAmount.textContent = TaskAmount.toString();
  }
}

type TaskContainerInfoArgs = {
  [key in TaskTypes]: {
    icon: string;
    title: string;
    backgroundColor: string;
  };
};

const TaskContainerInfo: TaskContainerInfoArgs = {
  [TaskTypes.TODO]: {
    icon: "mdi:new-box",
    title: "To Do",
    backgroundColor: "indingo",
  },
  [TaskTypes.ONGOING]: {
    icon: "mdi:progress-clock",
    title: "Ongoing",
    backgroundColor: "amber",
  },
  [TaskTypes.COMPLETED]: {
    icon: "mdi:check",
    title: "Completed",
    backgroundColor: "green",
  },
};

export default TaskAmount;
