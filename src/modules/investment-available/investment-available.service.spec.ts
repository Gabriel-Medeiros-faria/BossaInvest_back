import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentAvailableService } from './investment-available.service';

describe('InvestmentAvailableService', () => {
  let service: InvestmentAvailableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestmentAvailableService],
    }).compile();

    service = module.get<InvestmentAvailableService>(InvestmentAvailableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
