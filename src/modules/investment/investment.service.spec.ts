import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentService } from './investment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InvestmentEntity } from './investment.entity'; // Assumindo que essa seja a entidade correta

describe('InvestmentService', () => {
  let service: InvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentService,
        {
          provide: getRepositoryToken(InvestmentEntity),
          useValue: {
            // Mockando os métodos que você precisa
            find: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InvestmentService>(InvestmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
