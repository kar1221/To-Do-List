import { IComponent } from "./Component.interface";

type ButtonArgs = {
  onClick: () => void;
  text: string;
  icon?: string;
};

class Button implements IComponent {
  private onClick: () => void;
  private text: string;
  private icon?: string;

  constructor(arg: ButtonArgs) {
    this.onClick = arg.onClick;
    this.text = arg.text;
    this.icon = arg.icon;
  }

  ComputedElement(): HTMLElement {
    const button = document.createElement<"button">("button");
    button.classList.add("button");
    button.textContent = this.text;

    if (this.icon) {
      const icon = document.createElement<"iconify-icon">("iconify-icon");
      icon.setAttribute("icon", this.icon);
      button.appendChild(icon);
    }

    button.addEventListener("click", () => {
      this.onClick();
    });

    return button;
  }

  UpdateElement(): void {}
}

export default Button;
