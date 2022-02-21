import { PlElement, html, css } from "polylib";

class PlDrawer extends PlElement {
    static get properties() {
        return {
            opened: { type: Boolean, reflectToAttribute: true },
            position: { type: String, value: 'left', reflectToAttribute: true },
            contained: { type: Boolean, reflectToAttribute: true },
            size: { type: String, value: 'small', reflectToAttribute: true },
            header: { type: String }
        }
    }

    static get css() {
        return css`
            :host {
                height: 100%;
                position: fixed;
                background: rgb(255, 255, 255);
                will-change: contents;
                z-index: 999;
                top: 0px;
                box-sizing: border-box;
                visibility: hidden;
                display: flex;
                flex-direction: column;
                will-change: transform;
                transition: ease 250ms;
            }

            :host([size=small]){
                width: 320px;
            }

            :host([size=medium]){
                width: 560px;
            }

            :host([size=large]){
                width: 920px;
            }

            :host([contained])  {
                position: absolute;
            }

            :host([position=left])  {
                left: -130%;
                border-right: 1px solid var(--grey-light);
            }

            :host([position=left][opened])  {
                left: 0px;
                visibility: visible;
            }

            :host([position=right])  {
                right: -130%;
                border-left: 1px solid var(--grey-light);
            }

            :host([position=right][opened])  {
                right: 0px;
                visibility: visible;
            }

            .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 64px;
                box-sizing: border-box;
                margin: 0 16px 0px;
                justify-content: space-between;
            }

            .header-text {
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 150%;
                color: var(--black-dark);
            }

            .content {
                height: 100%;
                border-top: 1px solid var(--grey-light);
                border-bottom: 1px solid var(--grey-light);
            }

            .footer ::slotted(*) {
                display: flex;
                flex-direction: row;
                box-sizing: border-box;
                padding: 8px;
                height: 48px;
            }
        `
    }

    static get template() {
        return html`
            <div class="header">
                <span class="header-text">[[header]]</span>
                <pl-icon-button iconset="pl-default" size="16" icon="cancel-circle" on-click="[[close]]"></pl-icon-button>
            </div>
            <div class="content">
                <slot></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
		`;
    }

    close() {
        this.opened = false;
    }
}

customElements.define('pl-drawer', PlDrawer);
