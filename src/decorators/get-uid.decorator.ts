import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from 'src/auth/types';

export const GetUID = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user as JwtPayload;
      return user.sub;
    }

    const ctxGql = GqlExecutionContext.create(ctx);
    const jwtPayload = ctxGql.getContext().req.user as JwtPayload;
    console.log('GetCurrentUserId jwtPayload', jwtPayload);
    return jwtPayload.sub;
  },
);
