import { NextRequest, NextResponse } from 'next/server';

// Helper function to check if the user has the required role
function hasRequiredRole(req: NextRequest): boolean {
    const role = req.cookies.get('role')?.value; // Get the role cookie

    // Check if the role is either "SUPER_ADMIN" or "REVIEWER"
    return role === 'SUPER_ADMIN' || role === 'REVIEWER' || role === 'EDITOR';
}

export default function middleware(req: NextRequest) {
    const dashboardPathPattern = /^\/dashboard/;

    // Check if the request is for the dashboard path
    if (dashboardPathPattern.test(req.nextUrl.pathname)) {
        // Check if the user has the required role
        if (!hasRequiredRole(req)) {
            return NextResponse.redirect(new URL('/', req.url)); // Redirect to unauthorized page
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'], // Adjust as needed
};
