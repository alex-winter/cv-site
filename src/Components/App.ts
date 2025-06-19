import { Component } from 'Component'
import { Dom } from 'Services/Dom'

export class App extends Component {

    protected css(): string {
        return /*css*/ `
            :host {
                overflow: hidden;
            }

            .container {
               background: var(--mid-blue);
               border-radius: 5px;
               margin-top: 70px;
               padding: 50px;
            }

            h1, h2, h3 {
               color: var(--white);
            }

            h2, h3 {
                letter-spacing: .15rem;
            }

            h1 {
                letter-spacing: .5rem;
            }

            h3 {
                font-size: 1.125rem;
            }

            .name, .title {
                 text-transform: uppercase;
            }

            .name {
                font-weight: 800;
            }

            .profile-image {
                width: 180px;
                height: 180px;
                border-radius: 50%;
                overflow: hidden;
                margin: -140px auto 0; 
                padding: 0;
                border: 8px solid var(--dark-colour);
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

            .border-t {
                border-top: 1px solid var(--border-colour);
            }

            .border-b {
                border-bottom: 1px solid var(--border-colour);
            }

            .contact-info > div,
            .icon-heading {
                white-space: nowrap;
            }

            .contact-info i {
                margin-right: 8px;
            }

            .contact-info a {
                color: var(--light-blue);
                text-decoration: none;
            }

            .contact-info a:hover {
                text-decoration: underline;
            }

            .icon-heading i {
                padding: 12px 14px;
                background: var(--dark-blue);
                border-radius: 50%;
                font-size: 0.7em;
            }

            .icon-heading h3 {
                text-transform: uppercase;
                font-weight: bold;
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

            <div class="row border-t border-b text-center contact-info p-3">
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

            <div class="row py-3">
                <div class="col-8 border-b">
                    <div class="icon-heading">
                        <h3><i class="fa-solid fa-user-tie"></i> About Me</h3>
                    </div>
                    <p>
                        A seasoned web developer with 10+ years of hands-on experience building and 
                        maintaining scalable, high-performance web applications. I bring deep expertise 
                        in both frontend and backend technologies, with a strong focus on clean, efficient, 
                        and maintainable code. I take pride in delivering reliable, user-focused solutions and 
                        have a track record of consistently shipping quality work. Beyond the 9-to-5, 
                        I’m always exploring new tools and working on side projects — constantly learning, 
                        improving, and keeping my skills sharp.
                    </p>
                </div>
                <div class="col-4">

                </div>
            </div>
        `

        return container
    }
}
