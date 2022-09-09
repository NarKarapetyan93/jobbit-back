import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from '../companies/companies.service';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { AuthDto } from '../common/dto/auth.dto';

@Injectable()
export class CompanyAuthService {
  constructor(
    private companiesService: CompaniesService,
    private jwtTokenService: JwtService,
  ) {}

  async validateCompany(username: string, password: string): Promise<any> {
    const user = await this.companiesService.findByEmail(username);
    if (!user) {
      throw new BadRequestException('Company does not exists');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Password is incorrect');
    }
    const { password: dbPass, ...result } = user;
    return result;
  }

  async register(data: CreateCompanyDto) {
    const company = await this.companiesService.create(data);
    const tokens = await this.getTokens({
      username: company.email,
      sub: company._id,
    });
    await this.updateRefreshToken(company._id, tokens.refreshToken);
    return tokens;
  }

  async login(data: AuthDto) {
    const company = await this.companiesService.findByEmail(data.email);
    if (!company) throw new NotFoundException('Company does not exist');
    const passwordMatches = await bcrypt.compare(
      data.password,
      company.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens({
      username: company.email,
      sub: company._id,
    });
    await this.updateRefreshToken(company._id, tokens.refreshToken);

    const { password, ...companyDetails } = company;

    return { ...companyDetails, ...tokens };
  }

  async logout(companyId: string) {
    return this.companiesService.update(companyId, { refreshToken: null });
  }

  async refreshTokens(companyId: string, refreshToken: string) {
    const company = await this.companiesService.findOne(companyId);
    if (!company || !company.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      company.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens({
      username: company.email,
      sub: company._id,
    });
    await this.updateRefreshToken(company.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      bcrypt.genSaltSync(12),
    );
    await this.companiesService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(payload: object) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtTokenService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      }),
      this.jwtTokenService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
