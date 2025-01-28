import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentAvailableController } from './investment-available.controller';
import { AuthorizationGuard } from '../authorization/authorization.guard';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../authorization/authorization.service'; 

describe('InvestmentAvailableController', () => {
  let controller: InvestmentAvailableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentAvailableController],
      providers: [
        {
          provide: AuthorizationGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true), 
          },
        },
        {
          provide: Reflector,
          useValue: {}, 
        },
        {
          provide: AuthorizationService, 
          useValue: {}, 
        },
      ],
    }).compile();

    controller = module.get<InvestmentAvailableController>(InvestmentAvailableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
