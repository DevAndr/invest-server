import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AtCookieAuthGuard extends AuthGuard('jwt'){
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(ctx: ExecutionContext): any {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      return request.cookies?.accessToken;
    } else {
      const ctxGql = GqlExecutionContext.create(ctx);
      const req = ctxGql.getContext().req


      console.log('AtCookieAuthGuard - cookies', req.cookies);

      return req
    }
  }

  canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    return isPublic ? true : super.canActivate(ctx);
  }
}