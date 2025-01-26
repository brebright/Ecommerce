// const jwt = require('jsonwebtoken')

// async function authToken(req,res,next){
//     try{
//         const token = req.cookies?.token

//         console.log("token",token)
//         if(!token){
//             return res.status(200).json({
//                 message : "Please Login...!",
//                 error : true,
//                 success : false
//             })
//         }
 
//         jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
//             console.log(err)
//             console.log("decoded",decoded)
            
//             if(err){
//                 console.log("error auth", err)
//             }

//             req.userId = decoded?._id

//             next()
//         });


//     }catch(err){
//         res.status(400).json({
//             message :err,
//             data : [],
//             error : true,
//             success : false
//         })
//     }
// }


// module.exports = authToken

const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("Token:", token);
        
        // Check if token is not present
        if (!token) {
            return res.status(401).json({ // Changed status to 401 for unauthorized access
                message: "Please Login to access this resource.",
                error: true,
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err); // Log error
                return res.status(403).json({ // Changed status to 403 for forbidden access
                    message: "Token is invalid or expired.",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded.userId; // Attach user ID to the request object
            console.log("Decoded user ID:", req.userId);

            next(); // Proceed to the next middleware or route handler
        });

    } catch (err) {
        console.error("Middleware error:", err); // Log middleware error
        return res.status(500).json({ // Changed status to 500 for server error
            message: "Internal Server Error.",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
