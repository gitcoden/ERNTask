import React from 'react';
import axios from 'axios';
import { Formik, Field } from 'formik';
import { Input, Button, FormGroup, FormControl, InputLabel, TextField } from '@material-ui/core/es';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { addPhone } from 'front/App/Phones/ducks';
import { showError, showSuccess } from 'front/App/Default/ducks';

const phoneRegExp = /^(\+7|8)\d{10}$/;

@connect(
  null,
  dispatch => ({ actions: bindActionCreators({ addPhone, showError, showSuccess }, dispatch) })
)
class ValidatePhone extends React.Component {
  state = {
    timeLeft: 20,
  };

  componentDidMount() {
    const timerInterval = setInterval(() => {
      this.setState(
        prevState => ({ timeLeft: prevState.timeLeft - 1 }),
        () => {
          const { timeLeft } = this.state;

          if (timeLeft === 0) {
            clearInterval(timerInterval);
          }
        }
      );
    }, 1000);
  }

  resetTimer = () => {
    this.setState({ timeLeft: 20 });
  };

  validatePhoneBack = phone => {
    axios.post(`http://localhost:3000/api/validate_phone`, { phone }).then(({ data: { valid, message } }) => {
      const { actions } = this.props;

      if (valid) {
        actions.showSuccess(message);
        actions.addPhone(phone);
      } else {
        actions.showError(message);
      }
    });
  };

  getTimeLeft = () => {
    const { timeLeft } = this.state;

    const minutes = parseInt(timeLeft / 60, 10);
    const seconds = timeLeft - minutes * 60;

    const minutesStr = minutes.toString();
    const secondsStr = seconds.toString();

    return `${minutesStr.length === 1 ? `0${minutesStr}` : minutesStr}:${
      secondsStr.length === 1 ? `0${secondsStr}` : secondsStr
    }`;
  };

  formSubmit = ({ phone }) => {
    this.validatePhoneBack(phone);
    this.resetTimer();
  };

  validatePhoneUi = phone => {
    let error;

    if (!phoneRegExp.test(phone)) {
      error = 'Phone is invalid';
    }

    return error;
  };

  render() {
    const { timeLeft } = this.state;

    return (
      <Formik
        onSubmit={this.formSubmit}
        initialValues={{ phone: '' }}
        render={({ handleSubmit, errors, values: { phone } }) => {
          const erorr = !!errors.phone;

          return (
            <form onSubmit={handleSubmit}>
              <FormGroup row>
                <Field
                  validate={this.validatePhoneUi}
                  name="phone"
                  render={({ field }) => (
                    <FormControl error={!!errors.phone}>
                      <InputLabel id="phone-input">{erorr ? errors.phone : 'OK'}</InputLabel>
                      <Input htmlFor="phone-input" {...field} error={erorr} />
                    </FormControl>
                  )}
                />
                <FormControl style={{ marginLeft: 10 }}>
                  <TextField label="Time left" type="time" value={this.getTimeLeft()} disabled />
                  <Button disabled={timeLeft > 0 || erorr || phone.length === 0} type="submit">

                    Check
</Button>
                </FormControl>
              </FormGroup>
            </form>
          );
        }}
      />
    );
  }
}

ValidatePhone.propTypes = {
  actions: PropTypes.shape({}),
};

export default ValidatePhone;
