const router = require('express').Router();
const Course = require('../data/mongo/courseModel');
const courseDb = require('./course-model');
const request = require('request');
const moment = require('moment');

// {
//     number: 1,
//     name: '',
//     url: '',
// },

const newCourse = new Course({
    name: 'Full Stack Web',
    description: 'Learn React, Node, Python, Data structures and algorithms, and much more.',
    units: [
        {
            number: 1,
            name: 'Web Fundamentals',
            description: 'Learn the fundamentals of web development.',
            weeks: [
                {
                    number: 1,
                    name: 'User Interface and Git',
                    description: 'The goal of this sprint is to build user interfaces and introduce git into our work flow. Concepts covered: Semantic HTML, box model, display types, layout techniques, flex box, basic terminal use, basic git use.',
                    url: 'https://learn.lambdaschool.com/web1/sprint/recfwZvI7QhMa7xbG',
                    days: [
                        {
                            number: 1,
                            name: 'User Interface I',
                            description: 'This module will explore the fundamentals of HTML and CSS.',
                            lectureUrl: 'https://youtu.be/4H6VrMM4U6k',
                            projectUrl: 'https://codepen.io/lambdaschool/pen/vaKejB',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Semantic HTML',
                                    url: 'https://www.youtube.com/watch?v=mJkb00lk6rk&feature=emb_logo',
                                },
                                {
                                    number: 2,
                                    name: 'CSS Selectors',
                                    url: 'https://www.youtube.com/watch?v=71Re0ld_ES0&feature=emb_logo',
                                },
                                {
                                    number: 3,
                                    name: 'CSS Specificity',
                                    url: 'https://www.youtube.com/watch?v=uN-yD5usiR0&feature=emb_logo',
                                },
                            ]
                        },
                        {
                            number: 2,
                            name: 'Git for Web Development',
                            description: 'Git is a distributed version control system. What does that mean to a new web developer? It means that git is used to monitor and control code changes made during development across several people or teams.',
                            url: 'https://learn.lambdaschool.com/fsw/module/rect59e95N6OSvoCd',
                            lectureurl: 'https://www.youtube.com/watch?v=eFzHn2PQDNM&amp=&feature=youtu.be',
                            projectUrl: 'https://github.com/LambdaSchool/Git-for-Web-Development-Project',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Introduction to the Terminal',
                                    url: 'https://www.youtube.com/watch?v=vJ-9Fh2KbXk&feature=emb_logo',
                                },
                                {
                                    number: 2,
                                    name: 'Introduction to Version Control and Git',
                                    url: 'https://www.youtube.com/watch?v=a8e3kF2zYtk&feature=emb_logo',
                                },
                                {
                                    number: 3,
                                    name: 'Git 1: Fork and Clone',
                                    url: 'https://www.youtube.com/watch?time_continue=1&v=TfcuaW-YjwQ&feature=emb_logo',
                                },
                                {
                                    number: 4,
                                    name: 'GIt 2: Add/Commit/Push',
                                    url: 'https://www.youtube.com/watch?v=TIsXqSNFSV0&feature=emb_logo',
                                },
                                {
                                    number: 5,
                                    name: 'Git 3: Pull Requests',
                                    url: 'https://www.youtube.com/watch?v=GFdOSl-Zmlo&feature=emb_logo',
                                },
                                {
                                    number: 6,
                                    name: 'Git Flow',
                                    url: 'https://youtu.be/cSoHP7WSsEg',
                                },
                            ]
                        },
                        {
                            number: 3,
                            name: 'User Interface II',
                            description: 'Basic HTML and CSS are fundamental to any web site or web app on the internet. Being able to create layouts using CSS is the next progression on your journey to a full stack web developer. In this module we will cover CSS resets, box model layout, display types, and positioning.',
                            url: 'https://learn.lambdaschool.com/fsw/module/recGvXyWT6AvGtMHR',
                            lectureurl: 'https://www.youtube.com/watch?v=vMuwNTyD5Nw&feature=youtu.be',
                            projectUrl: 'https://github.com/LambdaSchool/User-Interface',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Box model',
                                    url: 'https://youtu.be/0tUUFdkTybs',
                                },
                                {
                                    number: 2,
                                    name: 'Display Properties',
                                    url: 'https://youtu.be/0352NDaFNP8',
                                },
                                {
                                    number: 3,
                                    name: 'CSS Resets',
                                    url: 'https://youtu.be/-TVGmd81Vow',
                                },
                            ]
                        },
                        {
                            number: 4,
                            name: 'User Interface III',
                            description: 'As we progress into more advanced UI layout techniques we learn about the Flexible Box Module also known as flexbox. There are many ways to layout a page in CSS but flexbox is one of the most powerful and simple ways to do it. We will discuss the basics of what flexbox is and how we use it properly to build a user interface.',
                            url: 'https://learn.lambdaschool.com/fsw/module/recaVbBZhh8BTyMdM',
                            lectureurl: 'https://www.youtube.com/watch?v=XehDD-AQvOY&feature=youtu.be',
                            projectUrl: 'https://github.com/LambdaSchool/UI-II-Flexbox',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Flexbox Module',
                                    url: 'https://youtu.be/mUZTNxqZnB8',
                                },
                                {
                                    number: 2,
                                    name: 'Flexbox Container Properties',
                                    url: 'https://youtu.be/VcIcankxOfo',
                                },
                            ],
                        },
                        {
                            number: 5,
                            name: 'Sprint Challenge - User Interface and Responsive Web Sprint Challenge',
                            description: 'This challenge will cover all of the objectives from the sprint. You will be creating a fully responsive website from several design files. Each design file comes with a set width. Those widths will be used by you to compare your work against the design.',
                            url: 'N/A',
                            lectureurl: 'N/A',
                            projectUrl: 'https://github.com/LambdaSchool/Sprint-Challenge--User-Interface',
                        },
                    ]
                },
                {
                    number: 2,
                    name: 'Advanced CSS',
                    description: 'Responsive design pushes our basic CSS styling forward into thousands of devices. A growing trend in today’s markets continue to be mobile devices that range from large tablets to small screens. You need to be able to correctly deliver content to all of these mediums.',
                    url: 'https://learn.lambdaschool.com/web1/sprint/recIXiQgpgMdJ81ms',
                    days: [
                        {
                            number: 1,
                            name: 'Responsive Design I',
                            description: 'Responsive design covers topics that range from fixed layouts to fully responsive websites. Responsive design addresses accessibility challenges and how developers can use flexible units to overcome them. On top of being accessible, fully responsive websites are a joy to use and push web development forward into the future.',
                            url: 'https://learn.lambdaschool.com/web1/module/recuDrqSGpWcepCMs',
                            lectureurl: 'https://youtu.be/zem_TMWulWc',
                            projectUrl: 'https://github.com/LambdaSchool/responsive-web-design-I',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Different Layout Types',
                                    url: 'https://youtu.be/qfEicK3gJ9E',
                                },
                                {
                                    number: 2,
                                    name: 'Media Queries',
                                    url: 'https://youtu.be/q3TcW9mTklU',
                                },
                                {
                                    number: 3,
                                    name: 'Mobile First Design',
                                    url: 'https://youtu.be/KgCa18XA0GU',
                                },
                            ],
                        },
                        {
                            number: 2,
                            name: 'Responsive Design II',
                            description: 'Understanding the problem vs fixing a problem are two different things. We aim to fix the problems presented by the thousands of devices we are required to develop for. This module will address techniques that will push your ability to code a responsive website or app further.',
                            url: 'https://learn.lambdaschool.com/web1/module/recE3IqPtDxaVI0DW',
                            lectureurl: 'https://youtu.be/P2VM_ZDGbLQ',
                            projectUrl: 'https://github.com/LambdaSchool/portfolio-website',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Responsive Design II - Units',
                                    url: 'https://youtu.be/H376eVtXfYg',
                                },
                                {
                                    number: 2,
                                    name: 'Responsive Design II - Accessibility',
                                    url: 'https://youtu.be/hPLesMhuVR8',
                                },
                            ],
                        },
                        {
                            number: 3,
                            name: 'Preprocessing I',
                            description: 'Preprocessing is simply a more robust syntax for CSS written in a different language. That language is then compiled into normal CSS.',
                            url: 'https://learn.lambdaschool.com/web1/module/reculyBhIYkuoBRqh',
                            lectureurl: 'https://youtu.be/0gPpH1Po2_w',
                            projectUrl: 'https://github.com/LambdaSchool/Preprocessing-I',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'PC Install: Node, Git Bash, Yarn, LESS, LESS Watch Compiler',
                                    url: 'https://youtu.be/xdwZb_GcqbI',
                                },
                                {
                                    number: 2,
                                    name: 'Mac Install Instructions for Node, Yarn, Less, and less-watch-compiler',
                                    url: 'https://youtu.be/PHHxdNrDBnc',
                                },
                                {
                                    number: 3,
                                    name: 'Preprocessors - II (Mixins, Nesting, Operators, Variables)',
                                    url: 'https://youtu.be/Kul8Temilk4',
                                },
                            ],
                        },
                        {
                            number: 4,
                            name: 'Preprocessing II',
                            description: 'Preprocessing opens up tools earlier web developers could never dream of. Mixins, functions, and namespaces were never available to CSS until preprocessors came along. Understanding how to use these new tools can separate an average user interface developer from a great one. Knowing these skills will make layouts so easy that the programmer can spend their valuable time on deeper logic in other more advanced languages.',
                            url: 'https://learn.lambdaschool.com/web1/module/rec1hRu3bO6L0uxn2',
                            lectureurl: 'https://youtu.be/MdUJ8UhBufM',
                            projectUrl: 'https://github.com/LambdaSchool/Preprocessing-II',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Preprocessors - II (Functions, Parametric Mixins)',
                                    url: 'https://youtu.be/WStXamzwi_8',
                                },
                                {
                                    number: 2,
                                    name: 'Preprocessors - II (LESS imports)',
                                    url: 'https://youtu.be/JwDYMcnXiSo',
                                },
                            ],
                        },
                        {
                            number: 5,
                            name: 'Sprint Challenge - Advanced CSS Sprint Challenge',
                            description: 'This challenge allows you to practice the concepts and techniques learned over the past week and apply them in a concrete project. This Sprint explored advanced CSS techniques using Responsive Design and Preprocessing. During this Sprint, you studied how to use the viewport meta tag, media queries, setting up a preprocessor, and advanced use of preprocessing techniques. In your challenge this week, you will demonstrate proficiency by updating a website that is missing content as well as adding mobile styling.',
                            url: 'N/A',
                            lectureurl: 'N/A',
                            projectUrl: 'https://github.com/LambdaSchool/Sprint-Challenge--Advanced-CSS',
                        },
                    ],
                },
                {
                    number: 3,
                    name: 'JavaScript Fundamentals',
                    description: 'One of the most powerful web languages is JavaScript. Without it, there is no web. All web browsers use JavaScript in some fashion to power rich user experiences for those interacting with a web page or application.',
                    url: 'https://learn.lambdaschool.com/web1/sprint/recclZwJxMU8kUngT',
                    days: [
                        {
                            number: 1,
                            name: 'JavaScript I',
                            description: 'JavaScript I will expose you to some deeper concepts based on some of the things you already have learned during the pre course material. As we dive a bit deeper, you’ll gain a better understanding of the fundamentals of the JavaScript programming language. The concepts that you already know about are.',
                            url: 'https://learn.lambdaschool.com/web1/module/recCT3KJYTIRYwQMh',
                            lectureurl: 'https://youtu.be/KELFimNGTjg',
                            projectUrl: 'https://github.com/LambdaSchool/JS-Exercise-Functions-Arrays-Objects',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Function Basics',
                                    url: 'https://youtu.be/A3osW_wRH0U',
                                },
                                {
                                    number: 2,
                                    name: 'JavaScript I - Objective Video: Variables',
                                    url: 'https://youtu.be/EOlgY__Ml0c',
                                },
                                {
                                    number: 3,
                                    name: 'JavaScript I - Objective Video: Object Literals',
                                    url: 'https://youtu.be/VLrBkmLZIYs',
                                },
                                {
                                    number: 4,
                                    name: 'Arrays in JavaScript',
                                    url: 'https://youtu.be/TaaCNAjpaa8',
                                },
                            ],
                        },
                        {
                            number: 2,
                            name: 'JavaScript II',
                            description: 'Throughout JavaScript II we’re going to be getting more practice with Callbacks as well as dive into a couple of new concepts. By the end of the day you should be familiar with and have the ability to use the following:',
                            url: 'https://learn.lambdaschool.com/web1/module/rec1oaBmEoSilO2yf',
                            lectureurl: 'https://youtu.be/ijZXgvUmVOU',
                            projectUrl: 'https://github.com/LambdaSchool/JS-Exercise-Closures-Callbacks-ArrayMethods',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Closures',
                                    url: 'https://youtu.be/AgBoMqDO-08',
                                },
                                {
                                    number: 2,
                                    name: 'Callbacks in JavaScript',
                                    url: 'https://youtu.be/zIRN-Gn8phU',
                                },
                                {
                                    number: 3,
                                    name: 'Array Methods',
                                    url: 'https://youtu.be/YNubYbAhtys',
                                },
                            ],
                        },
                        {
                            number: 3,
                            name: 'JavaScript III',
                            description: 'JavaScript III introduces us to the this keyword and it’s many uses. After we learn about this we are prepared to discuss prototypes in JavaScript and explore how they are in every aspect of JavaScript.',
                            url: 'https://learn.lambdaschool.com/web1/module/rec0AWuNLezbpit7m',
                            lectureurl: 'https://youtu.be/LL6zvstnRpY',
                            projectUrl: 'https://github.com/LambdaSchool/JS-Exercise-Prototype',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'The this keyword in JavaScript',
                                    url: 'https://youtu.be/RivFFKFbpXo',
                                },
                                {
                                    number: 2,
                                    name: 'Constructors & Prototypes',
                                    url: 'https://youtu.be/5jjDXm-f0SI',
                                },
                            ],
                        },
                        {
                            number: 4,
                            name: 'JavaScript IV',
                            description: `JavaScript IV introduces you to the powerful paradigm of Object Oriented Programming (OOP) in JavaScript. We will take a deep dive into these topics: The JavaScript Prototype object , constructor functions, Pseudo-classical Inheritence, the class keyword`,
                            url: 'https://learn.lambdaschool.com/web1/module/recyS588eOvVUKAMc',
                            lectureurl: 'https://youtu.be/Y2CGprDIU1s',
                            projectUrl: 'https://github.com/LambdaSchool/JS-Exercise-Classes',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Classes',
                                    url: 'https://youtu.be/D3Yx_ohAet4',
                                },
                                {
                                    number: 2,
                                    name: 'Converting Constructors into Classes',
                                    url: 'https://youtu.be/gnDkLbeof60',
                                },
                            ],
                        },
                        {
                            number: 5,
                            name: 'Sprint Challenge - JavaScript Foundations Sprint Challenge',
                            description: 'There are four short answer questions. And a challenge including some of the problems the students worked on throughout the week.',
                            url: 'N/A',
                            lectureurl: 'N/A',
                            projectUrl: 'https://github.com/LambdaSchool/Sprint-Challenge--JavaScript',
                        },

                    ],
                },
                {
                    number: 4,
                    name: 'Unit 1 Build Week',
                    description: '',
                    url: '',
                },
            ]
        },
        {
            number: 2,
            name: 'Web Applications I',
            description: '',
            weeks: [
                {
                    number: 1,
                    name: 'Applied JavaScript',
                    description: 'This week is all about exposing you to applying your Javascript knowledge to the Document Object Model and creating rich Javascript user interfaces.',
                    url: 'https://learn.lambdaschool.com/web2/sprint/recPSZMPrmESUYo2C',
                    days: [
                        {
                            number: 1,
                            name: 'DOM 1',
                            description: 'Now that we can build a basic static web page with HTML and CSS, we need to add functionality to the page. The first step in building vibrant dynamic web pages and applications is learning about the DOM. What it is, how it affects our page, and how to access and manipulate it. DOM manipulation is at the core of every framework and before we start using frameworks we need to understand the DOM.',
                            url: 'https://learn.lambdaschool.com/web2/module/rectn5PUU5ubcQkPu',
                            lectureurl: 'https://youtu.be/PK3yLJ0koHs',
                            projectUrl: 'https://github.com/LambdaSchool/DOM-I',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Introduction to DOM',
                                    url: 'https://youtu.be/k6nS8-lq_YY',
                                },
                                {
                                    number: 2,
                                    name: 'DOM Selectors',
                                    url: 'https://youtu.be/WVq-2Yp7wgU',
                                },
                                {
                                    number: 3,
                                    name: 'DOM Properties and Methods',
                                    url: 'https://youtu.be/cuXOWWsrcNk',
                                },
                                {
                                    number: 4,
                                    name: 'DOM createElement',
                                    url: 'https://youtu.be/ikmnlhPDiyo',
                                },
                            ],
                        },
                        {
                            number: 2,
                            name: 'DOM 2',
                            description: 'Events are the way we users interact with the page. Any time there is some interaction by way of a mouse, keyboard, etc., the DOM creates and propagates an event object. This event object carries information about the event so that it may be handled at any point up the tree from the point of origin.',
                            url: 'https://learn.lambdaschool.com/web2/module/recJWv3RIfa4NFXbn',
                            lectureurl: 'https://youtu.be/CieRzBB7Q7w',
                            projectUrl: 'https://github.com/LambdaSchool/DOM-II',
                            prepVideos: [
                                // none
                            ],
                        },
                        {
                            number: 3,
                            name: 'Components 1',
                            description: 'As we build larger and more feature rich web pages, we may notice a trend in our code; elements that are essentially using the same functionality and styling with minor differences in the data they present. In an effort to keep our code readable, reusable, and most of all DRY, we can build on these repeating patterns and create components. Components are reusable pieces of code that can be used to build elements sharing functionality and styling. Components are the heart of any dynamic web application and JavaScript framework.',
                            url: 'https://learn.lambdaschool.com/web2/module/rec847sNXZX9CVDNl',
                            lectureurl: 'https://youtu.be/2Rn6qi73ppw',
                            projectUrl: 'https://github.com/LambdaSchool/Newsfeed-Components',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Components I - Anatomy of a Component',
                                    url: 'https://youtu.be/1Z775bFt6xs',
                                },
                                {
                                    number: 2,
                                    name: 'Components I - Component creator functions',
                                    url: 'https://youtu.be/EKjI2jX0R2E',
                                },
                                {
                                    number: 3,
                                    name: 'Components I - Creating Components from Array Data',
                                    url: 'https://youtu.be/vu_bl_vHJcg',
                                },
                            ],
                        },
                        {
                            number: 4,
                            name: 'Components 2',
                            description: 'Now that we have some understanding of what a component is, we can learn to utilize asynchronous JavaScript and Promises to make HTTP requests and get data from a server.',
                            url: 'https://learn.lambdaschool.com/web2/module/recd6kDKS6eMapSRq',
                            lectureurl: 'https://youtu.be/V4rlLTL10iU',
                            projectUrl: 'https://github.com/LambdaSchool/github-usercard',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'JavaScript Promises',
                                    url: 'https://youtu.be/7I3TeN2Sj1k',
                                },
                            ],
                        },
                        {
                            number: 5,
                            name: 'Sprint Challenge - Applied JavaScript Challenge',
                            description: 'This challenge covers DOM I, DOM II, Components I, Components II.',
                            projectUrl: 'https://github.com/LambdaSchool/Sprint-Challenge-Applied-Javascript',
                        },
                    ],
                },
                {
                    number: 2,
                    name: 'Intro to React',
                    description: 'React is a UI library that is used in various forms to create complex, rich user interfaces.',
                    url: 'https://learn.lambdaschool.com/web2/sprint/recYL2HDPPpkDmGEm',
                    days: [
                        {
                            number: 1,
                            name: 'React Components and Component State',
                            description: 'Components are the building blocks of React applications. We use components to display some data (often called “state”) to the screen for our users. In this module, we will learn how to build components that can hold state to create a great experience for our end users.',
                            url: 'https://learn.lambdaschool.com/web2/module/recZau7hH8vzww14N',
                            lectureurl: 'https://youtu.be/aIYXdTtek8k',
                            projectUrl: 'https://github.com/LambdaSchool/react-american-football-scoreboard',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'ReactJS',
                                    url: 'https://youtu.be/moTpUR8I6-I',
                                },
                                {
                                    number: 2,
                                    name: 'React Components',
                                    url: 'https://youtu.be/njU-xhnlze8',
                                },
                                {
                                    number: 3,
                                    name: 'Component State',
                                    url: 'https://youtu.be/vF4vKyhRff8',
                                },
                                {
                                    number: 4,
                                    name: 'Changing State',
                                    url: 'https://youtu.be/J3mKJbudYDQ',
                                },
                            ],
                        },
                        {
                            number: 2,
                            name: 'Composing React Components and Passing Data Via Props',
                            description: 'As you build bigger applications, you’ll want to start splitting up your app into smaller pieces so that it is easier to work on and maintain. These small pieces you will build are called components. Components will need to share state, so we will learn how to do this with a helper object called props.',
                            url: 'https://learn.lambdaschool.com/web2/module/recgzSGQtp2HYwgSR',
                            lectureurl: 'https://youtu.be/VnSpY7tmEDA',
                            projectUrl: 'https://github.com/LambdaSchool/lambda-calculator',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'JavaScript Modules',
                                    url: 'https://youtu.be/EOuwkNt-MCU',
                                },
                                {
                                    number: 2,
                                    name: 'Props and Data Flow',
                                    url: 'https://youtu.be/ZBzHw78nzQM',
                                },
                                {
                                    number: 3,
                                    name: 'React Nested Functional Components',
                                    url: 'https://youtu.be/5lzKaiC8ask',
                                },
                                {
                                    number: 4,
                                    name: 'Passing State Through Props',
                                    url: 'https://youtu.be/PDLixDiT-BA',
                                },
                            ],
                        },
                        {
                            number: 3,
                            name: 'Component Side Effects',
                            description: 'Side effects in web apps are very common. It’s important to understand what side effects are so we can handle them properly in our components.',
                            url: 'https://learn.lambdaschool.com/web2/module/recKe8PW6ZMwjL1Qg',
                            lectureurl: 'https://youtu.be/Omi5poWxLEs',
                            projectUrl: 'https://github.com/LambdaSchool/nasa-photo-of-the-day',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Side Effects in React',
                                    url: 'https://youtu.be/M5yZxpyub48',
                                },
                                {
                                    number: 2,
                                    name: 'Syncing Effects to Changes in State and Props',
                                    url: 'https://youtu.be/7oCm8Ih-ZCA',
                                },
                                {
                                    number: 3,
                                    name: 'Fetch Data from an API Using the Effect Hook',
                                    url: 'https://youtu.be/jMa1nnILdNM',
                                },
                                {
                                    number: 4,
                                    name: 'Cleaning Up After Effects',
                                    url: 'https://youtu.be/rCtq5zvWI0Y',
                                },
                            ],
                        },
                        {
                            number: 4,
                            name: 'Advanced Styling Techniques',
                            description: 'CSS by itself can be hard to scale in large applications. In this module we will see multiple libraries that have been built to help us style our apps in a lot more scalable way.',
                            url: 'https://learn.lambdaschool.com/web2/module/recNDoSqyUw3eq1y3',
                            lectureurl: 'https://youtu.be/t_ab2hQPd88',
                            projectUrl: 'https://github.com/LambdaSchool/nasa-photo-of-the-day',
                            prepVideos: [
                                {
                                    number: 1,
                                    name: 'Create React App',
                                    url: 'https://youtu.be/kKEb6ZIq8L0',
                                },
                                {
                                    number: 2,
                                    name: 'Using Reactstrap with Create React App',
                                    url: 'https://youtu.be/aAVCh5Xf_4E',
                                },
                                {
                                    number: 3,
                                    name: 'React & Styled Components',
                                    url: 'https://youtu.be/BFKQWaWwaQ0',
                                },
                            ],
                        },
                        {
                            number: 5,
                            name: 'https://github.com/LambdaSchool/Sprint-Challenge---React',
                            description: 'This project will have you consuming a list of data from a server that we’re pulling in. The idea is to build out the proper components in order to get this list of data rendered to the screen using ReactJS and styling your app to be presentable.',
                            projectUrl: 'https://github.com/LambdaSchool/Sprint-Challenge---React',
                        },
                    ],
                },
                {
                    number: 3,
                    name: 'Single Page Applications',
                    description: 'This week we’ll be learning about using two very useful packages with React: React Router and Formik. With the UI Library (React), the Client Side Routing Library (React Router), and the Form library Formik, you’ll be able to craft rich, robust and highly scale-able Single Page Applications.',
                    url: 'https://learn.lambdaschool.com/web2/sprint/recRT8JKvbTiGaosk',
                    days: [
                        {
                            number: 1,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 2,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 3,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 4,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 5,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                        },
                    ],
                },
                {
                    number: 4,
                    name: 'Unit 2 Build Week',
                    description: '',
                    url: '',
                },
            ],
        },
        {
            number: 3,
            name: 'Web Applications II',
            description: '',
            weeks: [
                {
                    number: 1,
                    name: 'Advanced React',
                    description: '',
                    url: 'https://learn.lambdaschool.com/web3/sprint/recq59MvEIZfUAohy',
                    days: [
                        {
                            number: 1,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 2,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 3,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 4,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 5,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                        },
                    ],
                },
                {
                    number: 2,
                    name: 'Advanced State Management',
                    description: '',
                    url: 'https://learn.lambdaschool.com/web3/sprint/recukritK1B1pFrcM',
                    days: [
                        {
                            number: 1,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 2,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 3,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 4,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 5,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                        },
                    ],
                },
                {
                    number: 3,
                    name: 'Advanced Web Applications',
                    description: '',
                    url: 'https://learn.lambdaschool.com/web3/sprint/recnhsJGy28gNi1K5',
                    days: [
                        {
                            number: 1,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 2,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 3,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 4,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                            prepVideos: [
                                
                            ],
                        },
                        {
                            number: 5,
                            name: '',
                            description: '',
                            url: '',
                            lectureurl: '',
                            projectUrl: '',
                        },
                    ],
                },
                {
                    number: 4,
                    name: 'Unit 3 Build Week',
                    description: '',
                    url: '',
                },
            ],
        },
        {
            number: 4,
            name: 'Web API: Node',
            description: '',
            weeks: [
                
            ],
        },
        {
            number: 5,
            name: 'Web API: Java',
            description: '',
            weeks: [
                
            ],
        },
    ]
});

