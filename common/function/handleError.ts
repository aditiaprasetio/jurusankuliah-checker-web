export function handleError(err: any): string {
  let message = '';
  if (err.response) {
    if (err.response.data) {
      if (err.response.data.error) {
        if (err.response.data.error === 'unauthorized_client') {
          message = 'Username and password is incorrect';
        } else {
          message =
            err.response.data.error_description +
            ` (${err.response.data.error})`;
        }
      } else if (err.response.data.statusCode === 404) {
        message = 'Not Found';
      } else if (err.response.data.message) {
        if (Array.isArray(err.response.data.message)) {
          let msgText = '';
          for (const msg of err.response.data.message) {
            for (const constrain of Object.keys(msg.constraints)) {
              msgText += msg.constraints[constrain] + '. ';
            }
          }
          message = msgText;
        } else {
          message = err.response.data.message;
        }
      } else {
        message = '(1) ' + JSON.stringify(err.response.data);
      }
    } else {
      message = '(2) ' + JSON.stringify(err.response);
    }
  } else if (err.message) {
    message = err.message;
  } else {
    message = '(3) ' + JSON.stringify(err);
  }

  if (!message) {
    message = 'Oops. Terjadi Kesalahan! ';
  } else if (message.includes('Bad Gateway')) {
    message = 'Terjadi masalah di server! Silakan coba lagi';
  } else if (message.includes('Network Error')) {
    message = 'Terjadi kesalahan pada jaringan. Coba cek koneksi internetmu.';
  } else if (message.includes('INTERNAL_SERVER_ERROR')) {
    message = 'Terjadi kesalahan. Silakan coba lagi.';
  }

  return message;
}
