# blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


### For use in c9
Change the following files:
#### package.json
 "dev": "cross-env NODE_ENV=development webpack-dev-server --open --inline --hot --host $IP --port $PORT",
 "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"

#### webpack.config.js
 devServer: {
 public: "frontend-templates-oliverbth05.c9users.io",

#### index.html
--change script src to = '/dist/build.js