// newCourse
//   .save()
//   .then(item => console.log(item))
//   .catch(err => console.log(err));

router.get('/', async (req, res) => {
    const {course, unit, week, day} = req.query;
    
    try{
        if(!course && (unit || week || day)){
            throw 'No course query string provided'
        }else if((unit && isNaN(unit)) || (week && isNaN(week)) || (day && isNaN(day))){
            throw 'Invalid unit, week, or day';
        }
        if(course && unit && week && day){
            const [result] = await courseDb.findDay(course, unit, week, day);
            if(!result) throw 'Not found';
            res.status(200).json(result);
        }else if(course && unit && week){
            const [result] = await courseDb.findWeek(course, unit, week);
                if(!result) throw 'Not found';                
            res.status(200).json(result);            
        }else if(course && unit){
            const [result] = await courseDb.findUnit(course, unit);
            if(!result) throw 'Not found';
            res.status(200).json(result);             
        }else if(course){
            const [result] = await courseDb.findCourse(course);
            if(!result) throw 'Not found';
            res.status(200).json(result);
        }else{
            const [result] = await courseDb.findCourses();
            res.status(200).json(result);
        }
    }catch(err){
        if(err === 'Not found'){
            res.status(404).json({message: `No result found using specified query parameters` });
        }else if(err === 'No course query string provided'){
            res.status(400).json({message: err});
        }else if(err === 'Invalid unit, week, or day'){
            res.status(400).json({message: 'Invalid query string. Unit, week, and day must be a number'});
        }else{
            console.log(err);
            res.status(500).json({message: 'Error retrieving course information'});
        }
    }
});

