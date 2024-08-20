import { NextResponse } from "next/server";

export default function Middleware(req) {
  let token = req.cookies.get("token");
  const url = req.url;
  if (!token && url.includes("/dashboard")) {
    return NextResponse.redirect("http://localhost:3000");
  }
  if (token && url === "http://localhost:3000") {
    return NextResponse.redirect("http://localhost:3000/dashboard");
  }
}
