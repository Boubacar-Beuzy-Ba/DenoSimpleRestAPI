import { Application, Router } from "https://deno.land/x/oak@v13.0.1/mod.ts";

const app = new Application();
const router = new Router();

// In-memory array to store todo items
let todos = [
  { id: 1, text: "Learn Deno" },
  { id: 2, text: "Build a Deno app" },
];

// // Middleware to parse JSON body
// app.use(async (ctx, next) => {
//   if (ctx.request.hasBody) {
//     try {
//       const body = await ctx.request.body();
//       ctx.request.bodyData = body.value;
//     } catch (error) {
//       console.error("Error parsing JSON body:", error);
//       ctx.response.status = 400;
//       ctx.response.body = { error: "Invalid JSON body" };
//       return;
//     }
//   }
//   await next();
// });

// Routes
router
  .get("/todos", (ctx) => {
    ctx.response.body = todos;
  })
  .get("/todos/:id", (ctx) => {
    const id = parseInt(ctx.params.id);
    const todo = todos.find((t) => t.id === id);

    if (todo) {
      ctx.response.body = todo;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Todo not found" };
    }
  })
  // .post("/todos", async (ctx) => {
  //   const body = ctx.request.bodyData;
  //   if (body && body.text) {
  //     const newTodo = { id: todos.length + 1, text: body.text };
  //     todos.push(newTodo);
  //     ctx.response.status = 201;
  //     ctx.response.body = newTodo;
  //   } else {
  //     ctx.response.status = 400;
  //     ctx.response.body = { error: "Invalid request body" };
  //   }
  // })
  // .put("/todos/:id", async (ctx) => {
  //   const id = parseInt(ctx.params.id);
  //   const index = todos.findIndex((t) => t.id === id);

  //   if (index !== -1) {
  //     const body = ctx.request.bodyData;
  //     if (body && body.text) {
  //       todos[index].text = body.text;
  //       ctx.response.body = todos[index];
  //     } else {
  //       ctx.response.status = 400;
  //       ctx.response.body = { error: "Invalid request body" };
  //     }
  //   } else {
  //     ctx.response.status = 404;
  //     ctx.response.body = { error: "Todo not found" };
  //   }
  // })
  .delete("/todos/:id", (ctx) => {
    const id = parseInt(ctx.params.id);
    todos = todos.filter((t) => t.id !== id);
    ctx.response.status = 204;
  });

app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
console.log("Server is running on http://localhost:8080/");
await app.listen({ port: 8080 });
