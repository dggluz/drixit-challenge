# Server

## Endpoints (controllers)

The _endpoints_ are just _functions_ (called "_controllers_") that takes a _request object_ ([_type_ `Request`](http://restify.com/docs/request-api/)) and _return_ a [`_Promise`](https://github.com/dggluz/_promise) resolved with the _value_ to _return_ to the _client_.

They don't receive the _response object_ ([_type_ `Response`](http://restify.com/docs/response-api/)) on purpose, to _force_ delegating into the [`createEndpoint` _function_](#createendpoint).

The [`createEndpoint`](./src/server-utils/create-endpoint.ts) _function_ ensures that the _returned_ `_Promise` will only be _rejected_ with [`HTTPErrors`](./src/errors/http-errors.ts).

## Middlewares

I also made custom middlewares (like the [`authenticate`](./src/middlewares/authenticate.middleware.ts) middleware) that aside of hooking a functionality (like any other middleware) make their work explicit to the type system (for example, adding authentication information to the request, or adding the eventual rejections).