router.post('/today', async (req, res) => {
    const {slack, user_id} = req.body;

    try{
        if(slack && user_id){
            var data = {form: {
                token: process.env.SLACK_AUTH_TOKEN,
                user: user_id
                }
            };
            
            await request.post('https://slack.com/api/im.open', data, async function (error, response, body) {
                const {id} = (JSON.parse(body).channel);
                const now = moment().format('MM/DD/YYYY');
                const [result] = await courseDb.findDay('Full Stack Web', 1, 1, 2);
                console.log(result);
                data = {form: {
                    token: process.env.SLACK_AUTH_TOKEN,
                    channel: id,
                    text: `Today is ${now}.`,
                    blocks: JSON.stringify([
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Today\'s information*:"
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Name*: ${result.name}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Description*: \n${result.description}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Project:* ${result.projectUrl}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Preparation videos*:"
                            }
                        },
                        {
                            "type": "section",
                            "fields": result.prepVideos.map((vid, i) => {
                                return {
                                    "type": "mrkdwn",
                                    "text": `*${i+1}*: ${vid.name}\n${vid.url}`
                                }
                            })
                        }
                    ])
                    }
                }
    
                await request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {});
                res.status(200).json(now);
            });
        }else{
            throw "slack and user_id error"
        }
    }catch(err){
        res.status(500).json({message: 'Error retrieving today\'s course information'});
    }
})

