
export default class GlobalConstants {

    public static CACHE_KEY_GENERATION_SEP: string  = '::';
    public static CRM_CACHE_KEY_IDENTIFIER: string    = 'ADMIN';

    public static CRM_BASE_PATH: string    = '/crm/v1/';

    public static VERIFICATION_TOKEN_SEPERATOR: string   = '___';
    public static EMAIL_VERIFICATION_IDENTIFIER: string   = "emailVerification";
    public static PHONE_VERIFICATION_IDENTIFIER: string   = "phoneVerification";
    public static VERIFICATION_EMAIL_FROM_MAIL: string   = "workout@cultfit.in";
    public static EMAIL_REPLY_TO_HEADER: string = "workout@cultfit.in";
    public static VERIFICATION_EMAIL_SUBJECT: string   = "Welcome to CULT";
    public static BOOKING_CONFIRMATION_EMAIL_SUBJECT: string = "[CULT] Class Booking Confirmation";
    public static PURCHASE_MEMBERSHIP_EMAIL_SUBJECT: string = "[CULT] Pack Purchase Confirmation";
    public static PURCHASE_ADVANCE_MEMBERSHIP_EMAIL_SUBJECT: string = "[CULT] Pack Pre-Registration Confirmation";
    public static SMS_SENDER_ID: string   = "CULTFT";
    public static NUMBER_OF_DIGITS_VERIFICATION_OTP: number = 6;
    public static CUSTOMER_SUPPORT_NUMBER: string = "080 3063 0990";


    public static PASSWORD_CHANGE_CATBOX_CACHE_SEGMENT: string   = 'verification';
    public static  LOGIN_CATBOX_CACHE_SEGMENT: string             = 'login';

    public static AUTH_COOKIE_KEY: string   = "access-token";
    public static AUTH_URL_QUERY_KEY: string   = "thereIsNoSuchKeyYet";

    public static SCHEDULE_DAYS_FOR_LOGGED_IN_USER: number = 7;
    public static SCHEDULE_DAYS_FOR_NON_LOGGED_IN_USER: number = 5;
    public static RANDOM_STRING_LENGTH: number = 7;
    public static RANDOM_STRING_COMBINATION: string   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    public static QR_CODE_SEPARATOR:  string = "$";

    public static INDIA_TIMEZONE: string   = "+0530";
    public static EVENT_WEEK_FILTER_NUMBER: number = 7;

    public static SMS_OTP_TOKEN_EXPIRY: number = 600; // 10*60 = 10 minutes
    public static EMAIL_VERIFICATION_LINK_EXPIRY: number = 86400; // 24*60*60 = 24 hours

    public static MAX_NUMBER_OF_FREE_CLASSES_PER_USER: number = 1;
    public static ADVANCE_MEMBERSHIP_DAYS: number = 30;
    public static TOKEN_KEY: string = 'X-AT';
}
