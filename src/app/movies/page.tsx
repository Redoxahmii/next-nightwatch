"use client";
import { useRouter } from "next/navigation";

export default function Movies() {
  const router = useRouter();
  router.push("/movies/popular");
}
