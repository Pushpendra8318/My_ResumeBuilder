export const BASE_URL=process.env.BACKEND_URL
//ROUTES USER FOR FRONTEND
export const API_PATHS={

    AUTH:{
        RAGISTER:`${BASE_URL}/api/auth/ragister`,
        LOGIN:`${BASE_URL}/api/auth/login`,
        GET_PROFILE:`${BASE_URL}/api/auth/profile`,
    },
    RESUME:{
      CREATE:`${BASE_URL}/api/resume`,
      GET_ALL:`${BASE_URL}/api/resume`,
      GET_BY_ID:(id)=>`${BASE_URL}/api/resume/${id}`,

      UPDATE: (id)=> `${BASE_URL}/api/resume/${id}`,
      DELETE:(id)=> `${BASE_URL}/api/resume/${id}`,
      UPLOAD_IMAGES :(id)=> `${BASE_URL}/api/resume/${id}/upload-images`,

},
image:{
    UPLOAD_IMAGE:`${BASE_URL}/api/auth/upload-image`
}
}