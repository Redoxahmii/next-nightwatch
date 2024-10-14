"use client";
import { useRouter } from "next/navigation";

export default function Shows() {
  const router = useRouter();
  router.push("/shows/popular");
}
