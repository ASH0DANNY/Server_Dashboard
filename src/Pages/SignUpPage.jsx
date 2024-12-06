import { Box, TextField } from '@mui/material'
import React from 'react'

const SignUpPage = () => {
  return (
    <>
    <Box>
        <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder='Enter email..'
        />
        </div>
    </Box>
    </>
  )
}

export default SignUpPage