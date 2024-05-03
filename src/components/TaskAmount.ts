import { IComponent } from "./Component.interface";
import { TaskTypes } from "@/Shared/Task.types";
import Subscriber from "@/Helpers/Subscriber";
import { tasksEvent } from "@/Shared/SubscribersEvents.Enum";

class TaskAmount implements IComponent {
  private TaskAmount: number;
  private TaskType: TaskTypes;
  private DOMReference: Record<string, HTMLElement> = {};


  constructor(taskAmount: number, taskType: TaskTypes) {
    this.TaskAmount = taskAmount;
    this.TaskType = taskType;

    Subscriber.Subscribe<number>(tasksEvent.ON_TASK_AMOUNT_INCREASED, (newState) => {
      if(typeof newState === "function")
        this.TaskAmount = newState(this.TaskAmount);
      else
        this.TaskAmount = newState;
      
      this.UpdateElement();
    });
  }

  ComputedElement(): HTMLElement {
    const iconString = TaskContainerInfo[this.TaskType].icon;
    const titleString = TaskContainerInfo[this.TaskType].title;

    const taskAmountContainer = document.createElement<"div">("div");
    taskAmountContainer.classList.add("task-amount-container");

    /* Title Container */
    const titleContainer = document.createElement<"div">("div");
    titleContainer.classList.add("titleContainer");

    const icon = document.createElement("iconify-icon");
    icon.setAttribute("icon", iconString);
    const title = document.createElement<"h2">("h2");
    title.textContent = titleString;

    titleContainer.appendChild(icon);
    titleContainer.appendChild(title);

    taskAmountContainer.appendChild(titleContainer);

    /* Tasks Amount Container */
    const tasksAmount = document.createElement<"p">("p");
    tasksAmount.textContent = this.TaskAmount.toString();

    const details = document.createElement<"span">("span");
    details.textContent = "items";
    details.classList.add("details");

    tasksAmount.appendChild(details);

    taskAmountContainer.appendChild(tasksAmount);

    this.DOMReference = {
      ...this.DOMReference,
      taskAmount: tasksAmount,
    };

    return taskAmountContainer;
  }
  UpdateElement(): void {
    if (!this.DOMReference) return;

    const tasksAmount = this.DOMReference.taskAmount;
    tasksAmount.textContent = this.TaskAmount.toString();
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
    backgroundColor: "var(--indingo-600)",
  },
  [TaskTypes.ONGOING]: {
    icon: "mdi:progress-clock",
    title: "Ongoing",
    backgroundColor: "var(--amber-600)",
  },
  [TaskTypes.COMPLETED]: {
    icon: "mdi:check",
    title: "Completed",
    backgroundColor: "var(--green-600)",
  },
};

export default TaskAmount;
