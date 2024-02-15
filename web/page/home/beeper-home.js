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
    mentionedUser: {
      state: true,
    }
  };

  constructor() {
    super();
    this.beepList = [];
    this.userName = "";
    this.taggedUser = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    const response = await fetch("/api/home");
    this.beepList = await response.json();

    this.userName = (await getActiveUserProfile()).name;
  }

  async handleMentionClick(mentionedUser) {
    //add a check that the tagged user is in the database
    window.location.href = '../user/${mentionedUser}';
  }

  async postBeep(event) {
    if (event.code === "Enter" && !event.getModifierState("Shift")) {
      const textarea = event.target;

      let content = textarea.value;
      content = content.slice(0, content.length - 1);

      const userMentions = content.match(/@(\w+)/g);
      if (userMentions) {
        console.log("User Mentions:", userMentions);
        this.mentionedUser = userMentions[0].substring(1);
      }

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

  render() {
    return html` <beeper-header></beeper-header>
      <h1>Welcome ${this.userName}!</h1>
      <p>Mentioned User: ${this.mentionedUser}</p>
      <textarea @keyup=${this.postBeep}></textarea>
      <beep-list @mention-click=${(e)} => this.hendleMentionClick(e.detail.mentionedUser)}
       beepList=${JSON.stringify(this.beepList)}
       ></beep-list>`;
  }

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
}

customElements.define("beeper-home", BeeperHome);
