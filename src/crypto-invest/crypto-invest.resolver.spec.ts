import { Test, TestingModule } from '@nestjs/testing';
import { CryptoInvestResolver } from './crypto-invest.resolver';

describe('CryptoInvestResolver', () => {
  let resolver: CryptoInvestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoInvestResolver],
    }).compile();

    resolver = module.get<CryptoInvestResolver>(CryptoInvestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
