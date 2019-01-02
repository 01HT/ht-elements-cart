"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/paper-icon-button";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@polymer/paper-input/paper-input.js";
import "@01ht/ht-spinner";
import "@01ht/ht-image";
import "@01ht/ht-user-avatar";

class HTElementsCartItem extends LitElement {
  render() {
    const { data, deleteSpinner, quantitySpinner } = this;
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
          margin:0 2px;
        }

        paper-input {
            --primary-text-color:var(--secondary-text-color);
            font-size: 14px;
            width:30px;
            text-align:center;
            --paper-input-container: { padding: 0;};
            --paper-input-container-input: { font-size: 14px; };
        }

        #close {
            width:40px;
        }

    #container {
        width:100%;
        font-size: 14px;
        position:relative;
        min-height: 85px;
        border-radius:3px;
        grid-gap:16px;
        display:grid;
        grid-template-columns: 80px auto 48px;
        background: #fff;
        overflow:hidden;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    #image {
        padding-left: 16px;
    }

    #container #info {
        display: grid;
        grid-template-columns: auto 50px 120px 50px;
        grid-gap: 8px;
    }

    #quantity paper-icon-button {
      color:var(--secondary-text-color);
    }

    #price-number {
      color:var(--secondary-text-color);
      font-size: 16px;
    }

    #total-number {
      color: var(--accent-color);
      font-size: 16px;
      font-weight: 500;
    }

    #quantity-actions {
      display:flex;
      align-items:center;
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
        padding: 16px 0;
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

    .title {
      display:none;
    }

    @media (max-width: 690px) {
        #container #info {
          grid-template-columns: 1fr;
          grid-gap: 0;
          padding: 16px 0;
        }

        #info #item-info {
          padding: 0;
        }

        #info > * {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ddd;
          justify-content: space-between;
          min-height: 43px;
        }

        #item-info, #total {
          border:none;
        }

        .title {
          display:block;
        }

        #quantity-actions {
          display: flex;
          margin-right: -8px;
          align-items: center;
        }

        #container > * {
            display:flex;
            padding-top: 16px;
            align-items:flex-start;
        }
      }

      [hidden] {
          display:none;
      }
    </style>
    <iron-iconset-svg size="24" name="ht-elements-cart-item">
        <svg>
            <defs>
                <g id="close">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                    </path>
                </g>
                <g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
                <g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
            </defs>
        </svg>
    </iron-iconset-svg>

     ${
       data && data.itemData && data.itemData.authorData
         ? html`
         <div id="container">
    <a id="image" href="/item/${data.itemData.nameInURL}/${
             data.itemData.itemNumber
           }">
           <ht-image placeholder="${
             window.cloudinaryURL
           }/image/upload/c_scale,f_auto,w_60/v${data.itemData.image.version}/${
             data.itemData.image.public_id
           }.jpg" image="${
             window.cloudinaryURL
           }/image/upload/c_scale,f_auto,w_480/v${
             data.itemData.image.version
           }/${data.itemData.image.public_id}.jpg" size="16x9"></ht-image>
    </a>
    <div id="info">
        <div id="item-info">
            <a id="name" href="/item/${data.itemData.nameInURL}/${
             data.itemData.itemNumber
           }">${data.itemData.name}</a>
            <div id="author">от <ht-user-avatar data=${
              data.itemData.authorData
            } size="24" verifiedSize=${8}></ht-user-avatar><a href="/${
             data.itemData.authorData.isOrg ? "organization" : "user"
           }/${data.itemData.authorData.nameInURL}/${
             data.itemData.authorData.isOrg
               ? `${data.itemData.authorData.organizationNumber}`
               : `${data.itemData.authorData.userNumber}`
           }">${data.itemData.authorData.displayName}</a>
            </div>
             <div id="license-type">
              ${data.licensetypesData.name}
            </div>
        </div>
        
        <div id="price">
           <div class="title">Цена</div>
           <div id="price-number">$${data.itemData.price}</div>
        </div>
        <div id="quantity">
            <div class="title">Кол-во</div>
            <div id="quantity-actions">
              <paper-icon-button  icon="ht-elements-cart-item:remove-circle-outline" @click=${_ =>
                this._minusQuantity()}>
            </paper-icon-button>
              <paper-input id="quantity-number" id="name" no-label-float allowed-pattern="^[0-9]" maxlength="3" @keyup=${_ => {
                this._onInputKeyPress();
              }} value=${+data.quantity}></paper-input>
            <paper-icon-button icon="ht-elements-cart-item:add-circle-outline" @click=${_ =>
              this._plusQuantity()}>
            </paper-icon-button>
          </div>
        </div>

        <div id="total">
          <div class="title">Сумма</div>
          <ht-spinner icon-button ?hidden=${!quantitySpinner}></ht-spinner>
          <div id="total-number" ?hidden=${quantitySpinner}>$${data.itemData.price.toFixed(
             2
           ) * data.quantity}</div>
        </div>
        </div>
        <div id="close">
            <ht-spinner icon-button ?hidden=${!deleteSpinner}></ht-spinner>
            <paper-icon-button  ?hidden=${deleteSpinner} class="delete-button" icon="ht-elements-cart-item:close" @click=${_ =>
             this._removeItem()}>
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
      data: { type: Object },
      deleteSpinner: { type: Boolean },
      quantitySpinner: { type: Boolean },
      options: { type: Object },
      cartId: { type: String }
    };
  }

  get input() {
    return this.shadowRoot.querySelector("paper-input");
  }

  set options(data) {
    this.data = data;
    console.log(data);
    this.deleteSpinner = false;
    this.quantitySpinner = false;
  }

  constructor() {
    super();
    this.timeoutID;
  }

  _plusQuantity() {
    let value = this.input.value;
    value++;
    this.input.value = value;
    this._changeItemQuantity();
  }

  _minusQuantity() {
    let value = this.input.value;
    value--;
    if (value === 0 || value < 0) value = 1;
    this.input.value = value;
    this._changeItemQuantity();
  }

  _onInputKeyPress() {
    if (this.timeoutID !== undefined) window.clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(_ => {
      this._changeItemQuantity();
    }, 800);
  }

  _changeItemQuantity() {
    let quantity = +this.input.value;
    if (quantity === 0) {
      this.input.value = 1;
    }
    this.quantitySpinner = true;
    let data = this.data;
    this.dispatchEvent(
      new CustomEvent("change-item-quantity-in-cart", {
        bubbles: true,
        composed: true,
        detail: {
          cartId: this.cartId,
          itemId: data.itemData.itemId,
          quantity: quantity
        }
      })
    );
  }

  _removeItem() {
    this.deleteSpinner = true;
    this.dispatchEvent(
      new CustomEvent("remove-item-from-cart", {
        bubbles: true,
        composed: true,
        detail: {
          cartId: this.cartId,
          itemId: this.data.itemData.itemId
        }
      })
    );
  }
}

customElements.define(HTElementsCartItem.is, HTElementsCartItem);
