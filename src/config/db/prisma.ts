import { Prisma, PrismaClient } from "@prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

const prisma: PrismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});
prisma.$extends(withOptimize());

prisma.$on("query" as never, (e: Prisma.QueryEvent) => {
  console.log("QueryEvent:", e);
  // console.log("Query: " + e.query);
  // console.log("Params: " + e.params);
  // console.log("Duration: " + e.duration + "ms");
  console.log();
});
export default prisma;
