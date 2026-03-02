/**
 * Copyright 2026 interested-learner
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `playlist-indicator`
 * 
 * @demo index.html
 * @element playlist-indicator
 */
export class PlayListIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-indicator";
  }

  constructor() {
    super();
        this.total = 0; // Tracks the size of the array that is made from the dots
        this.currentIndex = 0; //Tracks the indicator dot that its active
  }

  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currentIndex: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .dots {
        transform: translateY(300px);
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
        }
    .dot {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: var(--ddd-theme-default-beaverBlue);
    opacity: 0.4;
    cursor: pointer;
    }
    .dot.active {
    opacity: 1;
    }
        `];
  }

  render() {
    let dots = []; // Array to allow for the duplication of indicator dots
    for (let i = 0; i < this.total; i++) { //For loop that clones the indicator dots
      dots.push(html`
      <span class="dot ${i === this.currentIndex ? 'active' : ''}" @click="${this.handleDotClick}" data-index="${i}"></span>
        `);
    }
    return html`
      <div class="dots">
        ${dots}
      </div>`;
  }

  handleDotClick(){
    const indexChange = new CustomEvent("play-list-index-changed", {
        composed: true,
        bubbles: true,
        detail: {
            index: parseInt(e.target.dataset.index)
        },
    });
    this.dispatchEvent(indexChange);
  }
}

globalThis.customElements.define(PlayListIndicator.tag, PlayListIndicator);