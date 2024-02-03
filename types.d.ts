// types.d.ts

declare module "https://deno.land/x/oak@v13.0.0/mod.ts" {
  interface Request {
    bodyData?: any;
  }
}
