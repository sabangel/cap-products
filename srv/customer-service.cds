using {com.asm as asm} from '../db/schema';

service CustomerService {
    entity CustomerSrv as projection on asm.Customer;
}