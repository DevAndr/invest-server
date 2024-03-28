import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AtGqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(ctx: ExecutionContext): any {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      console.log('http');
      return request;
    } else {
      const ctxGql = GqlExecutionContext.create(ctx);
      console.log(ctxGql.getContext().req);
      return ctxGql.getContext().req;
    }
  }

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    return isPublic ? true : super.canActivate(ctx);
  }
}
