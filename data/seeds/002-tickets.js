
exports.seed = function(knex) {
      return knex('tickets').insert([
        {     
          category: 'Security',
          title: 'Question about salts',
          description: 'Given the following async hash from bcrypt. should I be storing the salt in an environment variable? And not really familiar with Heroku\'s environment structure, does it just have one environment file I can put the salt in?',
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 1
        },
        {        
          category: 'Testing',
          title: 'Need help testing',
          description: 'anyone able to help with testing? I feel like I\'m missing something to start but I\'m not really sure what. I feel like this should be working',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 1
        },
        {        
          category: 'API',
          title: 'Nesting routes',
          description: 'I\’m attempting to properly nest routes to get the API web url formatted the way I need it. I was working with someone who said that, because it is Thursday, I need to immediately jump over to the helpdesk when they had to leave and get into Zoom with someone who possess an intimate knowledge of backend development and APIs.',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 2
        },
        {        
          category: 'Heroku',
          title: 'Heroku',
          description: 'Im following the video posted in the WEB23 channel about using postgress on heroku. when I run npx heroku run knex migrate:latest -a app-name it starts to work then throws an error saying it cant find the module PG which I have 100% installed. Any ideas? Ill post a screenshot of the error below',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 3
        },
        {        
          category: 'Databases',
          title: 'Tables not truncating',
          description: 'Anyone know why my database tables (for testing) are not truncating even though I\m using truncate()',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 4
        },
        {         
          category: 'API',
          title: 'Server won\'t boot',
          description: 'I am having this issue with booting my server, didn\'t have it yesterday. What did I do wrong?',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 5
        },
        {       
          category: 'Testing',
          title: 'Unit testing issues',
          description: 'I\'m having some trouble unit testing protected routes; I\'m not really sure of the best way to give my tests a persistent token so I can actually test those endpoints. Anyone have any good resources they could point me toward?',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 1
        },
        {        
          category: 'Databases',
          title: 'Seed error',
          description: 'So I\'ve been getting this error on my final table seed run.  I\'m not seeing the reason for this and websites werent very helpful',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 2
        },
        {       
          category: 'Testing',
          title: 'Testing error',
          description: 'Getting this error when I try to run a test.',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 3
        },
        {         
          category: 'Databases',
          title: 'Rollback migrations',
          description: 'Trying to rollback my migrations on my testing/development databases, but it keeps telling me I\'m already at base migration. When I look at my DBs in pgAdmin I can see the tables are still there though (so it\'s wrong)',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 4
        },
        {        
          category: 'PostgreSQL',
          title: 'Post request errors',
          description: 'I\'m receiving this error when making post requests to my postgres deployment have any ideas?',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 5
        },
        {
          category: 'CSS',
          title: 'Centering in CSS Grid',
          description: `I\'m trying to create a simple page with CSS Grid.<br/>What I'm failing to do is center the text from the HTML to the respective grid cells.<br/>I\'ve tried placing content in separate divs both inside and outside of the left_bg and right_bg selectors and playing with some of the CSS properties to no avail.<br/>How do I do this?`,
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 1
        },
        {
          category: 'JS',
          title: 'Javascript reduce on array of objects',
          description: `Say I want to sum a.x for each element in arr.<br/>arr = [{x:1},{x:2},{x:4}]<br/>arr.reduce(function(a,b){return a.x + b.x}) >> NaN<br/>I have cause to believe that a.x is undefined at some point.<br/>The following works fine:<br/>arr = [1,2,4] arr.reduce(function(a,b){return a + b}) >> 7
        <br/>What am I doing wrong in the first example?`,
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 2
          
        
        },
        {
          category: 'CSS',
          title: 'How do I style a select dropdown with only CSS?',
          description: `Is there a CSS-only way to style a <select> dropdown? 
          I need to style a <select> form as much as humanly possible, without any JavaScript. What are the properties I can use to do so in CSS?
          This code needs to be compatible with all major browsers:
          Internet Explorer 6, 7, and 8
          Firefox
          Safari`,
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 3
        },
        {
          category: 'Javascript',
          title: 'For loop in react render method',
          description: 'I want create paging link for my grid.I pass maxPages(number) property to component but i cant use for in render method. What can i do ?',
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 4
        },
        {
          category: 'React',
          title: 'What is the difference between state and props in React?',
          description: `I was watching a Pluralsight course on React and the instructor stated that props should not be changed. I'm now reading an article (uberVU/react-guide) on props vs. state and it says
          Both props and state changes trigger a render update.
          Later in the article it says:
          Props (short for properties) are a Component's configuration, its options if you may. They are received from above and immutable.
          So props can change but they should be immutable?
          When should you use props and when should you use state?
          If you have data that a React component needs, should it be passed through props or setup in the React component via getInitialState?`,
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 5

        },
        {
          category: 'Javascript',
          title: 'What is the difference between Bower and npm?',
          description: `What is the fundamental difference between bower and npm? Just want something plain and simple. I've seen some of my colleagues use bower and npm interchangeably in their projects.`,
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 1
        },
      
        {
          category: 'React',
          title: 'React - changing an uncontrolled input',
          description: 'For an input to be controlled, its value must correspond to that of a state variable. What does that mean?',
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 2
        },
        {
          category: 'React',
          title: 'React - changing an uncontrolled input',
          description: 'For an input to be controlled, its value must correspond to that of a state variable. What does that mean?',
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 3
        },
        {
          category: 'React',
          title: 'React - changing an uncontrolled input',
          description: 'For an input to be controlled, its value must correspond to that of a state variable. What does that mean?',
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 4
        },
        {
          category: 'React',
          title: 'React - changing an uncontrolled input',
          description: 'For an input to be controlled, its value must correspond to that of a state variable. What does that mean?',
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 5
        },
        {        
          ////
          category: 'SQL',
          title: 'Need help setting up an API',
          description: 'When I try running migrations, I get a SQL error - is anyone able to help?',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 1
        },
        {        
          category: 'Testing',
          title: 'React Testing',
          description: 'Im attempting to create a test on all of my react functions - however, when I try to run them, i get an error saying that my test is unable to run. Any help is appreciated',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 2
        },
        {        
          category: 'Heroku',
          title: 'Heroku Deployment',
          description: 'Im following the video posted in the WEB23 channel about using postgres on heroku. when I run npx heroku run knex migrate:latest, my migration is unable to run. Ive tried both rolling the migration, and erasing the db3 file.',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 3
        },
        {       
          category: 'Databases',
          title: 'Tables not truncating',
          description: 'Not sure whats going on - anytime i try to truncate, my data is still remaining. Any eyes would be helpful.',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 4
        },
        {         
          category: 'Server',
          title: 'Server does not run',
          description: 'Why wont my server start? The server im running is not running anywhere else locally, and ive got everything set up like the guided project.',
          course: 'Full Stack Web',
          unit: 1,
          week: 1,
          day: 5
        },
        {       
          category: 'Seeds',
          title: 'Seeds',
          description: 'Does anyone know of a command that will let me rollback seeds? kind of like knex migration:rollback. I cant find anything online',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 1
        },
        {        
          category: 'Seeds',
          title: 'Seed error',
          description: 'Not sure whats going on, im very frustrated.',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 2
        },
        {       
          category: 'Testing',
          title: 'Testing error',
          description: 'Im trying to test my api, and nothing seems to be running properly. Im sorry i cant give a more in-depth description, but I really just need a second set of eyes',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 3
        },
        {         
          category: 'Rollbacks',
          title: 'Rollback migrations',
          description: 'Trying to rollback my migrations on my testing/development databases, but it keeps telling me I\'m already at base migration. When I look at my DBs in pgAdmin I can see the tables are still there though (so it\'s wrong)',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 4
        },
        {        
          category: 'Databases',
          title: 'Descriptions',
          description: '???? help ',
          course: 'Full Stack Web',
          unit: 1,
          week: 2,
          day: 5
        },
        {
          category: 'CSS',
          title: 'trouble using flexbox',
          description: `Hey guys - i can't seem to get my columns to flex correctly. Im trying to get the two columns side by side, but i have not been able to and have spent about an hour on it.`,
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 1
        },
        {
          category: 'CSS',
          title: 'CSS',
          description: `The display of my great ideas site is turned upside down - not to sure what i did, but ill post my code is attached here if anyone can help me on it.`,
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 2
          
        
        },
        {
          category: 'HTML',
          title: 'How do you center things with an in-line block?',
          description: `No matter what I do, i have not been able to center the navigation bar properly - its always a little bit too much to the left, or too much to the right. I've spent most of the day on this, so any help here is appreciate. Picture of code in thread. `,
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 3
        },
        {
          category: 'token',
          title: 'JSON web token',
          description: 'I have realized i have been using the wrong dependency.  json-web-token is not jsonwebtoken.  So i do a npm i jsonwebtoken and i get this error. I have tried to update the dependencies, but have not yet been able to run it properly. Any tips on getting it uninstalled globally? ',
          unit: 1,
          week: 3,
          day: 4
        },
        {
          category: 'React',
          title: 'What is the difference between state and props in React?',
          description: `What does my darkmode useEffect hook rely on to know how to update the DOM? Out of curiosity - not sure how this is working. Cool custom hook so far though. `,
          course: 'Full Stack Web',
          unit: 1,
          week: 3,
          day: 5

        },
        {
          category: 'Javascript',
          title: 'stuck on incorporating forEach',
          description: `Why is forEach giving me this error? Picture below.`,
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 1
        },
      
        {
          category: 'React',
          title: 'React ES6',
          description: 'Im trying to apply ES6 syntax when creating functions (arrow functions). Right now, Im doing this - cosnt CreateInput = () =>. Anyone see any errors?',
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 2
        },
        {
          category: 'Heroku',
          title: 'Deployment Issue',
          description: 'I think i have an error in my .env file, because nothing is showing up when i preview my deployment on heroku. I basically used the code from the guided lecture for the .env, but it does not seem to working',
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 3
        },
        {
          category: 'Web Token',
          title: 'Private access',
          description: 'How do you make it so you do not have to input your web token into your header on insomnia? ',
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 4
        },
        {
          category: 'Testing',
          title: 'Issue with Jest',
          description: 'When I try to download Jest as a dep, my terminal says its out of date. I have tried to run the update they suggested to get the new version, but I receive back a lot of errors. Can anyone help me by taking a look?',
          course: 'Full Stack Web',
          unit: 1,
          week: 4,
          day: 5
        }

      ], 'id');
};
