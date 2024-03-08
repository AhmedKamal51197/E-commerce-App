const handleAsyncError=(fn)=>{
    return (req,res,next)=>{
        fn(req,res).catch(err=>res.json({message:err.message}))
    }
}
export default handleAsyncError