import { format, addDays, differenceInDays, isBefore } from 'date-fns'

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const limitFileSizeKb = (file, limit) => {
  if (file.size >= limit * 1024) {
    return [null, `File exceeds maximum upload limit: ${(file.size / 1024).toFixed(1)} KB`]
  } else {
    return [file, '']
  }
}

export const limitFileSizeMb = (file, limit) => {
  if (file.size >= limit * 1048576) {
    return [null, `File exceeds maximum upload limit: ${(file.size / 1048576).toFixed(1)} MB`]
  } else {
    return [file, '']
  }
}

export const getYoutubeVideoEmbed = (url) => {
  if (url.includes('https://www.youtube.com/embed/')) {
    return url
  } else if (url.includes('https://www.youtube.com/watch?v=')) {
    const parsedUrl = url.replace('https://www.youtube.com/watch?v=', '').split('&')[0]
    return `https://www.youtube.com/embed/${parsedUrl}`
  } else {
    return ''
  }
}

export const replaceCustomOthers = (arr, value) => {
  var newArr = arr
  newArr.forEach((e, i) => {
    if (e.includes('Others')) {
      newArr[i] = 'Others-' + value
    }
  })
  return newArr
}

export const checkOthersInArray = (arr) => {
  var result = false
  arr.forEach((e) => {
    if (e.includes('Others')) {
      result = true
    }
  })
  return result
}

export const getOthersInArray = (arr) => {
  var text = ''
  arr.forEach((e) => {
    if (e.includes('Others')) {
      text = e.replace('Others-', '')
    }
  })
  return text
}

/// Number

export const formatIndonesianNumber = (number) => {
  if (!number) return
  // Remove all spaces and non-numeric characters (if any)
  let cleanedNumber = number.replace(/\D+/g, '')

  // Handle cases to ensure the number starts with '+62'
  if (cleanedNumber.startsWith('0')) {
    cleanedNumber = '+62' + cleanedNumber.slice(1) // Replace '0' with '+62'
  } else if (cleanedNumber.startsWith('62')) {
    cleanedNumber = '+62' + cleanedNumber.slice(2) // Ensure '+62' at the start
  } else if (!cleanedNumber.startsWith('+62')) {
    cleanedNumber = '+62' + cleanedNumber // Add '+62' if not present
  }

  return cleanedNumber
}

export const moneyFormat = (value) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Set to 0 for no decimal places
    maximumFractionDigits: 0,
  })
  const formattedNumber = formatter.format(value)
  return formattedNumber
}

export const paymentCalculation = (promotorNumber, paymentDp, type) => {
  const countPromotor = Number(promotorNumber) ?? 0
  const promotorFee = countPromotor * 350000
  const countSupervision = Math.ceil(countPromotor / 5)
  const serviceCharge = countSupervision * 1000000
  const taxFee = (promotorFee + serviceCharge) * 0.13
  const totalFee = promotorFee + serviceCharge + taxFee

  var totalTransfer = 0
  if (type === 'dp') {
    totalTransfer = totalFee * 0.5
  } else if (type === 'full' && paymentDp > 0) {
    totalTransfer = totalFee - paymentDp
  } else if (type === 'full' && paymentDp === 0) {
    totalTransfer = totalFee
  }
  return { promotorFee, countSupervision, serviceCharge, taxFee, totalFee, totalTransfer }
}

/// Date

export const getDate = (days = 0) => {
  const now = new Date()
  return format(addDays(now, days), 'yyyy-MM-dd')
}

export const dateToSimpleDate = (date) => {
  const formattedDate = format(new Date(date), 'MMM dd')
  return formattedDate
}

export const dateToDateName = (date) => {
  const formattedDate = format(new Date(date), 'MMM dd, yyyy')
  return formattedDate
}

export const dateToDateFullname = (date) => {
  const formattedDate = format(new Date(date), 'MMM dd, yyyy')
  return formattedDate
}

export const dateToDaysDifference = (startDate, endDate) => {
  const daysDifference = differenceInDays(new Date(endDate), new Date(startDate))
  return daysDifference
}

export const dateIsPast = (date) => {
  const today = new Date()
  const isBeforeToday = isBefore(new Date(date), today)
  return isBeforeToday
}

export const dateToTwoDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Check if both dates are in the same year
  if (start.getFullYear() === end.getFullYear()) {
    // Check if both dates are in the same month
    if (start.getMonth() === end.getMonth()) {
      // Check if both dates are in the same day
      if (start.getDay() === end.getDay()) {
        // Format as "dd MMM" (e.g., 20 December)
        return `${format(start, 'd MMM yyyy')}`
      } else {
        // Format as "dd–dd MMM yyyy" (e.g., 20–23 December 2024)
        return `${format(start, 'd')} – ${format(end, 'd MMM yyyy')}`
      }
    } else {
      // Format as "dd MMM – dd MMM yyyy" (e.g., 20 December – 5 January 2024)
      return `${format(start, 'd MMM')} – ${format(end, 'd MMM yyyy')}`
    }
  } else {
    // Format as "dd MMM yyyy – dd MMM yyyy" (e.g., 20 December 2024 – 5 January 2025)
    return `${format(start, 'd MMM yyyy')} – ${format(end, 'd MMM yyyy')}`
  }
}

export const dateAndTimeToUtc = (date, time) => {
  // Combine date and time into a single string and create a Date object in UTC
  const localDate = new Date(`${date}T${time}:00`)
  const utcString = localDate.toISOString().split('.')[0] + 'Z'
  return utcString
}

export const datetimeUtcToDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

// Function to format the time as "hour:minutes"
export const datetimeUtcToTime = (dateString) => {
  const date = new Date(dateString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const mapUpdateDateWithTime = (data) => {
  const events = data.map((event) => {
    const startDate = datetimeUtcToDate(event.startDate)
    const startTime = datetimeUtcToTime(event.startDate)
    const endDate = datetimeUtcToDate(event.endDate)
    const endTime = datetimeUtcToTime(event.endDate)
    return {
      ...event,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
    }
  })

  return events
}

export const dateDaysUntil = (dateString) => {
  const today = new Date() // Current date
  const futureDate = new Date(dateString) // Convert string to Date
  const timeDifference = futureDate - today // Difference in milliseconds

  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) // Convert milliseconds to days
  return daysLeft
}

export const dateToGoodDay = (timestamp) => {
  const date = new Date(parseInt(timestamp))

  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return formattedDate
}

/// String
export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1)
}
