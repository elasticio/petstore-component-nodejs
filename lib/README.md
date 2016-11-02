# Library of programs and configurations

It is not a requirement to keep your programs and configurations here, this is just a suggestion. The only requirement is that when you choose your desired structure or architecture then:

> These programs and configuration files must be linked from the ``component.json`` file residing in the main component directory. Here is a fragment of ``component.json`` describing the Triggers:

```json
"triggers": {
        "getHello": {
            "main": "./lib/triggers/getHello.js",
            "type": "polling",
            "title": "Query Hello",
            "metadata": {
                "out": "./lib/schemas/getHello.out.json"
            }
        }
```

## Actions and Triggers

If your component is programmed to work as **Action** and/or **Trigger** functions then it can for example be separated into different directories and this is what is done here. Our documentation on [basic concepts](http://docs.elastic.io/docs/basic-concepts) has more on definitions used here.

## Schemas

In this directory we keep the configurations which correspond to Actions and Triggers functions used. We found this easier to manage, however it is upto each coder to make their own component structure. There is only one requirement:

> The configuration files should be properly linked in ``component.json`` file.
