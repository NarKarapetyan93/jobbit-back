import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAuthController } from './company-auth.controller';

describe('CompanyAuthController', () => {
  let controller: CompanyAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyAuthController],
    }).compile();

    controller = module.get<CompanyAuthController>(CompanyAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
