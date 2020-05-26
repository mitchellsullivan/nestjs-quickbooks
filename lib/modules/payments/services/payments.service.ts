import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { QuickBooksAuthService } from "../../auth/services/auth.service";
import { BaseService } from "../../common/base.service";
import { QuickBooksStore } from "../../store/store.service";
import { QuickBooksPayments } from "../models/payments.model";
import { QuickBooksPaymentsQuery } from "../models/payments.query";
import { CreateQuickBooksPaymentsDto, FullUpdateQuickBooksPaymentsDto } from "../dto/payments.dto";

export interface QuickBooksPaymentsQueryResponse {
    QueryResponse: {
        Invoice: QuickBooksPayments[];
        startPosition: number;
        maxResults: number;
    };
    time: string;
}

export interface QuickBooksPaymentsDeleteResponse {
    Payment: {
        Id: string;
        status: string;
        domain: number;
    };
    time: string;
}

@Injectable()
export class QuickBooksPaymentsService {
    constructor(
        private readonly authService: QuickBooksAuthService,
        private readonly http: HttpService,
        private readonly store: QuickBooksStore
    ) {}

    public withDefaultCompany(): PaymentsInvoicesService {
        return this.forCompany(this.store.getDefaultCompany());
    }

    public forCompany(realm: string): PaymentsInvoicesService {
        return new PaymentsInvoicesService(realm, this.authService, this.http);
    }
}

class PaymentsInvoicesService extends BaseService<QuickBooksPayments, QuickBooksPaymentsQuery, QuickBooksPaymentsQueryResponse> {
    constructor(realm: string, authService: QuickBooksAuthService, http: HttpService) {
        super(realm, "payment", authService, http);
    }

    public create(dto: CreateQuickBooksPaymentsDto): Observable<QuickBooksPayments> {
        return this.post(dto);
    }

    public readById(id: string): Observable<QuickBooksPayments> {
        return this.get(id);
    }

    public getPdf(id: string): Observable<Buffer> {
        return this.get(`${id}/pdf`, null, {
            Accept: "application/pdf"
        });
    }

    public fullUpdate(id: string, token: string, dto: FullUpdateQuickBooksPaymentsDto): Observable<QuickBooksPayments>;
    public fullUpdate(invoice: QuickBooksPayments, dto: FullUpdateQuickBooksPaymentsDto): Observable<QuickBooksPayments>;
    public fullUpdate(
        ...args: [string | QuickBooksPayments, string | FullUpdateQuickBooksPaymentsDto, FullUpdateQuickBooksPaymentsDto?]
    ): Observable<QuickBooksPayments> {
        const [id, token, dto] = PaymentsInvoicesService.getUpdateArguments(args);
        return this.post({
            ...dto,
            Id: id,
            SyncToken: token
        });
    }

    public delete(id: string, token: string): Observable<QuickBooksPaymentsDeleteResponse>;
    public delete(invoice: QuickBooksPayments): Observable<QuickBooksPaymentsDeleteResponse>;
    public delete(...args: [string | QuickBooksPayments, string?]): Observable<QuickBooksPaymentsDeleteResponse> {
        const [id, token] = PaymentsInvoicesService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token
        }, "", {
            operation: "delete"
        });
    }

    public void(id: string, token: string): Observable<QuickBooksPaymentsDeleteResponse>;
    public void(invoice: QuickBooksPayments): Observable<QuickBooksPaymentsDeleteResponse>;
    public void(...args: [string | QuickBooksPayments, string?]): Observable<QuickBooksPaymentsDeleteResponse> {
        const [id, token] = PaymentsInvoicesService.getOperationArguments(args);
        return this.post({
            Id: id,
            SyncToken: token,
            sparse: true
        }, "", {
            operation: "update",
            include: "void"
        });
    }

    private static getUpdateArguments<DTO>(args: [string | QuickBooksPayments, string | DTO, DTO?]): [string, string, DTO] {
        const [idOrInvoice, tokenOrDto, dto] = args;
        if (dto) {
            return [idOrInvoice as string, tokenOrDto as string, dto];
        }

        const invoice = idOrInvoice as QuickBooksPayments;
        return [invoice.Id, invoice.SyncToken, tokenOrDto as DTO];
    }

    private static getOperationArguments(args: [string | QuickBooksPayments, string?]): [string, string] {
        const [idOrInvoice, token] = args;
        if (token) {
            return [idOrInvoice as string, token];
        }

        const invoice = idOrInvoice as QuickBooksPayments;
        return [invoice.Id, invoice.SyncToken];
    }
}
