class Log {
  separator() {
    let string = '';
    for (let i = 0; i < 50; i++) {
      string += '--';
    }
    console.log(string);
  }

  log(label, error) {
    if (!__DEV__) {
      return;
    }
    this.separator();
    console.log(label, error);
  }

  net(label, error) {
    if (!__DEV__) {
      return;
    }
    this.separator();
    console.log(label, error);
  }

  error(error, label) {
    if (!__DEV__) {
      return;
    }
    this.separator();
    console.log(label, error);
  }

  info(error, label) {
    if (!__DEV__) {
      return;
    }
    this.separator();
    console.log(label, error);
  }

  warn(error, label) {
    if (!__DEV__) {
      return;
    }
    this.separator();
    console.log(label, error);
  }
}

const Logger = new Log();

export default Logger;
