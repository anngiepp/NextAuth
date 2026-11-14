import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent } from "next/server";

const auth = withAuth({
  pages: { signIn: "/signIn" },
});

export function proxy(req: NextRequestWithAuth, event: NextFetchEvent) {
  return auth(req, event);
}

export const config = { matcher: ["/dashboard", "/profile"] };
