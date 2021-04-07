import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    return await this.validateRequest(ctx.getContext());
  }

  async validateRequest(ctx) {
    const authHeaders = ctx.req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      let decoded: any;
      try {
        decoded = this.jwtService.verify(token);
        if (decoded.exp < Date.now() / 1000) {
          this.unAuthorized();
        }
      } catch (e) {
        this.unAuthorized();
      }
      const user = await this.usersService.findOne(decoded.id);
      if (!user) {
        this.unAuthorized();
      }
      ctx.user = user;
      return true;
    } else {
      this.unAuthorized();
    }
  }

  // TODO make an utility function across all app.
  private unAuthorized() {
    const errors = { username: 'No user were found.' };
    throw new HttpException(
      { data: { message: 'Token is not valid', errors } },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
