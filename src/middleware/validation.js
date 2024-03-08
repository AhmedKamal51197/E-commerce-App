export let validation=(schema)=>{
    return (req,res,next)=>{
        let errors=schema.validate(req.body,{abortEarly:false})
        if(errors?.error?.details)
        {
            res.json({message:"Validation Error",error:errors?.error?.details})
        }
        else 
        {
            next()
        }
    }
}