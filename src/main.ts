// Modules
import "iconify-icon";
// Components
// Types
import { TaskTypes } from "./Shared/Task.types";
// Styles
import "./css-reset.css";
import "./main.css";
import Column from "./components/Column";

const main = document.querySelector("#main");

const column = new Column(TaskTypes.TODO);
main!.appendChild(column.ComputedElement());
const column2 = new Column(TaskTypes.ONGOING);
main!.appendChild(column2.ComputedElement());
const column3 = new Column(TaskTypes.COMPLETED);
main!.appendChild(column3.ComputedElement());


