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
    this.currentIndex = 0;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      currentIndex: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        height: 1000px;
        width: 2000px;
        transform: translateX(13vw);
        align-content: center;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }

      h3 span {
        font-size: var(--play-list-project-label-font-size, var(--ddd-font-size-s));
      }
        
      @media (min-width: 500px) and (max-width: 800px){
        play-list-indicator{
          transform: translateX(-100px);
        }
      }
    
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">

  <play-list-button
    @prev-clicked="${this.prev}"
    @next-clicked="${this.next}">
    <slot></slot>
  </play-list-button>

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