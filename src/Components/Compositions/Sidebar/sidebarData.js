import { Profile } from "emotion-icons/icomoon"
import { AkuRepsSVG, AllTransactionsSVG, ApplicationsSVG, ApprovalsSVG, AuditLogsSVG, DashboardSVG, DisbursementLogsSVG
  , FlaggedTransactionsSVG, ProfileSVG, SMSTransactionsSVG } from "../../Icons"

export const adminSideBarRoute = [
  {
    img: {
      src: DashboardSVG,
      alt: 'dashboard',
    },
    link: '/dashboard',
    span: 'Dashboard',
    adminRoute: false,
    akupayDisbursementRoute: false,
    id:1
  },
  {
    img: {
      src: ApplicationsSVG,
      alt: 'Reports',
    },
    link: '/dashboard/reports',
    span: 'Reports',
    adminRoute: true,
    akupayDisbursementRoute: false,
    id:2
  }, 
  {
    img: {
      src: SMSTransactionsSVG,
      alt: 'Resolve SMS',
    },
    link: '/dashboard/resolve-sms',
    span: 'Resolve SMS',
    adminRoute: false,
    akupayDisbursementRoute: false,
    id:3
  },
  {
    img: {
      src: SMSTransactionsSVG,
      alt: 'All SMS',
    },
    link: '/dashboard/all-sms',
    span: 'All SMS',
    adminRoute: true,
    akupayDisbursementRoute: false,
    id:9
  },   
  {
    img: {
      src: AkuRepsSVG,
      alt: 'Aku Reps',
    },
    link: '/dashboard/aku-reps',
    span: 'Aku Reps',
    adminRoute: true,
    akupayDisbursementRoute: false,
    id:4
  },   
  {
    img: {
      src: ApprovalsSVG,
      alt: 'Approvals',
    },
    link: '/dashboard/approvals',
    span: 'Approvals',
    adminRoute: true,
    akupayDisbursementRoute: false,
    id:5
  },
  {
    img: {
      src: SMSTransactionsSVG,
      alt: 'Transactions',
    },
    link: '/dashboard/transactions',
    span: 'Transactions',
    adminRoute: true,
    id:9
  },  
  {
    img: {
      src: FlaggedTransactionsSVG,
      alt: 'Flagged Transactions',
    },
    link: '/dashboard/flagged-transactions',
    span: 'Flagged Transactions',
    adminRoute: true,
    id:6
  },
  {
    img: {
      src: AuditLogsSVG,
      alt: 'Audit Log',
    },
    link: '/dashboard/audit-logs',
    span: 'System Logs',
    adminRoute: true,
    isBtn: true,
    showSubRoutes: false,
    id:7,
    subRoutes: [
      {
        img: {
          src: AuditLogsSVG,
          alt: 'Audit Log',
        },
        link: '/dashboard/audit-logs',
        span: 'Audit Logs',
        routeSlug: 'audit-logs',
      },
      {
        img: {
          src: AuditLogsSVG,
          alt: 'Response Log',
        },
        link: '/dashboard/response-logs',
        span: 'Response Logs',
        routeSlug: 'response-logs',
      },
      {
        img: {
          src: AuditLogsSVG,
          alt: 'Upload Error Logs',
        },
        link: '/dashboard/upload-error-logs',
        span: 'Upload Error Logs',
        routeSlug: 'upload-error-logs',
      },
      {
        img: {
          src: AuditLogsSVG,
          alt: 'Beneficiary Upload Logs',
        },
        link: '/dashboard/beneficiary-upload-logs',
        span: 'Beneficiary Upload Logs',
        routeSlug: 'beneficiary-upload-logs',
      },      
      {
        img: {
          src: AuditLogsSVG,
          alt: 'Flagged Transactions ApprovalLogs',
        },
        link: '/dashboard/flagged-transactions-approval',
        span: 'Flagged Transaction Approval Logs',
        routeSlug: 'flagged-transactions-approval',
      },              
    ]
  },
  {
    img: {
      src: Profile,
      alt: 'Profile',
    },
    link: '/dashboard/profile',
    span: 'Profile',
    adminRoute: false,
    id:8
  },  
]


export const akuPayDisburseUserRoutes = [
  {
    img: {
      src: DashboardSVG,
      alt: 'dashboard',
    },
    link: '/dashboard',
    span: 'Dashboard',
    adminRoute: false,
    akupayDisbursementRoute: false,
    id:1
  },  
  {
    img: {
      src: DisbursementLogsSVG,
      alt: 'Disbursements Logs',
    },
    link: '/disbursements-logs',
    span: 'Disbursements Logs',
    adminRoute: false,
    akupayDisbursementRoute: true,
  }, 
  {
    img: {
      src: AllTransactionsSVG,
      alt: 'All Transactions',
    },
    link: '/dashboard/all-transactions',
    span: 'All Transactions',
    adminRoute: false,
    akupayDisbursementRoute: true,
  },  
  {
    img: {
      src: ProfileSVG,
      alt: 'Profile',
    },
    link: '/dashboard/profile',
    span: 'Profile',
    adminRoute: false,
  },     
]


export const repRoutes = [
  {
    img: {
      src: DashboardSVG,
      alt: 'dashboard',
    },
    link: '/dashboard',
    span: 'Dashboard',
    adminRoute: false,
    akupayDisbursementRoute: false,
  },
  {
    img: {
      src: SMSTransactionsSVG,
      alt: 'SMS Transactions',
    },
    link: '/dashboard/resolve-sms',
    span: 'Resolve SMS',
    adminRoute: false,
    akupayDisbursementRoute: false,
  }, 
  {
    img: {
      src: ProfileSVG,
      alt: 'Profile',
    },
    link: '/dashboard/profile',
    span: 'Profile',
    adminRoute: false,
  },    
]


export const ROLES = {
  ADMIN: 'administrator',
  AKUPAY: 'partner',
  REP: 'representative',
}
