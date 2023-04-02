1.	How would you handle the situation where your application goes over the rate limiting threshold on Riot Games’ API?

If this was becoming a common occurrence due to popularity, I would try contacting Riot Games' support team to request a higher rate limit or to discuss other options for accessing the data.

If this is a rare occurrence that happens during peak use times I would tryp implementing an exponential backoff strategy

If that fails as well, I would place limits on our users and require them to wait some amount of time between calls. This is not an ideal solution in terms of UX.

Also, this application has no authentification if this were to be used at scale the first step would be add authentification so only registered users can make api calls.

-------------------------------------------------------------------------

2.	How would you change your code to make this application extensible for any game while keeping the code maintainable?

For the backend:

I would create a directory to store all the functions that gather the stats for different games from different api’s. Then these would be imported into the index.ts file and called from the large switch case statement.

This way any time a new game is to be added the dev team needs to only add the case the switch case statement and write a new function to be called.

The idea behind my design was that all of these functions would all return data is a similar format (a component value to define what component to map to, and a 'value' that is sent to that component as props) so the front end devs can parse all games similarly.

For the Front End:
I would create a directory to store all the stat components and import them into the statsPage file.

The statsBlock component then is just a component that will map the stat to the desired component.

New components can be easily built for games with unique stats, and components can be re-used between games with similar stats.

-------------------------------------------------------------------------

3.	How would you organize the codebase for all these different functionality so the entire software is maintainable?

At this scale for front end I would take our directory of stats Components and publish them into a reusable components library accessible from multiple apps.

I would then create a react project for each functionality. i.e a match history app + a leaderboard app+ Fantasy app. Keeping these separate would avoid an app growing too large and being hard to maintain

For backend I would introduce more Lambda serverless functions with apiGateway api’s to support the front ends. I prefer this structure for a few reasons:
1.	Lambda is generally lower cost unless use is extremely high.
2.  No server maintence is required
2.	Each front end app can have 1 or many lambda functions supporting it.
3.	Each front end app can still access lambda functions that are supporting other apps. i.e the leaderboard app could still make calls to the statsApi that was built for the match history app.
4.  Lambda has incredible availability -- to my knowledge is one of the most reliable options out there.

