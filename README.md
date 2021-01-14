# Petstore Component Node.js

## Description

A fully working and operational component template to use for starting development of your
own component for the [elastic.io platform](http://www.elastic.io "elastic.io platform").
This component comes with a basic architecture which you can use on the platform.

The component interacts with the [petstore sample server](https://petstore.elastic.io/docs/).

Our documentation on [building components in nodejs](https://docs.elastic.io/guides/building-nodejs-component)
has more about each including file and their function.

## Requirements

To use this component you must be registered platform user. Please see our home
page at [https://www.elastic.io](https://www.elastic.io) to learn how to register.

### Authentication

To authenticate use `secret` as an API key. For more details see the
[Petstore API docs](https://petstore.elastic.io/docs/).

## Triggers

### Get Pets By Status

Retrieves pets from the Petstore API by given pet status using Dynamic or Static
Data Sample. The difference is how these functions are made. However, both can have
the following statuses defined by the Petstore API:

*   `Available` - select to get all pets with status `Available`.
*   `Pending` - select for `Pending`.
*   `Sold` - select for `Sold`.


## Actions

### Creates a new pet

Creates a new Pet by making a `POST` to `/pet` endpoint of the API. The input
fields are:

*   `petId` (required) - the Id of the pet.
*   `name` - the name of the pet.
*   `status` - the status which can have one `Available`, `Pending` and `Sold` values.

## File Structure

The structure of **petstore-component-nodejs** component is quite flexible.
[elastic.io platform](https://www.elastic.io) expects only two files to be present
in the main directory. These are the ``component.json`` and ``package.json``. Our
documentation on [how to build a component in node.js](https://docs.elastic.io/guides/building-nodejs-component)
has more about each file and their function.
