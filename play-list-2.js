/**
 * Copyright 2026 JonChiu-programs
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./play-list-button.js";
import "./play-list-indicator.js";

/**
 * `play-list-2`
 * 
 * @demo index.html
 * @element play-list-2
 */
export class PlayList2 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-2";
  }

  constructor() {
    super();
    this.title = "";
    this.currentIndex = 0;
    this.t = {
      title: "Title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        height: 1000px;
      }
      h3 span {
        font-size: var(--play-list-project-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>

  <!-- Inherits the customEvent tags from the playlist-arrow .js file in order to allow them to be defined with js 
      code from this file -->
  <play-list-button
    @prev-clicked="${this.prev}"
    @next-clicked="${this.next}">
  </play-list-button>

  <!-- Allows for placement of slides into project code -->
  <slot></slot>

  <!-- Inherits the constructor tags from the playlist-indicator .js file in order to 
      transfer information to the array and for loop -->
  <!-- slides = dots ? -->
  <play-list-indicator
    @play-list-index-changed="${this.handleEvent}"
    .total="${this.slides ? this.slides.length : 0}"
    .currentIndex="${this.currentIndex}">
  </play-list-indicator>
</div>`;
  }

next() {
  if (this.currentIndex < this.slides.length - 1) {
    this.currentIndex++;
    this.updateSlides();
  }
}


prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.updateSlides();
  }
}

handleEvent(e){
  this.currentIndex = e.detail.index;
  this.updateSlides();
}
//Makes slides = dots
firstUpdated() {
  this.slides = Array.from(this.querySelectorAll("play-list-slide"));
  this.updateSlides();
}

updateSlides() {
  this.slides.forEach((slide, i) => {
    slide.style.display = i === this.currentIndex ? "block" : "none";
  });
  const indexChange = new CustomEvent("play-list-index-changed", {
  composed: true,
  bubbles: true,
  detail: {
    index: this.currentIndex
  },
});
this.dispatchEvent(indexChange);  

}

}

globalThis.customElements.define(PlayList2.tag, PlayList2);