# dejavu #

---

[![Build Status](https://secure.travis-ci.org/IndigoUnited/dejavu.png)](http://travis-ci.org/IndigoUnited/dejavu)

Have you ever had the feeling that you're seeing something you've already seen
before? That's the feeling you get when using `dejavu`.

If you are a developer coming from a language like PHP, Java, ActionScript 3.0,
and others, it's likely that you are already familiar with Object Oriented
Programming. However, JavaScript uses prototypal inheritance which, although
powerful and flexible, can be difficult to understand, and specially to maintain
in large projects.

`dejavu` is a library that delivers classical inheritance on top of JavaScript
prototypal inheritance, making it a breeze to move into JavaScript.



## Why another? ##

There are some libraries out there able to shim classical inheritance,
however none offers all the functionality that many programmers require.

Also, even though being one of the most feature rich OOP libraries out there, it has the best performance, rivaling with vanilla in production.



## Features ##

* Classes (concrete, abstract and final)
* Interfaces
* Mixins (so you can get some sort of multiple inheritance)
* Private and protected members
* Static members
* Constants
* Context binding for functions
* Method signature checks
* Possible to extend or borrow from vanilla classes
* Custom instanceOf with support for Interfaces
* Two builds, `regular` and `AMD` based
    * `AMD` optimized for speeding up developer workflow, allowing testing
      without the need to re-compile everything into a single file
    * `regular` if you are not using `AMD` in your projects
* Two modes for each build, `strict` and `loose`
    * `strict` best in development, enforcing a lot of checks, making sure you
      don't make many typical mistakes
    * `loose` best for production, without checks, improving performance

Users are encouraged to declare
['use strict'](https://developer.mozilla.org/en/JavaScript/Strict_mode) while
using the `dejavu` in strict mode, otherwise some code might fail silently.
This can happen because `dejavu` uses `Object.freeze` and `Object.seal` to lock
classes and instances, guaranteeing that no one changes the behaviour of your
classes by replacing methods, etc, and possibly breaking your code, making it
really hard to pin point what's wrong. Although this is the default behaviour, it can be changed.

You will read more on it later in this document.

**Do not confuse 'use strict' with the dejavu strict mode.**




## Getting started ##

The quickest way to start using `dejavu` in your project, is by simply including
`dist/regular/strict/dejavu.js` (note that this is in __strict__ mode).

If you're developing a __client-side__ app, simply put the file in some folder,
and include it in the HTML:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="dejavu.js"></script>
    </head>
    <body>
        <script type="text/javascript">
            'use strict';

            // Declare the "Person" class
            var Person = dejavu.Class.declare({
                _name: null,

                initialize: function(name) {
                    this.setName(name);
                },

                setName: function(name) {
                    this._name = name;

                    return this;
                },

                getName: function() {
                    return this._name;
                }
            });

            // Create a new instance of person
            var indigo = new Person('Marco');
            console.log('A new indigo was born,', indigo.getName());
        </script>
    </body>
</html>
```

This will make a `dejavu` global available for you.
If you're developing in __Node.js__, install it with `npm install dejavu` and use it like so:

```js
var dejavu = require('dejavu');

// Declare the "Person" class
var Person = dejavu.Class.declare({
    _name: null,

    initialize: function(name) {
        this.setName(name);
    },

    setName: function(name) {
        this._name = name;

        return this;
    },

    getName: function() {
        return this._name;
    }
});

// Create a new instance of person
var indigo = new Person("Marco");
console.log("A new indigo was born,", indigo.getName());
```

In node, the default mode running will be the strict mode unless the STRICT environmen
 variable is set to false.
Environment variables can be changed system wide or per process like so:

```js
process.env.STRICT = false;
```



## Benchmarks ##



## Performance ##

Since all those nice features and common rules of classic OOP degrade
performance, `dejavu` has two separates modes, for different stages in the
development.

The `strict` mode is suitable for __development__, and will do all sorts of
checks, throwing an error when you try to do something considered illegal.

**Note that if your project works in strict mode, it will work in loose mode.**

As for the `loose` mode, there is no overhead associated with checks, thus
making it suitable for __production__, since it will be more efficient and
have a __lower memory footprint and filesize__.

Finally, in order to achieve that extra edge, that puts `dejavu` next to vanilla
JS in terms of performance, you should run the optimizer that is bundled with
the library. Note that this step is completely optional, and `dejavu` will still
perform faster than the other libraries in most browsers, even if you don't run
the optimizer. The optimizer will analyse your code, and make some improvements
boosting it a bit further.

You can check the benchmarks in [jsperf](http://jsperf.com/oop-benchmark/58)
comparing `dejavu` with other OOP libraries. Note that the loose mode
is used in this test, simulating a production environment, and both the normal
and optimized versions are tested.



## Taking it to another level

Front-end devs are encouraged to program using the AMD paradigm because of its obvious benefits.
Since dejavu is built on it, it will integrate seamlessly with your AMD loader.
The easy way to set it up is to define a path for dejavu in your loader config like so:

```js
{
   // Your loader config
   paths: {
       // You can switch to the loose mode anytime
       'dejavu': '/path/to/dejavu/dist/strict/main'
   }
}
```
Then require it and use it:

```js
define(['dejavu'], function (dejavu) {

    // The dejavu variable is an object that contains:
    // Class
    // FinalClass
    // AbstractClass
    // Interface
    // instanceOf
    // options

    // Example usage
    var Person = dejavu.Class.declare({
        initialize: function () {
            // ...
        }
    });

    return Person;
});
```

If you just want to require specific parts of `dejavu`, you can do so.
In order to achieve this, you must configure your loader like so:


```js
{
    // Your loader config
    packages: [
        {
            name: 'dejavu',
            // You can switch to the loose mode anytime
            location: '/path/to/dejavu/dist/strict'
        }
    ]
}
```

With this setup, you can still require the dejavu object like shown above or require specific parts of it:

```js
define(['dejavu/Class'], function (Class) {

    // Example usage
    var Person = dejavu.Class.declare({
        initialize: function () {
            // ...
        }
    });

    return MyClass;
});
```

As you can see, in this case, only the `Class` module of `dejavu` is included,
which means all the other modules are not loaded.



## Syntax

### Overview

Here's an overview of what most developers look for in an OOP library. You can find complete examples further down.

```js
var Person = Class.declare({
    // although not mandatory, it's really useful to identify
    // the class types, which simplifies debugging
    $name: 'Person',

    // this is a protected property, which is identified by
    // the single underscore. two underscores denotes a
    // private property, and no underscore stands for public
    _name: null,
    __pinCode: null,

    // class constructor
    initialize: function (name, pinCode) {
        this._name = name;
        this.__pinCode = pinCode;
        
        // create timer that will callback methods of the class
        setTimeout(this._logName, 1000);
        
        // note that we're binding to the current instance in this case.
        // also note that if this function is to be used only as a callback, you can
        // use $bound(), which will be more efficient
        setTimeout(this._logName.$bind(this), 1000);
    },

    // public method (follows the same visibility logic, in this case with no underscore)
    getName: function () {
        return this._name;
    }
    
    _logName: function () {
        console.log(this._name);
    }
});
```

### Complete example

For those looking for something more, here's a more complete usage of `dejavu`.

This example illustrates the usage of:

- `$name` meta attribute
- `this.$self` vs `this.$static`
- `$super()` for accessing overridden methods
- `instanceOf`
- member visibility
- statics, abstracts, abstract statics, finals, final statics and constants
- `$extends` vs `$borrows`
- binding (`$bind()` vs `$bound()`)

In this case, and keep in mind that this is just for illustration purposes, we'll create three interfaces, that are implemented by an abstract class, that is then extended by a concrete class.


```js
var dejavu = require('dejavu');

// ------------ AN INTERFACE ------------
// this interface is useless, is only here to illustrate
// that interfaces can extend other interfaces
var UselessInterface = dejavu.Interface.declare({
    $name: 'UselessInterface'
});

var InterfacePerson = dejavu.Interface.declare({
    $name: 'InterfacePerson',
    // if you need to extend multiple interfaces,
    // just provide an array
    $extends: UselessInterface,
    
    // method/attribute visibility is controlled by
    // the number of underscores that the identifier
    // has:
    // public:    no underscores
    // protected: 1 underscore
    // private:   2 underscores
    //
    // the methods below are public
    getName: function () {},
    setName: function (name) {}
});

// ------------ ANOTHER INTERFACE ------------
var InterfaceEngineer = dejavu.Interface.declare({
    $name: 'InterfaceEngineer',
    
    think: function(subject) {}
});

// ------------ AN ABSTRACT CLASS ------------
var AbstractIndigo = dejavu.AbstractClass.declare({
    $name: 'AbstractIndigo',
    // implements multiple interfaces
    $implements: [InterfacePerson, InterfaceEngineer],

    $constants: {
        INDIGO_WEBSITE: 'http://www.indigounited.com/',
        INDIGO_EMAIL:   'hello@indigounited.com'
    },

    $statics: {
        // you can also put "$abstracts {}" inside statics

        logIndigoInfo: function () {
            // by using this.$static, we're making sure that dejavu
            // uses late binding to resolve the member. Instead,
            // if you're looking for early binding, you can use
            // this.$self
            console.log(
                this.$static.INDIGO_WEBSITE,
                this.$static.INDIGO_EMAIL
            );
        }
    },
    
    _name: null,
    
    getName: function () {
        return this._name;
    },
    
    setName: function (name) {
        this._name = name;
        
        return this;
    },
    
    // note that we're not implementing the method `think()` of the
    // EngineerInterface. This will be automatically turned into an
    // abstract method, since we're in an abstract class
    $abstracts: {
        beAwesome: function () {}
    },

    // finals are not overridable
    $finals: {
        // you can also put "$abstracts {}" inside finals

        thisIsFinal: function () {
            console.log('Can\'t change this!');
        }
    }
});

// ------------ A CONCRETE CLASS ------------
// also, if you need this concrete class to be final,
// you can just use dejavu.FinalClass.declare instead
var Indigo = dejavu.Class.declare({
    $name: 'Indigo',
    // class extends another one.
    //
    // in case you need to extend from several classes,
    // you can instead use $borrows, and specify an
    // array of identifiers. Still, note that borrowing
    // will not allow you to perform dejavu.instanceOf
    // tests, as the class is not technically extending
    // the other, just borrowing its behaviour.
    $extends: AbstractIndigo,

    _subject: 'nothing',

    initialize: function (name) {
        // call the parent method, in this case the parent constructor,
        // but can be applied to any method when you need to call the
        // overridden method
        this.$super();

        this.setName(name);

        // note that we're binding the context to the current
        // instance. If, like in this case, the callback
        // function is to be used only as a callback, you
        // can just do .$bound(), upon declaring the function
        // which is equivalent to .$bind(this), but more efficient
        setInterval(this._logThought.$bind(this), 1000);
    },

    beAwesome: function () {
        console.log(this._name, 'is being awesome!');
        this.$self.logIndigoInfo();
        this.think('the next big thing');
    },

    think: function (subject) {
        this._subject = subject;
    },

    _logThought: function () {
        console.log(this._name, 'is thinking about', this._subject);
    }//.bound() would be equivalent to the binding in the constructor
});

var indigo = new Indigo('Indi');

// check the type of an object
console.log(
    dejavu.instanceOf(indigo, InterfaceEngineer) ?
    'we have an engineer!'
    : 'say what now?'
);
console.log(dejavu.instanceOf(indigo, Indigo) ?
    'we have an indigo!'
    : 'say what now?'
);

indigo.beAwesome();
```

### Additional details

####  Classes/instances are locked ###

By default, constructors and instances are locked. This means that no one can monkey patch your code.

This behaviour can be changed in two ways:

##### With the $locked flag:

```js
var UnlockedIndigo = Class.declare({
    $name: 'UnlockedIndigo',
    $locked: false

    initialize: function () {
        // Altough the foo property is not declared,
        // it will not throw an error
        
        this.name = 'Filipe';
    },

    talk: function () {
        console.log('An indigo is talking!');
    }
});
```

Methods can be replaced in the prototype

```js
UnlockedIndigo.prototype.talk = function () {
    console.log('... now is running');
};
```

Properties can be added to the instance and methods can be replace in the instance.

```js
var Filipe     = new UnlockedIndigo();
Filipe.friends = ['Marco','Andre'];
Filipe.talk    = function () { 
    console.log('I'm talking about DejaVu!');
};
```

##### By setting the global option:

This will change the default behaviour, but classes can still override it with the $locked flag.

```js
dejavu.options.locked = false;
```

Note that once a class is unlocked, its subclasses cannot be locked.
Also, although undeclared members are allowed, they will not have their access controlled (they are interpreted as public).



#### Vanilla classes

`dejavu` allows you to extend or borrow vanilla classes. In this case, constructors and instances are UNLOCKED by default.

```js
function Person(name) {
    this.name = name;
};

var filipe = new Person('Filipe');
filipe.name  // Filipe

```

Now you can add a new function to Person.

```js
Person.prototype.monkey = function () {
    console.log(this.name + ' can monkey patch the code!');
}

filipe.monkey()  // Filipe can monkey patch the code!
```



## Optimizer

`dejavu` bundles an optimizer that makes your code faster and lighter.

It specifically:

- Improves $super and $self usage
- Removes all $name and $locked properties because they are not used in the loose version
- Removes the need for wrappers, improving performance by a great margin
- Removes abstract functions from abstract classes
- Removes functions from interfaces

The optimizer is located in the `bin` folder.

Example usage:

`node optimizer < file_in.js > file_out.js`

`dejavu` also comes with a grunt task.

Below is a sample usage copied from a grunt file:

```js
grunt.loadNpmTasks('dejavu');

grunt.initConfig({
    dejavu: {
        optimize: {
            options: {
                exclude: [/bootstrap(\.min)?\.js$/]
            },
            files: {
                'dist/': 'src/**/*.js'
            }
        }
    }
});
```

## Dependencies

dejavu depends on [amd-utils](https://github.com/millermedeiros/amd-utils).
If you use the regular build, you don't need to worry because all functions used from amd-utils are bundled for you.
If you use the AMD build, you must specify the path to amd-utils.
For example, if you use [RequireJS](http://requirejs.org/):

```js
paths : {
    'amd-utils': '../vendor/amd-utils/src'
},

packages: [
    {
        name: 'dejavu'
        location: '../../dist/amd/strict',
    }
]
```



## Building dejavu

Simply run `npm install` to install all the tools needed.
Then just run `npm run-script build` or `node build`.



## Testing dejavu

Please take a look at the [test](https://github.com/IndigoUnited/dejavu/tree/master/test) section.



## Works on

* IE (6+)
* Chrome (4+)
* Safari (3+)
* Firefox (3.6+)
* Opera (9+)
* Node.js and Rhino



## License ##

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).