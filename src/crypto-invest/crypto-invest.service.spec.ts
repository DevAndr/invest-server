import { Test, TestingModule } from '@nestjs/testing';
import { CryptoInvestService } from './crypto-invest.service';

describe('CryptoInvestService', () => {
  let service: CryptoInvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoInvestService],
    }).compile();

    service = module.get<CryptoInvestService>(CryptoInvestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
