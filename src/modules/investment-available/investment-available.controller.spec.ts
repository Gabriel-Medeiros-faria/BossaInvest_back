import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentAvailableController } from './investment-available.controller';

describe('InvestmentAvailableController', () => {
  let controller: InvestmentAvailableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentAvailableController],
    }).compile();

    controller = module.get<InvestmentAvailableController>(InvestmentAvailableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
