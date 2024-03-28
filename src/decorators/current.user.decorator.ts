import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
    (data: string | undefined, context: ExecutionContext) => {
        if (context.getType() === 'http') {
            const req = context.switchToHttp().getRequest()
            const user = req.user;
            return !data ? user : user[data] || user;
        }

        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        return !data ? user : user[data] || user;
    },
);