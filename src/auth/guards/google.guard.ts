import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { google } from 'googleapis';

@Injectable()
export class GoogleGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    return await this.validateRequest(ctx.getContext());
  }

  async validateRequest(ctx) {
    const authHeaders = ctx.req.headers.google;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      try {
        const { data } = await google.people('v1').people.get({
          access_token: token,
          resourceName: 'people/me',
          personFields: 'names,emailAddresses,photos',
        });

        const profile = {
          socialId: data.resourceName?.replace('people/', '') ?? '',
          email: data.emailAddresses?.[0].value ?? '',
          photo: data.photos?.[0].url ?? null,
          displayName: data.names?.[0].displayName?.split(' (')[0] ?? '',
        };
        ctx.google = profile;
        return true;
      } catch (e) {
        console.log(e);
        throw new HttpException(
          {
            status: 401,
            error: 'Google Login Error',
            message: 'Failed to retrieve google profile',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
