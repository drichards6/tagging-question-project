import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class TaggingQuestion extends DDD {
  
  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();
    this.img = "https://lumiere-a.akamaihd.net/v1/images/ct_frozen_elsa_18466_22a50822.jpeg";
    this.question= "let it go !";
  }
  
  static get styles() {
    return [
      super.styles,
      css`
        :host {
            display: flex;
        }

        .tagging-question-container {
            border: 2px solid var(--ddd-theme-default-navy40);
            height: 95vh;
            width:  95vw;
            margin: var(--ddd-spacing-10);
            border-radius: 1%;
            padding: var(--ddd-spacing-5);
        }

        .img-container {
            display: flex;
            margin-left: auto;
            margin-right: auto;
            height: 50vh;
            width: 50vw;
            justify-content: center;
        }

        .img-container img {
            border: 3px solid var(--ddd-theme-default-navy40);
        }

        .question-container {
            text-align: center;
        }

        .check-answers-btn {
            background-color: var(--ddd-theme-default-creekLight);
            color: var(--ddd-theme-default-coalyGray);
            padding: var(--ddd-spacing-12) var(--ddd-spacing-6);
            margin: var(--ddd-spacing-0) var(--ddd-spacing-1);
            font-size: 16px;
        }

        .check-answers-btn:focus,
        .check-answers-btn:hover {
            background-color: var(--ddd-theme-default-creekTeal);
            color: var(--ddd-theme-default-coalyGray);
        }

        .option-container {
            border: 2px dotted var(--ddd-theme-default-navy80);
            max-width: 80vw;
            overflow: auto;
            white-space: nowrap;
            display: flex;
            flex-direction: row;
            padding: var(--ddd-spacing-1);
            margin: var(--ddd-spacing-2) var(--ddd-spacing-1);
            background-color: var(--ddd-theme-default-navy60);
        }

        .answer-container {
            display: flex;
            background-color: var(--ddd-theme-default-navy60);
            border: 2px solid var(--ddd-theme-default-navy80);
            max-width: 80vw;
            overflow: auto;
            white-space: nowrap;
            flex-direction: row;
            margin: var(--ddd-spacing-2) var(--ddd-spacing-1);
            padding: var(--ddd-spacing-1);
        }

        .drop-box {
            display: flex;
            border: 1px solid var(--ddd-theme-default-navy80);
            padding: var(--ddd-spacing-2);
            background-color: var(--ddd-theme-default-slateMaxLight);
            max-width: 410px;
            overflow: auto;
            white-space: nowrap;
            flex-direction: row;
        }

        .option-container .option-tag {
            border: 4px solid var(--ddd-theme-default-discoveryCoral);
            color: var(--ddd-theme-default-original87Pink);
            padding: var(--ddd-spacing-5);
            margin: var(--ddd-spacing-2);
            background-color: var(--ddd-theme-default-white);
        }

        .answer-container .option-tag {
            border: 4px solid var(--ddd-theme-default-opportunityGreen);
            color: var(--ddd-theme-default-futureLime);
            padding: var(--ddd-spacing-5);
            margin: var(--ddd-spacing-2);
            background-color: var(--ddd-theme-default-white);
        }

        ::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 7px;
            border: 1px solid grey;
            background-color: var(--ddd-theme-default-limestoneMaxLight);
        }

      ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: var(--ddd-theme-default-navy40);
            -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
        }

    `];
  }

  render() {
    return html `
        <div class="tagging-question-container">
            <div class="img-container">
                <img class="img" src="${this.img}">
            </div> <!--end img-container div-->
            <div class="question-container">
                <p><strong>${this.question}</strong></p>
            </div> <!--end instruction-container div-->
            <div class="option-container">
                <div class="option-tag"><strong>Option 1</strong></div>
                <div class="option-tag"><strong>Option 2</strong></div>
                <div class="option-tag"><strong>Option 3</strong></div>
                <div class="option-tag"><strong>Option 4</strong></div>
                <div class="option-tag"><strong>Option 5</strong></div>
            </div> <!--end option-container div-->
            <div class="answer-container">
                <div class="drop-box">
                <div class="option-tag"><strong>Option 1</strong></div>
                <div class="option-tag"><strong>Option 2</strong></div>
                <div class="option-tag"><strong>Option 3</strong></div>
                <div class="option-tag"><strong>Option 4</strong></div>
                <div class="option-tag"><strong>Option 5</strong></div>
                </div>
                <div class="check-button-container">
                    <button class="check-answers-btn"><strong>Check Answers</strong></button>
                </div>
            </div> <!--end answer-container div-->
             <!--end check-button-container div-->
        </div> <!--end tagging-question-container div-->
    `;
  }


  static get properties() {
    return {
      ...super.properties,
      img: { type: String },
      question: { type: String },
    }
  }

}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);