# Client

## Building

I needed a way to build TypeScript code, along with its HTML and styles. So I picked [`webpack`](https://webpack.js.org/) for the job. I'm also using [`less`](http://lesscss.org/) to ease styles develpment.

## Redux-like architecture

I used to code framework-less frontends using a kind of object oriented MVC pattern. But, as this app doesn't really maintain too much state, I prefered trying a redux-like architecture. Most of the related code can be found on [`model.ts`](./src/model/model.ts) file. I exposed a couple of functions for subscribing to changes on the model, and several functions for updating it.

## Components and pages

I organized the UI with [pages](./src/pages) and [components](./src/components). Pages are supposed to be simple enough that they can live inside a pure function. Components are objects that maintain a little bit of state. Both, pages and components, have associated HTML and, sometimes, styles to them. The styles and elements selection is scoped to the them to avoid unwanted interactions.
