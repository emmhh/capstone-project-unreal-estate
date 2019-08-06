# How to Setup

## FRONTEND
1. Go to client folder `cd unreal_estate/client`
2. Install related packages `npm install`
3. need to run "npm install --save react-geocode" to get proerty reommendation work on homepage.
3. Build react app `npm build` (all npm commands can be found in package.json)

*If you run `npm start` it will start react server but then BACKEND and FRONTEND will have different ports*

## BACKEND
1. Install Django `pip install django`

## Database
1. Use postgres as username while creating database.
2. Keep the password empty.
3. Create postgresql Database with name unreal_estate.

## Run server
1. Go to code folder `cd unreal_estate`
2. Run Django server `python manage.py runserver`
3. Open http://127.0.0.1:8000/ in browser
