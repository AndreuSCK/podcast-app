## Podcast App
For this app, I aimed to use a simple tech stack. Utilizing Next.js 14 without a CSS library provided the freedom to simplify things. Instead of the typical Next.js server-side rendering (SSR) approach, I wanted to experiment with the full potential of a custom Provider (using useContext) for data management. Additionally, I made extensive use of custom hooks for a well-organized and clean workspace.
To cache data, I use next.revalidate, it will cache it for 24 hours and then revalidate it.
## Things to improve
- The app currently uses the allOrigins.win proxy directly. However, this is a slow solution. We can improve this by using the proxy only when the API call fails directly or encounters CORS errors.
- Add tests
- SWR library would simplify the fetch handling
### Get started
- clone the repo `git clone https://github.com/AndreuSCK/podcast-app/`
- open the folder `cd podcast-app`
- run `npm run i`
- to run the project in development run `npm run dev`
- or if you want to check the app directly 
