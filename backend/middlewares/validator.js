
export const validateSchema = (schemas) => (req , res , next) =>  {
    const result = schemas.safeParse(req.body)
 console.log('result', result)
    if(!result.success) {
       const formatted =  result.error.format();
       console.log('formatted' , formatted)
       return res.status(400).json({
        success:  false,
        message: 'validation failed',
        errors: Object.keys(formatted).map(field =>( {
            field,
           message: formatted[field]?._errors?.[0] || 'invalid error'
        }))
       })
    }

    next()
}