router.post('/yesterday', async (req, res) => {
    const {slack, user_id} = req.body;

    try{
        if(slack && user_id){
            var data = {form: {
                token: process.env.SLACK_AUTH_TOKEN,
                user: user_id
                }
            };
            
            await request.post('https://slack.com/api/im.open', data, async function (error, response, body) {
                const {id} = (JSON.parse(body).channel);
                const now = moment().subtract(1, 'day').format('MM/DD/YYYY');
                const [result] = await courseDb.findDay('Full Stack Web', 1, 1, 1);
                console.log(result);
                data = {form: {
                    token: process.env.SLACK_AUTH_TOKEN,
                    channel: id,
                    text: `Yesterday was ${now}.`,
                    blocks: JSON.stringify([
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Today\'s information*:"
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Name*: ${result.name}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Description*: \n${result.description}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Project:* ${result.projectUrl}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Preparation videos*:"
                            }
                        },
                        {
                            "type": "section",
                            "fields": result.prepVideos.map((vid, i) => {
                                return {
                                    "type": "mrkdwn",
                                    "text": `*${i+1}*: ${vid.name}\n${vid.url}`
                                }
                            })
                        }
                    ])
                    }
                }
    
                await request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {});
                res.status(200).json(now);
            });
        }else{
            throw "slack and user_id error"
        }
    }catch(err){
        res.status(500).json({message: 'Error retrieving today\'s course information'});
    }
})

