
exports.seed = function(knex) {
      return knex('tickets').insert([
        {     
          category: 'Security',
          title: 'Question about salts',
          description: 'Given the following async hash from bcrypt. should I be storing the salt in an environment variable? And not really familiar with Heroku\'s environment structure, does it just have one environment file I can put the salt in?',
        },
        {        
          category: 'Testing',
          title: 'Need help testing',
          description: 'anyone able to help with testing? I feel like I\'m missing something to start but I\'m not really sure what. I feel like this should be working',
        },
        {        
          category: 'API',
          title: 'Nesting routes',
          description: 'I\’m attempting to properly nest routes to get the API web url formatted the way I need it. I was working with someone who said that, because it is Thursday, I need to immediately jump over to the helpdesk when they had to leave and get into Zoom with someone who possess an intimate knowledge of backend development and APIs.',
        },
        {        
          category: 'Heroku',
          title: 'Heroku',
          description: 'Im following the video posted in the WEB23 channel about using postgress on heroku. when I run npx heroku run knex migrate:latest -a app-name it starts to work then throws an error saying it cant find the module PG which I have 100% installed. Any ideas? Ill post a screenshot of the error below',
        },
        {        
          category: 'Databases',
          title: 'Tables not truncating',
          description: 'Anyone know why my database tables (for testing) are not truncating even though I\m using truncate()',
        },
        {         
          category: 'API',
          title: 'Server won\'t boot',
          description: 'I am having this issue with booting my server, didn\'t have it yesterday. What did I do wrong?',
        },
        {       
          category: 'Testing',
          title: 'Unit testing issues',
          description: 'I\'m having some trouble unit testing protected routes; I\'m not really sure of the best way to give my tests a persistent token so I can actually test those endpoints. Anyone have any good resources they could point me toward?',
        },
        {        
          category: 'Databases',
          title: 'Seed error',
          description: 'So I\'ve been getting this error on my final table seed run.  I\'m not seeing the reason for this and websites werent very helpful',
        },
        {       
          category: 'Testing',
          title: 'Testing error',
          description: 'Getting this error when I try to run a test.',
        },
        {         
          category: 'Databases',
          title: 'Rollback migrations',
          description: 'Trying to rollback my migrations on my testing/development databases, but it keeps telling me I\'m already at base migration. When I look at my DBs in pgAdmin I can see the tables are still there though (so it\'s wrong)',
        },
        {        
          category: 'PostgreSQL',
          title: 'Post request errors',
          description: 'I\'m receiving this error when making post requests to my postgres deployment have any ideas?',
        },
        {
          category: 'CSS',
          title: 'Centering in CSS Grid',
          description: `I\'m trying to create a simple page with CSS Grid.<br/>What I'm failing to do is center the text from the HTML to the respective grid cells.<br/>I\'ve tried placing content in separate divs both inside and outside of the left_bg and right_bg selectors and playing with some of the CSS properties to no avail.<br/>How do I do this?`,
        },
        {
          category: 'JS',
          title: 'Javascript reduce on array of objects',
          description: `Say I want to sum a.x for each element in arr.<br/>arr = [{x:1},{x:2},{x:4}]<br/>arr.reduce(function(a,b){return a.x + b.x}) >> NaN<br/>I have cause to believe that a.x is undefined at some point.<br/>The following works fine:<br/>arr = [1,2,4] arr.reduce(function(a,b){return a + b}) >> 7
        <br/>What am I doing wrong in the first example?`,
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
        },
        {
          category: 'Javascript',
          title: 'For loop in react render method',
          description: 'I want create paging link for my grid.I pass maxPages(number) property to component but i cant use for in render method. What can i do ?',
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
          If you have data that a React component needs, should it be passed through props or setup in the React component via getInitialState?
        `,
        },
        {
          category: 'Javascript',
          title: 'What is the difference between Bower and npm?',
          description: `What is the fundamental difference between bower and npm? Just want something plain and simple. I've seen some of my colleagues use bower and npm interchangeably in their projects.`,
        },
        {
          category: 'React',
          title: 'React - changing an uncontrolled input',
          description: 'For an input to be controlled, its value must correspond to that of a state variable. What does that mean?'
        },
      ], 'id');
};
