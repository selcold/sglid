import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    // "/" will be accessible to all users
    publicRoutes: ["/((?!.+\\.[\\w]+$|_next).*)"],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};