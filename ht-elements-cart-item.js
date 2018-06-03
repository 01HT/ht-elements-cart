"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/paper-icon-button";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox";
import "@polymer/paper-item/paper-item.js";
import "ht-image";
import "ht-user-avatar";

class HTElementsCartItem extends LitElement {
  _render({ data }) {
    return html`
    <style>
    :host {
        display: flex;
        position: relative;
        box-sizing:border-box;
      }

      a {
          display:block;
          color:inherit;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        ht-image {
            width: 100%;
            border-radius: 3px;
            overflow: hidden;
        }

      ht-user-avatar {
          margin:0 4px;
        }

        paper-item {
            cursor:pointer;
        }

        paper-icon-button {
            width:40px;
        }

        paper-dropdown-menu {
            width: 50px;
        }

    #container {
        width:100%;
        font-size: 14px;
        position:relative;
        min-height: 85px;
        border-radius:3px;
        grid-gap:16px;
        display:grid;
        grid-template-columns: 100px auto 48px;
        background: #fff;
        overflow:hidden;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    #image {
        padding-left: 16px;
    }

    #container #info {
        display: grid;
        grid-template-columns: auto 110px 60px 60px 60px;
        grid-gap: 8px;
    }

    #close {
        margin-right:8px;
    }

    #info > * {
        display:flex;
        align-items:center;
    }

    #info #item-info {
        display:flex; 
        align-items:flex-start;
        flex-direction:column;
    }

    #license-type {
        color: var(--secondary-text-color);
    }

    #container > * {
        display:flex;
        align-items:center;
    }

    #name {
        max-height: 50px;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.3;
        margin-bottom:8px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    #author {
        display:flex;
        position:relative;
        align-items:center;
        margin:0;
        color: var(--secondary-text-color);
    }

    @media (max-width: 768px) {
        #container #info {
          grid-template-columns: 1fr;
          padding: 16px 0;
        }
      }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-cart-item">
        <svg>
            <defs>
                <g id="close">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                    </path>
                </g>
            </defs>
        </svg>
    </iron-iconset-svg>

     ${
       data && data.itemData && data.itemData.usersData
         ? html`
         <div id="container">
    <a id="image" href="/item/${data.itemData.nameInURL}/${
             data.itemData.itemId
           }">
        <ht-image placeholder="https://storage.googleapis.com/api-01-ht.appspot.com/items/${
          data.itemData.itemId
        }/preview-60w.jpg" image="https://storage.googleapis.com/api-01-ht.appspot.com/items/${
             data.itemData.itemId
           }/preview-480w.jpg" size="16x9"></ht-image>
    </a>
    <div id="info">
        <div id="item-info">
            <a id="name" href="/item/${data.itemData.nameInURL}/${
             data.itemData.itemId
           }">${data.itemData.name}</a>
            <div id="author">от <ht-user-avatar data=${
              data.itemData.usersData
            } size="24" verifiedSize$=${8}></ht-user-avatar><a href="/user/${
             data.itemData.usersData.nickname
           }/${data.itemData.usersData.userId}">${
             data.itemData.usersData.displayName
           }</a>
            </div>
        </div>
        <div id="license-type">
            ${data.name}
        </div>
        <div id="price">
            $${data.price}
        </div>
        <div id="quantity">
            <paper-dropdown-menu label="Кол-во"  always-float-label no-animations on-iron-select=${e => {
              this._quantityChange(e);
            }}>
                <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="value" value="${
                  data.quantity
                }" setSort=${this._setSort()}>
                    <paper-item value="1">1</paper-item>
                    <paper-item value="2">2</paper-item>
                    <paper-item value="3">3</paper-item>
                    <paper-item value="4">4</paper-item>
                    <paper-item value="5">5</paper-item>
                    <paper-item value="6">6</paper-item>
                    <paper-item value="7">7</paper-item>
                    <paper-item value="8">8</paper-item>
                    <paper-item value="9">9</paper-item>
                    <paper-item value="10">10</paper-item>
                    <paper-item value="11">11</paper-item>
                    <paper-item value="12">12</paper-item>
                </paper-listbox>
            </paper-dropdown-menu>
        </div>
        <div id="total">$${data.price.toFixed(2) * data.quantity}</div>
        </div>
        <div id="close">
            <paper-icon-button class="delete-button" icon="ht-elements-cart-item:close" on-click="${() =>
              this._removeItem()}">
            </paper-icon-button>
        </div>
    </div>`
         : null
     }
`;
  }

  static get is() {
    return "ht-elements-cart-item";
  }

  static get properties() {
    return {
      data: Object
    };
  }

  constructor() {
    super();
  }

  _setSort(parameters) {
    // if (this.listbox === null) return;
    // let sort = this.parameters.sort;
    // if (sort === undefined) {
    //   this.listbox.selected = "";
    // } else {
    //   this.listbox.selected = sort;
    // }
  }

  _quantityChange() {}
}

customElements.define(HTElementsCartItem.is, HTElementsCartItem);
