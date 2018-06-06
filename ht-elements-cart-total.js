"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/paper-button";

class HTElementsCartTotal extends LitElement {
  _render({ data }) {
    return html`
    <style>
        :host {
            display: flex;
            position: relative;
            box-sizing: border-box;
        }

        paper-button {
            margin:0;
            margin-top: 16px;
            background: var(--accent-color);
            color: #fff;
        }

        #container {
            display:flex;
            width:100%;
            padding: 24px;
            flex-direction: column;
            border-radius:3px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        #info {
            display:flex;
            justify-content: space-between;
            align-items: flex-end;
        }
    
        #label {
            font-weight: 500;
            font-size: 16px;
        }

        #total {
            font-size: 24px;
        }
    </style>

    <div id="container">
        <div id="info"><span id="label">Всего </span><span id="total">$${data}</span></div>
        <paper-button raised>Оформить заказ</paper-button>
    </div>
`;
  }

  static get is() {
    return "ht-elements-cart-total";
  }

  static get properties() {
    return {
      data: Number
    };
  }
}

customElements.define(HTElementsCartTotal.is, HTElementsCartTotal);
