import { RefDto } from "../../common/dto/ref.dto";
import { PhoneNumberDto } from "../../common/dto/phone-number.dto";
import { EmailDto } from "../../common/dto/email.dto";

export class VendorWithDisplayName {
    DisplayName: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export class VendorWithSuffix {
    DisplayName?: string;
    Suffix: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export class VendorWithTitle {
    DisplayName?: string;
    Suffix?: string;
    Title: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export class VendorWithMiddleName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName: string;
    FamilyName?: string;
    GivenName?: string;
}

export class VendorWithFamilyName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName: string;
    GivenName?: string;
}

export class VendorWithGivenName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName: string;
}

export class VendorsAddressDto {
    PostalCode?: string;
    City?: string;
    Country?: string;
    Line5?: string;
    Line4?: string;
    Line3?: string;
    Line2?: string;
    Line1?: string;
    CountrySubDivisionCode?: string;
}

export class VendorDto {
    PrimaryEmailAddr?: EmailDto;
    OtherContactInfo?: string;
    SecondaryTaxIdentifier?: string;
    APAccountRef?: RefDto;
    TermRef?: RefDto;
    GSTIN?: string;
    Fax?: PhoneNumberDto;
    BusinessNumber?: string;
    HasTPAR?: boolean;
    TaxReportingBasis?: boolean;
    Mobile?: PhoneNumberDto;
    PrimaryPhone?: PhoneNumberDto;
    Active?: boolean;
    AlternatePhone?: PhoneNumberDto;
    Vendor1099?: boolean;
    BillRate?: number;
    WebAddr?: number;
    CompanyName?: string;
    TaxIdentifier?: string;
    AcctNum?: string;
    GSTRegistrationType?: string;
    PrintOnCheckName?: string;
    BillAddr?: VendorsAddressDto;
}

export type CreateVendorDto = (
    VendorWithDisplayName |
    VendorWithSuffix |
    VendorWithTitle |
    VendorWithMiddleName |
    VendorWithFamilyName |
    VendorWithGivenName
) & VendorDto;

export type FullUpdateVendorDto = (
    VendorWithDisplayName |
    VendorWithSuffix |
    VendorWithTitle |
    VendorWithMiddleName |
    VendorWithFamilyName |
    VendorWithGivenName
) & VendorDto;

export type SparseUpdateVendorDto = (
    VendorWithDisplayName |
    VendorWithSuffix |
    VendorWithTitle |
    VendorWithMiddleName |
    VendorWithFamilyName |
    VendorWithGivenName
) & VendorDto;