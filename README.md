# GI Bill Comparison tool for Vets.gov
Rails delivered version of the GI Comparision Tool. Ruby on Rails + Postgres + Web design standards

There are 3 steps:
  1. Setting up postgres
  2. Setting up rails
  3. Run the app!

To start postgres: 

```
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```

To start rails run
```
rails s
```

NOTE: to prevent routing error on jquery pngs, run 
```
rake assets:precompile
``` 

NOTE: to watch scss files, run 
```
 sass --watch app/assets/stylesheets/_scss
``` 
