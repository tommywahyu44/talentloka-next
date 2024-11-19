export function getTextEventStatus(status) {
  switch (status.toUpperCase()) {
    case 'IN_REVIEW':
      return 'In Review'
    case 'PUBLISHED':
      return 'Published'
    case 'PENDING_FEE':
      return 'Pending Fee'
    case 'CANCELED':
    case 'CANCEL':
      return 'Canceled'
    case 'READY':
      return 'Ready'
    case 'LIVE':
      return 'Live'
    case 'COMPLETED':
      return 'Completed'
    case 'PENDING_PAYMENT_DP':
      return 'Pending Payment DP'
    case 'PENDING_PAYMENT_FULL':
      return 'Pending Payment Full'
    default:
      return status
  }
}

export function getTextInvitationStatus(status) {
  if (status) {
    switch (status.toUpperCase()) {
      case 'INVITED':
        return 'Invited'
      case 'APPLIED':
        return 'Applied'
      case 'APPROVED':
        return 'Approved'
      case 'DECLINED':
        return 'Declined'
      case 'EXPIRED':
        return 'Expired'
      default:
        return status
    }
  } else {
    return ''
  }
}

export function getStyleEventStatus(status) {
  switch (status.toUpperCase()) {
    case 'IN_REVIEW':
      return 'text-yellow-700 bg-yellow-50 ring-yellow-600/10'
    case 'PUBLISHED':
      return 'text-blue-700 bg-blue-50 ring-blue-600/10'
    case 'PENDING_FEE':
    case 'PENDING_PAYMENT_DP':
    case 'PENDING_PAYMENT_FULL':
      return 'text-amber-700 bg-amber-50 ring-amber-600/40'
    case 'CANCELED':
    case 'CANCEL':
      return 'text-red-700 bg-red-50 ring-red-600/10'
    case 'READY':
    case 'LIVE':
      return 'text-green-700 bg-green-50 ring-green-600/20'
    case 'COMPLETED':
      return 'bg-gray-50 text-gray-600 ring-gray-500/10'
    default:
      return 'bg-gray-50 text-gray-600 ring-gray-500/10'
  }
}

export function getStyleBundlePackage(status) {
  switch (status.toUpperCase()) {
    case 'BRONZE':
      return 'text-orange-950 bg-orange-50 ring-orange-900/10'
    case 'SILVER':
      return 'text-slate-500 bg-slate-50 ring-slate-500/10'
    case 'GOLD':
      return 'text-amber-500 bg-amber-50 ring-amber-500/10'
    case 'DIAMOND':
      return 'text-teal-300 bg-teal-50 ring-emerald-300/20'
    default:
      return 'bg-gray-50 text-gray-600 ring-gray-500/10'
  }
}

export function getStyleEventType(status) {
  switch (status.toUpperCase()) {
    case 'PUBLIC':
      return 'text-green-700 bg-green-50 ring-green-600/20'
    case 'PRIVATE':
      return 'text-gray-600 bg-gray-50 ring-gray-500/10'
    default:
      return 'bg-gray-50 text-gray-600 ring-gray-500/10'
  }
}
