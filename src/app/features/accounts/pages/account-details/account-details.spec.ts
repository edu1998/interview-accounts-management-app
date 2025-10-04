import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetails } from './account-details';
import { AccountsService } from '../../services/accounts.service';
import { TransactionService } from '../../../transactions/services/transaction.service';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const mockAccount = {
  id: 'a1',
  holderName: 'Tester',
  accountNum: '1234',
  balance: 2000,
};
const mockTransactions = [
  {
    id: 't1',
    accountId: 'a1',
    amount: 100,
    type: 'credit',
    date: '2023-10-01',
  },
];

class MockAccountsService {
  getAccountById(accountId: string) {
    return {
      error: signal<any>(null),
      isLoading: signal<boolean>(false),
      hasValue: signal<boolean>(true),
      value: signal<{ data: typeof mockAccount } | null>({ data: mockAccount }),
      reload: jasmine.createSpy('reload'),
    };
  }
}

class MockTransactionService {
  getTransactionsByAccountId(accountId: string) {
    return {
      error: signal<any>(null),
      isLoading: signal<boolean>(false),
      hasValue: signal<boolean>(true),
      value: signal<{ data: typeof mockTransactions } | null>({
        data: mockTransactions,
      }),
      reload: jasmine.createSpy('reload'),
    };
  }
  createTransaction() {
    return { subscribe: () => {} };
  }
}

describe('AccountDetails', () => {
  let fixture: ComponentFixture<AccountDetails>;
  let component: AccountDetails;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDetails],
      providers: [
        { provide: AccountsService, useClass: MockAccountsService },
        { provide: TransactionService, useClass: MockTransactionService },
        { provide: ActivatedRoute, useValue: {} },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetails);
    component = fixture.componentInstance;
    (component as any)['accountId'] = 'a1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display account details when data is available', () => {
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Tester');
    expect(text).toContain('1234');
    expect(text).toContain('COP2,000.00');
  });

  it('should display the list of transactions when data is available', () => {
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('credit');
    expect(text).toMatch(/COP ?100\.00/);
  });
});
