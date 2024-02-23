import { css, html} from "lit";
import { BeeperBase } from "./beeper-base.js";

export class BeepView extends BeeperBase {
  static properties = {
    beep: {
      type: Object,
    },
    treatedContent: {
      type: String,
    }
  };

  constructor() {
    super();
    this.treatedContent = "";
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

  createRenderRoot() {
    return this;
  } 

  async existsInDB(username) {
    const response = await fetch(`/api/exists/${username}`, {
      method: "GET",
    });
  
    if (!response.ok) {
      // Handle non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
  
    // Assuming your server returns { exists: true } or { exists: false }
    return data.exists;
  }

  async mentions() {
    const potentialUsers = this.beep.content.match(/@(\w+)/g) || []
    let replacedContent = this.beep.content
    console.log(replacedContent);
    for (const user of potentialUsers) {
      if (await this.existsInDB(user.substring(1))) {
        replacedContent = replacedContent.replace(user, '<a href="/user/' + user.substring(1) + '">' + user + '</a>')
      }
    }
    this.treatedContent = replacedContent;
  }

  render() {
    this.mentions();
    return html` 
    <div class = "beep d-flex justify-content-center">
        <div class="card text-left w-75">
            <div class="card-header">
              <img
                  src="${this.beep.authorPicture}"
                  alt="Profile picture of ${this.beep.authorName}"
                  class="author-profile-picture"
                  width="30" height="30"
              />
                <span class = "user">
                  <a href="/user/${this.beep.authorName}">
                  @${this.beep.authorName}
                  </a>
                </span>
                <br>
                <span class="created-at text-body-secondary">
                  ${new Date(this.beep.createdAt).toLocaleString()}
              </span>
            </div>

            <div class="card-body">
                <p class="card-text content" .innerHTML=${this.treatedContent}></p>
            </div>

            <div class="card-footer text-body-secondary">
              <!-- <span
              class="likes ${this.beep.liked ? "liked" : ""}"
              ${this.beep.liked ? "data-liked" : ""}
              > -->
                <span class="like-count" ${this.beep.liked ? "liked" : ""}> ${this.beep.likeCount} like(s) &nbsp;</span>
                <a @click = ${this.handleLike} class="btn btn-primary">Like</a>
                <a class="btn btn-primary">Reply</a>
            </div>
        </div>
    </div>
    <br>`;
  }

  /**
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
  */
}

customElements.define("beep-view", BeepView);
