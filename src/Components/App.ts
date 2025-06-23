import { Component } from 'Component'
import { Dom } from 'Services/Dom'
import Chart from 'chart.js/auto'

type Job = {
    company: {
        name: string
        description: string
    }
    start: string
    end: string
    titles: string[]
    points: string[]
}

type TechSkill = {
    name: string
    level: number
    years: string
}

type Project = {
    title: string
    url: string
    description: string
}

const projects = [
    {
        url: 'https://github.com/alex-winter/event-driven-web-component-framework',
        title: 'Event Driven Web Component Framework',
        description: 'My very own JS framework that I use for my personal projects',
    },
    {
        url: 'https://github.com/alex-winter/game-maker',
        title: '2d Game Maker',
        description: 'Layers of complexity to improve my core JS and client side knowledge',
    },
    {
        url: 'https://github.com/alex-winter/nimbus-weather-forecast',
        title: 'Nimbus Weather Forecast',
        description: 'Built in React js a simple weather app that plugs into APIs'
    }
]

const jobs: Job[] = [
    {
        company: {
            name: 'Mitratech Prevalent',
            description: 'Risk management platform',
        },
        start: '2023',
        end: '2025',
        titles: ['Software Engineer'],
        points: [
            'Designed and delivered full-stack solutions aligned with stakeholder requirements.',
            'Oversaw the complete software lifecycle: design, implementation, testing, and deployment.',
            'Led platform upgrades and promoted stronger testing practices across the team.',
        ],
    },
    {
        company: {
            name: 'Efficio Consulting',
            description: 'Procurement consultancy',
        },
        start: '2016',
        end: '2023',
        titles: ['Software Engineer', 'Team Lead'],
        points: [
            'Mentoring developers / Upskilling',
            'Initiated and led engineering-wide improvements, with a focus on quality, maintainability, and delivery speed.',
            'Lead development team on number of platform greenfields, additional features on existing products, upgrades of legacy software',
            'Advocate of TDD within digital',
        ],
    },
    {
        company: {
            name: 'Dedoko',
            description: 'website and web application development',
        },
        start: '2015',
        end: '2016',
        titles: ['Junior Developer'],
        points: [
            'bug fixing',
            'website maintenance',
            'development of our main client (Efficio) platform of the time who later aquired Dedoko',
        ],
    },
    {
        company: {
            name: 'Techbods',
            description: 'Electronics repair shop / websites ',
        },
        start: '2012',
        end: '2015',
        titles: ['Full-Stack Web Developer'],
        points: [
            'customer service',
            'website creation and maintenance',
            'developed the internal job tracking system',
        ],
    },
]

const tech: TechSkill[] = [
    {
        name: 'PHP',
        level: 100,
        years: '10+'
    },
    {
        name: 'JavaScript',
        level: 95,
        years: '10+'
    },
    {
        name: 'TypeScript',
        level: 95,
        years: '7+'
    },
    {
        name: 'Docker',
        level: 80,
        years: '10+'
    },
    {
        name: 'Laravel',
        level: 85,
        years: '5+'
    },
    {
        name: 'Slim',
        level: 100,
        years: '8+'
    },
    {
        name: 'HTML5',
        level: 100,
        years: '10+'
    },
    {
        name: 'CSS3',
        level: 90,
        years: '10+'
    },
    {
        name: 'Angular',
        level: 55,
        years: '2+'
    },
    {
        name: 'React',
        level: 60,
        years: '1'
    },
    {
        name: 'Git',
        level: 95,
        years: '10+'
    },
]

export class App extends Component {

    protected css(): string {
        return /*css*/ `
            :host {
                overflow: hidden;
            }

            .container {
                background: var(--mid-blue);
                border-radius: 5px;
                padding: 50px;
                margin-top: 140px;
                margin-bottom: 40px;
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

            h2 {
                font-size: 1rem;
            }

            h3 {
                font-size: 1.125rem;
            }

            a {
                text-decoration: none;
            }

            ul {
                list-style-position: inside;
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
                border: 8px solid var(--mid-blue);
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
                padding: 12px 10px 10px 12px;
                background: var(--dark-blue);
                border-radius: 50%;
                font-size: 0.7em;
            }

            .icon-heading h3 {
                text-transform: uppercase;
                font-weight: bold;
            }

            .badge {
                background-color: var(--dark-blue);
            }

            .timeline {
                position: relative;
                padding-left: 2.5rem;
            }

            .timeline::before {
                content: "";
                display: inline-block;
                width: 3px;
                height: 100%;
                background: rgba(0, 0, 0, .1);
                left: 28px;
                top: 16px;
                position: absolute;
            }

            .timeline-job {
                position: relative;
            }

            .timeline-job::before {
                content: "";
                display: inline-block;
                position: absolute;
                left: -15px;
                top: 3px;
                width: 10px;
                height: 10px;
                border: 2px solid var(--light-blue);
                background: rgba(0, 0, 0, .3);
                border-radius: 50%;
            }

            .progress-bar {
                background-color: var(--light-blue);
                color: var(--dark-blue);
            }
        `
    }

