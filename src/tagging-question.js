import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class TaggingQuestion extends DDD {
  
  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();
    this.img = "https://lumiere-a.akamaihd.net/v1/images/ct_frozen_elsa_18466_22a50822.jpeg";
    this.instructions= "let it go !";
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
        
      }

      .img-container {
        display: flex;
        margin-left: auto;
        margin-right: auto;
        height: 50vh;
        width: 50vw;
        justify-content: center;
      }

    .instruction-container {
        text-align: center;
    }

    .check-answers-btn {
        background-color: var(--ddd-theme-default-potential70);
        color: var(--ddd-theme-default-slateMaxLight);
    }

    .check-answers-btn:focus,
    .check-answers-btn:hover {
        background-color: var(--ddd-theme-default-creekTeal);
        color: var(--ddd-theme-default-coalyGray);
    }

    .option-container {
        border: 1px solid grey;
        width: 80vw;
        overflow: auto;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
    }

    `];
  }

  render() {
    return html `
        <div class="tagging-question-container">
            <div class="img-container">
                <img class="img" src="${this.img}">
            </div> <!--end img-container div-->
            <div class="instruction-container">
                <p><strong>${this.instructions}</strong></p>
            </div> <!--end instruction-container div-->
            <div class="option-container">
                <p>this is where the option bank of tags will be displayed</p>
            </div> <!--end option-container div-->
            <div class="answer-container">
                <p>this is where the answer tags will be displayed</p>
            </div> <!--end answer-container div-->
            <div class="check-button-container">
                <button class="check-answers-btn">Check Answers</button>
            </div> <!--end check-button-container div-->
        </div> <!--end tagging-question-container div-->
    `;
  }


  static get properties() {
    return {
      ...super.properties,
      img: { type: String },
      instructions: { type: String },
    }
  }

}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);