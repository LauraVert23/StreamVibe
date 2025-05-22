import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  auth: boolean;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, null>({
  cookie: {
    name: "filmes_session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_KEY!],
    secure: false,
  },
});

export { getSession, commitSession, destroySession };