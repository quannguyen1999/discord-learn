import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher(['/api/uploadthing', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
    if (!isPublicRoute(req)) {
      auth().protect(); // Protect the route if it matches the defined criteria
    }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};