    protected build(): HTMLElement {
        const container = Dom.div('container')

        container.innerHTML = /*html*/`
            <div class="row text-center">
                <div class="profile-image">
                    <img src="/img/profile.png" alt="Profile Image">
                </div>
                <h1 class="name pt-2">Alex Winter</h1>
                <h2 class="title py-3">Senior Web Engineer</h2>
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
                    <i class="fa-brands fa-linkedin"></i>
                    <a href="https://www.linkedin.com/in/alex-winter-7554a349/" target="_blank"> Linkedin</a>
                </div>
            </div>

            <div class="row py-3 gx-5">
                <div class="col-12 col-md-8">
                    <div class="row border-b py-4">
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
                    <div class="row py-4">
                        <div class="icon-heading">
                            <h3><i class="fa-solid fa-suitcase"></i> Work Experience</h3>
                        </div>
                        <div class="timeline">
                            ${this.buildJobs(jobs)}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="row">
                        <div class="col-12 border-b py-3">
                            <div class="icon-heading">
                                <h3><i class="fa-solid fa-microchip"></i> Tech Stack</h3>
                            </div>
                            ${this.buildTech(tech)}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 border-b py-3">
                            <div class="icon-heading">
                                <h3><i class="fa-solid fa-user-tie"></i> Soft Skills</h3>
                            </div>
                            <div class="badge">Mentoring</div>
                            <div class="badge">Upskilling</div>
                            <div class="badge">Team Lead</div>
                            <div class="badge">TDD Advocate</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 border-b py-3">
                            <canvas></canvas>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="icon-heading my-3">
                                <h3><i class="fa-solid fa-user-tie"></i> Current Projects</h3>
                            </div>
                            ${this.buildProjectLinks(projects)}
                        </div>
                    </div>
                </div>
            </div>
        `

        return container
    }

    protected afterBuild(): void {
        this.makeProfileGraph()
    }

    private buildProjectLinks(projects: Project[]): string {
        return projects.map(project => /*html*/`
            <div class="row my-2">
                <a href="${project.url}" target="blank">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> ${project.title}
                </a>
                <small>${project.description}</small>  
            </div>
        `).join('')
    }

    private buildTech(tech: TechSkill[]): string {
        return tech.map(skill => /*html*/`
            <div class="py-2">
                <div class="progress align-self-center" role="progressbar" aria-label="Example with label" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${skill.level.toString()}%">${skill.name}</div>
                </div>  
            </div>
        `).join('')
    }

    private buildJobs(jobs: Job[]): string {
        return jobs.map(job => /*html*/`
            <div class="timeline-job px-3 pl-3 mt-3 mb-5">
                <div class="row heading pb-2">
                    <div class="col-6">
                        ${job.start} - ${job.end}
                    </div>
                    <div class="col-6 text-end">
                        <div class="badge" >${job.company.name}</div>
                    </div>
                </div>
                <div class="row points">
                    <h3>${job.titles.join(' / ')}</h3>
                    <ul>
                        <li>${job.points.join('</li><li>')}</li>
                    </ul>
                </div>
            </div>
        `).join('')
    }

    private makeProfileGraph() {
        const canvas: HTMLCanvasElement = this.findOne('canvas')!

        const data = {
            labels: [
                'Frontend Engineering',
                // 'Winning at Mario Kart',
                'Backend Engineering',
                'Team Leadership',
                // 'Understanding IKEA Instructions',
                'Problem Solving',
                // 'Remembering Why I Walked into a Room',
                'Mentorship',
                'System Design'
            ],
            datasets: [{
                label: 'Skill Proficiency',
                data: [90, 95, 75, 88, 80, 95],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
            }]
        }

        const config = {
            type: 'radar',
            data: data,
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            display: false
                        }
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                responsive: true,
            }
        }

        new Chart(canvas, config as unknown as any)
    }

}
