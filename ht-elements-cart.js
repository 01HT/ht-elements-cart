"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@01ht/ht-spinner";

import "./ht-elements-cart-empty.js";
import "./ht-elements-cart-item.js";
import "./ht-elements-cart-total.js";

class HTElementsCart extends LitElement {
  render() {
    const { items, signedIn, total, cartId } = this;
    return html`
    ${SharedStyles}
    <style>
      :host {
          display: block;
          position: relative;
          box-sizing: border-box;
      }

      #container {
        display:flex;
        justify-content:center;
      }

      #cart-container {
        width:100%;
        display:grid;
        grid-template-columns: 1fr 270px;
        grid-gap: 32px;
      }

      #list {
        display: grid;
        grid-gap: 16px;
        margin-top:32px;
        grid-template-columns: 1fr;
      }

      @media (max-width: 930px) {
        #cart-container{
          grid-template-columns: 1fr;
        }
      }

      [hidden],  #cart-container[hidden]  {
        display:none;
      }
    </style>
    <div id="container">
      <ht-elements-cart-empty ?hidden=${items.length !==
        0}></ht-elements-cart-empty>
      <div id="cart-container" ?hidden=${items.length === 0}>
        <section id="main">
          <h1 class="mdc-typography--headline5">Корзина</h1>
          <div id="list">
            ${repeat(
              items,
              item =>
                html`<ht-elements-cart-item .options=${item} .cartId=${cartId}></ht-elements-cart-item>`
            )}
          </div>
        </section>
        <section id="sidebar">
            <ht-elements-cart-total .data=${total} .signedIn=${signedIn}></ht-elements-cart-total>
        </section>
      </div>
    </div>
`;
  }

  static get is() {
    return "ht-elements-cart";
  }

  static get properties() {
    return {
      items: { type: Array },
      cartId: { type: String },
      total: { type: Number },
      signedIn: { type: Boolean }
    };
  }
}

customElements.define(HTElementsCart.is, HTElementsCart);
