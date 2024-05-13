import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const check = request.nextUrl.searchParams.get("foo");
  return new Response(check);
}
