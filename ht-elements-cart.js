"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/lib/repeat.js";
import "@polymer/paper-button";

import "./ht-elements-cart-item.js";
import "./ht-elements-cart-total.js";

class HTElementsCart extends LitElement {
  _render({ items, total }) {
    return html`
    <style>
      :host {
          display: block;
          position: relative;
          box-sizing: border-box;
      }

      #container {
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

      @media (max-width: 1000px) {
        #container{
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div id="container">
      <section id="main">
        <h1>Корзина</h1>
        <div id="list">
          ${repeat(
            items,
            item =>
              html`<ht-elements-cart-item data=${item}></ht-elements-cart-item>`
          )}
        </div>
      </section>
      <section id="sidebar">
          <ht-elements-cart-total data=${total}></ht-elements-cart-total>
      </section>
    </div>
`;
  }

  static get is() {
    return "ht-elements-cart";
  }

  static get properties() {
    return {
      items: Array,
      cartId: String,
      total: Number
    };
  }

  constructor() {
    super();
    this.items = [];
  }

  _handleCartData(cartData) {
    let result = {
      total: 0,
      items: []
    };
    let cartDataItems = cartData.items;
    for (let itemId in cartDataItems) {
      let subitems = cartDataItems[itemId].subitems;
      for (let licensetypeId in subitems) {
        let data = subitems[licensetypeId];
        result.total += data.quantity * data.price;
        result.items.push({
          itemData: cartDataItems[itemId].itemData,
          licensetypeId: licensetypeId,
          name: data.name,
          quantity: data.quantity,
          price: data.price
        });
      }
    }
    return result;
  }

  async refresh(cartId) {
    console.log(cartId);
    // let cartId = this.cartId;
    if (cartId === null) {
      this.items = [];
      return;
    }
    let snapshot = await window.firebase
      .firestore()
      .collection("carts")
      .doc(cartId)
      .get();
    let cartData = snapshot.data();
    let handledData = await this._handleCartData(cartData);
    this.items = handledData.items;
    this.total = handledData.total;
  }
}

customElements.define(HTElementsCart.is, HTElementsCart);
