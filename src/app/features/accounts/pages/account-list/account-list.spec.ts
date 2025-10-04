import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountList } from './account-list';
import { AccountsService } from '../../services/accounts.service';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { AccountListDisplay } from '../../components/account-list-display/account-list-display';
import { By } from '@angular/platform-browser';

// Mock Account interface for testing - UPDATED to match Account interface
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

  it('should call reload on accountsResource when onReload is called', () => {
    component.onReload();
    expect(mockAccountsService.getAccounts().reload).toHaveBeenCalled();
  });

  it('should display loading state', () => {
    mockAccountsService.setLoading(true);
    fixture.detectChanges();
    expect(component.loading()).toBeTrue();
    const accountListDisplay = fixture.debugElement.query(By.directive(AccountListDisplay));
    expect(accountListDisplay.properties['isLoading']).toBeTrue();
  });

  it('should display error state', () => {
    // UPDATED: Use a proper Error object
    const testError = new Error('Failed to load accounts');
    mockAccountsService.setError(testError);
    fixture.detectChanges();
    expect(component.error()).toEqual(testError);
    const accountListDisplay = fixture.debugElement.query(By.directive(AccountListDisplay));
    expect(accountListDisplay.properties['error']).toEqual(testError);
  });

  it('should display accounts when data is available', () => {
    const testAccounts: MockAccount[] = [{ id: '1', holderName: 'Test User', balance: 1000, accountNum: '12345' }];
    mockAccountsService.setAccounts(testAccounts);
    fixture.detectChanges();
    expect(component.accounts()).toEqual(testAccounts);
    const accountListDisplay = fixture.debugElement.query(By.directive(AccountListDisplay));
    expect(accountListDisplay.properties['accounts']).toEqual(testAccounts);
  });

  it('should return empty array for accounts if no value is present', () => {
    mockAccountsService.setAccounts(null);
    fixture.detectChanges();
    expect(component.accounts()).toEqual([]);
    const accountListDisplay = fixture.debugElement.query(By.directive(AccountListDisplay));
    expect(accountListDisplay.properties['accounts']).toEqual([]);
  });

  it('should pass correct inputs to app-account-list-display', () => {
    const testAccounts: MockAccount[] = [{ id: '2', holderName: 'Another User', balance: 500, accountNum: '67890' }];
    const testError = new Error('Another error'); // UPDATED

    mockAccountsService.setLoading(true);
    mockAccountsService.setError(testError);
    mockAccountsService.setAccounts(testAccounts);
    fixture.detectChanges();

    const accountListDisplay = fixture.debugElement.query(By.directive(AccountListDisplay));
    expect(accountListDisplay).toBeTruthy();
    expect(accountListDisplay.properties['accounts']).toEqual(testAccounts);
    expect(accountListDisplay.properties['error']).toEqual(testError);
    expect(accountListDisplay.properties['isLoading']).toBeTrue();
  });
});
