const AccountsCollection = require("../models/accounts.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



const createNewAccount = async (req, res)=>{
    try {
        const {first_name, last_name, username, email, phone, password, confirm_password} = req.body

        const isExistingAccount = await AccountsCollection.findOne({username})
        if(isExistingAccount){
            return res.status(400).send({status: false, message: "Account Already Exists"})
        }

        if(password!==confirm_password){
            return res.status(400).send({status: false, message: "Password Do Not Match"})
        }

        const hash = await bcrypt.hash(password, 10);

        const token = jwt.sign({username}, process.env.SECRET_KEY)
        const tokens = [{token}]


        const newAccount = new AccountsCollection({
            first_name: first_name.toLowerCase(),
            last_name: last_name.toLowerCase(),
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            phone: parseInt(phone),
            password: hash,
            tokens
        })

        const addedAccount = await newAccount.save()
        
        res.status(200).send({status: true, message: "Account Creation Success", data: addedAccount})
    } catch (error) {
        console.log("Error in createNewAccount")
        console.log(error)
        res.send({status: false, message: error})
    }
}


const loginToAccount = async (req, res)=>{
    try {
        const {username, password}=req.body;
        const isExistingAccount = await AccountsCollection.findOne({username})
        if(!isExistingAccount){
            return res.status(400).send({status: false, message: "Account Does Not Exist"})
        }

        const isValidPassword = await bcrypt.compare(password, isExistingAccount.password)
        if(!isValidPassword){
            return res.status(200).send({status: false, message: "Incorrect Credentials"})
        }

        const token = jwt.sign({username: isExistingAccount.username}, process.env.SECRET_KEY)
        const tokens = isExistingAccount.tokens
        tokens.push({token})

        const updatedAccount = await AccountsCollection.findOneAndUpdate({username}, {tokens}, {new: true})

        res.status(200).send({status: true, message: "Logged In Success", data: updatedAccount, authToken: token})
    } catch (error) {
        console.log("Error in loginToAccount")
        console.log(error)
        res.send({status: false, message: error})
    }
}


const logoutOfAccount = async (req, res)=>{
    try {
        const {username, token}=req.query;
        const isExistingAccount = await AccountsCollection.findOne({username})
        if(!isExistingAccount){
            return res.status(400).send({status: false, message: "Account Does Not Exist"})
        }

        

        const tokens = isExistingAccount.tokens
        tokens.filter(data=>data.token!==token)
        const updatedAccount = await AccountsCollection.findOneAndUpdate({username}, {tokens}, {new: true})

        res.status(200).send({status: true, message: "Logged Out Success", data: updatedAccount})
    } catch (error) {
        console.log("Error in loginToAccount")
        console.log(error)
        res.send({status: false, message: error})
    }
}







module.exports = {createNewAccount, loginToAccount, logoutOfAccount}