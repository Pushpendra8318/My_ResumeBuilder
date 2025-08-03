//controllers//uploadImages.js
import fs from 'fs'
import path from 'path'
 import Resume from '../models/resumeModel.js'
 import upload from '../middleware/uploadMiddleware.js'
 export const uploadResumeImages= async(req,res)=>{
   {/* try{
        //CONFIGURE MULTER TO HANDLE IMAGES
        upload.fields([{name:"thumbnail"},{name:"profileImage"}])
        {req,res,async(err)=>{
            if(err){
                return res.status(400).json({message:"file upload filed",error:err.message})
            }
            const resumeId=req.params.id;
            const resume= await Resume.findOne({_id:resumeId,userId:req.user._id})
            if(!resume){
                return res.status(404).json({message:"Resume not found"})
            }
            //USE PROCESS CWD TO LOCATE UPLOAD FOLDER
            const uploadsFolder=path.join(process.cwd(),"uploads")
            const baseUrl=`${req.protocol}://${req.get("host")}`;
            const newProfileImae= req.files.profileImage?.[0];
            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail=path.join(uploadsFolder,path.basename(resume.thumbnailLink));
                    if(fs.existsSync(oldThumbnail))
                          fs.unlinkSync(oldThumbnail)       
                }
                resume.thumbnailLink= `${baseUrl}/uploads/${newThumbnail.filename}`;
             }
             //same for profilepreview image
             if(newProfileImage){
                if(resume.profileInfo?.profilePreviewUrl){
                    const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo?.profilePreviewUrl));
                    if(fs.existsSync(oldProfile))
                          fs.unlinkSync(oldProfile)       
                }
                   resume.profileInfo?.profilePreviewUrl= `${baseUrl}/uploads/${newProfileImage.filename}`;
             }
             await resume.save();
             res.status(200).json({
                message:"Image uploades successfully",
                thumbnailLink:resume.thumbnailLink,
                profilePreviewUrl:resume.profileInfo.profilePreviewUrl

             })

        }}
    }
    catch(err){
        console.error('error uploading images',err);
        res.status(500).json({
            message:"failed to upload images",
            error:err.message
        })
    }*/}
     try {
    // Handle file upload (Multer)
    await new Promise((resolve, reject) => {
      upload.fields([{ name: 'thumbnail' }, { name: 'profileImage' }])(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const resumeId = req.params.id;
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const uploadsFolder = path.join(process.cwd(), "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // ✅ FIX 2: Declare variables correctly
    const newThumbnail = req.files?.thumbnail?.[0];
    const newProfileImage = req.files?.profileImage?.[0];

    if (newThumbnail) {
      if (resume.thumbnailLink) {
        const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
        if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
      }
      resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
    }

    if (newProfileImage) {
      if (resume.profileInfo?.profilePreviewUrl) {
        const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
        if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
      }
      resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
    }

    await resume.save();

    res.status(200).json({
      message: "Images uploaded successfully",
      thumbnailLink: resume.thumbnailLink,
      profilePreviewUrl: resume.profileInfo.profilePreviewUrl
    });

  } catch (err) {
    console.error('Error uploading images:', err);
    res.status(500).json({
      message: "Failed to upload images",
      error: err.message
    });
  }
};
  