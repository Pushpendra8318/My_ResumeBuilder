import axiosInstance from '../util/axiosInstance'; // ✅ MISSING import
import { API_PATHS } from '../util/apiPaths';     // ✅ MISSING import
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../util/helper';
import { authStyles as styles } from '../assets/dummystyle';
import Input from './Input';


const Login = ({setCurrentPage}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin=async (e)=>{
     e.preventDefault(); 
        if(!validateEmail(email)){
             setError("please enter valid email")
            return;
        }
        if(!password){
             setError("please enter password")
            return;
        }
        setError('');
        try{
            const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
            email,
            password});
            const {token}=response.data;
            if(token){
                localStorage.setItem('token',token);
                updateUser(response.data);
                navigate('/dashboard');
            }
        } 
        catch (error){
            setError(error.response?.data?.message||"something went wrong")
        } 


    }
  
  return (
    <div className={styles.container}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.title}>Welcome back</h3>
            <p className={styles.subtitle}>
                Sign in to ontinue building amazing resume
            </p>
        </div>
        {/*FORM*/}
         <form onSubmit={handleLogin} className={styles.form}>
        <Input value={email} onChange={({target})=>setEmail(target.value)}
                label="email"
                placeholder='hexagan@gmail.com'
                type ='email'/>
                  <Input value={password} onChange={({target})=>setPassword(target.value)}
                label="Password"
                placeholder='min 8 charecater'
                type ='password'/>
                
                 {error&&<div className={styles.errorMessage}>{error}</div>}
                        <button type='submit' className={styles.signupSubmit}>
                            Sign In
                        </button>
                         <p className={styles.switchText}>
                              Don't have an account?{' '}
                                    <button onClick={()=>setCurrentPage('signup')}
                                    type='button' className={styles.signupSwitchButton}>
                                        Sign up
                                    </button>
                                </p>
                             
 
</form>



        {/* </form>*/}
    </div> 
  )
}

export default Login