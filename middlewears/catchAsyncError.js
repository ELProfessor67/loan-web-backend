

const catchAsyncError = (func) => (req,res) => {
    Promise.resolve(func(req,res)).catch((err) => {
        res.status(200).json({
            success: false,
            message: err.message || "Internal Server Error"
        })
    })
}

export default catchAsyncError