import { css, html } from "lit";
import { BeeperBase } from "../../component/beeper-base.js";
import "../../component/beeper-header.js";
import "../../component/beep-list.js";
import { getActiveUserProfile } from "../../util/active-user-profile.js";

class BeeperHome extends BeeperBase {
  static properties = {
    userName: {
      state: true,
    },
    beepList: {
      state: true,
    },
  };

  constructor() {
    super();
    this.beepList = [];
    this.userName = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    const response = await fetch("/api/home");
    this.beepList = await response.json();

    this.userName = (await getActiveUserProfile()).name;
  }

  async postBeep(event) {
    if (event.code === "Enter" && !event.getModifierState("Shift")) {
      const textarea = event.target;

      let content = textarea.value;
      content = content.slice(0, content.length - 1);

      const response = await fetch("/api/beep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      });

      const postedBeep = await response.json();

      textarea.value = "";

      this.beepList = [postedBeep, ...this.beepList];
    }
  }

  createRenderRoot() {
    return this;
  } 

  render() {
    return html` <beeper-header></beeper-header>
      <div class = "container bg-primary bg-gradient"> 
        <font color="#FFFFFF">
        <h1>  
        Welcome ${this.userName}!
        </h1>
        </font>
      <br>
      <div id = "post" class = "container">
        <br>
        <textarea @keyup= ${this.postBeep} class="form-control" id="postInput" rows="3" placeholder="What's up?" ></textarea>
          <div class = "d-grid gap-2 d-md-flex justify-content-md-end container">
            <br>
            <button id = "post-button" class="btn btn-light" type="submit" @click= ${this.postBeep}>Post</button>
          </div>
          <hr>
      </div>  
      <div class>
        <br>
      ${this.beepList.map(
        (b) => html`<beep-view beep="${JSON.stringify(b)}"></beep-view>`
      )} 
      </div>
    </div>`;
  }

  /**
  static styles = [
    BeeperBase.styles,
    css`
      textarea {
        width: 100%;
        height: 64px;
        margin: 10px 0 20px 0;
      }
    `,
  ];
  */
}

customElements.define("beeper-home", BeeperHome);
