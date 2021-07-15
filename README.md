# Drixit challenge

## Instalation

### Requirements

* `git`
* `docker engine`
* `docker-compose`
* Check ports `8080` and `27017` are available

### Instructions

* Clone the repo (`git clone git@github.com:dggluz/drixit-challenge.git`)
* Move to project directory (`cd drixit-challenge`)
* Launch _docker-compose_ (`docker-compose up`) and wait for it to finish
* [Browse to `http://localhost:8080`](http://localhost:8080)

## Arquitectural decisions

### Type-safety and error handling

#### `_Promise` (`error-typed-promise`)

[`_Promise`](https://github.com/dggluz/_promise): they are basically like `Promise`s but **with typed for resulution and for rejection**. It's a library I developed as a side project aiming to build more robust code.

**It is extremely usefull to inspect a `_Promise`'s resolved and rejected values, by doing `.then(x => x)` and inspecting `x` _typings_ or `.catch(e => _Promise.reject(e))` with _IDE_'s _IntelliSense_**.

You will find utility _functions_ (like `tapChain`, `caseError` or `rejectIf`) on the code, related to working with `_Promise`s.

#### Differentiating errors

As TypeScript has [_structural typing_](https://en.wikipedia.org/wiki/Structural_type_system) instead of [_nominal typing_](https://en.wikipedia.org/wiki/Nominal_type_system), I had to add a `__brand` with a literal value to several objects (particulary errors) in order to make them structurally different. This is vital for working with `_Promise`s.

#### Type validation

I wrote a set of small and composable _type guards_ (`objOf`, `unionOf`, `lit`, `str`, `num`, etc.) that ensures the runtime code matches with the expected types, specially on the "borders" of the system (where the system takes "external" data).

### Infra

I chose to make a _docker multistage builds_ to provide only the source code of all the project and to allow the server to serve the SPA.

There are two stages: the first one builds the client code and the second one serves it as static assets and also exposes server's API. 

### Client

See [client's documentation](./client).

### Server

See [server's documentation](./server).