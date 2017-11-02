# Stateful View Transitions

[This demo](https://wookee9.github.io/react-stateful-view-transitions) is an attempt to achieve animated view transitions in React in a way that overcomes many of the common problems associated with conventional approaches.

The fundamental difference with this approach as compared to, for example React Transition Group, is that the __*state of the store and the state of the DOM always remain in sync*__ throughout the animation.

## Why does this matter?

Typically, the way that route / view state are modelled in a React / Redux app is that you simply have a key that represents the current view. When you navigate to a new view, this key changes from `ViewA` to `ViewB`, and React responds by removing the `ViewA` component, and swapping it for the `ViewB` component.

This all works just great until the designer decides to add some simple animations between the views. So you add in React CSS Transition Group. And all SEEMS to be well.

But strange bugs start creeping in - props seem to be missing as views transition in and out. Actions get dispatched at strange times. And it all starts to get very confusing.

The model of the view still thinks only one view is present in the DOM. But actually there are now multiple views in the DOM at any given moment. And each view can affect the state of the store.

You might try to prevent user interaction while the views are transitioning by using a CSS `pointer-events: none;` property. But of course this blocks the UI, so is far from ideal.

Then you attempt to overcome this problem by ensuring that the outgoing view transition completes before mounting and beginning the incoming view's transition. Now what's in the DOM matches your model in the store.

Then the designer asks for a transition where the incoming view starts to fade in while the outgoing view slides off to the left. But this is unfortunately impossible with your current routing model.

## How this approach works

To solve these problems, this prototype puts forward some slightly different ideas:

- View transitions happen inside of the component's normal lifecycle.
- One or more views / routes can be active in the DOM at any one time.
- The current route key is treated as an eventual target, rather than the key that represents the only view present in the DOM.
- Each view component is responsible for animating itself into and out of the DOM.

It may seem odd to allow multiple views to be present in the DOM simultaneously. But this is exactly what is happening during a view transition, so to pretend that it isn't seems wrong. Modelling it accurately in the store has big benefits.

A list of `activeViews` is maintained in the store. Views are allowed to persist in the store until they have completed their leaving animation. Once this has finished the view can be safely removed from the store, and the DOM. A `REMOVE_VIEW` action is dispatched, and the view is removed from the store's list of `activeViews`. This in turn causes a re-render in React with the new list of `activeViews`.

This is all achieved without special lifecycle hooks, 'frozen' components kept alive beyond their natural lifespan (eg React CSS Transition Group), Redux Thunk, or timeouts in action creators.

This approach is also completely agnostic as to the animation technique used. These examples use CSS animations, CSS transitions (ViewA) and timeouts. But they could just as easily work with GSAP, React Motion, or something else.

One clear benefit of using moving target, dynamic / physics JS based animations (such as React Motion), would be to make the animations fully interruptible in a graceful manor. With the CSS animations above, if they are interrupted before completing, they will abruptly stop, and then jump to the starting point for their exit animation, then play their exit animation. While this means the UI remains responsive, it is also pretty ugly!

### Caveats / potential issues with this approach

- I don't know if or how it will work with React Router (but I think it can probably be made to work with pattern matching).
- Changes to the store must be made in the knowledge that other views might still be active in the DOM, therefore deleting a prop that another view needs might cause errors.
- Actions dispatched within mount / unmount lifecycle hooks might not happen in the order you first think think they will. Instead, to guarantee sequential actions, the action would need to be dispatched before the outgoing view starts to transition out, or after all transitions have finished and the views have come to rest (hooks for this can be added).

### To-dos

- Prevent multiple instances of the same view, by recycling an already active instance of that view. This means transitions have to be interruptible, so they can be told to about-turn and animate back in if already on it's way out.
- Demonstrate how this might work with nested views
- Demonstrate how this might work with 'proper' routing, eg React Router v4
- Supply the incoming view with notification that the outgoing view's transition has finished. This would remove the need for hard-coded delays in many use cases, which can appear odd if you go from a view that exits very quickly to a view that has a long delay before it enters (ViewC).
