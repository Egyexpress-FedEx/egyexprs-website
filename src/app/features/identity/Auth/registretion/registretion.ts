import { Component, DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize, Subscription } from "rxjs";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Registertion } from "../../services/registertion";
import { Response as CityOption } from "../../interface/register";
import { Toast } from '../../../../shared/ui/toast/toast';

@Component({
  imports: [ReactiveFormsModule, RouterLink, Toast],
  selector: "app-registretion",
  styleUrl: "./registretion.css",
  templateUrl: "./registretion.html",
})
export class Registretion {
  readonly cities = signal<CityOption[]>([]);
  readonly citiesLoading = signal(false);
  readonly citiesError = signal("");
  private citiesLoaded = false;
  private readonly registrationService = inject(Registertion);
  private readonly destroyRef = inject(DestroyRef);
  private accountRequest?: Subscription;
  private requestedAccount = "";
  private lastAccountResult: { number: string; company: string; error: string } | null = null;
  readonly accountError = signal("");
  readonly showPassword = signal(false);
  readonly submitted = signal(false);
  readonly notice = signal("");
  readonly registering = signal(false);
  readonly registered = signal(false);
  readonly form = new FormGroup({
    accountNumber: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fullName: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    company: new FormControl("", { nonNullable: true }),
    contactPerson: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address2: new FormControl("", { nonNullable: true }),
    city: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    telephone: new FormControl("", { nonNullable: true }),
    mobile: new FormControl("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[+\d][\d\s()-]{6,19}$/),
      ],
    }),
    contactEmail: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });
  readonly profileFields = [
    {
      key: "accountNumber",
      label: "EGXPRESS account number",
      placeholder: "Enter your existing account number",
      type: "text",
      autocomplete: "off",
      required: true,
    },
    {
      key: "email",
      label: "Email or User ID",
      placeholder: "Enter your email or User ID",
      type: "text",
      autocomplete: "username",
      required: true,
    },
    {
      key: "fullName",
      label: "Full name",
      placeholder: "Enter your full name",
      type: "text",
      autocomplete: "name",
      required: true,
    },
    {
      key: "password",
      label: "Password",
      placeholder: "Create your password",
      type: "password",
      autocomplete: "new-password",
      required: true,
    },
  ];
  readonly businessFields = [
    {
      key: "company",
      label: "Registered company name",
      placeholder: "Available after account verification",
      type: "text",
      autocomplete: "organization",
      required: false,
      wide: true,
    },
    {
      key: "contactPerson",
      label: "Contact person",
      placeholder: "Full name of your contact person",
      type: "text",
      autocomplete: "off",
      required: true,
      wide: true,
    },
    {
      key: "address",
      label: "Business address",
      placeholder: "Building, street name, office suite",
      type: "text",
      autocomplete: "address-line1",
      required: true,
      wide: true,
    },
    {
      key: "address2",
      label: "Address line 2",
      placeholder: "District, area or additional details",
      type: "text",
      autocomplete: "address-line2",
      required: false,
      wide: true,
    },
    {
      key: "city",
      label: "City",
      placeholder: "Enter your city",
      type: "text",
      autocomplete: "address-level2",
      required: true,
      wide: false,
    },
    {
      key: "telephone",
      label: "Office telephone",
      placeholder: "Office phone number",
      type: "tel",
      autocomplete: "section-office tel",
      required: false,
      wide: false,
    },
    {
      key: "mobile",
      label: "Mobile number",
      placeholder: "Your contact mobile",
      type: "tel",
      autocomplete: "section-mobile tel",
      required: true,
      wide: false,
    },
    {
      key: "contactEmail",
      label: "Contact email",
      placeholder: "contact@company.com",
      type: "email",
      autocomplete: "section-business email",
      required: true,
      wide: false,
    },
  ];
  constructor() {
    this.form.controls.accountNumber.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.accountRequest?.unsubscribe();
        this.form.controls.company.setValue("");
        this.accountError.set("");
      });
  }

  loadCities(): void {
    if (this.citiesLoaded || this.citiesLoading()) return;
    this.citiesLoading.set(true);
    this.citiesError.set("");
    this.registrationService.getcity({
      Filter: "CodeType='CITY' and AreaCode='EG' ",
      UserID: "test",
      UserPwd: "123",
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.citiesLoading.set(false)),
    ).subscribe({
      next: response => {
        if (response.Code === "-1" || !Array.isArray(response.Response)) {
          this.citiesError.set(response.Description || "Unable to load cities. Open the list to try again.");
          return;
        }
        this.cities.set(response.Response);
        this.citiesLoaded = true;
      },
      error: () => this.citiesError.set("Unable to load cities. Open the list to try again."),
    });
  }

  lookupAccount(): void {
    const accountNumber = this.form.controls.accountNumber.value.trim();
    if (accountNumber && this.lastAccountResult?.number === accountNumber) {
      this.form.controls.company.setValue(this.lastAccountResult.company);
      this.accountError.set(this.lastAccountResult.error);
      return;
    }
    if (this.requestedAccount === accountNumber && this.accountRequest && !this.accountRequest.closed) return;
    this.accountRequest?.unsubscribe();
    this.form.controls.company.setValue("");
    this.accountError.set("");
    if (!accountNumber) return;
    this.requestedAccount = accountNumber;
    this.lastAccountResult = null;

    this.accountRequest = this.registrationService
      .getaccountDetials({
        AccountNo: accountNumber,
        UserID: "test",
        UserPwd: "123",
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const companyName = response.CustomerDetails?.cl_CustName;
          if (response.Code === "-1" || !companyName) {
            this.accountError.set(
              response.Description ||
                "Account not found. Please check your account number."
            );
            this.lastAccountResult = { number: accountNumber, company: "", error: this.accountError() };
            return;
          }
          this.lastAccountResult = { number: accountNumber, company: companyName, error: "" };
          this.form.controls.company.setValue(companyName);
        },
        error: () =>
          this.accountError.set(
            "Unable to retrieve account details. Please try again."
          ),
      });
  }

  error(key: string): string {
    if (key === "accountNumber" && this.accountError())
      return this.accountError();
    const field = this.form.get(key);
    if (!field || !field.invalid || !(field.touched || this.submitted()))
      return "";
    if (field.hasError("required")) return "This field is required.";
    if (field.hasError("email")) return "Enter a valid email address.";
    return "Enter a valid phone number.";
  }
  register() {
    if (this.registering() || this.registered()) return;
    this.submitted.set(true);
    this.notice.set("");
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const values = this.form.getRawValue();
    if (!values.company || this.accountError() || this.lastAccountResult?.number !== values.accountNumber.trim()) {
      this.notice.set("Please verify your account number before registering.");
      return;
    }
    const city = this.cities().find(item => item.cl_CodeID === values.city);
    if (!city) {
      this.notice.set("Please select a city from the list.");
      return;
    }
    const dateParts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(new Date());
    const datePart = (type: string) => dateParts.find(part => part.type === type)?.value;
    this.registering.set(true);
    this.registrationService.registerNow({
      Database: "IntegraOnTrack",
      UserID: "test",
      UserPwd: "123",
      OnlineUserMastData: {
        cl_Accno: values.accountNumber.trim(),
        cl_PWDAC: values.password,
        cl_Active: "Y",
        cl_UserID: values.email.trim(),
        cl_UserTag: null,
        cl_UserType: "",
        cl_UserName: values.fullName.trim(),
        cl_CoCode: null,
        cl_CustName: values.company,
        cl_CPerson: values.contactPerson.trim(),
        cl_CustAddress: values.address.trim(),
        cl_CustAddress1: values.address2.trim(),
        cl_CustAddress2: null,
        cl_CustCity: city.cl_CodeID,
        cl_CustCountry: "EG",
        cl_CustPhone: values.telephone.trim(),
        cl_CustFax: "",
        cl_CustMobile: values.mobile.trim(),
        cl_CustEMail: values.contactEmail.trim(),
        cl_GeoLoc: "",
        cl_CustCityName: city.cl_CodeName,
        cl_CustCountryName: "EGYPT",
        cl_SignDate: `${datePart('year')}-${datePart('month')}-${datePart('day')}`,
      },
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.registering.set(false)),
    ).subscribe({
      next: response => {
        if (response.Code === "1" && response.Description?.toUpperCase() === "SUCCESS") {
          this.registered.set(true);
          this.form.reset();
          this.submitted.set(false);
          this.showPassword.set(false);
          this.notice.set("Details registered inside local ledger system. Egypt Express IT systems desk operations will review and trigger activation soon.");
          return;
        }
        this.notice.set(response.Description || "Unable to register. Please try again.");
      },
      error: () => this.notice.set("Unable to register. Please try again."),
    });
  }
  clear() {
    if (this.registering()) return;
    this.form.reset();
    this.submitted.set(false);
    this.notice.set("");
    this.showPassword.set(false);
    this.registered.set(false);
  }
}
