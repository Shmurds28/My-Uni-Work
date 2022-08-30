import { forwardRef, Fragment, SyntheticEvent } from 'react';
import * as React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRecoilState } from 'recoil';
import { isError, isSnackBar, notificationMessage } from '../atoms/modalAtom';
import Snackbar from '@mui/material/Snackbar';

const Alert = forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Notification() {
    const [isSnackBarOpen, setIsSnackBarOpen] = useRecoilState(isSnackBar);
    const [isAnError, setIsAnError] = useRecoilState(isError);
    const [notMessage, setNotMessage] = useRecoilState(notificationMessage);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        // setIsAnError(true);
        setIsSnackBarOpen(false);
    };

  return (
    <Fragment>
        <Snackbar open={isSnackBarOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal:"center" }}>
            {isAnError ? (
                <Alert onClose={handleClose} severity="error">{notMessage}</Alert>
            ): (
                <Alert onClose={handleClose} severity="success">{notMessage}</Alert>
            )}
        </Snackbar>

    </Fragment>
  )
}

export default Notification
