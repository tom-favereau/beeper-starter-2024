import { css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";

export class BeepView extends BeeperBase {
  static properties = {
    beep: {
      type: Object,
    },
  };

  constructor() {
    super();
  }

  async handleLike() {
    if (this.beep.liked) {
      await fetch(`/api/unlike/${this.beep.id}`, {
        method: "PUT",
      });
      this.beep = {
        ...this.beep,
        liked: false,
        likeCount: this.beep.likeCount - 1,
      };
    } else {
      await fetch(`/api/like/${this.beep.id}`, {
        method: "PUT",
      });
      this.beep = {
        ...this.beep,
        liked: true,
        likeCount: this.beep.likeCount + 1,
      };
    }
  }

  render() {
    return html` <div class="beep">
      <div class="beep-header">
        <img
          src="${this.beep.authorPicture}"
          alt="Profile picture of ${this.beep.authorName}"
          class="author-profile-picture"
        />
        <div>
          <a class="author" href="/user/${this.beep.authorName}">
            ${this.beep.authorName}
          </a>
          <span class="created-at">
            &nbsp;- ${new Date(this.beep.createdAt).toLocaleString()} -&nbsp;
          </span>
          <span
            class="likes ${this.beep.liked ? "liked" : ""}"
            ${this.beep.liked ? "data-liked" : ""}
          >
            <span
              class="like-count ${this.beep.liked ? "liked" : ""}"
              @click=${this.handleLike}
            >
              ${this.beep.likeCount}
            </span>
            +
          </span>
        </div>
      </div>
      <div>${this.beep.content}</div>
    </div>`;
  }

  static styles = [
    BeeperBase.styles,
    css`
      .beep {
        margin-bottom: 16px;
      }

      .beep-header {
        display: flex;
        align-items: center;
      }

      .author-profile-picture {
        display: block;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 6px;
      }

      .author {
        font-weight: bold;
      }

      .created-at {
        font-style: italic;
        font-size: 14px;
      }

      .likes {
        font-size: 12px;
        cursor: pointer;
      }

      .liked {
        font-weight: bold;
      }
    `,
  ];
}

customElements.define("beep-view", BeepView);
