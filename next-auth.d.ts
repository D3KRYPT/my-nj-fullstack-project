import NextAuth, {DefaultSession} from "next-auth"
import { DefaultDeserializer } from "v8"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}