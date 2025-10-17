import bcrypt from "bcryptjs";

export const showUpload = (req, res) =>{
    res.render('ai/upload', {layout : false, })
}


const hashPassword = await bcrypt.hash