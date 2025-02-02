[The Book Chamber](https://www.book-chamber.com) is a website designed to carry out all your reading needs.

## Roadmap

**Done**
- Login Page
- Register Page
- Forgot Password Page
- Authentication using Auth.JS
- DB connection using MongoDB
- Google OAuth
- Deployment through Vercel

**Left to Do**
- Forgot Password functionality
- Dashboard Page
- Profile Page
- Settings Page
- Main Home Page
- Library Functionality (a lot of stuff here!)

## Development Story

The site is still being built, however we've made significant strides already. I'd like to start out by saying that I am one person making this site, so please bear with me on this :)

When I started this project, it was around Christmas time. I started out building using standard HTML, then I realised I needed something better, something more. I found Next.JS.

## Learning Next.JS

I had no prior knowledge of React, and I was intermediate at JavaScript, so I was essentially throwing myself in the deep-end, trying to learn a framework when I didn't even know what it was a framework of.

I read through the documentation (RTFM, am I right?) and I found my next error. I also had no idea how to use Node.JS - LOL. So, I quickly got set up with NVM, created my first next app, and I had the ball rolling.

I found a Udemy course for Next.JS by Maximilian Schwarzmüller (what a name!) and I quickly got set up with the essentials, learned routing, page rendering, data fetching, data mutation, caching, and optimisations. After about 10.5 hours of learning Next.JS, I reached my first block in the road - Authentication.

## Logging in

This was the big part I was looking forward to - I didn't anticipate, however, it being the hardest part. In the Udemy course, he uses Lucia Auth, however they have stopped being a library now, so now I'm stuck. I then came across Auth.JS, which is a beta version of next-auth built for the next.JS app router (which this project uses).

They have a real push for people using OAuth, such as Google (which we do use!), however I also wanted to have traditional login and register pages. It's lucky Auth.JS also has a Credentials provider which allows for just that. Do you think I could find a decent Credentials Auth.JS tutorial online? Think again.

It took me FOREVER to figure this out. The docs are sub-par at best and when I finally found someone who did it (thank you HuXb-WebDev), he used TailwindCSS and shadcn/ui - WHAT?

## CSS and UI

So, I installed Tailwind and started reading through their docs - at the same time trying to figure out this Auth.JS. Yes, I know, multitasking kills productivity, but what can you do? I focused on setting up the pages with Tailwind, starting with the Header component, then the main page template, then the login/register pages. Oh, and I also brought in Heroicons and HeadlessUI too, as shadcn/ui is shoddy.

Now I had it all looking lovely, it's time to make this Auth.JS work, and with the help of the amazing HuXb-WebDev, I finally had it all setup. One final thing - DARK MODE.

## Dark Mode

I found out, while using Tailwind, that they have classes for dark mode, which is cool, so now I was going through all the stuff I'd already done and adding dark mode to each element. Switching back and forth between light and dark messed with my eyes a little, and once you get used to how something looks in one view, it looks weird in the other.

Finally, after that was done, it was time to send this to production for the first time.

## Vercel

I have to hand it to Vercel, it's actually pretty easy to setup and use. You can import a GitHub repo into it, so whenever you push a commit to main, it auto-builds the site and redeploys. However, one issue...

MIDDLEWARE - Now, there's an optional step in the setup of Auth.JS to add a middleware. Middleware in Next.JS only uses Edge Runtime, not Node.JS - this was an issue. I'm using mongoose to connect to MongoDB, which uses certain Node.JS APIs which are not allowed in Edge Runtime. Uh oh.

My solution? Which totally works, by the way... Remove the middleware. Just deleted it straight out of there. Sorted, works, brilliant!

## The Future

Now, time to work out how to use jwt to set up a forgot password flow...