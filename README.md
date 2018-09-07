# It's Showtime

This is a responsive showtime counter clock and event list App that I made in a few days during vacation. Having developed web apps with Angular 1.6 - 6 versions for the past 18 months, I decided to go back to basics and see how to make a small-as-possible app that would run in a browser (in other words it would be small AND cross-platform!).

## Why did I make this?
Well, a friend of mine (a live audio engineer) needed this so he could input the upcoming events for the evening he was working. It beats paper that gets lost and tells you nothing about the most important thing: how long is it till Showtime?

## How did I make this?
I wanted to make a really small app but keep all the convenience of a framework. As you can see, this is a zero dependency app but there are a bunch of devDependencies. I utilised Typescript for coding Javascript, Webpack for building, Sass for styles, Gulp for workflow and Jest for testing. There's browserSync for instant updates & husky, lint-staged and stylelint for efficient code convention checks during development and code commit.

I used the Observer pattern to update the components through a Singleton resource object (basically a poor man's Redux) and divided the needed resources to components as cleanly as I could:

## The App
#### This is where we start:
![Alt text](/assets/start-screen.png?raw=true)

The first clock displays current time. The other two show an event's start and end times. When there is no upcoming events they just display current time.

#### This is the event list:
![Alt text](/assets/event-list.png?raw=true)

Here you can add, modify and remove events. The list is sorted by start time. There's no conflict checking yet, so that is a PEBKAC. When you create a new event it automatically checks the previous event and starts on the next second after it and adds an hour to the end time. If there is no previous event it just starts now and ends an hour later. You can then modify the defaults and save the event list.

#### The Great Await
![Alt text](/assets/awaiting.png?raw=true)
When you are waiting for an event the biggest counter in the middle shows a human readable string on how long it is till showtime. It goes to from many days to a day then hours and minutes, minutes and ultimately a 60 second counter.

#### It's showtime
![Alt text](/assets/showtime.png?raw=true)
When the event is on, the showtime counter and the event name turn red to indicate that we are on air. The next event is also displayed under the current event.

### Lessons learned
In the end the Javascript file is 14 KB, index.html is 2 KB and styles.css is 6 KB. 22 KB for the whole thing: not bad!

While it was pretty easy to make this zero dependency App, it doesn't mean that this approach is scalable. For example I got lazy with the styles and just put them all in one file, where I should have split them to their respective components. When the App is this small it's okay, but it doesn't scale.

Also, obviously since I'm using ids to connect to the DOM this App would be harder to maintain, since any id change would also have to be reflected in the code. I only use them in the main.ts but still, it creates spaghetti. I like Angular more.

There's also clearly benefits in using a framework, because you don't have to configure any of the scaffolding yourself. It just works. If I was to make this with Angular I would expect a bigger payload, but a faster time in actually making it. Maybe i'll do that one day. Or React, still need to learn that. Or Do I?

## Conclusion
Don't do it like this if it's Enterprise but it's still great fun to get it all working. Learned some new good stuff from Gulp, Webpack, Typescript compiler and Jest.

#### How to use
Just clone this repo and run `npm run build:w` for development version and `npm run build:release` for the release version.
