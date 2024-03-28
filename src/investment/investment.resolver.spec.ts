import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentResolver } from './investment.resolver';

describe('InvestmentResolver', () => {
  let resolver: InvestmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestmentResolver],
    }).compile();

    resolver = module.get<InvestmentResolver>(InvestmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
