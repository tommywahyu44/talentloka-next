// utils/apiService.js

const API_BASE_URL = 'https://asia-southeast1-talentloka-35463.cloudfunctions.net'
import axios from 'axios'

import Swal from 'sweetalert2'

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Something went wrong')
  }
  return response.json()
}

const handleError = (error) => {
  // You can implement more sophisticated error handling here (e.g., logging, notifications)
  console.error('API Error:', error)
  throw error
}

const headers = {
  'Content-Type': 'application/json',
  // Include any other necessary headers like Authorization here
}

export const apiService = {
  /// Client
  createEventPromotor: async (formData) => {
    Swal.showLoading()
    try {
      await axios.post(API_BASE_URL + '/createEventPromotor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      Swal.hideLoading()
      Swal.fire({
        text: 'Event successfully submitted',
        icon: 'success',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
      return true
    } catch (err) {
      Swal.hideLoading()
      Swal.fire({
        text: 'Failed to submit the event',
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#BE123C',
      })
      return false
    }
  },
  updateEventPromotor: async (formData) => {
    Swal.showLoading()
    try {
      await axios.post(API_BASE_URL + '/updateEventPromotor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      Swal.hideLoading()
      Swal.fire({
        text: 'Event successfully updated',
        icon: 'success',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
    } catch (err) {
      Swal.hideLoading()
      Swal.fire({
        text: 'Failed to submit the event',
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#BE123C',
      })
      return false
    }
  },
  cancelEventPromotor: async (eventId, email) => {
    Swal.fire({
      title: 'Are you sure you want to cancel this event?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#be123c',
      cancelButtonColor: '#808080',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.showLoading()
        const payload = {
          email: email,
          id: eventId,
        }
        try {
          await axios.post(API_BASE_URL + '/cancelEventPromotor', payload)
          Swal.hideLoading()
          Swal.fire('Event canceled!', '', 'success')
        } catch (err) {
          Swal.hideLoading()
          Swal.fire({
            text: 'Failed to cancel the event',
            icon: 'error',
            confirmButtonText: 'Retry',
            confirmButtonColor: '#BE123C',
          })
        }
      }
    })
  },
  inviteSPGToEventPromotor: async (listId, eventId) => {
    Swal.showLoading()
    const payload = {
      eventId: eventId,
      spgCodes: listId,
    }
    try {
      await axios.post(API_BASE_URL + '/inviteSPGToEventPromotor', payload)
      Swal.hideLoading()
      Swal.fire('Invited promotor successfully updated!', '', 'success')
    } catch (err) {
      Swal.hideLoading()
      Swal.fire({
        text: 'Failed to update invited',
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#BE123C',
      })
    }
  },
  clientUploadPaymentProofPromotor: async (formData) => {
    Swal.showLoading()
    try {
      await axios.post(API_BASE_URL + '/clientUploadPaymentProofPromotor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      Swal.hideLoading()
      Swal.fire({
        text: 'Payment proof successfully submitted',
        icon: 'success',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
    } catch (err) {
      Swal.hideLoading()
      Swal.fire({
        text: 'Failed to submit the payment proof',
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#BE123C',
      })
    }
  },
  /// SPG
  spgUpdateInvitationEventPromotor: async (data, action) => {
    var actionSuccessText = 'Invitation successfully accepted!'
    var actionFailedText = 'Failed to accept the event'
    switch (action) {
      case 'apply':
        actionSuccessText = 'Event applied!'
        actionFailedText = 'Failed to apply the event'
        break
      case 'decline':
        actionSuccessText = 'Invitation declined!'
        actionFailedText = 'Failed to decline the event'
        break
    }
    Swal.showLoading()
    const payload = {
      eventId: data.id,
      spgCode: data.promotorCode,
      action: action,
      email: data?.promotorEmail,
    }
    try {
      await axios.post(API_BASE_URL + '/spgUpdateInvitationEventPromotor', payload)
      Swal.hideLoading()
      Swal.fire({
        text: actionSuccessText,
        icon: 'success',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
    } catch (err) {
      Swal.hideLoading()
      Swal.fire({
        text: actionFailedText,
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#BE123C',
      })
    }
  },
  /// Admin
  adminUpdateStatusEventPromotor: async (eventId, email, action) => {
    var actionQuestionText = 'Are you sure you want to approve this event?'
    var actionSuccessText = 'Event approved!'
    var actionFailedText = 'Failed to approve the event'
    switch (action) {
      case 'confirm_payment':
        actionQuestionText = 'Are you sure you want to confirm the payment?'
        actionSuccessText = 'Payment confirmed!'
        actionFailedText = 'Failed to confirm the payment'
        break
    }
    Swal.fire({
      title: actionQuestionText,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#be123c',
      cancelButtonColor: '#808080',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.showLoading()
        const payload = {
          email: email,
          eventId: eventId,
          action: action,
        }
        try {
          await axios.post(API_BASE_URL + '/adminUpdateStatusEventPromotor', payload)
          Swal.hideLoading()
          Swal.fire(actionSuccessText, '', 'success')
        } catch (err) {
          Swal.hideLoading()
          Swal.fire({
            text: actionFailedText,
            icon: 'error',
            confirmButtonText: 'Retry',
            confirmButtonColor: '#BE123C',
          })
        }
      }
    })
  },
}
