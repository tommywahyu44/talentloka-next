import { apiService } from '@/lib/apiService'
import { getTextInvitationStatus } from '@/lib/statusUtils'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { pink, red } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'

const theme = createTheme({
  palette: {
    primary: red,
    secondary: pink,
  },
})

export default function AddPromotorDialog({
  isOpenAddPromotor,
  closeAddPromotor,
  data,
  listPromotor,
  email,
}) {
  var listInvitedPromotor = []
  const getChipColor = (status) => {
    if (status) {
      switch (status.toUpperCase()) {
        case 'INVITED':
        case 'APPLIED':
          return 'info'
        case 'APPROVED':
          return 'success'
        case 'DECLINED':
          return 'error'
        default:
          return 'secondary'
      }
    } else {
      return 'secondary'
    }
  }

  const submitAddPromotor = () => {
    const listId = listInvitedPromotor.map((item) => item.id)
    const uniqueIdList = [...new Set(listId)].join(',')
    apiService.invitePromoterToEvent(uniqueIdList, data.id)
  }

  const mergedList = listPromotor.map((item) => {
    // Find matching entry in list promotor by id and spgCode
    const match = data?.listPromotor?.find((invite) => invite.spgCode === item.id)

    // Construct merged object
    return {
      id: item.id,
      name: match ? match.name : item.name,
      avatar: item?.profilePicture?.length > 0 ? item.profilePicture[0] : '',
      invitationStatus: match ? match.invitationStatus : '',
      gender: item.gender,
      city: item.city,
    }
  })

  listInvitedPromotor = mergedList.filter((item) => item.invitationStatus !== '') ?? []

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Dialog
          open={isOpenAddPromotor}
          onClose={closeAddPromotor}
          maxWidth="md"
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault()
              const formData = new FormData(event.currentTarget)
              const formJson = Object.fromEntries(formData.entries())
              const email = formJson.email
              closeAddPromotor()
            },
          }}>
          <DialogTitle>Update List Invited Promotor</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please add a new promoter or remove existing promoter.
            </DialogContentText>
            <Stack className="w-full">
              <Autocomplete
                multiple
                onChange={(event, value) => (listInvitedPromotor = value)}
                id="tags-outlined"
                className="mt-8"
                options={mergedList}
                ChipProps={{ color: 'secondary' }}
                getOptionLabel={(option) => `${option.id} - ${option.name} - ${option.city}`}
                defaultValue={listInvitedPromotor}
                disableClearable
                filterSelectedOptions
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props
                  return (
                    <Box
                      key={key}
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...optionProps}>
                      <img
                        loading="lazy"
                        width="40"
                        src={option.avatar}
                        alt=""
                      />
                      {option.id} {option.name}
                      <img
                        loading="lazy"
                        width="20"
                        className="ml-2"
                        src={
                          option.gender === 'Female'
                            ? '/images/female-gender.png'
                            : '/images/male-gender.png'
                        }
                      />
                    </Box>
                  )
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.id}
                      avatar={
                        <Avatar
                          alt={option.name}
                          src={option.avatar}
                        />
                      }
                      color={getChipColor(option.invitationStatus)}
                      variant="outlined"
                      label={
                        <div className="flex">
                          {option.id} {option.name}
                          <img
                            loading="lazy"
                            className="mx-2 my-auto h-4 w-4"
                            src={
                              option.gender === 'Female'
                                ? '/images/female-gender.png'
                                : '/images/male-gender.png'
                            }
                          />
                          - {getTextInvitationStatus(option.invitationStatus) ?? ''}
                        </div>
                      }
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Invited Promotor"
                    placeholder="Promotor"
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddPromotor}>Cancel</Button>
            <Button
              onClick={submitAddPromotor}
              type="submit">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
  )
}
