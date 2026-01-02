class UsageLimitError extends Error {
    code = "USAGE_LIMIT_EXCEEDED";
    constructor(message: string) {
        super(message);
    }
}