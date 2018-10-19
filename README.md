# Project Name
Jam-On
## Description

Jam-On is an app that connects musicians that share common interests and styles to jam together

## User Stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in
- **profile edit** - As a user I want to update my preferences and modify the instruments I play

## Backlog

List of other features outside of the MVPs scope

User profile:
- see my profile
- upload my profile picture
- see other users profile
- list of events created by the user
- list events the user is attending

Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Homepage
- ...


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in 
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in / not 2 fields 
  - body:
    - username
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- GET /jams
  - renders the jams list + the create form
  - add button attend
- POST /jams/:id/attend
  - render jams list
  - body: :id 
- GET /jams/create
  - render form
- POST /jams/create 
  - redirect jams // 
  - body: 
    - name
    - date
    - city
    - description
    - instruments
    - styles
- GET /jams/:id 
  - renders the event detail jam
  - includes the number of attendees
  -if user it attend->delete button if user not attending anymore
- POST /jams/:id/profile/:id
  - renders to profile user/jams
  - body (user :id, jams :id)
- GET /profile
    - renders the profile user + my jams 
- GET profile/:id/edit 
    - redirect to /profile/:id
- POST profile/:id/edit 
    - redirect to /profile/:id
    - body: 
      -name
      -city
      -instruments
      -styles
      -about
      -email
      -playlist
- GET profile/:id/jams/:id
    - redirect to /jams/:id
- GET 
- 


## Models

User model
 
```
username: String
password: String
email: String
city: String
instruments: Enum {Array}
styles: Enum{Array}
about: String
playlist: String

```

Jam model

```
owner: ObjectId<User>
name: String
date: Date
city: String
description: String
style: {Array}

attendees: [ObjectId<User>]
``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

