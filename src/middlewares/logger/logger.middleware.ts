//import { Injectable, NestMiddleware } from "@nestjs/common";

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     console.log(`${new Date().toLocaleTimeString()} Request is comming...`);
//     next();
//   }
// }

export function LoggerMiddleware(req: any, res: any, next: () => void) {
  console.log(`${new Date().toLocaleTimeString()} Request is comming...`);
  next();
}
