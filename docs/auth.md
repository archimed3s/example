# Authentication

We're using 2-step-authentication. First between client and BFF and second between BFF and microservices. 

[Iron-session](https://github.com/vvo/iron-session) is auth package for next.js and take care about all auth flow and storing user inside request session and store session toke in request cookie.

If you need get player info on server side you can use `withSessionSsr`.

```tsx
export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const player = req.session.player || null;

  if (!req.session?.player?.playerId) {
    return { notFound: true };
  }

  return {
    props: { player },
  };
});
```

Note: as `player` prop can be undefined always put null as default value to avoid next.js error with prop parsing.

You can always get user from `useAuth` hook on client site. Inside this hook on each first render we refresh user token and put user information in react context.

```tsx
const { player } = useAuth();

if (player) {
    // user logged in here

    console.log(player); // user information
}
```

