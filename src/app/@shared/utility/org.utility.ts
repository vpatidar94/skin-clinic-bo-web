import { FnUtility, ROLE } from "aayam-clinic-core";
import { APP_CONST } from "src/app/@app/const/app.const";

export class OrgUtility {
    public static hasSuperAdminAccess(role?: string | null): boolean {
        return role === ROLE.SUPER_ADMIN;
    }

    public static hasAdminAccess(role?: string | null): boolean {
        return role === ROLE.ADMIN;
    }

    public static hasEmpAccess(role?: string | null): boolean {
        return role === ROLE.EMP;
    }

    public static hasOrgAccess(orgId?: string | null): boolean { 
        return !!orgId && !FnUtility.isEmpty(orgId) && orgId !== APP_CONST.CLINIC;
    }
}