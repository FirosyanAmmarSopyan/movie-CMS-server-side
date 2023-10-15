## Endpoints
List of Available Endpoints:
- `POST /register`
- `POST /login`
- `POST /login-google`
- `POST /movies`
- `GET /movies`
- `GET /movies/:id`
- `DELETE /movies/:id`
- `GET /genre`

### POST /register
#### Description :

For make new account or User Account

-  Body 
```json
{
    "username" : String,
    "email" : String,
    "password" : String,
    "phoneNumber" : Integer,
    "address" : String
}
```

#### Response 
201 - Created 
- body
```json
{
    "id" : 1
    "email" : String
}
```

#### Bad Response 
400 - failed Validate 
- body

```json
{
   "error" : "errors"
}
```
500 - Error Servers 
- body

```json
{
   "error" : "Internal Server Error"
}
```

### POST /login
#### Description :

For login

-  Body 
```json
{
    "email" : String,
    "password" : String
}
```

#### Response 
200 - Succes Login 
- body
```json
{
    "access_token" : "your_access_token"
}
```

#### Bad Response 
401 - Invalid username or password
- body

```json
{
     "error": "error invalid username or email or password",
}
```
500 - Error Servers 
- body

```json
{
   "error" : "Internal Server Error"
}
```

### POST /login-google
#### Description :

For login



#### Response 
200 - Succes Login 
- body
```json
{
    "access_token" : "your_access_token"
}
```

#### Bad Response 
401 - Invalid username or password
- body

```json
{
     "error": "error invalid username or email or password",
}
```
500 - Error Servers 
- body

```json
{
   "error" : "Internal Server Error"
}
```

### POST /movies
#### Description :

For add new movies

-  Body 
```json
{
    "title" : String,
    "synopsis" : String,
    "trailerUrl" : String,
    "imgUrl" : String,
    "rating" : String,
    "genreId" : String,
    "authorId" : String,

}
```

#### Response 
201 - Succes add new movies 
- body
```json
{
    "title" : "title of movies",
    "synopsis" : "synopsis of movies",
    "trailerUrl" : "trailer url of movies",
    "imgUrl" : "image url of movies",
    "rating" : "rating of movies",
    "genreId" : "genreId of movies",
    "authorId" : "authorId of movies",
}
```

#### Bad Response 
400 - failed Validate 
- body

```json
{
   "error" : "errors"
}
```
500 - Error Servers 
- body

```json
{
   "error" : "Internal Server Error"
}
```

### GET /movies
#### Description :

For read all movie


#### Response 
200 - Succes show list all movie 
- body
```json
{
    "title" : "title of movies",
    "synopsis" : "synopsis of movies",
    "trailerUrl" : "trailer url of movies",
    "imgUrl" : "image url of movies",
    "rating" : "rating of movies",
    "genreId" : "genreId of movies",
    "authorId" : "authorId of movies",
}
```

#### Bad Response 

500 - Error Servers 
- body

```json
{
   "error" : "Internal Server Error"
}
```

### GET /movies/:id
#### Description :

For read specified movie from id


- params
```json
    {id}
```


#### Response 
200 - Succes show movie by id 
- body
```json
{
    "title" : "title of movies",
    "synopsis" : "synopsis of movies",
    "trailerUrl" : "trailer url of movies",
    "imgUrl" : "image url of movies",
    "rating" : "rating of movies",
    "genreId" : "genreId of movies",
    "authorId" : "authorId of movies",
}
```

#### Bad Response 

404 - Not Found
```json
{
   "error": "not found",
}
```

500 - Error Servers 
- body

```json
{
   "error" : "Internal Server Error"
}
```

### DELETE /movies/:id
#### Description :

For DELETE specified movie from id


- params
```json
    {id}
```


#### Response 
200 - Succes DELETE movie by id 
- body
```json
{
    "message" : "movies success to delete"

}
```

#### Bad Response 

404 - Not Found
```json
{
   "error": "not found",
}
```

500 - Error Servers 


```json
{
   "error" : "Internal Server Error"
}
```

### GET /genre
#### Description :

For read all genre 

#### Response 
200 - Succes read all genre
- body
```json
{
    "id" : 1,
    "name" : "name of genre"

}
```

#### Bad Response 

500 - Error Servers 


```json
{
   "error" : "Internal Server Error"
}
```

### PUT /movies/:id
#### Description
- Edit a movies data based on given id

#### Request
- headers
    
json
    {
        "access_token":"string"
    }
    
#### Response
_200 - OK_
- Body
    
json
    {
      "statusCode": 200,
      "message": "done edit movies from id ${id}"
    }
    
_403 - Forbidden_
- Body
    
json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbiden"
      }
    }
404 - Not Found
Body
  {
    "statusCode": 404,
    "error": {
      "message": "error not found"
    }
  }
  
PACTH /movies/:id
#### Description
Edit a movies status based on given id

#### Request
headers
  {
      "access_token":"string"
  }
  
#### Response
200 - OK
Body
  {
    "statusCode": 200,
    "message": "movies with id ${id} status has been updated from ${findMovies.status} into ${status}"
  }
  
_403 - Forbidden_
- Body
    
json
    {
      "statusCode": 403,
      "error": {
        "message": "Forbiden"
      }
    }


404 - Not Found
Body
  {
    "statusCode": 404,
    "error": {
      "message": "error
  }
  }