"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/paper-button";
import "@polymer/paper-tooltip";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@01ht/ht-spinner";

class HTElementsCartTotal extends LitElement {
  render() {
    const { signedIn, data, orderCreating } = this;
    return html`
    ${SharedStyles}
    <style>
        :host {
            display: flex;
            position: relative;
            box-sizing: border-box;
        }

        paper-button {
            margin: 16px 0 0 0;
            width: 100%;
        }

        iron-icon {
            color: var(--accent-color);
            margin-right: 4px;
        }

        ht-spinner {
            display:flex;
            margin-top: 16px;
            height: 36px;
            justify-content:center;
            align-items:center;
        }

        #container {
            display:flex;
            width:100%;
            padding: 24px;
            flex-direction: column;
            border-radius:3px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        [disabled] {
            background: #ccc;
        }

        #disabled-container {
            position: relative;
        }

        #info {
            display:flex;
            justify-content: space-between;
            align-items: center;
        }

        #nds {
            display: flex;
            align-items: center;
            margin-top: 8px;
            line-height: 0;
            position:relative;
        }
    
        #label {
            font-weight: 500;
            font-size: 18px;
        }

        #text {
            color: var(--secondary-text-color);
            font-size: 14px;
        }

        #total {
            font-size: 24px;
        }

        [hidden] {
            display:none;
        }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-cart-total">
        <svg>
            <defs>
                <g id="info-outline">
                    <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path>
                </g>
            </defs>
        </svg>
    </iron-iconset-svg>
    <div id="container">
        <div id="info"><span id="label">Всего </span><span id="total">$${data}</span></div>
        <div id="nds">
            <div id="tooltip">
                <iron-icon icon="ht-elements-cart-total:info-outline"></iron-icon>
            </div>
            <paper-tooltip>Предоставление права использования программ для ЭВМ, баз данных НДС не облагается согласно пп.26 п.2. ст. 149 НК РФ</paper-tooltip>
            <div id="text">Не облагается НДС</div>
        </div>
    ${
      !signedIn
        ? html`<paper-button raised @click=${_ => {
            this._openLoginWindow();
          }}>Войти</paper-button><div id="disabled-container">
            <paper-button raised disabled>Оплата</paper-button>
            <paper-tooltip>Для оплаты войдите в приложение</paper-tooltip>
        </div>`
        : html`${
            orderCreating
              ? html`<ht-spinner button></ht-spinner>`
              : html`<paper-button raised @click=${_ => {
                  this._checkOut();
                }}>Оплата</paper-button>`
          }`
    }
    </div>
`;
  }

  static get is() {
    return "ht-elements-cart-total";
  }

  static get properties() {
    return {
      data: { type: Number },
      signedIn: { type: Boolean },
      items: { type: Array },
      orderCreating: { type: Boolean }
    };
  }

  _openLoginWindow() {
    this.dispatchEvent(
      new CustomEvent("open-login-window", {
        bubbles: true,
        composed: true
      })
    );
  }

  _checkOut() {
    this.dispatchEvent(
      new CustomEvent("create-order", {
        bubbles: true,
        composed: true,
        detail: {
          ordertypeId: "v2m2Mq3clhUhyeex5Xkp"
        }
      })
    );
  }
}

customElements.define(HTElementsCartTotal.is, HTElementsCartTotal);
