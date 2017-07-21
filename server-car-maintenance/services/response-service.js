exports.responseService = {
    generateResponse: function(payload, code, information){
        if(information.message || information.level){
            return {
                payload: payload,
                code: code,
                message: information.message,
                level: information.level
            }
        }else{
            return {
                payload: payload,
                code: code
            }
        }
        
    }
}