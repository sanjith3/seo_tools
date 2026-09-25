import { NextResponse, type NextRequest } from "next/server";
import { normalizeCategoryQuery } from "./config/categories";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Intercept legacy query parameter URLs: /tools?cat=... and /tools/?cat=...
  if (pathname === "/tools" || pathname === "/tools/") {
    const cat = searchParams.get("cat");
    if (cat) {
      const targetSlug = normalizeCategoryQuery(cat);
      if (targetSlug) {
        const targetUrl = request.nextUrl.clone();
        targetUrl.pathname = `/tools/${targetSlug}/`;
        targetUrl.searchParams.delete("cat");
        // Use 308 permanent redirect
        return NextResponse.redirect(targetUrl, 308);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tools", "/tools/"]
};
