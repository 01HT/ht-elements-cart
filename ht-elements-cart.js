"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@01ht/ht-spinner";

import "./ht-elements-cart-empty.js";
import "./ht-elements-cart-item.js";
import "./ht-elements-cart-total.js";

class HTElementsCart extends LitElement {
  render() {
    const { fullPageLoading, items, signedIn, total } = this;
    return html`
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

      @media (max-width: 1000px) {
        #cart-container{
          grid-template-columns: 1fr;
        }
      }

      [hidden],  #cart-container[hidden]  {
        display:none;
      }
    </style>
    <div id="container">
      <ht-spinner page ?hidden=${!fullPageLoading}></ht-spinner>
      <ht-elements-cart-empty ?hidden=${fullPageLoading ||
        (!fullPageLoading && items.length !== 0)}></ht-elements-cart-empty>
      <div id="cart-container" ?hidden=${fullPageLoading || items.length === 0}>
        <section id="main">
          <h1>Корзина</h1>
          <div id="list">
            ${repeat(
              items,
              item =>
                html`<ht-elements-cart-item .options=${item}></ht-elements-cart-item>`
            )}
          </div>
        </section>
        <section id="sidebar">
            <ht-elements-cart-total .data=${
              .total
            } .signedIn=${signedIn}></ht-elements-cart-total>
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
      fullPageLoading: { type: Boolean },
      signedIn: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.items = [];
    this.fullPageLoading = true;
    this.lastUpdate = new Date();
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
          cartId: this.cartId,
          licensetypeId: licensetypeId,
          name: data.name,
          quantity: data.quantity,
          price: data.price
        });
      }
    }
    return result;
  }

  async refresh(cartId, fullPageLoading) {
    if (cartId === undefined || cartId === null) {
      this.items = [];
      this.fullPageLoading = false;
      this.lastUpdate = new Date();
      return;
    }
    if (fullPageLoading) this.fullPageLoading = true;
    this.cartId = cartId;
    let currentDate = new Date();
    let snapshot = await window.firebase
      .firestore()
      .collection("carts")
      .doc(cartId)
      .get();
    let cartData = snapshot.data();
    if (currentDate > this.lastUpdate) {
      let handledData = await this._handleCartData(cartData);
      this.items = handledData.items;
      this.total = handledData.total;
      this.fullPageLoading = false;
    }
  }
}

customElements.define(HTElementsCart.is, HTElementsCart);
