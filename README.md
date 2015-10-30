# GI Bill Comparison Tool

This web-based tool allows a veteran to explore education benefits covered under the [GI Bill](https://en.wikipedia.org/wiki/G.I._Bill).

The application is developed on a Ruby on Rails stack.

## First Time Setup (Short Version)

See the long version below if this is not enough detail.

1. Install Ruby 2.2.x
1. Install PostgreSQL
1. Clone this repo
1. `bundle install` (but comment out `MPH Deployment Group` from `Gemfile`)
1. `rake load_csv[data.csv]`

## First Time Setup (Long Version)

For now, the instructions assume the developer is using Mac OS X. However, the same steps can be completed slightly different in Windows and Linux platforms.

### Homebrew

This will allow you to install applications easily. Follow the instructions on the [Homebrew website](http://brew.sh/).

### Ruby

*(You can skip rbenv steps if you already have Ruby installed or have a favorite Ruby version manager).*

First, install **rbenv** which is a tool that manages Rubies and different versions of it.

`brew install rbenv ruby-build`

From here, add **rbenv** to your PATH by adding the following line to `~/.profile`:

`if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi`

Now, you can install Ruby (at time of writing, 2.2.3 is used for this application).

`rbenv install 2.2.3`

After the download and install completes, move into the cloned directory and set the Ruby version:

`echo "2.2.3" >> .ruby-version`

Two last Ruby things are needed: Rails (the web framework)
- Bundler (to install dependencies)

Issue the following command:

`gem install rails bundler`

### PostgreSQL

This is the database. The easiest way to get setup with a PostgreSQL database is to install the [Postgres.app](http://postgresapp.com/) and start it when you are working on this application.

### Install Ruby Dependencies

Now, clone this repository and navigate to it via a terminal.

Temporary step for local developer:

1. Open `Gemfile`
1. Comment out the group label `MPH Deployment Stuff`

Install the application's dependencies:

`bundle install`

This step will have to be performed anytime `Gemfile` is modified.

### Setup Database

First, make sure Postgres is running. Next, create the database:

`rake db:create`

From here, migrate any database changes using this command:

`rake db:migrate`

This will leave you with an empty, but created, database. To load test data, choose a CSV that you want to load (there are a few), then:

`rake load_csv[(the name of the CSV to load)]`

For example:

`rake load_csv[data.csv]`

## Running the Application

Now that you're all setup, simply start the application:

`rails s`

Then, open your web browser and navigate to:

`http://127.0.0.1:3000/`

## Troubleshooting Tips

To prevent routing error on jquery pngs, run

```
rake assets:precompile
```

To watch SCSS files, run
```
 sass --watch app/assets/stylesheets/_scss
```
