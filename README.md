# Freelance Tax Organizer
The Freelance Tax Organizer is a Rails application that organizes all freelance income data into tables to make it easier to either give to a tax professional for filing or to self-file.

# Frameworks used

Front and back ends used the Ruby on Rails framework, with accompanying Javascript on some pages

Ruby Gems used:

* omniauth
* bcrypt
* jquery-rails
* active_model_serializers
* bootstrap

Used PostGresql for Production database

# Live Site

This app is deployed on Heroku <a href="freelancers-tax-organizer.herokuapp.com">here</a>

# Installation

After cloning the repo to your local device, run the following commands in the root folder:

bundle install
rake db:migrate

To run the app:

rails s

then travel to localhost:3000 (depending on what port you set it to) in a browser window

# License

MIT © mlmccor
