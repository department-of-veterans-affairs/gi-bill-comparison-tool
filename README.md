# GI Bill Comparison Tool [![Build Status](https://dev.vets.gov/jenkins/buildStatus/icon?job=department-of-veterans-affairs/gi-bill-comparison-tool/master)](http://jenkins.vetsgov-internal/job/department-of-veterans-affairs/gi-bill-comparison-tool/master)

This web-based tool allows a veteran to explore education benefits covered under the [GI Bill](https://en.wikipedia.org/wiki/G.I._Bill).

The application is developed on a Ruby on Rails stack.

## First Time Setup (Short Version)

See the long version below if this is not enough detail.

1. Install Ruby 2.2.x
1. Install PostgreSQL
1. Clone this repo
1. `bundle install`
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

Install the application's dependencies:

`bundle install`

This step will have to be performed anytime `Gemfile` is modified.

### Setup Database (Production and Development)

First, make sure Postgres is running. Next, create the database:

`rake db:create`

This creates an empty database for your current environment (either production or development). From here, migrate any database changes using this command:

`rake db:migrate`

This creates the tables, attributes, and indexes in the databse that the application needs to store data. At the current time, the data for the application is extracted from a CSV file that is compiled from various sources.To load data into the database, there is a rake task that will transfer data from this CSV file to the database. By convention, the latest data will be found in the data.csv file (however, you may have reason to use another version of the data in its own CSV file). To run the rake task choose a CSV that you want to load, and issue the following rake command:

`rake load_csv[(the name of the CSV to load)]`

For example:

`rake load_csv[data.csv]`

This will format and transfer the data in the CSV to the database.

#### A Note About Deployment to Production/Staging

When deploying the application to production or staging, and if a change to the raw CSV data is part of that deployment, the 

`rake load_csv[data.csv]` 

task must be run both in production and staging to populate the database with the new data.

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

## Assets

Are from the va_common gem. To update assets, or header or footer, please go here: 

https://github.com/department-of-veterans-affairs/va_common
