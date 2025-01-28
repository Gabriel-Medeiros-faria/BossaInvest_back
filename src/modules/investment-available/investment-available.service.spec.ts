import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentAvailableService } from './investment-available.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailableInvestmentEntity } from './investmentAvailable.entity';

describe('InvestmentAvailableService', () => {
  let service: InvestmentAvailableService;
  let repository: Repository<AvailableInvestmentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentAvailableService,
        {
          provide: getRepositoryToken(AvailableInvestmentEntity),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<InvestmentAvailableService>(InvestmentAvailableService);
    repository = module.get<Repository<AvailableInvestmentEntity>>(getRepositoryToken(AvailableInvestmentEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
