class ResponseHandler {
  /**
   *
   * @param {Boolean} status
   * @param {Any} data
   */
  constructor(status = true, data = {}) {
    this.ok = status;
    this.data = data;
  }
}

export default ResponseHandler;
