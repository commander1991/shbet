require("dotenv").config();
import jwt, { decode } from "jsonwebtoken";

const nonSecurePaths = ['/logout', '/login', '/register', '/forgot-password','/']

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXP_IN
        })
    } catch (error) {
        console.log(error)
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error)
    }
    return decoded;

}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next()
    let cookies = req.cookies.jwt;
    let tokenFromHeader = extractToken(req)
    if ((cookies && cookies.jwt) || tokenFromHeader) {
        // if ((cookies && cookies.jwt)) {
        // if (tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        // let token = cookies.jwt
        // let token = tokenFromHeader
        let decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded
            req.token = token
            next()
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Login to continue...'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user 2'
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next()
    if (req.user) {
        let username = req.user.username
        let roles = req.user.groupWithRoles.Roles
        let currentUrl = req.path
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't have permission to access this resource 1...`
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl || currentUrl.includes(item.url))
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't have permission to access this resource 2...`
            })
        }

    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user 3'
        })
    }
}

module.exports = {
    createJWT,
    checkUserJWT, checkUserPermission
}