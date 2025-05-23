import { createCookieSessionStorage } from "react-router";

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
    secure: true,
  },
});

export { getSession, commitSession, destroySession };