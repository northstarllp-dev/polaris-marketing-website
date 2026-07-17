import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Serve the PrintOMS marketing page at the root when on printoms.* host.
 * Parent site (thepolarislabs / localhost) keeps /products/printoms.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const { pathname } = request.nextUrl;

  const isPrintomsHost =
    host === "printoms.thepolarislabs.com" ||
    host === "printoms.localhost" ||
    host.startsWith("printoms.");

  if (!isPrintomsHost) return NextResponse.next();

  // Root → PrintOMS page
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/products/printoms";
    return NextResponse.rewrite(url);
  }

  // Avoid double nesting if someone hits /products/printoms on subdomain
  if (pathname === "/products/printoms") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/products/printoms"],
};