router.post('/tomorrow', async (req, res) => {
    const {slack, user_id} = req.body;

    try{
        if(slack && user_id){
            var data = {form: {
                token: process.env.SLACK_AUTH_TOKEN,
                user: user_id,
                }
            };
            
            await request.post('https://slack.com/api/im.open', data, async function (error, response, body) {
                const {id} = (JSON.parse(body).channel);
                const now = moment().add(1, 'day').format('MM/DD/YYYY');
                const [result] = await courseDb.findDay('Full Stack Web', 1, 1, 1);
                console.log(result);
                data = {form: {
                    token: process.env.SLACK_AUTH_TOKEN,
                    channel: id,
                    text: `Tomorrow is ${now}.`,
                    blocks: JSON.stringify([
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Today\'s information*:"
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Name*: ${result.name}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Description*: \n${result.description}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `*Project:* ${result.projectUrl}`
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Preparation videos*:"
                            }
                        },
                        {
                            "type": "section",
                            "fields": result.prepVideos.map((vid, i) => {
                                return {
                                    "type": "mrkdwn",
                                    "text": `*${i+1}*: ${vid.name}\n${vid.url}`
                                }
                            })
                        }
                    ])
                    }
                }
    
                await request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {});
                res.status(200).json(now);
            });
        }else{
            throw "slack and user_id error"
        }
    }catch(err){
        res.status(500).json({message: 'Error retrieving today\'s course information'});
    }
})

module.exports = router;

function axiosWithAuth(token){
    checkToken(token);
//     return axios.create{
//         ...
//     }
}

function checkToken(token){
    let valid = false;
    axios.post('/checkToken', token)
    .then(res => {
        if(res.data.valid){
            valid = true;
        }
    })

    return valid;
}