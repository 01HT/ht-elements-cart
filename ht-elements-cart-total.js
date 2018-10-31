"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/paper-button";
import "@polymer/paper-tooltip";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@01ht/ht-spinner";
import {
  // callTestHTTPFunction
  callFirebaseHTTPFunction
} from "@01ht/ht-client-helper-functions";

class HTElementsCartTotal extends LitElement {
  render() {
    const { signedIn, data, checkOutLoading } = this;
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
        }

        iron-icon {
            color: var(--accent-color);
            margin-right: 4px;
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

        ht-spinner {
            margin-top: 16px;
            display:flex;
            height: 36px;
            justify-content:center;
            align-items:center;
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
                <paper-tooltip>Предоставление права использования программ для ЭВМ, баз данных НДС не облагается согласно пп.26 п.2. ст. 149 НК РФ</paper-tooltip>
            </div>
            <div id="text">Не облагается НДС</div>
        </div>
        <paper-button raised ?hidden=${signedIn} @click=${_ => {
      this._openLoginWindow();
    }}>Войти</paper-button>


    ${
      checkOutLoading
        ? html`<ht-spinner button></ht-spinner>`
        : html`<paper-button raised ?disabled=${!signedIn} @click=${_ => {
            this._checkOut();
          }}>Перейти к оплате</paper-button>`
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
      checkOutLoading: { type: Boolean }
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

  async _checkOut() {
    try {
      this.checkOutLoading = true;
      let body = {};
      for (let item of this.items) {
        body[item.itemData.itemId] = item.quantity;
      }
      let response = await callFirebaseHTTPFunction({
        name: "httpsOrdersAddOrder",
        authorization: true,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      });
      this.checkOutLoading = false;
      if (response.error) return;
      this.dispatchEvent(
        new CustomEvent("clear-cart", {
          bubbles: true,
          composed: true
        })
      );
      this.dispatchEvent(
        new CustomEvent("update-pathname", {
          bubbles: true,
          composed: true,
          detail: {
            pathname: "/my-orders"
          }
        })
      );
    } catch (err) {
      this.dispatchEvent(
        new CustomEvent("show-toast", {
          bubbles: true,
          composed: true,
          detail: {
            text: err.message
          }
        })
      );

      this.checkOutLoading = false;
      console.log(err.message);
    }
  }
}

customElements.define(HTElementsCartTotal.is, HTElementsCartTotal);
