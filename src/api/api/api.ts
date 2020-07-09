export * from './chargePoint.service';
import { ChargePointService } from './chargePoint.service';
export * from './organization.service';
import { OrganizationService } from './organization.service';
export const APIS = [ChargePointService, OrganizationService];
