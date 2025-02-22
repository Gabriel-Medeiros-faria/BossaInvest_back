import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';

jest.mock('src/resources/decorators/authentication.guard.decorator', () => ({
  Public: jest.fn().mockImplementation(() => () => {}), 
}));

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
