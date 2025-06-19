import { Component } from 'Component'
import { Dom } from 'Services/Dom'

export class App extends Component {

    protected css(): string {
        return /*css*/ `
            :host {
                overflow: hidden;
            }

            .container {
               background: #1e2738;
               border-radius: 5px;
               margin-top: 70px;
               padding: 50px;
            }

            h1, h2, h3 {
               color: #fcffff;
            }

            .name, .title {
                 text-transform: uppercase;
                 color: #fcffff;
            }

            .profile-image {
                width: 180px;
                height: 180px;
                border-radius: 50%;
                overflow: hidden;
                margin: -140px auto 0; 
                padding: 0;
                border: 8px solid #1e2738;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .profile-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }

            .border-top {
                border-top: 1px solid #a5b3ce;
            }

            .border-bottom {
                border-bottom: 1px solid #a5b3ce;
            }

            .contact-info > div {
                white-space: nowrap;
            }

            .contact-info i {
                margin-right: 8px;
            }

            .contact-info a {
                color: #a5b3ce;
                text-decoration: none;
            }

            .contact-info a:hover {
                text-decoration: underline;
            }
        `
    }

    protected build(): HTMLElement {
        const container = Dom.div('container')

        container.innerHTML = /*html*/`
            <div class="row text-center">
                <div class="profile-image">
                    <img src="https://cdn.vectorstock.com/i/500p/62/34/user-profile-icon-anonymous-person-symbol-blank-vector-53216234.jpg" alt="Profile Image">
                </div>
                <h1 class="name">Alex Winter</h1>
                <p class="title">Senior Web Engineer</p>
            </div>

            <div class="row border-top border-bottom text-center contact-info p-3">
                <div class="col-12 col-sm-6 col-md-4">
                    <i class="fas fa-phone"></i> 07783345369
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:ajwinter42@gmail.com">ajwinter42@gmail.com</a>
                </div>
                <div class="col-12 col-sm-12 col-md-4">
                    <i class="fab fa-github"></i>
                    <a href="https://github.com/alex-winter" target="_blank">alex-winter</a>
                </div>
            </div>
        `

        return container
    }
}
