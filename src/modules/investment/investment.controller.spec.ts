import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { AddInvestmentInputDto } from './dtos/add-investment-input.dto';
import { InvestmentQueryInputDto } from './dtos/investment-query-input.dto';
import { AuthorizationGuard } from '../authorization/authorization.guard'; // Supondo que seja esse o caminho do AuthorizationGuard
import { AuthorizationService } from '../authorization/authorization.service'; // Supondo que esse seja o serviço que está faltando

describe('InvestmentController', () => {
  let controller: InvestmentController;
  let service: InvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentController],
      providers: [
        {
          provide: InvestmentService,
          useValue: {
            investments: jest.fn(),
            addInvestment: jest.fn(),
            deleteInvestment: jest.fn(),
          },
        },
        {
          provide: AuthorizationService, // Mock do AuthorizationService
          useValue: {
            validateToken: jest.fn(), // Funções mock do serviço de autorização
          },
        },
      ],
    })
      .overrideGuard(AuthorizationGuard) // Se estiver usando um Guard de autorização
      .useValue({ canActivate: jest.fn(() => true) }) // Mocka a função canActivate
      .compile();

    controller = module.get<InvestmentController>(InvestmentController);
    service = module.get<InvestmentService>(InvestmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getInvestments', () => {
    it('should call service to get investments', async () => {
      const query: InvestmentQueryInputDto = { userId: 1 };
      const result = [
        { 
          id: 1, 
          amount: 100, 
          walletId: 1, 
          availableInvestmentId: 2 
        }
      ]; // Mock com todas as propriedades do InvestmentDto
      
      jest.spyOn(service, 'investments').mockResolvedValue(result);
  
      expect(await controller.getInvestments(query)).toBe(result);
      expect(service.investments).toHaveBeenCalledWith(query);
    });
  });
  
  describe('addInvestment', () => {
    it('should call service to add a new investment', async () => {
      const investmentData: AddInvestmentInputDto = {
        walletId: 1,
        availableInvestmentId: 2,
        amount: 100,
      };
      const result = { id: 1, ...investmentData };
      jest.spyOn(service, 'addInvestment').mockResolvedValue(result);

      expect(await controller.addInvestment(investmentData)).toBe(result);
      expect(service.addInvestment).toHaveBeenCalledWith(investmentData);
    });
  });

  describe('deleteInvestment', () => {
    it('should call service to delete an investment', async () => {
      const investmentId = 1;
      const result = { message: 'Investimento deletado com sucesso' }; 
      
      jest.spyOn(service, 'deleteInvestment').mockResolvedValue(result);
  
      expect(await controller.deleteInvestment(investmentId)).toEqual(result);
      expect(service.deleteInvestment).toHaveBeenCalledWith(investmentId);
    });
  });
});
