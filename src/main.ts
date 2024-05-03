import "iconify-icon";
import "./css-reset.css"
import "./style.css";
import TaskAmount from "./components/TaskAmount";
import { TaskTypes } from "./Shared/Task.types";
import Subscriber from "./Helpers/Subscriber";
import { tasksEvent } from "./Shared/SubscribersEvents.Enum";

const main = document.querySelector("#main");

const taskAmount = new TaskAmount(0, TaskTypes.TODO);

main!.appendChild(taskAmount.ComputedElement());

Subscriber.Emit(tasksEvent.ON_TASK_AMOUNT_INCREASED, 2);
Subscriber.Emit<number>(tasksEvent.ON_TASK_AMOUNT_INCREASED, prev => prev + 1);
