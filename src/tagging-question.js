import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class TaggingQuestion extends DDD {
  
  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();
  }
  
  static get styles() {
    return [
      super.styles,
      css`
      :host {
        display: flex;
      }

      .tagging-question-container {
        border: 1px solid black;
        height: 95vh;
        width:  95vw;
        margin: var(--ddd-spacing-10);
        text-align: center;
        justify-content: center;
      }

      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
      }

    `];
  }

  render() {
    return html `
        <div class="tagging-question-container">
            <div class="img-container">
                <img class="img" src="https://lumiere-a.akamaihd.net/v1/images/ct_frozen_elsa_18466_22a50822.jpeg">
            </div> <!--end img-container-->
        </div> <!--end tagging-question-container-->
    `;
  }


  static get properties() {
    return {
      ...super.properties,
    }
  }

}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);