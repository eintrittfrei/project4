# General Assembly Project 4

### Overview
Furniture is a pinterest inspired application where people can share their favorite design furniture. Users can register and add their favorite pieces to the list. Users can also edit and delete what they added.  

## Project Members
Ole Nascimento https://github.com/eintrittfrei

## Timeframe
10 days

## Project Brief:  
* Build a full-stack application by making your own backend and your own front-end.
* Use a Python/Django API to serve your data from an SQL database.
* Consume your API with a separate front-end built with React.
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* at least one many to many and one many to one relationship.
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.

## Technologies Used

Backend:
* Django
* Python
* SQL
* JSON Web Token
* pipenv
* TablePlus

JavaScript (ES6)
* React 
* Axios 
* Nodemon 
* React Router Dom
* React Select
* React Bootstrap
* SASS
* CSS3
* Cloudinary
* Google fonts


## Furniture App share your favorite ideas online
### Overview
Furniture is a pinterest inspired application where people can share their favorite design furniture. Users can register and add their favorite pieces to the list. Users can also edit and delta what they added.  

## Deployed version
https://furnitureideas.herokuapp.com/furniture

## Installation
Clone or download the repo. In your terminal run the following commands: 

Install dependencies with yarn add … 
Move into the shell -> pipenv shell
Start the database with python manage.py runserver
Move to the client folder -- cd client 
Start the front end -- yarn start 

## Planning
This is a solo project and I started by planning out my basic wireframes and relationships using Figma. I used an existing furniture store website as a guide for design. I decided to have daily check-ins before starting work to check on progress and a plan for each day. I also set out my basic MVP and any additional features in case I had any extra time left.

My basic MVP included: 
Home page which was also the index page 
Show page with details of each item individually 
User registration
Login 
About page
Ability for users to add items via form input 
Ability for users to edit and delete items they created
Image upload via Cloudinary for user profile images and item images

Additional features: 
Comments 
Ratings 
Save favorites to local storage (similar to a shopping basket)

SCREENSHOTS figma AND WIREFRAMES 

## Process

### Backend
I started by setting up the application and basic project and setting up the database using the Django web framework. The next step was to build out each app in the backend. I added the main app ‘furniture’ model first. Then I added apps for authentication, type, comments and rooms as well. I will use the ‘furniture’ app as an example for now. I added the serializer to convert from JSON to Python and back. 

SCREEN SHOT SERIALIZER 

I then built out the furniture views. First I imported APIview, response and status from the rest_framework and also added the model serializer. 

SCREEN SHOT

Next I defined a new class to handle the standard get request for the index route. I needed to use ‘self’ as this is a method inside a class. 

Now I needed to get all the information from the database by making a request through the model and ran it through the serializer ending with the return Response (to user) and also the status. 

SCREEN SHOT 

In the next step I built out the urls for the endpoints: 

SCREEN SHOT 

I added additional routes with the same steps including detail view (get), create (post), edit (put), delete(delete). 

I included the many to many relationship by adding the type and room options to the furniture model

SCREEN SHOT 

And also added the owner of each item by including the owner as user information as well. 

SCREEN SHOT 

Throughout developing the backend I used insomnia to check all my backend endpoints are working correctly on the frontend: 

SCREEN SHOT 

### Front end 

I added the front end and started by building out my index route. I also built out a router using the React Router Dom. For readability I divided the frontend into different logical component sections including: common, furniture, user, helpers and styles.

I started by building out my basic index page, detail page and navbar and about page then added user registration, login and the create form input. Lastly I added the edit and delete functionality and comments.  

Example index page: 
I created a new component and imported the required packages. 
I then began by making an axios request first to check I was getting the correct data from the database. I used the useEffect() function to make the get request to the API. I also used an async await to ensure the data request would work in the right order. I also added a try/ catch to show any errors that might come up. I used console.logs and Chrome developer tools to check the data coming through from the database.    

SCREEN SHOT code AND DATABASE LOGS 

I could see the data in my console.log as a JSON object and then destructured by passing in the data directly. 

EXAMPLE CODE 

I set the data to state by using useState() setting the state to an empty object. 

EXAMPLE CODE 

Now I could access the data using dot notation and display information in the return to built out my display page. 

EXAMPLE CODE 


## Challenges
This project was very challenging in a very good way. I decided to do this on my own to check what I had learned so far as my previous projects with React had been in a group. I found the different relationships in the backend the most challenging part. For instance It took quite a while to work out how to display correct owner information for each item. 
Another challenge was the form input and image upload. I was very proud having managed to make this work in the end. 
Deploying a python project seems slightly more challenging compared to MongoDB/ Express. It was good to have gone through that process. 

## Key learning & Wins 
I learned a lot and gained a lot of confidence in my skills.
My most important learning is about planning and thinking ahead. It can save a lot of time if planning is done well. 
I also improved my skills using React Bootstrap. 
I learned how to deploy a python project.
I massively improved my problem solving skills and experience and had to ask for help from instructors only once in 10 days. 

## Bugs
The comments section is not able to take inputs yet.
The error handling for the form submitted for registration does not work when submitting a wrong password or an existing user name nothing happens and no error information are given to the user. 

## Future Improvements 

Error Handling 
Comments working 
Ratings 


