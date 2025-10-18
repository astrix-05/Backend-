class ApiResponse {
    constructor(statusCode, message = "Success", data = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.errors = [];
        this.success = statusCode >= 200 && statusCode < 300;
    }       
}