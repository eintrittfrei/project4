# General Assembly Project 4

### Overview
Furniture is a pinterest inspired application where people can share their favorite design furniture. Users can register and add their favorite pieces to the list. Users can also edit and delete what they added.  

## Project Members
Ole Nascimento https://github.com/eintrittfrei

## Timeframe
10 days

## Project Brief:  
* Build a full-stack application by making your own back-end and your own front-end.
* Use a Python/Django API to serve your data from an SQL database.
* Consume your API with a separate front-end built with React.
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* At least one many to many and one many to one relationship.
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.

## Technologies Used

Back-end:
* Django
* Python
* SQL
* JSONWebToken
* pipenv
* TablePlus

Front-end
* JavaScript (ES6)
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


## Furniture App share your favorite pieces online

<kbd>![Screenshot 2021-09-15 at 11 03 38](https://user-images.githubusercontent.com/16645758/133404644-4874c0b9-80db-41aa-a793-7b880c37ce9a.png)
</kbd>

<kbd>![Screenshot 2021-09-15 at 11 04 06](https://user-images.githubusercontent.com/16645758/133404689-84ed6a77-9dfd-4ab1-84d2-e92ef7f020dc.png)
</kbd>



### Overview
Furniture is a pinterest inspired application where people can share their favorite design furniture. Users can register and add their favorite pieces to the list. Users can also edit and delta what they added.  

## Deployed version
https://furnitureideas.herokuapp.com/furniture

## Installation
Clone or download the repo. In your terminal run the following commands: 

* Install dependencies with yarn add … .
* Move into the shell -> pipenv shell.
* Start the database with python manage.py runserver.
* Move to the client folder -- cd client. 
* Start the front end -- yarn start. 

## Planning
This is a solo project and I started by planning out my basic wireframes and relationships using Figma. I used an existing furniture store website as a guide for design. I decided to have daily check-ins before starting work to check on progress and a plan for each day. I also set out my basic MVP and any additional features in case I had any extra time left.

My basic MVP included: 
* Home page which was also the index page. 
* Show page with details of each item individually. 
* User registration.
* Login. 
* About page.
* Ability for users to add items via form input. 
* Ability for users to edit and delete items they created.
* Image upload via Cloudinary for user profile images and item images.

Additional features: 
* Comments. 
* Ratings. 
* Save favorites to local storage (similar to a shopping basket).

<kbd>![Screenshot 2021-08-16 at 15 21 23](https://user-images.githubusercontent.com/16645758/129570400-ddd84767-ecb8-42cc-a218-7feb42e9e114.png)</kbd>

## Process

### Back-end
I started by setting up the application and basic project and setting up the database using the Django web framework. The next step was to build out each app in the back-end. I added the main app ‘furniture’ model first. Then I added apps for 'authentication', 'type', 'comments' and 'rooms' as well. I will use the ‘furniture’ app as an example for now. I added the serializer to convert from JSON to Python and back. 

```javascript
from rest_framework import serializers
from .models import Show

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = '__all__'
        
 ```

I then built out the furniture views. First I imported APIview, response and status from the rest_framework and also added the model serializer. Next I defined a new class to handle the standard get request for the index route. I needed to use ‘self’ as this is a method inside a class. Now I needed to get all the information from the database by making a request through the model and ran it through the serializer ending with the return Response (to user) and also the status. 

```javascript

class ShowListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
     
    def get(self, _request):
        
        furniture = Show.objects.all()
        serialized_furniture = PopulatedShowSerializer(furniture, many=True)
        return Response(serialized_furniture.data, status=status.HTTP_200_OK)


    def post(self, request):
        request.data['owner'] = request.user.id
        furniture_to_add = ShowSerializer(data=request.data)
        if furniture_to_add.is_valid():
            furniture_to_add.save()
            return Response(furniture_to_add.data, status=status.HTTP_201_CREATED)
        return Response(furniture_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

```

In the next step I built out the urls for the endpoints: 

```javascript
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/furniture/', include('furniture.urls')),
    path('api/type/', include('type.urls')),
    path('api/room/', include('rooms.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/jwt_auth/', include('jwt_auth.urls')),
    re_path(r'^.*$', index),
]
```

I added additional routes with the same steps including detail view (get), create (post), edit (put), delete(delete). 

I included the many to many relationship by adding the type and room options to the furniture model

```javascript

class ShowDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    def get_one(self, pk):
        try:
            return Show.objects.get(pk=pk)
        except Show.DoesNotExist:
            raise NotFound(detail="🐙 Can't find that piece")


    def get(self, _request, pk):
        furniture_one = self.get_one(pk=pk)
        serialized_furniture_one = PopulatedShowSerializer(furniture_one)
        return Response(serialized_furniture_one.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        request.data['owner'] = request.user.id
        piece_to_edit = self.get_one(pk=pk)
        updated_piece = ShowSerializer(piece_to_edit, data=request.data)
        if updated_piece.is_valid():
            updated_piece.save()
            return Response(updated_piece.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_piece.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        

    def delete(self, _request, pk):
        piece_to_delete = self.get_one(pk=pk)
        piece_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

```

And also added the owner of each item by including the owner as user information as well. 

```javascript
owner = models.ForeignKey(
      "jwt_auth.User",
      related_name="furniture",
      on_delete = models.CASCADE
    )
```
Throughout developing the back-end I used insomnia to check all my back-end endpoints are working correctly on the front-end: 

### Front-end 

I added the front-end and started by building out my index route. I also built out a router using the React Router Dom. For readability I divided the frontend into different logical component sections including: common, furniture, user, helpers and styles.

I started by building out my basic index page, detail page and navbar and about page then added user registration, login and the create form input. Lastly I added the edit and delete functionality and comments.  

Example index page: 
I created a new component and imported the required packages. 
I then began by making an axios request first to check I was getting the correct data from the database. I used the useEffect() function to make the get request to the API. I also used an async await to ensure the data request would work in the right order. I also added a try/ catch to show any errors that might come up. I used console.logs and Chrome developer tools to check the data coming through from the database. I could see the data in my console.log as a JSON object and then destructured by passing in the data directly. I set the data to state by using useState() setting the state to an empty object. 

```javascript 
const FurnitureIndex = () => {
  const [furniture, setFurniture] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/furniture/')
        setFurniture(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  
 ```

Now I could access the data using dot notation and display information in the return to built out my display page. 

```javascript 
<Row className="comments"><div><p>Comments</p>
            { onepiece.comments && 
<Row className="comments_row">
  <Col xs={1} md={1} lg={1} style={{ width: '200rem' }}>
    {
      onepiece.comments.map(item => {
        return (
          <Figure className="comment_item" key={item.id}>
            <Figure.Caption key={item.id}>
              <div key={item.id}>
                {/* <p>{item.owner} </p> */}
                <p>{item.text}</p>
                <p>created at: {item.created_at}</p>
              </div>
            </Figure.Caption>
          </Figure>
          
        )
      })
```

## Challenges
This project was very challenging in a very good way. 
* I decided to do this on my own to check what I had learned so far as my previous projects with React had been in a group. 
* I found the different relationships in the back-end the most challenging part. 
* For instance It took quite a while to work out how to display correct owner information for each item. 
* Another challenge was the form input and image upload. I was very proud having managed to make this work in the end. 
* Deploying a Python project seems slightly more challenging compared to MongoDB/ Express. 

## Key learning & Wins 
* I learned a lot and gained a lot of confidence in my skills.
* My most important learning is about planning and thinking ahead. It can save a lot of time if planning is done well. 
* I also improved my skills using React Bootstrap. 
* I learned how to deploy a Python project.
* I massively improved my problem solving skills and experience and had to ask for help from instructors only once in 10 days. 

## Bugs
* The comments section is not able to take inputs yet.
* The error handling for the form submitted for registration does not work when submitting a wrong password or an existing user name nothing happens and no error information are given to the user. 

## Future Improvements 

* Error Handling. 
* Comments working. 
* Ratings. 


