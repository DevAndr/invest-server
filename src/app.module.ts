import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLDateTime, GraphQLJSON } from 'graphql-scalars';
import { join } from 'path';
import configuration, { whiteList } from './config/configuration';
import { AtGqlAuthGuard } from './guards';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { GqlContext } from './types';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { InvestmentModule } from './investment/investment.module';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { AtCookieAuthGuard } from './guards/at.cookie.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        playground: false,
        sortSchema: true,
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/graphql/graphql.ts'),
        },
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: ({ req, res, extra }: GqlContext) => ({ req, res }),
        cors: {
          origin: whiteList,
          credentials: true,
        },
        resolvers: { DateTime: GraphQLDateTime },
      }),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    InvestmentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtCookieAuthGuard,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    UserModule,
    AuthModule,
    PrismaService,
  ],
})
export class AppModule {
}
