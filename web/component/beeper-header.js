import { css, html } from "lit";
import { getActiveUserProfile } from "../util/active-user-profile.js";
import { BeeperBase } from "./beeper-base.js";

export class BeeperHeader extends BeeperBase {
  static properties = {
    profile: {
      state: true,
    },
  };

  /**
  static styles = [
    BeeperBase.styles,
    css`
      .header {
        display: flex;
        align-items: center;
      }

      .profile-picture {
        border-radius: 50%;
        height: 48px;
        width: 48px;
      }

      .logout {
        margin-left: auto;
        border: none;
        cursor: pointer;
        font-style: italic;
      }
    `,
  ];
  */
  constructor() {
    super();
    this.profile = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.profile = await getActiveUserProfile();
    console.log(this.profile);
  }

  createRenderRoot() {
    return this;
  } 

  render() {
    return html`
    <nav id = "nav" class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="/home">Twittor</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a href = "/user/${this.profile.name}">
              <img class="profile-picture" 
              src="${this.profile?.picture}" 
              width="45" height="45"/>
              </a>
            </li>
            <li class = "nav-item">
              <a class = "nav-link active" aria-current = "page" href = "/logout">Sign out</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Rechercher">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          
        </div>
      </div>
    </nav>
    `;
  }
}

customElements.define("beeper-header", BeeperHeader);
