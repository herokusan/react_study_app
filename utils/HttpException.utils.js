class HttpException extends Error {
    constructor(status, message, data) {
        console.log("constructor")
        console.log(status)
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

module.exports = HttpException;