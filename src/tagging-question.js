import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class TaggingQuestion extends DDD {
  
  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();
    this.img = "https://lumiere-a.akamaihd.net/v1/images/ct_frozen_elsa_18466_22a50822.jpeg";
    this.question = "let it go !";
    this.answerKey = "default";
    this.tagChoices = [];
    this.defaultTagKey = [];
    this.correctStatus = [];
    this.feedback = [];
    this.answerGuess = [];
    this.answersChecked = false;
    this.retrieveTags();
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
            max-width:  95vw;
            margin: var(--ddd-spacing-0) var(--ddd-spacing-10);
            border-radius: 1%;
            padding: var(--ddd-spacing-5);
            height: auto;
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
            align-items: center;
        }

        .check-answers-btn {
            background-color: var(--ddd-theme-default-creekLight);
            color: var(--ddd-theme-default-coalyGray);
            padding: var(--ddd-spacing-2);
            margin: var(--ddd-spacing-2);
            width: var(--ddd-spacing-29);
            justify-content: center;
            min-height: var(--ddd-spacing-18);
        }

        .check-answers-btn:disabled {
          background-color: var(--ddd-theme-default-limestoneGray);
          opacity: 0.75;
          cursor: not-allowed;
          pointer-events: none;
        }

        .reset-btn {
            background-color: var(--ddd-theme-default-creekLight);
            color: var(--ddd-theme-default-coalyGray);
            padding: var(--ddd-spacing-2);
            margin: var(--ddd-spacing-2);
            width: var(--ddd-spacing-29);
            min-height: var(--ddd-spacing-18);
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
            background-color: var(--ddd-theme-default-slateMaxLight);
            min-height: var(--ddd-spacing-18);
            gap: var(--ddd-spacing-2);
        }

        .answer-container {
            display: flex;
            background-color: var(--ddd-theme-default-slateLight);
            border: 2px solid var(--ddd-theme-default-navy80);
            max-width: 80vw;
            overflow: auto;
            white-space: nowrap;
            flex-direction: row;
            margin: var(--ddd-spacing-2) var(--ddd-spacing-1);
            padding: var(--ddd-spacing-2);
        }

        .answer-drop-box {
            display: flex;
            border: 1px solid var(--ddd-theme-default-navy80);
            padding: var(--ddd-spacing-2);
            background-color: var(--ddd-theme-default-slateMaxLight);
            overflow: auto;
            white-space: nowrap;
            flex-direction: row;
            width: auto;
            min-width: 310px;
            gap: var(--ddd-spacing-2);
            
        }

        .option-tag {
            border: 4px solid grey;
            color: black;
            padding: var(--ddd-spacing-5);
            margin: var(--ddd-spacing-2);
            background-color: var(--ddd-theme-default-white);
        }

        .option-tag.correct {
          border: 4px solid var(--ddd-theme-default-opportunityGreen);
        }

        .option-tag.incorrect {
          border: 4px solid var(--ddd-theme-default-original87Pink);
        }

        .feedback-item.correct {
          color: var(--ddd-theme-default-opportunityGreen);
        }

        .feedback-item.incorrect {
          color: var(--ddd-theme-default-original87Pink);
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

  retrieveTags() {
    fetch("./src/tags.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch tags data");
        }
        return response.json();
      })
      .then(tagsData => {
        const tagSet = tagsData[this.answerKey];
        if (tagSet) {
          const originalTagOptions = tagSet.tagChoices || [];
          this.defaultTagKey = originalTagOptions.slice(); 
          this.tagChoices = originalTagOptions.slice();
          this.correctStatus = [];
          this.feedback = [];
  
          tagSet.tagAnswers.forEach((tagAnswer) => {
            const tagKey = Object.keys(tagAnswer)[0];
            const { correct, feedback } = tagAnswer[tagKey];
            this.correctStatus.push(correct);
            this.feedback.push(feedback);
          });

          console.log(this.correctStatus);
          console.log(this.feedback);
  
          this.tagChoices = this.randomizeOrder(this.tagChoices);
        } else {
          throw new Error(`tagSet '${this.answerKey}' not found`);
        }
      })
      .catch(error => {
        console.error("Error loading tags data: ", error);
      }
    );
  }

  randomizeOrder(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  retrieveFeedback(tag) {
    const index = this.defaultTagKey.indexOf(tag);
    if (index !== -1) {
      const feedback = this.feedback[index];
      return html`${feedback}`;
    }
    return html``;
  }

  handleDrag(e) {
    const optionTag = e.target.textContent.trim();
    e.dataTransfer.setData("text/plain", optionTag);
  }

  handleTagMove(optionTag, lastContainer) {
    if (lastContainer === "drop-box") {
      this.removeTag(optionTag);
    } else {
      this.addTag(optionTag);
    }
  }

  allowDrop(e) {
    e.preventDefault();
  }

  isTagCorrect(tag) {
      const index = this.defaultTagKey.indexOf(tag);
      if (index !== -1) {
        return this.correctStatus[index];
      }
      return false;
  }

  handleDrop(e) {
    e.preventDefault();
    const optionTag = e.dataTransfer.getData("text/plain");
    const inOptionContainer = this.tagChoices.includes(optionTag);
    const inDropBox = this.answerGuess.includes(optionTag);

    if (inOptionContainer && !inDropBox) {
      this.handleTagMove(optionTag, "option");
    } else if (!inOptionContainer && inDropBox) {
      this.handleTagMove(optionTag, "drop-box");
    }
  }

  handleTagClick(optionTag) {
    if (this.answerGuess.includes(optionTag)) {
      this.handleTagMove(optionTag, "drop-box");
    } else if (this.tagChoices.includes(optionTag)) {
      this.handleTagMove(optionTag, "option");
    }
  }

  handleKeyDown(event, optionTag) {
    if (event.key === 'Enter') {
      this.handleTagClick(optionTag);
    }
  }

  addTag(optionTag) {
    if (!this.answersChecked && !this.answerGuess.includes(optionTag)) {
      this.answerGuess = [...this.answerGuess, optionTag];
      this.tagChoices = this.tagChoices.filter(answerGuess => answerGuess !== optionTag);
    }
  }

  removeTag(optionTag) {
    if (!this.answersChecked) {
      this.answerGuess = this.answerGuess.filter(answerGuess => answerGuess !== optionTag);
      this.tagChoices.push(optionTag);
    }
  }

  enterAnswers() {
    this.answersChecked = true;
    this.checkAnswers();
    this.makeItRain();
  }

  checkAnswers() {
    this.answerGuess.forEach(tag => {
      const index = this.defaultTagKey.indexOf(tag);
      if (index !== -1) {
        const correct = this.correctStatus[index];
        const feedback = this.feedback[index];
      }
    });
  }

  reset() {
    this.answersChecked = false;
    this.tagChoices = [...this.tagChoices, ...this.answerGuess];
    this.answerGuess = [];
    this.randomizeOrder(this.tagChoices); 
  }

  makeItRain() {
    import('@lrnwebcomponents/multiple-choice/lib/confetti-container.js').then((module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  render() {
    return html `
        <confetti-container id="confetti">
        <div class="tagging-question-container">
            <div class="img-container">
                <img class="img" src="${this.img}">
            </div> <!--end img-container div-->
            <div class="question-container">
                <p><strong>${this.question}</strong></p>
            </div> <!--end instruction-container div-->
            <div class="option-container" @drop="${this.handleDrop}" @dragover="${this.allowDrop}">
                ${this.tagChoices.map(optionTag => html` 
                    <div class="option-tag" draggable="true" @dragstart="${this.handleDrag}" @dragend="${this.handleDrag}" @click="${() => this.handleTagClick(optionTag)}" @keydown="${(event) => this.handleKeyDown(event, optionTag)}" tabindex=0>${optionTag}</strong></div>
                `)}
            </div> <!--end option-container div-->
            <div class="answer-container">
                <div class="answer-drop-box" @drop="${this.handleDrop}" @dragover="${this.allowDrop}">
                    ${this.answerGuess.map(selectedTag => html` 
                        <div class="option-tag ${this.answersChecked ? (this.isTagCorrect(selectedTag) ? 'correct' : 'incorrect') : ''}" draggable="true" @dragstart="${this.handleDrag}" @dragend="${this.handleDrag}" @click="${() => this.handleTagClick(selectedTag)}" @keydown="${(event) => this.handleKeyDown(event, selectedTag)}" tabindex=0>${selectedTag}</div>
                    `)}
                </div>
                <div class="check-button-container">
                    <button class="check-answers-btn" ?disabled="${this.answersChecked || this.answerGuess.length === 0}" @click="${this.enterAnswers}">Check Answers</button>
                    <button class="reset-btn" @click="${this.reset}">Reset</button>
                </div>
            </div> <!--end answer-container div-->
             <!--end check-button-container div-->
             ${this.answersChecked ? html`
             <div class="answer-details-container">
              <h2>Answer Details</h2>
                ${this.answerGuess.map(selectedTag => html`
              <div class="feedback-item ${this.isTagCorrect(selectedTag) ? 'correct' : 'incorrect'}"><strong>${selectedTag}:</strong> ${this.retrieveFeedback(selectedTag)}</div>              
              `)}
             </div>
            ` : ''}
        </div> <!--end tagging-question-container div-->
        </confetti-container>
    `;
  }


  static get properties() {
    return {
      ...super.properties,
      img: { type: String },
      question: { type: String },
      answerKey: { type: String, reflect: true },
      tagChoices: { type: Array, attribute: "tag-choices" },
      defaultTagKey: { type: Array, attribute: "default-tag-key" },
      correctStatus: { type: Array, attribute: "correct-status" },
      feedback: { type: Array, attribute: "feedback" },
      answerGuess: { type: Array, attribute: "answer-guess" },
      answersChecked: { type: Boolean, reflect: true }
    }
  }

}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);