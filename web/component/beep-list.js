import { LitElement, css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";
import "./beep-view.js";

export class BeepList extends BeeperBase {
  static properties = {
    beepList: {
      type: Array,
    },
  };

  /**
  static styles = [BeeperBase.styles, css``];
  */

  constructor() {
    super();
    this.beepList = [];
  }

  createRenderRoot() {
    return this;
  } 

  render() {
    return html`
      ${this.beepList.map(
        (b) => html`<beep-view beep="${JSON.stringify(b)}"></beep-view>`
      )}
    `;
  }
}
customElements.define("beep-list", BeepList);
