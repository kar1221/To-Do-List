import { TaskTypes } from "@/Shared/Task.types";
import { IComponent } from "./Component.interface";
import { Priority, CardData } from "@/Shared/Card.types";
import {v4 as uuidv4} from "uuid";
import MyStorageManager from "@/Helpers/StorageManager";
import "./InputCard.css";

class InputCard implements IComponent {
  UpdateElement(): void {}

  ComputedElement(): HTMLElement {
    const container = document.createElement<"div">("div");
    container.className = "input-card-container";

    const taskTitle = document.createElement<"input">("input");
    taskTitle.type = "text";
    taskTitle.placeholder = "Task Title";
    taskTitle.ariaLabel = "Task Title";
    taskTitle.required = true;
    taskTitle.ariaRequired = "true";
    container.appendChild(taskTitle);

    const datesContainer = document.createElement<"div">("div");

    const dateInput = document.createElement<"input">("input");
    dateInput.type = "date";
    dateInput.required = true;
    dateInput.ariaRequired = "true";
    const dateLabel = document.createElement<"label">("label");
    const dueDateIcon = document.createElement("iconify-icon");
    dateInput.ariaLabel = "Due Date";
    dueDateIcon.setAttribute("icon", "mdi:calendar-remove");
    dateLabel.appendChild(dueDateIcon);
    
    datesContainer.appendChild(dateLabel);
    datesContainer.appendChild(dateInput);
    datesContainer.classList.add("date-container");

    container.appendChild(datesContainer);

    const fieldSet = document.createElement<"fieldset">("fieldset");
    const containerOne = document.createElement<"div">("div");
    const containerTwo = document.createElement<"div">("div");
    const containerThree = document.createElement<"div">("div");

    const casual = document.createElement<"input">("input");
    casual.type = "radio";
    casual.value = Priority.CASUAL;
    casual.id = "casual";
    casual.required = true;
    casual.ariaRequired = "true";
    const labelCasual = document.createElement<"label">("label");
    labelCasual.textContent = "Casual";
    labelCasual.htmlFor = "casual";
    casual.checked = true;
    casual.name = "priority";
    containerOne.appendChild(casual);
    containerOne.appendChild(labelCasual);

    const important = document.createElement<"input">("input");
    important.type = "radio";
    important.value = Priority.IMPORTANT;
    important.id = "important";
    important.required = true;
    important.ariaRequired = "true";
    const labelImportant = document.createElement<"label">("label");
    labelImportant.textContent = "Important";
    labelImportant.htmlFor = "important";
    important.name = "priority";
    containerTwo.appendChild(important);
    containerTwo.appendChild(labelImportant);

    const urgent = document.createElement<"input">("input");
    urgent.type = "radio";
    urgent.value = Priority.URGENT;
    urgent.id = "urgent";
    urgent.required = true;
    urgent.ariaRequired = "true";
    const labelUrgent = document.createElement<"label">("label");
    labelUrgent.textContent = "Urgent";
    labelUrgent.htmlFor = "urgent";
    urgent.name = "priority";
    containerThree.appendChild(urgent);
    containerThree.appendChild(labelUrgent);

    fieldSet.appendChild(containerOne);
    fieldSet.appendChild(containerTwo);
    fieldSet.appendChild(containerThree);    

    container.appendChild(fieldSet);

    const buttonContainer = document.createElement<"div">("div");
    buttonContainer.classList.add("button-container");

    const button = document.createElement<"button">("button");
    button.textContent = "Add";
    buttonContainer.appendChild(button);

    const cancelButton = document.createElement<"button">("button");
    cancelButton.textContent = "Cancel";
    buttonContainer.appendChild(cancelButton);

    container.appendChild(buttonContainer);
      
    button.addEventListener("click", () => {
      const uuid = uuidv4();
      const title = taskTitle.value;
      const dueDate = new Date(dateInput.value);
      const priority = fieldSet.querySelector<HTMLInputElement>('input[type="radio"]:checked')?.value;

      if (!title || !dueDate || !priority) {
        return;
      }

      const cardData: CardData = {
        uuid,
        title,
        createdDate: new Date(),
        DueDate: dueDate,
        priority: priority as Priority,
        status: TaskTypes.TODO,
      };

      MyStorageManager.AddItems(cardData);
      container.remove();
    });

    cancelButton.addEventListener("click", () => {
      container.remove();
    });


    return container;
  }
}

export default InputCard;
