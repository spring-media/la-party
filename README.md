# la-party
[![wercker status](https://app.wercker.com/status/8db7108b4d5c5d549db6121478af9c3d/s "wercker status")](https://app.wercker.com/project/bykey/8db7108b4d5c5d549db6121478af9c3d)

la-party is a wrapper library for eventemitter2 that replays last events for newly attached listeners.
This helps with building modular asynchronous components.

# Installation

`npm install --save la-party`

# Usage

```javascript
import EventSystem from 'la-party'

EventSystem.fireEvent('user:action', {username: 'johndoe'})
EventSystem.registerEventListener('user:action', user => {
    expect(user.username).to.equal('johndoe')
})

```


# Building

```
npm run install-dependencies
npm run all
```
