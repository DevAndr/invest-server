import {AuthGuard} from '@nestjs/passport'
import { ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class RtGqlAuthGuard extends AuthGuard('jwt-refresh') {
  constructor(private jwtService: JwtService) {
    super();
  }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext()
    const {username, password} = ctx.getArgs();
    const req = ctx.getContext().req;
    // request.body = {username, password}
    console.log("request: ", username, password, req);
    return req;
  }
}