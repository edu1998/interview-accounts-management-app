import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountList } from './account-list';
import { AccountsService } from '../../services/accounts.service';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { AccountListDisplay } from '../../components/account-list-display/account-list-display';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

interface MockAccount {
  id: string;
  holderName: string;
  balance: number;
  accountNum: string;
}

// Mock AccountsService
class MockAccountsService {
  private mockAccountsResource = {
    error: signal<any>(null),
    isLoading: signal<boolean>(false),
    hasValue: signal<boolean>(false),
    value: signal<{ data: MockAccount[] } | null>(null),
    reload: jasmine.createSpy('reload'),
  };

  getAccounts() {
    return this.mockAccountsResource;
  }

  // Helper methods to control the mock resource state
  setLoading(isLoading: boolean) {
    this.mockAccountsResource.isLoading.set(isLoading);
  }

  setError(error: any) {
    this.mockAccountsResource.error.set(error);
  }

  setAccounts(accounts: MockAccount[] | null) {
    this.mockAccountsResource.value.set(accounts ? { data: accounts } : null);
    this.mockAccountsResource.hasValue.set(!!accounts);
  }
}

describe('AccountList', () => {
  let component: AccountList;
  let fixture: ComponentFixture<AccountList>;
  let mockAccountsService: MockAccountsService;

  beforeEach(async () => {
    mockAccountsService = new MockAccountsService();

    await TestBed.configureTestingModule({
      imports: [AccountList, AccountListDisplay],
      providers: [
        { provide: AccountsService, useValue: mockAccountsService },
        { provide: ActivatedRoute, useValue: {} },
        provideZonelessChangeDetection(), // Add this line
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display accounts when service returns data', async () => {
    const mockAccounts: MockAccount[] = [
      { id: '1', holderName: 'John Doe', balance: 1000, accountNum: 'A123' },
      { id: '2', holderName: 'Jane Smith', balance: 2000, accountNum: 'B456' },
    ];
    mockAccountsService.setAccounts(mockAccounts);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const display = fixture.debugElement.query(
      By.directive(AccountListDisplay)
    );
    expect(display).toBeTruthy();
    const accountsInput = display.componentInstance.accounts;
    const value =
      typeof accountsInput === 'function' ? accountsInput() : accountsInput;
    expect(value).toEqual(mockAccounts);
  });

  it('should show loading state when accounts are loading', () => {
    mockAccountsService.setLoading(true);
    fixture.detectChanges();
    const loadingText = fixture.nativeElement.textContent;
    expect(loadingText.toLowerCase()).toContain('cargando');
  });

  it('should show error state when there is an error', () => {
    mockAccountsService.setError('Error de prueba');
    fixture.detectChanges();
    const errorText = fixture.nativeElement.textContent;
    expect(errorText.toLowerCase()).toContain('error');
  });
});
