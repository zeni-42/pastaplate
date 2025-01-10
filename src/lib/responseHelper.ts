class ResponseHelper {
    static success(data: any = null, message = "Success", status = 200){
        return new Response(
            JSON.stringify({
                status,
                success: true,
                message,
                data
            }),
            { status }
        )
    }

    static error(message = "An error occured", status = 400, errors:any = null){
        return new Response(
            JSON.stringify({
                status,
                success: false,
                message,
                errors
            }),
            { status }
        )
    }
}

export default ResponseHelper